import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const documents = [
  {
    id: "1",
    name: "Foundation Inspection Report.pdf",
    category: "Inspection",
    uploadedBy: "Site Engineer",
    uploadedAt: "24 June 2026",
  },
  {
    id: "2",
    name: "Concrete Delivery Note.pdf",
    category: "Delivery",
    uploadedBy: "Site Engineer",
    uploadedAt: "24 June 2026",
  },
  {
    id: "3",
    name: "Structural Drawings.pdf",
    category: "Drawing",
    uploadedBy: "Owner",
    uploadedAt: "20 June 2026",
  },
  {
    id: "4",
    name: "Supplier Invoice.pdf",
    category: "Invoice",
    uploadedBy: "Accountant",
    uploadedAt: "24 June 2026",
  },
];

export default function ProjectDocuments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>📄 Project Documents</CardTitle>

        <Button size="sm">
          Upload Document
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {documents.map((document) => (
          <div
            key={document.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-medium">{document.name}</h3>

              <p className="text-sm text-muted-foreground">
                Uploaded by {document.uploadedBy} • {document.uploadedAt}
              </p>
            </div>

            <Badge variant="secondary">
              {document.category}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}