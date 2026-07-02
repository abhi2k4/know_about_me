import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  display_order: number;
  created_at: string;
}

export function useExperiences() {
  return useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_experiences")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
}
