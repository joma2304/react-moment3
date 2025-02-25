import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import "./AdminPage.css";

const AdminPage = () => {
    const { user } = useAuth();
    const { addProduct } = useProducts(); // Hämta addProduct från Context

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0,
        description: "",
        brand: "",
        amount: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addProduct(newProduct); // Använd addProduct från Context
        alert("Produkt tillagd!");
        setNewProduct({ name: "", price: 0, description: "", brand: "", amount: 0 });
    };

    return (
        <div>
            <h1 className="title">Admin</h1>
            <p className="userInfo">
                Du är inloggad som: <strong>{user?.firstName + " " + user?.lastName}</strong>
            </p>

            <form onSubmit={handleSubmit} className="product-form">
                <h2>Lägg till ny produkt</h2>

                <label htmlFor="name">Produktnamn</label>
                <input type="text" id="name" name="name" value={newProduct.name} onChange={handleChange} required />

                <label htmlFor="brand">Märke</label>
                <input type="text" id="brand" name="brand" value={newProduct.brand} onChange={handleChange} required />

                <label htmlFor="description">Beskrivning</label>
                <textarea id="description" name="description" value={newProduct.description} onChange={handleChange} required />

                <label htmlFor="price">Pris</label>
                <input type="number" id="price" name="price" value={newProduct.price} onChange={handleChange} required />

                <label htmlFor="amount">Antal i lager</label>
                <input type="number" id="amount" name="amount" value={newProduct.amount} onChange={handleChange} required />

                <button type="submit">Lägg till produkt</button>
            </form>

        </div>
    );
};

export default AdminPage;
