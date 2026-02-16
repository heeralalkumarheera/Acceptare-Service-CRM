import React from "react";
 const DataTable = ({ columns, data, onRowClick }) => {
  return (
    <div style={wrapper}>
      <table style={table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={th}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              style={tr}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {Object.values(row).map((value, i) => (
                <td key={i} style={td}>
                  {typeof value === "string" && value.includes("Active") ? (
                    <span style={active}>{value}</span>
                  ) : typeof value === "string" && value.includes("Lost") ? (
                    <span style={lost}>{value}</span>
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const wrapper = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px #e5e7eb",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  textAlign: "left",
  padding: "12px",
  background: "#f3f4f6",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};

const tr = {
  cursor: "pointer",
};

const active = {
  background: "#dcfce7",
  color: "#166534",
  padding: "4px 8px",
  borderRadius: "6px",
};

const lost = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "4px 8px",
  borderRadius: "6px",
};

export default DataTable;