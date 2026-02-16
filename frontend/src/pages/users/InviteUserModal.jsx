import React from "react";
export default function InviteUserModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Invite User</h3>

        <label>Email</label>
        <input placeholder="user@email.com" />

        <label>Assign Role</label>
        <select>
          <option>App Admin</option>
          <option>Manager</option>
          <option>Agent</option>
        </select>

        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>Cancel</button>
          <button className="primary">Send Invite</button>
        </div>
      </div>
    </div>
  );
}