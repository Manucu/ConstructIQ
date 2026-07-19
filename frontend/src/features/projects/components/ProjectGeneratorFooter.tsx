import { ArrowLeft } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";

type Props = { isGenerating: boolean; onBack: () => void };
export function ProjectGeneratorFooter({ isGenerating, onBack }: Props) {
  return (
    <div className="flex justify-start border-t border-slate-200 pt-4">
      <AppButton type="button" variant="outline" disabled={isGenerating} onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />Back
      </AppButton>
    </div>
  );
}
