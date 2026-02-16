import React, { useState } from "react";

const AddExpense = () => {
  const [form, setForm] = useState({
    name: "",
    area: "",
    amount: "",
    date: "",
  });

  return (
    <div>
      <h2>Add Expense</h2>

      <input placeholder="Expense Name" />
      <br /><br />

      <input placeholder="Area of Expense" />
      <br /><br />

      <input placeholder="Amount" />
      <br /><br />

      <input type="date" />
      <br /><br />

      <button>Save Expense</button>
    </div>
  );
};

export default AddExpense;
