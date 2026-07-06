# ConstructIQ Database Schema

## Main Tables

### companies
Stores construction companies using the platform.

Fields:
- id
- name
- email
- phone
- address
- subscription_plan
- created_at

---

### users
Stores platform users.

Fields:
- id
- company_id
- first_name
- last_name
- email
- password_hash
- role
- created_at

Roles:
- OWNER
- PROJECT_MANAGER
- SITE_ENGINEER
- CLIENT

---

### projects
Stores construction projects.

Fields:
- id
- company_id
- name
- description
- address
- client_name
- start_date
- deadline
- total_budget
- status
- created_at

---

### stages
Stores project stages.

Fields:
- id
- project_id
- name
- planned_budget
- spent_amount
- progress
- status
- start_date
- end_date

---

### expenses
Stores project and stage expenses.

Fields:
- id
- project_id
- stage_id
- category
- description
- amount
- expense_date
- created_by

Categories:
- MATERIALS
- LABOR
- EQUIPMENT
- TRANSPORT
- OTHER

---

### diary_entries
Stores daily site reports.

Fields:
- id
- project_id
- stage_id
- date
- weather
- workers_count
- worked_hours
- activities
- observations
- created_by

---

### photos
Stores site photos.

Fields:
- id
- project_id
- stage_id
- diary_entry_id
- url
- description
- uploaded_by
- uploaded_at

---

### documents
Stores project documents.

Fields:
- id
- project_id
- name
- type
- url
- uploaded_by
- uploaded_at

---

### project_templates
Stores reusable project templates.

Fields:
- id
- name
- description
- category

---

### stage_templates
Stores default stages for each project template.

Fields:
- id
- project_template_id
- name
- description
- default_budget_percentage
- estimated_duration_days
- order_index