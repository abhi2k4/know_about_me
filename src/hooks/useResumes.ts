import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Resume {
  id: string;
  title: string;
  file_url: string;
  is_active: boolean;
  download_filename: string;
  created_at: string;
}

export function useResumes() {
  const queryClient = useQueryClient();

  // Fetch all resumes for the admin panel
  const { data: resumes, isLoading } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_resumes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Resume[];
    },
  });

  return { resumes, isLoading };
}

export function useActiveResume() {
  // Fetch only the active resume for the public site
  const { data: activeResume, isLoading } = useQuery({
    queryKey: ["active-resume"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_resumes")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      // If no active resume exists, it returns an error with code PGRST116. We handle this gracefully.
      if (error && error.code !== "PGRST116") throw error;
      return (data as Resume) || null;
    },
  });

  return { activeResume, isLoading };
}

export function useResumeMutations() {
  const queryClient = useQueryClient();

  // Upload new resume
  const addResume = useMutation({
    mutationFn: async ({ file, title }: { file: File; title: string }) => {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // 3. Insert into database
      const { data, error } = await supabase
        .from("portfolio_resumes")
        .insert([{ title, file_url: publicUrl, is_active: false, download_filename: file.name }])
        .select()
        .single();

      if (error) throw error;
      return data as Resume;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });

  // Update existing resume title and download filename (including renaming the file in Supabase Storage)
  const updateResume = useMutation({
    mutationFn: async ({ id, title, download_filename }: { id: string; title: string; download_filename: string }) => {
      // 1. Fetch current resume to get old file url
      const { data: current, error: fetchError } = await supabase
        .from("portfolio_resumes")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError || !current) throw fetchError || new Error("Resume not found");

      let finalFileUrl = current.file_url;
      const sanitizedFilename = download_filename.trim().endsWith(".pdf")
        ? download_filename.trim()
        : `${download_filename.trim()}.pdf`;

      // Relative path inside the 'resumes' bucket
      const oldUrlParts = current.file_url.split('/resumes/');
      const oldPath = oldUrlParts.length > 1 ? oldUrlParts[1] : null;
      const newPath = `resumes/${sanitizedFilename}`;

      // 2. If the filename changed, rename it in storage
      if (oldPath && oldPath !== newPath) {
        const { error: moveError } = await supabase.storage
          .from("resumes")
          .move(oldPath, newPath);

        if (moveError) {
          // If the file already exists or there is another error, throw it
          throw new Error(`Failed to rename file in storage: ${moveError.message}`);
        }

        // Get new public URL
        const { data: publicUrlData } = supabase.storage
          .from("resumes")
          .getPublicUrl(newPath);

        finalFileUrl = publicUrlData.publicUrl;
      }

      // 3. Update the database row with new details
      const { data, error } = await supabase
        .from("portfolio_resumes")
        .update({ 
          title, 
          download_filename: sanitizedFilename, 
          file_url: finalFileUrl 
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Resume;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["active-resume"] });
    },
  });

  // Delete resume
  const deleteResume = useMutation({
    mutationFn: async (resume: Resume) => {
      // 1. Delete from storage using the file URL to extract the path
      const urlParts = resume.file_url.split('/resumes/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from("resumes").remove([filePath]);
      }

      // 2. Delete from database
      const { error } = await supabase
        .from("portfolio_resumes")
        .delete()
        .eq("id", resume.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["active-resume"] });
    },
  });

  // Set active resume
  const setActiveResume = useMutation({
    mutationFn: async (id: string) => {
      // 1. Set all to inactive
      const { error: error1 } = await supabase
        .from("portfolio_resumes")
        .update({ is_active: false })
        .neq("id", "00000000-0000-0000-0000-000000000000"); // update all rows

      if (error1) throw error1;

      // 2. Set target to active
      const { error: error2 } = await supabase
        .from("portfolio_resumes")
        .update({ is_active: true })
        .eq("id", id);

      if (error2) throw error2;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["active-resume"] });
    },
  });

  return {
    addResume,
    updateResume,
    deleteResume,
    setActiveResume,
  };
}
