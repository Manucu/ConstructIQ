import { useState } from "react";
import { TemplateDialog, TemplateSelectField, TemplateStatusField, TemplateTextField, TemplateTextareaField } from "@/features/templates/components/shared/forms";
import type { ActivityCategory, ActivityTemplate, ActivityTemplateStatus } from "@/features/templates/data/activityTemplates";
import type { SaveActivityTemplateValues } from "@/features/templates/hooks/useActivityTemplates";

type Props = { open: boolean; editingActivityTemplate: ActivityTemplate | null; onClose: () => void; onSave: (values: SaveActivityTemplateValues) => boolean; isNameAvailable: (name: string, ignoredId?: string) => boolean };
const categories: ActivityCategory[] = ["Planning","Site Preparation","Foundation","Structure","Masonry","Roof","Installations","Finishing","External Works"];
const options = categories.map(value => ({ value, label: value }));

export default function ActivityTemplateFormDialog({ open, editingActivityTemplate, onClose, onSave, isNameAvailable }: Props) {
  const [name,setName]=useState(editingActivityTemplate?.name ?? "");
  const [category,setCategory]=useState<ActivityCategory>(editingActivityTemplate?.category ?? "Planning");
  const [status,setStatus]=useState<ActivityTemplateStatus>(editingActivityTemplate?.status ?? "ACTIVE");
  const [description,setDescription]=useState(editingActivityTemplate?.description ?? "");
  const [error,setError]=useState<string|null>(null);
  const available = name.trim() !== "" && isNameAvailable(name, editingActivityTemplate?.id);
  const valid = name.trim() !== "" && available;
  function save(){ if(!valid)return; if(!onSave({name,category,status,description})) setError("An activity template with this name already exists."); }
  return <TemplateDialog open={open} title={editingActivityTemplate ? "Edit Activity Template" : "Add Activity Template"} description="Create a reusable construction activity." saveLabel={editingActivityTemplate ? "Save Changes" : "Add Activity Template"} isValid={valid} error={error} onClose={onClose} onSave={save}>
    <TemplateTextField label="Activity Name" value={name} autoFocus placeholder="Example: Concrete Pouring" error={name.trim() && !available ? "This activity name is already in use." : null} onChange={value=>{setName(value);setError(null)}} />
    <TemplateSelectField label="Category" value={category} options={options} onChange={setCategory} />
    <TemplateStatusField value={status} onChange={setStatus} />
    <TemplateTextareaField label="Description" value={description} placeholder="Describe the work covered by this activity." onChange={setDescription} />
  </TemplateDialog>;
}
