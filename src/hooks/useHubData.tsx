// hooks/useHubData.ts - Enhanced React Query hooks with mutations
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  hubApiClient,
  CreateUserData,
  UpdateUserData,
  CreateProjectData,
  UpdateProjectData,
  CreateSkillData,
  UpdateSkillData,
} from "@/lib/hubClient";
import {
  UsersResponse,
  ProjectsResponse,
  SkillsResponse,
  QueryParams,
} from "@/types/hub";
import { toast } from "react-hot-toast"; // Optional: for user feedback

// Query Keys
export const hubQueryKeys = {
  all: ["hub"] as const,
  users: () => [...hubQueryKeys.all, "users"] as const,
  user: (id: string) => [...hubQueryKeys.users(), id] as const,
  usersList: (params: QueryParams) =>
    [...hubQueryKeys.users(), "list", params] as const,

  projects: () => [...hubQueryKeys.all, "projects"] as const,
  project: (id: string) => [...hubQueryKeys.projects(), id] as const,
  projectsList: (params: QueryParams) =>
    [...hubQueryKeys.projects(), "list", params] as const,

  skills: () => [...hubQueryKeys.all, "skills"] as const,
  skill: (id: string) => [...hubQueryKeys.skills(), id] as const,
  skillsList: (params: QueryParams) =>
    [...hubQueryKeys.skills(), "list", params] as const,

  connection: () => [...hubQueryKeys.all, "connection"] as const,
};

// ===== USERS HOOKS =====

// Get users list
export const useHubUsers = (
  params: QueryParams = {},
  options: Omit<UseQueryOptions<UsersResponse>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: hubQueryKeys.usersList(params),
    queryFn: () => hubApiClient.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Get single user
export const useHubUser = (
  userId: string,
  options: Omit<UseQueryOptions<{ user: any }>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: hubQueryKeys.user(userId),
    queryFn: () => hubApiClient.getUserById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create user mutation
export const useCreateUser = (
  options: UseMutationOptions<{ user: any }, Error, CreateUserData> = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserData) => hubApiClient.createUser(userData),
    onSuccess: (data) => {
      // Invalidate users list queries
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.users() });
      toast.success("User created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
    ...options,
  });
};

// Update user mutation
export const useUpdateUser = (
  options: UseMutationOptions<
    { user: any },
    Error,
    { userId: string; userData: UpdateUserData }
  > = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      userData,
    }: {
      userId: string;
      userData: UpdateUserData;
    }) => hubApiClient.updateUser(userId, userData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.users() });
      queryClient.invalidateQueries({
        queryKey: hubQueryKeys.user(variables.userId),
      });
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
    ...options,
  });
};

// Delete user mutation
export const useDeleteUser = (
  options: UseMutationOptions<{ message: string }, Error, string> = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => hubApiClient.deleteUser(userId),
    onSuccess: (data, userId) => {
      // Remove user from cache and invalidate lists
      queryClient.removeQueries({ queryKey: hubQueryKeys.user(userId) });
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.users() });
      toast.success("User deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    },
    ...options,
  });
};

// ===== PROJECTS HOOKS =====

// Get projects list
export const useHubProjects = (
  params: QueryParams = {},
  options: Omit<UseQueryOptions<ProjectsResponse>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: hubQueryKeys.projectsList(params),
    queryFn: () => hubApiClient.getProjects(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Get single project
export const useHubProject = (
  projectId: string,
  options: Omit<UseQueryOptions<{ project: any }>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: hubQueryKeys.project(projectId),
    queryFn: () => hubApiClient.getProjectById(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create project mutation
export const useCreateProject = (
  options: UseMutationOptions<{ project: any }, Error, CreateProjectData> = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectData: CreateProjectData) =>
      hubApiClient.createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.projects() });
      toast.success("Project created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
    ...options,
  });
};

// Update project mutation
export const useUpdateProject = (
  options: UseMutationOptions<
    { project: any },
    Error,
    { projectId: string; projectData: UpdateProjectData }
  > = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      projectData,
    }: {
      projectId: string;
      projectData: UpdateProjectData;
    }) => hubApiClient.updateProject(projectId, projectData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.projects() });
      queryClient.invalidateQueries({
        queryKey: hubQueryKeys.project(variables.projectId),
      });
      toast.success("Project updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update project: ${error.message}`);
    },
    ...options,
  });
};

