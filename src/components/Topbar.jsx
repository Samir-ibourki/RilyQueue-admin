export default function Topbar() {
  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 28px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 18, color: "#38bdf8" }}>
        RiLyQueue Admin
      </span>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#38bdf8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 15,
        }}
      >
        A
      </div>
    </header>
  );
}