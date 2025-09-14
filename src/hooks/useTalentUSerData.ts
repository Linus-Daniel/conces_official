// hooks/useUserDetails.ts - React Query hooks for user details
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { hubApiClient } from "@/lib/hubClient";
import {
  UserDetails,
  ProjectsResponse,
  SkillsResponse,
  QueryParams,
} from "@/types/hub";
import { toast } from "react-hot-toast";

// Query Keys
export const userDetailQueryKeys = {
  all: ["user-details"] as const,
  details: (id: string) => [...userDetailQueryKeys.all, id] as const,
  projects: (id: string) =>
    [...userDetailQueryKeys.all, id, "projects"] as const,
  skills: (id: string) => [...userDetailQueryKeys.all, id, "skills"] as const,
};

// Get user details with projects and skills
export const useUserDetails = (
  userId: string,
  options: Omit<UseQueryOptions<UserDetails>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: userDetailQueryKeys.details(userId),
    queryFn: () => hubApiClient.getUserDetails(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Get user basic info only
export const useUser = (
  userId: string,
  options: Omit<UseQueryOptions<{ user: any }>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => hubApiClient.getUserById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Get user projects
export const useUserProjects = (
  userId: string,
  params: QueryParams = {},
  options: Omit<UseQueryOptions<ProjectsResponse>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: [...userDetailQueryKeys.projects(userId), params],
    queryFn: () => hubApiClient.getUserProjects(userId, params),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Get user skills
export const useUserSkills = (
  userId: string,
  params: QueryParams = {},
  options: Omit<UseQueryOptions<SkillsResponse>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: [...userDetailQueryKeys.skills(userId), params],
    queryFn: () => hubApiClient.getUserSkills(userId, params),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Update user mutation
export const useUpdateUserDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: any }) =>
      hubApiClient.updateUser(userId, userData),
    onSuccess: (data, variables) => {
      // Invalidate user details queries
      queryClient.invalidateQueries({
        queryKey: userDetailQueryKeys.details(variables.userId),
      });
      queryClient.invalidateQueries({
        queryKey: ["user", variables.userId],
      });
      // Also invalidate the users list
      queryClient.invalidateQueries({ queryKey: ["hub-users"] });

      toast.success("User updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
  });
};

// Delete project mutation
export const useDeleteUserProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => hubApiClient.deleteProject(projectId),
    onSuccess: (data, projectId) => {
      // Invalidate all project-related queries
      queryClient.invalidateQueries({ queryKey: ["hub-projects"] });
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "user-details" &&
          query.queryKey.includes("projects"),
      });

      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });
};

// Delete skill mutation
export const useDeleteUserSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillId: string) => hubApiClient.deleteSkill(skillId),
    onSuccess: (data, skillId) => {
      // Invalidate all skill-related queries
      queryClient.invalidateQueries({ queryKey: ["hub-skills"] });
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "user-details" &&
          query.queryKey.includes("skills"),
      });

      toast.success("Skill deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete skill: ${error.message}`);
    },
  });
};
