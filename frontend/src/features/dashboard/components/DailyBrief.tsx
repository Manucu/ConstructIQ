import { AlertTriangle, Camera, CheckCircle2, Euro, Users } from "lucide-react";
import { AppCard } from "@/components/ui";

const items = [
  {
    icon: Users,
    text: "24 workers were active on site yesterday.",
  },
  {
    icon: Camera,
    text: "18 new site photos were uploaded.",
  },
  {
    icon: CheckCircle2,
    text: "2 project stages were completed.",
  },
  {
    icon: Euro,
    text: "€3,240 expenses were registered.",
  },
  {
    icon: AlertTriangle,
    text: "Villa Project exceeded the planned budget by €450.",
    warning: true,
  },
];

export function DailyBrief() {
  return (
    <AppCard className="p-6">
      <div>
        <p className="text-sm font-medium text-blue-700">Daily Brief</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">
          Good morning, Emanuel 👋
        </h3>
        <p className="mt-2 text-slate-600">
          Here is what happened across your company yesterday.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.text}
              className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"
            >
              <Icon
                className={
                  item.warning
                    ? "h-5 w-5 text-amber-600"
                    : "h-5 w-5 text-blue-700"
                }
              />

              <p className="text-sm leading-6 text-slate-700">{item.text}</p>
            </div>
          );
        })}
      </div>
    </AppCard>
  );
}