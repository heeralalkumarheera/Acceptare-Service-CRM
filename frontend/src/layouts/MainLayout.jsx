import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      {/* Header */}
      <header style={{ padding: "10px", background: "#f5f5f5" }}>
        <h2>Acceptare CRM</h2>
      </header>

      {/* Main Content */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
