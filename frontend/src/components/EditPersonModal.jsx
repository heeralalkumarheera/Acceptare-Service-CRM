import React from "react";
import "./modal.css";

export default function EditPersonModal({ person, onClose, onSave }) {
  if (!person) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Person</h3>

        <input defaultValue={person.name} placeholder="Name" />
        <input defaultValue={person.email} placeholder="Email" />
        <input defaultValue={person.phone} placeholder="Phone" />

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn save" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}