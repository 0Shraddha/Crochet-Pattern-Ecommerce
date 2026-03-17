import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface Category {
  id?: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description?: string;
  patterns?: string;
  category: Category;
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f2fb",
    fontFamily: "'Georgia', serif",
    padding: "0 0 5rem",
  } as React.CSSProperties,

  topBar: {
    padding: "1.4rem 2.5rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderBottom: "1px solid #e8daf0",
    background: "rgba(247,242,251,0.85)",
    backdropFilter: "blur(8px)",
    position: "sticky" as const,
    top: 0,
    zIndex: 10,
  },

  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#9b78bb",
    textDecoration: "none",
    fontFamily: "'Georgia', serif",
    transition: "color 0.2s",
  },

  breadcrumbSep: {
    color: "#c9b8d8",
    fontSize: "12px",
  },

  breadcrumbCurrent: {
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#7c5f96",
  },

  container: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "3rem 2rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "start",
  },

  imageCol: {
    position: "relative" as const,
  },

  imageFrame: {
    borderRadius: "40px 8px 40px 8px",
    overflow: "hidden",
    aspectRatio: "3/4",
    background: "linear-gradient(135deg, #e8daf0 0%, #d5c4e8 50%, #c9b8e0 100%)",
    position: "relative" as const,
    boxShadow: "0 24px 64px rgba(92,61,122,0.18), 0 2px 8px rgba(92,61,122,0.08)",
  },

  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block",
    mixBlendMode: "multiply" as const,
    opacity: 0.92,
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as const,
    gap: "12px",
    color: "#b08dc9",
    fontSize: "14px",
    letterSpacing: "0.06em",
  },

  floatTag: {
    position: "absolute" as const,
    bottom: "-14px",
    left: "28px",
    background: "#7c5f96",
    color: "#f5eeff",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    padding: "8px 22px",
    borderRadius: "30px",
    fontFamily: "'Georgia', serif",
  },

  infoCol: {
    paddingTop: "0.5rem",
  },

  categoryPill: {
    display: "inline-block",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#9b78bb",
    background: "#ede3f5",
    padding: "5px 16px",
    borderRadius: "20px",
    marginBottom: "1.2rem",
    fontFamily: "'Georgia', serif",
  },

  productTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "2.1rem",
    fontWeight: 400,
    lineHeight: 1.2,
    color: "#2e2040",
    marginBottom: "1rem",
    fontStyle: "italic",
  },

  divider: {
    border: "none",
    borderTop: "1px solid #e2d4ed",
    margin: "1.6rem 0",
  },

  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    marginBottom: "1.8rem",
  },

  priceLabel: {
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#b08dc9",
  },

  price: {
    fontFamily: "'Georgia', serif",
    fontSize: "2.4rem",
    fontWeight: 400,
    color: "#5a3d7a",
    fontStyle: "italic",
  },

  description: {
    fontSize: "14.5px",
    lineHeight: 1.85,
    color: "#6b5778",
    marginBottom: "1.6rem",
    fontFamily: "'Georgia', serif",
  },

  ctaGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "2rem",
  },

  btnPrimary: {
    flex: 1,
    padding: "14px 24px",
    background: "#7c5f96",
    color: "#f5eeff",
    border: "none",
    borderRadius: "14px",
    fontFamily: "'Georgia', serif",
    fontSize: "14px",
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
  } as React.CSSProperties,

  btnSecondary: {
    padding: "14px 20px",
    background: "transparent",
    color: "#7c5f96",
    border: "1.5px solid #c9aee0",
    borderRadius: "14px",
    fontFamily: "'Georgia', serif",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background 0.2s",
    lineHeight: 1,
  } as React.CSSProperties,

  metaPills: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
  },

  metaPill: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#7a6585",
    background: "#f0e8f8",
    borderRadius: "20px",
    padding: "6px 14px",
  },

  metaDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#b08dc9",
    flexShrink: 0,
  },

  patternSection: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "0 2rem",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "1.6rem",
  },

  sectionLine: {
    flex: 1,
    height: "1px",
    background: "#e2d4ed",
  },

  sectionTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.05rem",
    fontStyle: "italic",
    color: "#5a3d7a",
    whiteSpace: "nowrap" as const,
  },

  patternCard: {
    background: "#fff8fe",
    border: "1.5px solid #e2d4ed",
    borderRadius: "20px",
    padding: "2rem 2.5rem",
    position: "relative" as const,
    overflow: "hidden",
  },

  patternRow: {
    display: "grid",
    gridTemplateColumns: "90px 1fr",
    gap: "1rem",
    padding: "1.1rem 0",
    borderBottom: "1px dashed #e8daf0",
    alignItems: "start",
  },

  patternRowLast: {
    display: "grid",
    gridTemplateColumns: "90px 1fr",
    gap: "1rem",
    padding: "1.1rem 0",
    alignItems: "start",
  },

  rowLabel: {
    fontFamily: "'Georgia', serif",
    fontSize: "13px",
    fontStyle: "italic",
    color: "#b08dc9",
    fontWeight: 500,
    paddingTop: "2px",
  },

  rowText: {
    fontSize: "13.5px",
    lineHeight: 1.85,
    color: "#5c4a6b",
    fontFamily: "'Georgia', serif",
  },

  stitchBadge: {
    display: "inline-block",
    background: "#ede3f5",
    color: "#7c5f96",
    fontSize: "11px",
    fontWeight: 500,
    padding: "2px 9px",
    borderRadius: "10px",
    margin: "0 2px",
    fontFamily: "monospace",
    letterSpacing: "0.02em",
  },

  loadingWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7f2fb",
    flexDirection: "column" as const,
    gap: "16px",
  },

  loadingText: {
    fontFamily: "'Georgia', serif",
    fontStyle: "italic",
    color: "#9b78bb",
    fontSize: "16px",
    letterSpacing: "0.06em",
  },

  errorWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7f2fb",
    flexDirection: "column" as const,
    gap: "16px",
  },

  errorText: {
    fontFamily: "'Georgia', serif",
    color: "#b85c7a",
    fontSize: "15px",
  },
};

