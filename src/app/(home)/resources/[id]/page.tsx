import { notFound } from "next/navigation";
import ResourcesViewPage from "@/components/home/ViewResources";
import api from "@/lib/axiosInstance";

interface ResourcePageProps {
  params: {
    id: string;
  };
}


const getResourseById = async (id:string) => {
  try {
    const response = await api.get(`/resources/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fettching resources:', error);
    return [];
  }
};
export default async function ResourcePage({ params }: ResourcePageProps) {
  const id = params.id as string;
  const resources = await getResourseById(id)

    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <ResourcesViewPage resources={resources} />
      </div>
    );

}
