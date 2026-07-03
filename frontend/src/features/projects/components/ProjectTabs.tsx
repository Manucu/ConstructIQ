import { AppTabs } from "@/components/ui";

type ProjectTabsProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
};

const projectTabs = [
  { label: "Overview", value: "overview" },
  { label: "Stages", value: "stages" },
  { label: "Budget", value: "budget" },
  { label: "Site Diary", value: "diary" },
  { label: "Photos", value: "photos" },
  { label: "Documents", value: "documents" },
];

export function ProjectTabs({
  activeTab,
  onTabChange,
}: ProjectTabsProps) {
  return (
    <AppTabs
      tabs={projectTabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
    />
  );
}