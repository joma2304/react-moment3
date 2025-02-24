import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const HomePage = () => {
  const { products } = useProducts(); // 

  return (
    <div>
      <h1>Produkter</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Pris: {product.price} kr</p>
            <Link to={`/products/${product._id}`}>Visa mer</Link> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

