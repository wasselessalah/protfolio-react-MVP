// src/components/shared/AuroraBackground.tsx
export default function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      {/* Extra subtle blobs */}
      <div
        className="aurora-blob"
        style={{
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(6,182,212,0.6), transparent)",
          top: "60%", right: "40%",
          animationDuration: "18s",
          animationDelay: "-5s",
          opacity: 0.06,
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
