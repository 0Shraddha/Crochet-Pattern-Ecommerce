import ProductCard from '../components/ProductCard';
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

function ProductList(){

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8002/api';

    useEffect(() => {
        fetch('http://localhost:8002/api/items/')
        .then((response)=>{
            if(!response.ok){
                throw new Error("Failed to fetch products!");
            }
            return response.json();
        })
        .then((data)=>{
            setProducts(data);
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        })
    },[])

    if(loading){
        return <div>Loading....</div>
    }

    if(error){
        return <div>Error: {error}</div>
    }

    return(
         <>
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 20% 50%, #fce7f3 0%, #faf5ff 40%, #ede9fe 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        gap: "1rem",
      }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={{
            fontFamily: "'Courier New', monospace", fontSize: "0.7rem",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#a78bfa", margin: "0 0 6px",
          }}>
            handmade with love 🧶
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem", color: "#3b0764", margin: 0,
            fontWeight: "700",
          }}>
            Our Collection
          </h1>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
    )
}

export default ProductList;
