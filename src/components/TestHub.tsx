"use client";
import { useSession } from "next-auth/react";
import { useHubUsers } from "@/hooks/useHubData";

export default function TestHubConnection() {
  const { data: session, status } = useSession();
  const { data: users, isLoading, error } = useHubUsers({ limit: 5 });

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Not signed in</div>;

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-2">Hub Connection Test</h3>

      <div className="mb-2">
        <strong>Session Status:</strong> {status}
      </div>

      <div className="mb-2">
        <strong>User Role:</strong> {session.user?.role}
      </div>

      <div className="mb-2">
        <strong>Has Access Token:</strong>{" "}
        {session.accessToken ? "✅ Yes" : "❌ No"}
      </div>

      <div className="mb-2">
        <strong>Hub API Status:</strong>
        {isLoading
          ? " Loading..."
          : error
          ? ` ❌ Error: ${error.message}`
          : " ✅ Connected"}
      </div>

      {users && (
        <div>
          <strong>Sample Data:</strong>
          <div className="text-sm">Found {users.pagination.total} users</div>
        </div>
      )}
    </div>
  );
}
