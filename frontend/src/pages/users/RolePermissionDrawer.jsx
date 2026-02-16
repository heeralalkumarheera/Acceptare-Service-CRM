import React from "react";
const permissions = {
  Leads: ["View", "Create", "Edit", "Delete"],
  Deals: ["View", "Create", "Edit"],
  Invoices: ["View", "Create"],
  Reports: ["View"],
};

export default function RolePermissionDrawer({ onClose }) {
  return (
    <div className="drawer">
      <h3>Role Permissions</h3>

      {Object.keys(permissions).map((module) => (
        <div key={module} className="permission-block">
          <strong>{module}</strong>

          {permissions[module].map((p) => (
            <label key={p}>
              <input type="checkbox" /> {p}
            </label>
          ))}
        </div>
      ))}

      <div className="modal-actions">
        <button className="secondary" onClick={onClose}>Cancel</button>
        <button className="primary">Save</button>
      </div>
    </div>
  );
}