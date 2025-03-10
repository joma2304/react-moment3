import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminPage = () => {
    const { user } = useAuth();
    const { addProduct } = useProducts();
    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        brand: "",
        amount: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        price: "",
        description: "",
        brand: "",
        amount: "",
    });

    const validate = () => {
        let isValid = true;
        let newErrors = { name: "", price: "", description: "", brand: "", amount: "" };

        if (!newProduct.name.trim()) {
            newErrors.name = "Produktnamn får inte vara tomt";
            isValid = false;
        }
        if (!newProduct.description.trim()) {
            newErrors.description = "Beskrivning får inte vara tom";
            isValid = false;
        }
        if (!newProduct.brand.trim()) {
            newErrors.brand = "Märke får inte vara tomt";
            isValid = false;
        }
        if (!newProduct.price.trim() || isNaN(Number(newProduct.price)) || Number(newProduct.price) <= 0) {
            newErrors.price = "Pris måste vara en positiv siffra";
            isValid = false;
        }
        if (!newProduct.amount.trim() || isNaN(Number(newProduct.amount)) || Number(newProduct.amount) < 0) {
            newErrors.amount = "Antal måste vara 0 eller mer";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        await addProduct({
            ...newProduct,
            price: Number(newProduct.price),
            amount: Number(newProduct.amount),
        });

        setNewProduct({ name: "", price: "", description: "", brand: "", amount: "" });
        navigate("/");
    };

    return (
        <div>
            <h1 className="title">Admin</h1>
            <p className="userInfo">
                Du är inloggad som: <strong>{user?.firstName + " " + user?.lastName}</strong>
            </p>
            <div className="info-box">
                <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                <p>
                    För att <strong>ta bort</strong> och <strong>ändra på</strong> befintliga produkter, trycker du på <strong>visa all info</strong> på startsidan på en produkt. Du kommer då få upp knappar för detta!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <h2>Lägg till ny produkt</h2>

                <label htmlFor="name">Produktnamn</label>
                <input type="text" id="name" name="name" value={newProduct.name} onChange={handleChange} />
                {errors.name && <p className="error">{errors.name}</p>}

                <label htmlFor="description">Beskrivning</label>
                <textarea id="description" name="description" value={newProduct.description} onChange={handleChange} />
                {errors.description && <p className="error">{errors.description}</p>}

                <label htmlFor="brand">Märke</label>
                <input type="text" id="brand" name="brand" value={newProduct.brand} onChange={handleChange} />
                {errors.brand && <p className="error">{errors.brand}</p>}

                <label htmlFor="price">Pris</label>
                <input type="number" id="price" name="price" value={newProduct.price} onChange={handleChange} />
                {errors.price && <p className="error">{errors.price}</p>}

                <label htmlFor="amount">Antal i lager</label>
                <input type="number" id="amount" name="amount" value={newProduct.amount} onChange={handleChange}/>
                {errors.amount && <p className="error">{errors.amount}</p>}

                <button type="submit"><FontAwesomeIcon icon={faPlus} className="add-icon" /> Lägg till produkt</button>
            </form>
        </div>
    );
};

export default AdminPage;
