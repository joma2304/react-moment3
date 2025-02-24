import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import "./AdminPage.css";

const AdminPage = () => {
    const { user } = useAuth();
    const { addProduct } = useProducts(); // Hämta addProduct från Context

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
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
        setNewProduct({ name: "", price: "", description: "", brand: "", amount: 0 });
    };

    return (
        <div>
            <h1 className="title">Admin</h1>
            <p className="userInfo">
                Du är inloggad som: <strong>{user?.firstName + " " + user?.lastName}</strong>
            </p>

            <form onSubmit={handleSubmit} className="product-form">
                <h2>Lägg till ny produkt</h2>
                <input type="text" name="name" placeholder="Produktnamn" value={newProduct.name} onChange={handleChange} required />
                <input type="text" name="brand" placeholder="Märke" value={newProduct.brand} onChange={handleChange} required />
                <textarea name="description" placeholder="Beskrivning" value={newProduct.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Pris" value={newProduct.price} onChange={handleChange} required />
                <input type="number" name="amount" placeholder="Antal i lager" value={newProduct.amount} onChange={handleChange} required />
                <button type="submit">Lägg till produkt</button>
            </form>
        </div>
    );
};

export default AdminPage;
