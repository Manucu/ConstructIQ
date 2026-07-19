import { Check } from "lucide-react";
import type { ProjectGeneratorStep } from "@/features/projects/hook/useProjectGeneration";

type Step = { number: ProjectGeneratorStep; label: string };
const steps: Step[] = [
  { number: 1, label: "Template" },
  { number: 2, label: "Details" },
  { number: 3, label: "Summary" },
  { number: 4, label: "Generate" },
];

export function ProjectGeneratorStepHeader({ currentStep }: { currentStep: ProjectGeneratorStep }) {
  return (
    <ol aria-label="Project generation progress" className="grid grid-cols-4 gap-2">
      {steps.map(step => {
        const isComplete = step.number < currentStep;
        const isCurrent = step.number === currentStep;
        return (
          <li key={step.number} className="min-w-0">
            <div className="flex items-center gap-2">
              <div className={["flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold", isComplete || isCurrent ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-500"].join(" ")}>
                {isComplete ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <span className={["truncate text-sm font-medium", isCurrent ? "text-slate-950" : "text-slate-500"].join(" ")}>{step.label}</span>
            </div>
            <div className={["mt-2 h-1 rounded-full", isComplete || isCurrent ? "bg-blue-700" : "bg-slate-100"].join(" ")} />
          </li>
        );
      })}
    </ol>
  );
}
