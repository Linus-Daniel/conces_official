// components/ResourceTable.tsx
"use client";

import { FaBook, FaFilePdf, FaVideo } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Resources } from "@/types";

interface ResourceTableProps {
  resources: Resources[];
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FaFilePdf className="text-red-500 mr-2" />;
    case "video":
      return <FaVideo className="text-blue-500 mr-2" />;
    default:
      return <FaBook className="text-royal-DEFAULT mr-2" />;
  }
};

const getBadgeColor = (type: string) => {
  switch (type) {
    case "devotional":
      return "bg-royal-100 text-royal-DEFAULT";
    case "pdf":
      return "bg-red-100 text-red-800";
    case "video":
      return "bg-blue-100 text-blue-800";
    case "article":
      return "bg-green-100 text-green-800";
    case "blog":
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ResourceTable: React.FC<ResourceTableProps> = ({ resources }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Featured</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((res) => (
            <TableRow key={res._id}>
              <TableCell className="font-medium flex items-center gap-2">
                {getTypeIcon(res.type)}
                {res.title}
              </TableCell>
              <TableCell>
                <Badge className={getBadgeColor(res.type)}>{res.type}</Badge>
              </TableCell>
              <TableCell className="capitalize">{res.category}</TableCell>
              <TableCell>{res.author || "Unknown"}</TableCell>
              <TableCell>
                {new Date(res.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>{res.views}</TableCell>
              <TableCell>
                {res.featured ? (
                  <Badge className="bg-yellow-100 text-yellow-800">Yes</Badge>
                ) : (
                  <Badge variant="secondary">No</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResourceTable;
