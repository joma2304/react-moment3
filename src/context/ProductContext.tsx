import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ProductInterface } from "../types/product.types";

interface ProductContextType {
  products: ProductInterface[];
  addProduct: (newProduct: Omit<ProductInterface, "_id">) => Promise<void>; // Lägg till addProduct funktionen i Context, id sätts automatiskt av backend
  editProduct: (id: string, updatedProduct: Omit<ProductInterface, "_id">) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean; //För laddning
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Funktion för att hämta alla produkter
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); //Laddar är true
        const response = await fetch("https://react-moment3-api.onrender.com/products");
        if (!response.ok) {
          throw new Error("Produkter kunde inte hämtas.");
        }
        const data: ProductInterface[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      } finally {
        setLoading(false); // Laddar är false
      }
    };

    fetchProducts();
  }, []);

  //Funktion för att lägga till en produkt
  const addProduct = async (newProduct: Omit<ProductInterface, "_id">) => {
    try {
        const token = localStorage.getItem("jwtToken"); //Hämta token från localstorage
      const response = await fetch("https://react-moment3-api.onrender.com/products", {
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

    //Redigera produkt
    const editProduct = async (id: string, updatedProduct: Omit<ProductInterface, "_id">) => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`https://react-moment3-api.onrender.com/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        });
  
        if (!response.ok) {
          throw new Error("Kunde inte uppdatera produkt");
        }
  
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product._id === id ? { ...product, ...updatedProduct } : product))
        );
      } catch (error) {
        console.error("Fel vid uppdatering:", error);
      }
    };

      // Ta bort produkt
  const deleteProduct = async (id: string) => {

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`https://react-moment3-api.onrender.com/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Kunde inte ta bort produkt");
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Fel vid borttagning:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook för att använda denna i homepage och adminpage
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts måste användas inom en ProductProvider");
  }
  return context;
};
