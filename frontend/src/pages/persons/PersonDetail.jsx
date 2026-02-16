import React from "react";
import { useState } from "react";

const Persons = () => {
  const [search, setSearch] = useState("");

  const persons = [
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit@company.com",
      phone: "9876543210",
      organization: "TechNova",
      status: "Active",
    },
    {
      id: 2,
      name: "Riya Verma",
      email: "riya@startup.io",
      phone: "9123456780",
      organization: "StartUp Hub",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Karan Singh",
      email: "karan@biz.com",
      phone: "9001122334",
      organization: "BizCorp",
      status: "Active",
    },
  ];

  const filteredPersons = persons.filter((p) =>
    `${p.name} ${p.email} ${p.organization}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Persons</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search person..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Organization</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredPersons.length > 0 ? (
            filteredPersons.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.phone}</td>
                <td>{p.organization}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      color: "#fff",
                      backgroundColor:
                        p.status === "Active" ? "#28a745" : "#dc3545",
                    }}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const searchStyle = {
  marginBottom: "15px",
  padding: "8px 12px",
  width: "300px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

export default Persons;