function parsePatternRows(patterns: string) {
  const lines = patterns.split(/\r?\n/).filter((l) => l.trim());
  const rows: { label: string; text: string }[] = [];
  let currentSection = "";
  let currentLabel = "";
  let currentText: string[] = [];

  lines.forEach((line) => {
    // Check for section headers (word or words followed by colon)
    const sectionMatch = line.match(/^([A-Za-z\s]+):$/);
    if (sectionMatch) {
      // Save previous row if exists
      if (currentLabel) {
        rows.push({ label: currentLabel, text: currentText.join(" ") });
      }
      currentSection = sectionMatch[1].trim();
      currentLabel = "";
      currentText = [];
      return;
    }

    // Check for row markers (R1, R2, Row 1, Row 2, etc.)
    const rowMatch = line.match(/^(R(?:ow)?\s*\d+)\s*[-:]?\s*(.*)/i);
    if (rowMatch) {
      // Save previous row if exists
      if (currentLabel) {
        rows.push({ label: currentLabel, text: currentText.join(" ") });
      }
      let label = rowMatch[1].trim();
      if (currentSection) {
        label = `${currentSection} — ${label}`;
      }
      currentLabel = label;
      currentText = [rowMatch[2]];
    } else if (currentLabel || !sectionMatch) {
      // Continuation line or standalone text
      if (currentLabel) {
        currentText.push(line.trim());
      }
    }
  });
  
  // Save last row if exists
  if (currentLabel) {
    rows.push({ label: currentLabel, text: currentText.join(" ") });
  }
  
  return rows;
}

