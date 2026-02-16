import React, { useState } from "react";

const AddProposal = () => {
  const [form, setForm] = useState({
    subject: "",
    deal: "",
    value: "",
    status: "Draft",
  });

  return (
    <div>
      <h2>Create New Proposal</h2>

      <form style={{ maxWidth: "400px", marginTop: "20px" }}>
        <input
          placeholder="Proposal Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />

        <input
          placeholder="Deal Name"
          value={form.deal}
          onChange={(e) => setForm({ ...form, deal: e.target.value })}
        />

        <input
          placeholder="Deal Value"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Draft</option>
          <option>Sent</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>

        <button type="submit" style={{ marginTop: "10px" }}>
          Save Proposal
        </button>
      </form>
    </div>
  );
};

export default AddProposal;
