import { NextRequest } from "next/server";

export async function validateAdminToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid authorization header");
  }

  const token = authHeader.substring(7);

  try {
    // Decode the base64 token
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());

    // Basic validation
    if (!decoded.userId || !decoded.role || !decoded.timestamp) {
      throw new Error("Invalid token structure");
    }

    // Check if user has admin role
    if (decoded.role !== "admin") {
      throw new Error("Insufficient permissions - Admin role required");
    }

    // Check token age (optional - 24 hours max)
    const tokenAge = Date.now() - decoded.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    if (tokenAge > maxAge) {
      throw new Error("Token expired");
    }

    return decoded;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Invalid token format");
  }
}
