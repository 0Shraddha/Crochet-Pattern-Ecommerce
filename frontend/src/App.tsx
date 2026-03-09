import { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
  patterns: string;
  price: number;
  image: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category")
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((error) => console.error("Error fetching category:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Items Section */}
      <h1 className="text-3xl font-bold mb-6">Items List</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20">{item.category.name}</span>
            <img
              src={`http://127.0.0.1:8000${item.image}`}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />

            <h2 className="text-lg font-semibold">{item.name}</h2>

            <p className="text-gray-500 text-sm">{item.description}</p>

            <p className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded mt-2 inline-block">
              {item.patterns}
            </p>

            <p className="text-xl font-bold mt-3">Rs {item.price}</p>
          </div>
        ))}
      </div>

      {/* Category Section */}
      <h1 className="text-3xl font-bold mt-12 mb-6">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {category.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-xl p-4 text-center hover:bg-pink-50 transition"
          >
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-gray-400 text-sm">{item.slug}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;