// Delete project mutation
export const useDeleteProject = (
  options: UseMutationOptions<{ message: string }, Error, string> = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => hubApiClient.deleteProject(projectId),
    onSuccess: (data, projectId) => {
      queryClient.removeQueries({ queryKey: hubQueryKeys.project(projectId) });
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.projects() });
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
    ...options,
  });
};

// ===== SKILLS HOOKS =====

// Get skills list
export const useHubSkills = (
  params: QueryParams = {},
  options: Omit<UseQueryOptions<SkillsResponse>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: hubQueryKeys.skillsList(params),
    queryFn: () => hubApiClient.getSkills(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Get single skill
export const useHubSkill = (
  skillId: string,
  options: Omit<UseQueryOptions<{ skill: any }>, "queryKey" | "queryFn"> = {}
) => {
  return useQuery({
    queryKey: hubQueryKeys.skill(skillId),
    queryFn: () => hubApiClient.getSkillById(skillId),
    enabled: !!skillId,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// Create skill mutation
export const useCreateSkill = (
  options: UseMutationOptions<{ skill: any }, Error, CreateSkillData> = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillData: CreateSkillData) =>
      hubApiClient.createSkill(skillData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.skills() });
      toast.success("Skill created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create skill: ${error.message}`);
    },
    ...options,
  });
};

// Update skill mutation
export const useUpdateSkill = (
  options: UseMutationOptions<
    { skill: any },
    Error,
    { skillId: string; skillData: UpdateSkillData }
  > = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      skillId,
      skillData,
    }: {
      skillId: string;
      skillData: UpdateSkillData;
    }) => hubApiClient.updateSkill(skillId, skillData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.skills() });
      queryClient.invalidateQueries({
        queryKey: hubQueryKeys.skill(variables.skillId),
      });
      toast.success("Skill updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update skill: ${error.message}`);
    },
    ...options,
  });
};

// Delete skill mutation
export const useDeleteSkill = (
  options: UseMutationOptions<{ message: string }, Error, string> = {}
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillId: string) => hubApiClient.deleteSkill(skillId),
    onSuccess: (data, skillId) => {
      queryClient.removeQueries({ queryKey: hubQueryKeys.skill(skillId) });
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.skills() });
      toast.success("Skill deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete skill: ${error.message}`);
    },
    ...options,
  });
};

// ===== UTILITY HOOKS =====

// Connection status hook
export const useHubConnection = () => {
  return useQuery({
    queryKey: hubQueryKeys.connection(),
    queryFn: () => hubApiClient.testConnection(),
    refetchInterval: 30000, // Check every 30 seconds
    refetchOnWindowFocus: true,
    retry: 3,
    staleTime: 0, // Always fresh
  });
};

// Health check hook
export const useHubHealth = () => {
  return useQuery({
    queryKey: [...hubQueryKeys.all, "health"],
    queryFn: () => hubApiClient.healthCheck(),
    refetchInterval: 60000, // Check every minute
    retry: 2,
  });
};

// Custom hook for bulk operations
export const useBulkOperations = () => {
  const queryClient = useQueryClient();

  const bulkDeleteUsers = useMutation({
    mutationFn: async (userIds: string[]) => {
      const promises = userIds.map((id) => hubApiClient.deleteUser(id));
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.users() });
      toast.success("Users deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Bulk delete failed: ${error.message}`);
    },
  });

  const bulkDeleteProjects = useMutation({
    mutationFn: async (projectIds: string[]) => {
      const promises = projectIds.map((id) => hubApiClient.deleteProject(id));
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.projects() });
      toast.success("Projects deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Bulk delete failed: ${error.message}`);
    },
  });

  const bulkDeleteSkills = useMutation({
    mutationFn: async (skillIds: string[]) => {
      const promises = skillIds.map((id) => hubApiClient.deleteSkill(id));
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hubQueryKeys.skills() });
      toast.success("Skills deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Bulk delete failed: ${error.message}`);
    },
  });

  return {
    bulkDeleteUsers,
    bulkDeleteProjects,
    bulkDeleteSkills,
  };
};




// // Export query keys for use in other components
// export { hubQueryKeys };
