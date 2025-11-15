import { notFound } from "next/navigation";
import ResourcesViewPage from "@/components/home/ViewResources";
import api from "@/lib/axiosInstance";

interface ResourcePageProps {
  params: Promise<{
    id: string;
  }>;
}

const getResourceById = async (id: string) => {
  try {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resource:', error instanceof Error ? error.message : "Unknown error");
    return null;
  }
};

export default async function Resource({ params }: ResourcePageProps) {
  const { id } = await params;
  const resources = await getResourceById(id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <ResourcesViewPage resources={resources} />
    </div>
  );
}