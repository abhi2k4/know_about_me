import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  demo_url?: string;
  code_url?: string;
  note?: string;
  problem?: string;
  solution?: string;
  role?: string;
  stack: { name: string; icon?: string }[];
  challenges: string[];
  outcomes: string[];
  display_order: number;
  is_published: boolean;
  created_at: string;
}

export function useProjects(includeUnpublished = false) {
  return useQuery<Project[]>({
    queryKey: ["projects", includeUnpublished],
    queryFn: async () => {
      let query = supabase
        .from("portfolio_projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (!includeUnpublished) {
        query = query.eq("is_published", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
