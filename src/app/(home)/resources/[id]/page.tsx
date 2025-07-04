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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
};

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id } = await params;
  const resources = await getResourceById(id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <ResourcesViewPage resources={resources} />
    </div>
  );
}