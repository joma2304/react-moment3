import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ProductInterface } from "../types/product.types";

interface ProductContextType {
  products: ProductInterface[];
  addProduct: (newProduct: Omit<ProductInterface, "_id">) => Promise<void>; // Lägg till addProduct i Context
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  // Funktion för att hämta alla produkter
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Produkter kunde inte hämtas.");
        }
        const data: ProductInterface[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    };

    fetchProducts();
  }, []);

  //Funktion för att lägga till en produkt
  const addProduct = async (newProduct: Omit<ProductInterface, "_id">) => {
    try {
        const token = localStorage.getItem("jwtToken"); //Hämta token från localstorage
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //Använd token eftersom route är skyddad
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Misslyckades med att lägga till produkt.");
      }

      const createdProduct: ProductInterface = await response.json();

      // Uppdatera produktlistan direkt efter att en produkt lagts till
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
    } catch (error) {
      console.error("Fel vid tillägg av produkt:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook för att använda produktkontexten
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts måste användas inom en ProductProvider");
  }
  return context;
};
