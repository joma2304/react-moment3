import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "./HomePage.css"

const HomePage = () => {
    const { products } = useProducts(); // 

    return (
        <>
            <h1 className="title">Produkter</h1>
            <div className="products-container">
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product._id} className="product-card">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p className="price">Pris: {product.price} kr</p>
                            <Link to={`/products/${product._id}`} className="product-link">
                                Visa all info
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default HomePage;

