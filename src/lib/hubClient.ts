// lib/hubApiClient.ts - API client service with Axios
import {
  ProjectsResponse,
  QueryParams,
  SkillsResponse,
  UserDetails,
  UsersResponse,
} from "@/types/hub";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

class HubApiClient {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_HUB_API_URL || "http://localhost:3001";
    console.log("Hub API URL:", this.baseUrl);

    // Create axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000, // 10 seconds timeout
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Setup request interceptor to add auth headers
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth headers
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const session = await getSession();

          if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
          }

          return config;
        } catch (error) {
          console.error("Error setting auth headers:", error);
          return Promise.reject(new Error("Authentication failed"));
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        return this.handleAxiosError(error);
      }
    );
  }

  private handleAxiosError(error: AxiosError): Promise<never> {
    console.error("Hub API request failed:", error);

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message =
        (error.response.data as any)?.error || error.response.statusText;

      switch (status) {
        case 401:
          throw new Error(
            "Unauthorized - Admin access required or invalid token"
          );
        case 403:
          throw new Error("Forbidden - Insufficient permissions");
        case 404:
          throw new Error("Resource not found");
        case 429:
          throw new Error("Too many requests - Please try again later");
        case 500:
          throw new Error("Internal server error - Please try again later");
        default:
          throw new Error(`HTTP ${status}: ${message}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error(
        "Network error - Unable to connect to Hub API. Please check your connection."
      );
    } else {
      // Something else happened
      throw new Error(error.message || "Unknown error occurred");
    }
  }

  private buildQueryString(params: QueryParams): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    return searchParams.toString();
  }

  private async makeRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>({
        method,
        url: endpoint,
        data,
        ...config,
      });

      return response.data;
    } catch (error) {
      // Error handling is done in the interceptor
      throw error;
    }
  }

  // Generic GET method
  private async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>("GET", endpoint, undefined, config);
  }

  // Generic POST method
  private async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>("POST", endpoint, data, config);
  }

  // Generic PUT method
  private async put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>("PUT", endpoint, data, config);
  }

  // Generic DELETE method
  private async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.makeRequest<T>("DELETE", endpoint, undefined, config);
  }

  // Users API methods
  async getUsers(params: QueryParams = {}): Promise<UsersResponse> {
    const queryString = this.buildQueryString(params);
    const endpoint = `/api/admin/users${queryString ? `?${queryString}` : ""}`;
    return this.get<UsersResponse>(endpoint);
  }
  // New method to get user with their skills and projects
  async getUserDetails(userId: string): Promise<UserDetails> {
    return this.get<UserDetails>(`/api/admin/users/${userId}/details`);
  }
  async getUserById(userId: string): Promise<{ user: any }> {
    return this.get<{ user: any }>(`/api/admin/users/${userId}`);
  }

  async createUser(userData: any): Promise<{ user: any }> {
    return this.post<{ user: any }>("/api/admin/users", userData);
  }

  async updateUser(userId: string, userData: any): Promise<{ user: any }> {
    return this.put<{ user: any }>(`/api/admin/users/${userId}`, userData);
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/api/admin/users/${userId}`);
  }

  // Projects API methods
  async getProjects(params: QueryParams = {}): Promise<ProjectsResponse> {
    const queryString = this.buildQueryString(params);
    const endpoint = `/api/admin/projects${
      queryString ? `?${queryString}` : ""
    }`;
    return this.get<ProjectsResponse>(endpoint);
  }

  async getUserProjects(
    userId: string,
    params: QueryParams = {}
  ): Promise<ProjectsResponse> {
    const queryString = this.buildQueryString(params);
    const endpoint = `/api/admin/users/${userId}/projects${
      queryString ? `?${queryString}` : ""
    }`;
    return this.get<ProjectsResponse>(endpoint);
  }

  async getProjectById(projectId: string): Promise<{ project: any }> {
    return this.get<{ project: any }>(`/api/admin/projects/${projectId}`);
  }

  async createProject(projectData: any): Promise<{ project: any }> {
    return this.post<{ project: any }>("/api/admin/projects", projectData);
  }

  async updateProject(
    projectId: string,
    projectData: any
  ): Promise<{ project: any }> {
    return this.put<{ project: any }>(
      `/api/admin/projects/${projectId}`,
      projectData
    );
  }

  async deleteProject(projectId: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/api/admin/projects/${projectId}`);
  }

  // Skills API methods
  async getSkills(params: QueryParams = {}): Promise<SkillsResponse> {
    const queryString = this.buildQueryString(params);
    const endpoint = `/api/admin/skills${queryString ? `?${queryString}` : ""}`;
    return this.get<SkillsResponse>(endpoint);
  }

  async getSkillById(skillId: string): Promise<{ skill: any }> {
    return this.get<{ skill: any }>(`/api/admin/skills/${skillId}`);
  }
  async getUserSkills(
    userId: string,
    params: QueryParams = {}
  ): Promise<SkillsResponse> {
    const queryString = this.buildQueryString(params);
    const endpoint = `/api/admin/users/${userId}/skills${
      queryString ? `?${queryString}` : ""
    }`;
    return this.get<SkillsResponse>(endpoint);
  }
  async createSkill(skillData: any): Promise<{ skill: any }> {
    return this.post<{ skill: any }>("/api/admin/skills", skillData);
  }

  async updateSkill(skillId: string, skillData: any): Promise<{ skill: any }> {
    return this.put<{ skill: any }>(`/api/admin/skills/${skillId}`, skillData);
  }

  async deleteSkill(skillId: string): Promise<{ message: string }> {
    return this.delete<{ message: string }>(`/api/admin/skills/${skillId}`);
  }

  // Health check method
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.get<{ status: string; timestamp: string }>("/api/health");
  }

  // Test connection method
  async testConnection(): Promise<boolean> {
    try {
      await this.getUsers({ page: 1, limit: 1 });
      return true;
    } catch (error) {
      console.error("Connection test failed:", error);
      return false;
    }
  }

  // Cancel all pending requests
  cancelAllRequests() {
    // Create a new axios instance to effectively cancel all pending requests
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupInterceptors();
  }
}

// Export singleton instance
export const hubApiClient = new HubApiClient();

// Alternative: Export the class for custom instances
export { HubApiClient };

// Helper function to check if an error is from the Hub API
export function isHubApiError(error: any): error is Error {
  return error instanceof Error && error.message.includes("Hub API");
}

// Helper function to extract error message for UI display
export function getHubApiErrorMessage(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
}

// Types for the additional methods
export interface CreateUserData {
  name: string;
  email: string;
  role: string;
  institution?: string;
  phone?: string;
  avatar?: string;
  chapter?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
  institution?: string;
  status?: string;
  phone?: string;
  avatar?: string;
  chapter?: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  technologies: string[];
  userId: string;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  technologies?: string[];
}

export interface CreateSkillData {
  name: string;
  category: string;
  description?: string;
  user: string;
}

export interface UpdateSkillData {
  name?: string;
  category?: string;
  description?: string;
}
