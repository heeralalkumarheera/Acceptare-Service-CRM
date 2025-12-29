# UI Architecture & Standards

**Project:** Acceptare-Service-CRM  
**Layer:** Frontend  
**Maintained By:** Frontend Lead  

---

## Folder Structure

src/
├── assets/ # images, icons
├── components/ # reusable UI
│ └── common/
├── layouts/ # page layouts
├── pages/ # feature pages
├── routes/ # route definitions
├── services/ # API services
├── utils/ # helpers
└── styles/ # global styles


---

## Common Components

- Button
- Input
- Select
- Modal
- Table
- Loader
- Pagination
- Notification / Toast

---

## Naming Conventions

- Components: `PascalCase`
- Files & folders: `camelCase`
- CSS classes: `kebab-case`

---

## UI Standards

- Mobile-first responsive design
- No hard-coded values
- Reusable components only in `components/common`
- Layout-driven page structure
