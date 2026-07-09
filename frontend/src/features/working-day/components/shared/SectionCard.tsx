import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SectionCardProps = {
  title: string;
  icon?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function SectionCard({
  title,
  icon,
  actions,
  children,
}: SectionCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>

        {actions}
      </CardHeader>

      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}