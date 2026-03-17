import { useState } from "react";
import { Link } from "react-router-dom";

const categoryColors: CategoryColors = {
  keyrings: { bg: "#fde8ef", accent: "#f472b6", dot: "#fb7185" },
  accessories: { bg: "#e8f0fd", accent: "#818cf8", dot: "#6366f1" },
  default: { bg: "#f0fde8", accent: "#86efac", dot: "#4ade80" },
};

interface PatternModalProps {
  pattern: string;
  name: string;
  onClose: () => void;
}

function PatternModal({ pattern, name, onClose }: PatternModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(30,20,40,0.45)",
        backdropFilter: "blur(6px)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 1000, padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fffaf7", borderRadius: "20px", padding: "2rem",
          maxWidth: "420px", width: "100%", position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          border: "2px dashed #f9a8d4",
          animation: "slideUp 0.25s ease",
          fontFamily: "'Courier New', monospace",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "#fce7f3", border: "none", borderRadius: "50%",
            width: "32px", height: "32px", cursor: "pointer",
            fontSize: "16px", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#be185d",
          }}
        >✕</button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.2rem" }}>
          <span style={{ fontSize: "22px" }}>🧶</span>
          <h3 style={{ margin: 0, fontSize: "1rem", fontFamily: "'Georgia', serif", color: "#7c3aed", fontStyle: "italic" }}>
            Pattern — {name}
          </h3>
        </div>
        <pre style={{
          margin: 0, whiteSpace: "pre-wrap", lineHeight: "1.9",
          fontSize: "0.78rem", color: "#4b3060", letterSpacing: "0.01em",
        }}>
          {pattern}
        </pre>
      </div>
    </div>
  );
}

interface Category {
  id?: number;
  name: string;
  slug: string;
}

type ColorScheme = {
  bg: string;
  accent: string;
  dot: string;
};

type CategoryColors = Record<string, ColorScheme> & { default: ColorScheme };

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description?: string;
  patterns?: string;
  category: Category;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [showPattern, setShowPattern] = useState(false);
  const [added, setAdded] = useState(false);
  const slug = product.category.slug as keyof typeof categoryColors;
  const colors = categoryColors[slug] || categoryColors.default;
  const imageUrl = `http://localhost:8002${product.image}`;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };


  return (
    <>
      <Link to={`/item/${product.id}`} >
        <div
          style={{
            background: "#fffaf7",
            borderRadius: "24px",
            overflow: "hidden",
            width: "300px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            fontFamily: "'Georgia', serif",
            cursor: "pointer",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)";
          }}
        >
          {/* Image area */}
          <div style={{
            background: colors.bg,
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decorative circles */}
            <div style={{
              position: "absolute", top: "-20px", right: "-20px",
              width: "100px", height: "100px", borderRadius: "50%",
              background: colors.accent, opacity: 0.15,
            }} />
            <div style={{
              position: "absolute", bottom: "-30px", left: "-10px",
              width: "80px", height: "80px", borderRadius: "50%",
              background: colors.dot, opacity: 0.12,
            }} />
            <img
              src={imageUrl}
              alt={product.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                (target.nextSibling as HTMLElement).style.display = "flex";
              }}
              style={{ maxHeight: "160px", maxWidth: "200px", objectFit: "contain", position: "relative", zIndex: 1 }}
            />
            {/* Fallback */}
            <div style={{
              display: "none", flexDirection: "column", alignItems: "center",
              gap: "8px", position: "relative", zIndex: 1,
            }}>
              <span style={{ fontSize: "48px" }}>🧶</span>
              <span style={{ fontSize: "0.7rem", color: colors.accent, fontStyle: "italic" }}>image unavailable</span>
            </div>

            {/* Category badge */}
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              background: "white", borderRadius: "20px",
              padding: "4px 10px", fontSize: "0.65rem",
              fontFamily: "'Courier New', monospace",
              color: colors.accent, border: `1.5px solid ${colors.accent}`,
              textTransform: "uppercase", letterSpacing: "0.08em",
              fontWeight: "600", zIndex: 2,
            }}>
              {product.category.name}
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "1.2rem 1.4rem 1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
            <h2 style={{
              margin: "0 0 0.4rem", fontSize: "1rem", color: "#2d1f3d",
              fontWeight: "700", lineHeight: "1.3",
            }}>
              {product.name}
            </h2>

            <p style={{
              margin: "0 0 1rem", fontSize: "0.78rem", color: "#7c6f8e",
              lineHeight: "1.6", fontStyle: "italic",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {product.description}
            </p>

            {/* Divider */}
            <div style={{
              borderTop: "1.5px dashed #e9d8f4", margin: "0.8rem 0",
            }} />

            {/* Price + actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
              <div>
                <div style={{ fontSize: "0.6rem", color: "#b09cc0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                  Price
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "#4c1d95", letterSpacing: "-0.02em" }}>
                  {parseFloat(String(product.price)).toFixed(0)}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  onClick={() => setShowPattern(true)}
                  style={{
                    background: "transparent", border: `1.5px solid ${colors.accent}`,
                    borderRadius: "20px", padding: "6px 12px", fontSize: "0.7rem",
                    color: colors.accent, cursor: "pointer", fontFamily: "'Georgia', serif",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  🧵 Pattern
                </button>

                <button
                  onClick={handleAdd}
                  style={{
                    background: added ? "#86efac" : colors.accent,
                    border: "none", borderRadius: "20px",
                    padding: "7px 14px", fontSize: "0.72rem",
                    color: "white", cursor: "pointer",
                    fontFamily: "'Georgia', serif", fontWeight: "600",
                    transition: "all 0.25s ease",
                    transform: added ? "scale(0.96)" : "scale(1)",
                  }}
                >
                  {added ? "✓ Added" : "+ Cart"}
                </button>
              </div>
            </div>
          </div>

          {/* Thread decoration bottom */}
          <div style={{
            height: "4px",
            background: `linear-gradient(90deg, ${colors.bg}, ${colors.accent}, ${colors.dot}, ${colors.bg})`,
          }} />

        </div>
      </Link>

      {showPattern && product.patterns && (
        <PatternModal
          pattern={product.patterns}
          name={product.name}
          onClose={() => setShowPattern(false)}
        />
      )}
    </>
  );
}

export default ProductCard;