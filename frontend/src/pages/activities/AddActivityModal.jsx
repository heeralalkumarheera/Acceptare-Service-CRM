import React, { useState } from "react";

const AddActivityModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    type: "Meeting",
    title: "",
    relatedTo: "",
    start: "",
    end: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Add Activity</h3>

        <select name="type" onChange={handleChange}>
          <option>Meeting</option>
          <option>Call</option>
          <option>Email</option>
        </select>

        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="relatedTo" placeholder="Related To" onChange={handleChange} />
        <input type="datetime-local" name="start" onChange={handleChange} />
        <input type="datetime-local" name="end" onChange={handleChange} />

        <div className="modal-actions">
          <button onClick={submit}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
