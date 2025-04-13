import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";


function Home() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { user } = useAuth();

  // Fetch university data from the backend
  useEffect(() => {
    fetch("https://project2-server-tawny.vercel.app/universities")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching universities:", err);
      });
  }, []);

  const [formState, setFormState] = useState({
    id: null,
    name: "",
    location: "",
    description: "",
    imageurl: "",
    is_public: false,
  });
  
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  const handleEdit = (item) => {
    setFormState(item);
  };
  
  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/universities/${id}`, {
      method: "DELETE",
    });
    refreshList();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formState.id ? "PUT" : "POST";
    const url = formState.id
      ? `${import.meta.env.VITE_API_URL}/universities/${formState.id}`
      : `${import.meta.env.VITE_API_URL}/universities`;
  
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
  
    setFormState({
      id: null,
      name: "",
      location: "",
      description: "",
      imageurl: "",
      is_public: false,
    });
  
    refreshList();
  };
  
  const refreshList = () => {
    fetch(`${import.meta.env.VITE_API_URL}/universities`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      });
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {user?.isAdmin && (
        <div className="mb-6 bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-4">{formState.id ? "Edit" : "Add"} University</h3>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input name="name" placeholder="Name" value={formState.name} onChange={handleFormChange} required />
            <input name="location" placeholder="Location" value={formState.location} onChange={handleFormChange} required />
            <input name="imageurl" placeholder="Image URL" value={formState.imageurl} onChange={handleFormChange} />
            <input name="description" placeholder="Description" value={formState.description} onChange={handleFormChange} />
            <label className="col-span-2 flex items-center gap-2">
              <input type="checkbox" name="is_public" checked={formState.is_public} onChange={handleFormChange} />
              Public?
            </label>
            <button type="submit" className="col-span-2 bg-indigo-600 text-white py-2 rounded">
              {formState.id ? "Update" : "Add"}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Universities of South Carolina</h2>
          <div className="space-y-7">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedItem?.id === item.id
                    ? "bg-blue-200 border-l-4 border-indigo-500 rounded-lg"
                    : "hover:bg-gray-50 border-l-4 border-transparent rounded-lg"
                }`}
                onMouseEnter={() => setSelectedItem(item)}
              >
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                {user?.isAdmin && (
                  <div className="mt-2 flex gap-3 text-sm">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          {selectedItem ? (
            <div className="space-y-4">
              <img
                src={selectedItem.imageurl || "https://via.placeholder.com/400x200?text=No+Image"}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold text-gray-800">{selectedItem.name}</h2>
              <p className="text-gray-600 leading-relaxed">
                {selectedItem.description || "No description available."}
              </p>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Hover over a university to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
