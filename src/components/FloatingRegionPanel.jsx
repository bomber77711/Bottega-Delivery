import React from 'react';
import { regionData } from './regionData';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Star, ChevronRight } from 'lucide-react';

export default function FloatingRegionPanel({ regionId, onClose }) {
  const navigate = useNavigate();
  const data = regionData[regionId];
  if (!data) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000,
      background: "linear-gradient(to top, rgba(8,12,8,0.98), rgba(8,12,8,0.95))",
      backdropFilter: "blur(12px)",
      borderTop: "1px solid rgba(100,160,80,0.2)",
      borderRadius: "20px 20px 0 0",
      maxHeight: "55vh", overflowY: "auto",
      animation: "slideUp 0.3s ease-out",
    }}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>

      {/* Drag handle */}
      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 0" }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 12px" }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: "#6B8E23", letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace" }}>Italian Region</p>
          <h2 style={{ margin: "2px 0 0", fontSize: 24, fontWeight: 600, color: "#fff" }}>{data.name}</h2>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <span style={{ color: "#6B8E23" }}>{data.producerCount} Producers</span>
            {" \u00B7 "}
            <span>{data.experienceCount} Experiences</span>
          </p>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%",
          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
        }}>
          <X size={16} color="#fff" />
        </button>
      </div>

      {/* Description */}
      <p style={{ margin: 0, padding: "0 20px 12px", fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}>
        {data.description}
      </p>

      {/* Regional Specialties */}
      {data.featuredProducts && data.featuredProducts.length > 0 && (
        <div style={{ padding: "0 20px 12px" }}>
          <p style={{ margin: "0 0 6px", fontSize: 11, color: "#6B8E23", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>Regional Specialties</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {data.featuredProducts.map(function(fp, i) {
              return <span key={i} style={{
                padding: "4px 10px", borderRadius: 12, fontSize: 12,
                border: "1px solid rgba(100,160,80,0.3)", color: "#a0c880",
                background: "rgba(100,160,80,0.08)"
              }}>{fp}</span>;
            })}
          </div>
        </div>
      )}

      {/* Producers - horizontal scroll */}
      {data.producers && data.producers.length > 0 && (
        <div style={{ padding: "8px 0 12px" }}>
          <p style={{ margin: "0 0 8px", padding: "0 20px", fontSize: 11, color: "#6B8E23", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>Top Producers</p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 20px", scrollbarWidth: "none" }}>
            {data.producers.map(function(p, i) {
              return <div key={i} style={{
                minWidth: 180, padding: "10px 14px", borderRadius: 12,
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                flexShrink: 0
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: "#FFD700" }}>{p.rating} <Star size={10} fill="#FFD700" color="#FFD700" /></span>
                </div>
                <p style={{ margin: "3px 0 0", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                  <MapPin size={10} /> {p.city} \u00B7 {p.category}
                </p>
              </div>;
            })}
          </div>
        </div>
      )}

      {/* Experiences - horizontal scroll */}
      {data.experiences && data.experiences.length > 0 && (
        <div style={{ padding: "4px 0 16px" }}>
          <p style={{ margin: "0 0 8px", padding: "0 20px", fontSize: 11, color: "#D4883A", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>Experiences</p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 20px", scrollbarWidth: "none" }}>
            {data.experiences.map(function(e, i) {
              return <div key={i} style={{
                minWidth: 200, padding: "10px 14px", borderRadius: 12,
                background: "rgba(212,136,58,0.08)", border: "1px solid rgba(212,136,58,0.2)",
                flexShrink: 0
              }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{e.name}</span>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{e.type}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#D4883A" }}>{e.price}</span>
                </div>
              </div>;
            })}
          </div>
        </div>
      )}

      {/* View All button */}
      <div style={{ padding: "0 20px 20px" }}>
        <button onClick={function() { navigate("/regions/" + regionId); }} style={{
          width: "100%", padding: "12px", borderRadius: 12, border: "none",
          background: "#6B8E23", color: "#fff", fontSize: 14, fontWeight: 500,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
        }}>
          Explore {data.name} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
