import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("categories");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [categoryForm, setCategoryForm] = useState({ name: "", description: "", img: null });
    const [productForm, setProductForm] = useState({ title: "", description: "", price: "", category: "", img: null });

    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem("adminLoggedIn")) {
            navigate("/admin/login");
        } else {
            fetchCategories();
            fetchProducts();
            fetchUsers();
        }
    }, [navigate]);

    // ✅ Logout
    const handleLogout = () => {
        localStorage.removeItem("adminLoggedIn");
        navigate("/admin/login");
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/api/categories`);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/api/products`);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/users`);
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", categoryForm.name);
        formData.append("description", categoryForm.description);
        if (categoryForm.img) formData.append("img", categoryForm.img);

        try {
            if (editingCategoryId) {
                await axios.put(`${BASE_URL}/api/categories/${editingCategoryId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setEditingCategoryId(null);
            } else {
                await axios.post(`${BASE_URL}/api/categories`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            setCategoryForm({ name: "", description: "", img: null });
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", productForm.title);
        formData.append("description", productForm.description);
        formData.append("price", productForm.price);
        formData.append("category", productForm.category);
        if (productForm.img) formData.append("img", productForm.img);

        try {
            if (editingProductId) {
                await axios.put(`${BASE_URL}/api/products/${editingProductId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setEditingProductId(null);
            } else {
                await axios.post(`${BASE_URL}/api/products`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            setProductForm({ title: "", description: "", price: "", category: "", img: null });
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteCategory = async (id) => {
        if (!confirm("Delete this category?")) return;
        await axios.delete(`${BASE_URL}/api/categories/${id}`);
        fetchCategories();
    };

    const deleteProduct = async (id) => {
        if (!confirm("Delete this product?")) return;
        await axios.delete(`${BASE_URL}/api/products/${id}`);
        fetchProducts();
    };

    return (
        <div className="min-h-screen p-8 bg-[#FFF5E1]">
            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
            >
                Logout
            </button>

            <h1 className="text-4xl font-bold text-[#4B0000] text-center mb-8">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-8">
                {["categories", "products", "users"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded ${tab === t ? "bg-[#4B0000] text-white" : "bg-white border"}`}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {loading && <p className="text-center text-[#4B0000] mb-4">Loading...</p>}

            {/* Categories */}
            {tab === "categories" && (
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleCategorySubmit} className="flex flex-col gap-3 mb-6 bg-white p-6 rounded-xl shadow">
                        <input
                            type="text"
                            placeholder="Name"
                            value={categoryForm.name}
                            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                            className="border rounded px-3 py-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={categoryForm.description}
                            onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                            className="border rounded px-3 py-2"
                            required
                        />
                        <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded text-center">
                            Upload Image
                            <input type="file" className="hidden" onChange={(e) => setCategoryForm({ ...categoryForm, img: e.target.files[0] })} />
                        </label>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                            {editingCategoryId ? "Update Category" : "Add Category"}
                        </button>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {categories.map((cat) => (
                            <div key={cat._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                                <span>{cat.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                        onClick={() => {
                                            setCategoryForm({ name: cat.name, description: cat.description, img: null });
                                            setEditingCategoryId(cat._id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => deleteCategory(cat._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Products */}
            {tab === "products" && (
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleProductSubmit} className="flex flex-col gap-3 mb-6 bg-white p-6 rounded-xl shadow">
                        <input
                            type="text"
                            placeholder="Title"
                            value={productForm.title}
                            onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                            className="border rounded px-3 py-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            className="border rounded px-3 py-2"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            className="border rounded px-3 py-2"
                            required
                        />
                        <select
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                            className="border rounded px-3 py-2"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded text-center">
                            Upload Image
                            <input type="file" className="hidden" onChange={(e) => setProductForm({ ...productForm, img: e.target.files[0] })} />
                        </label>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                            {editingProductId ? "Update Product" : "Add Product"}
                        </button>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map((prod) => (
                            <div key={prod._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                                <span>
                                    {prod.title} - ${prod.price}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                        onClick={() => {
                                            setProductForm({ title: prod.title, description: prod.description, price: prod.price, category: prod.category?._id, img: null });
                                            setEditingProductId(prod._id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => deleteProduct(prod._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Users */}
            {tab === "users" && (
                <div className="max-w-2xl mx-auto">
                    <ul className="bg-white p-4 rounded shadow space-y-2">
                        {users.map((user) => (
                            <li key={user._id} className="border-b py-1">
                                {user.name} - {user.email}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
