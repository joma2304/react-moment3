import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../types/product.types";

const ProductDetail = () => {
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
    return <p>Hämtar produkt...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Beskrivning: {product.description}</p>
      <p>Märke: {product.brand}</p>
      <p>Pris: {product.price} kr</p>
      <p>Antal i lager: {product.amount} st</p>
    </div>
  );
};

export default ProductDetail;
