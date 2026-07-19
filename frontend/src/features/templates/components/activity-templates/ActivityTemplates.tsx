import { ClipboardList, Settings2 } from "lucide-react";
import { useState } from "react";
import { AppButton } from "@/components/ui";
import ActivityTemplateFormDialog from "./ActivityTemplateFormDialog";
import ActivityTemplateResourcesDialog from "./ActivityTemplateResourcesDialog";
import TemplateActions from "@/features/templates/components/shared/TemplateActions";
import TemplateEmptyState from "@/features/templates/components/shared/TemplateEmptyState";
import TemplateListFooter from "@/features/templates/components/shared/TemplateListFooter";
import TemplateSearchBar from "@/features/templates/components/shared/TemplateSearchBar";
import TemplateSectionHeader from "@/features/templates/components/shared/TemplateSectionHeader";
import TemplateStatusButton from "@/features/templates/components/shared/TemplateStatusButton";
import TemplateTableShell from "@/features/templates/components/shared/TemplateTableShell";
import { formatUsage } from "@/features/templates/components/shared/templateFormatters";
import type { ActivityTemplate } from "@/features/templates/data/activityTemplates";
import { useActivityTemplates } from "@/features/templates/hooks/useActivityTemplates";

export default function ActivityTemplates(){
 const h=useActivityTemplates(); const [resources,setResources]=useState<ActivityTemplate|null>(null);
 const activeCount=h.activityTemplates.filter(x=>x.status==="ACTIVE").length;
 function del(t:ActivityTemplate){const u=h.getActivityTemplateUsageCount(t.id);if(u>0){alert(`This activity template is used by ${u} project template activities.`);return}if(confirm(`Delete "${t.name}" and its resources?`))h.deleteActivityTemplate(t.id)}
 return <><section className="space-y-6"><TemplateSectionHeader icon={ClipboardList} iconClassName="bg-cyan-50 text-cyan-700" title="Activity Templates" description="Create reusable activities with suggested resources and estimated costs." addLabel="Add Activity Template" onAdd={h.openAddActivityTemplateDialog}/><div className="rounded-2xl border border-slate-200 bg-white shadow-sm"><TemplateSearchBar value={h.searchValue} placeholder="Search activity templates..." onChange={h.setSearchValue}/>{h.filteredActivityTemplates.length===0?<TemplateEmptyState icon={ClipboardList} isCollectionEmpty={h.activityTemplates.length===0} emptyTitle="No activity templates yet" noResultsTitle="No matching activity templates" emptyDescription="Create reusable activities and attach estimated resources." noResultsDescription="Try another search term." addLabel="Add Activity Template" onAdd={h.openAddActivityTemplateDialog}/>:<TemplateTableShell headers={["Activity","Category","Resources","Status","Usage","Actions"]}>{h.filteredActivityTemplates.map(t=>{const u=h.getActivityTemplateUsageCount(t.id);return <tr key={t.id} className="hover:bg-slate-50"><td className="px-6 py-4"><p className="font-medium">{t.name}</p><p className="mt-1 max-w-sm truncate text-sm text-slate-500">{t.description??"No description"}</p></td><td className="px-6 py-4 text-sm">{t.category}</td><td className="px-6 py-4"><AppButton variant="outline" onClick={()=>setResources(t)}><Settings2 className="mr-2 h-4 w-4"/>{h.getActivityTemplateResourceCount(t.id)} resources</AppButton></td><td className="px-6 py-4"><TemplateStatusButton status={t.status} onToggle={()=>h.toggleActivityTemplateStatus(t.id)}/></td><td className="px-6 py-4 text-sm">{formatUsage(u)}</td><td className="px-6 py-4 text-right"><TemplateActions entityLabel="activity template" usageCount={u} onEdit={()=>h.openEditActivityTemplateDialog(t)} onDelete={()=>del(t)}/></td></tr>})}</TemplateTableShell>}<TemplateListFooter visibleCount={h.filteredActivityTemplates.length} totalCount={h.activityTemplates.length} activeCount={activeCount} entityLabel="activity templates"/></div></section>{h.isActivityTemplateDialogOpen&&<ActivityTemplateFormDialog key={h.editingActivityTemplate?.id??"new"} open editingActivityTemplate={h.editingActivityTemplate} onClose={h.closeActivityTemplateDialog} onSave={h.saveActivityTemplate} isNameAvailable={h.isActivityTemplateNameAvailable}/>} {resources&&<ActivityTemplateResourcesDialog open activityTemplate={resources} onClose={()=>setResources(null)}/>}</>
}
