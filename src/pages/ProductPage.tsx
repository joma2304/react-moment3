import "./ProductPage.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../types/product.types";

const ProductPage = () => {
  const { id } = useParams(); // 🔥 Hämta `id` från URL:en
  const [product, setProduct] = useState<ProductInterface | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
          throw new Error("Produkten kunde inte hämtas.");
        }
        const data: ProductInterface = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkten:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="loading">Hämtar produkt...</p>;
  }

  return (
<div className="product-detail">
  <h1>{product.name}</h1>
  <p><strong>Beskrivning:</strong> {product.description}</p>
  <p><strong>Märke:</strong> {product.brand}</p>
  <p><strong>Antal i lager:</strong> {product.amount} st</p>
  <p className="price"><strong>Pris:</strong> {product.price} kr</p>
</div>
  );
};

export default ProductPage;