function stitchify(text: string, stitchBadge: React.CSSProperties) {
  const keywords = /(\d+\s*(?:sc|dc|ch|slst|chain|double crochet|slip stitch|stich|stitch|stitches?|turn|skip|repeat|times?))/gi;
  const parts = text.split(keywords);
  return parts.map((part, i) =>
    keywords.test(part) ? (
      <span key={i} style={stitchBadge}>{part.trim()}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAddToCart = async (productId: number) => {
    try {
      const response = await fetch('http://localhost:8002/api/cart/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const data = await response.json();
      console.log('Added to cart:', data);
      alert('Item added to cart!');
      
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart');
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8002/api/items/${id}/`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch product!");
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={styles.loadingWrap}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="#c9aee0" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="20" stroke="#7c5f96" strokeWidth="1.5"
            strokeDasharray="30 96" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate"
              from="0 24 24" to="360 24 24" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <p style={styles.loadingText}>Gathering threads…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorWrap}>
        <p style={styles.errorText}>✦ {error}</p>
        <Link to="/" style={{ ...styles.backLink, fontSize: "13px" }}>← Return to shop</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.errorWrap}>
        <p style={styles.errorText}>✦ Pattern not found</p>
        <Link to="/" style={{ ...styles.backLink, fontSize: "13px" }}>← Return to shop</Link>
      </div>
    );
  }

  const patternRows = product.patterns ? parsePatternRows(product.patterns) : [];

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <nav style={styles.topBar}>
        <Link
          to="/"
          style={styles.backLink}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#5a3d7a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9b78bb")}
        >
          ← Back
        </Link>
        <span style={styles.breadcrumbSep}>›</span>
        <span style={styles.breadcrumbSep}>{product.category.name}</span>
        <span style={styles.breadcrumbSep}>›</span>
        <span style={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* Product grid */}
      <div style={styles.container}>
        {/* Image */}
        <div style={styles.imageCol}>
          <div style={styles.imageFrame}>
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                style={styles.productImage}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={styles.imagePlaceholder}>
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <ellipse cx="26" cy="26" rx="20" ry="18" stroke="#c9aee0" strokeWidth="1.2" />
                  <ellipse cx="26" cy="26" rx="20" ry="7" stroke="#c9aee0" strokeWidth="1" strokeDasharray="5 3" />
                  <path d="M26 8 Q38 18 26 44" stroke="#c9aee0" strokeWidth="1" fill="none" />
                </svg>
                <span style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#b08dc9" }}>No image</span>
              </div>
            )}
          </div>
          <div style={styles.floatTag}>Handcrafted</div>
        </div>

        {/* Info */}
        <div style={styles.infoCol}>
          <span style={styles.categoryPill}>{product.category.name}</span>

          <h1 style={styles.productTitle}>{product.name}</h1>

          <hr style={styles.divider} />

          <div style={styles.priceRow}>
            <span style={styles.priceLabel}>Price</span>
            <span style={styles.price}>Rs. {product.price}</span>
          </div>

          {product.description && (
            <p style={styles.description}>{product.description}</p>
          )}

          <div style={styles.ctaGroup}>
            <button
              style={styles.btnPrimary}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#6a4f82";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#7c5f96";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
            <button
              style={{
                ...styles.btnSecondary,
                color: saved ? "#b05c7a" : "#7c5f96",
                borderColor: saved ? "#e0aec9" : "#c9aee0",
              }}
              onClick={() => setSaved(!saved)}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#f0e8fa")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
              }
            >
              {saved ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>

      {/* Pattern instructions */}
      {patternRows.length > 0 && (
        <div style={styles.patternSection}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionLine} />
            <span style={styles.sectionTitle}>✦ Crochet Pattern Instructions</span>
            <div style={styles.sectionLine} />
          </div>

          <div style={styles.patternCard}>
            {/* decorative flourish */}
            <span
              style={{
                position: "absolute",
                top: "16px",
                right: "22px",
                fontSize: "28px",
                color: "#dcc9ec",
                opacity: 0.55,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              ❧
            </span>

            {patternRows.map((row, i) => (
              <div
                key={i}
                style={i < patternRows.length - 1 ? styles.patternRow : styles.patternRowLast}
              >
                <div style={styles.rowLabel}>{row.label}</div>
                <div style={styles.rowText}>
                  {stitchify(row.text, styles.stitchBadge)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;