import "./ProductPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";
import { ProductInterface } from "../types/product.types"; // Importera interfacet

const ProductPage = () => {
  const { id } = useParams(); //ID Från url
  const navigate = useNavigate();
  const { products, editProduct, deleteProduct } = useProducts(); //Funktioner från context

  if (!id) { //IFall produktens id inte finns
    return <p className="loading">Fel: Produkt-ID saknas</p>;
  }

  const product = products.find((p) => p._id === id);

  if (!product) { //Ifall produkten inte finns
    return <p className="loading">Produkten hittades inte</p>;
  }

  // Kopia av produkten men ger standardvärden ifall det inte skulle finnas något värde för något fält av produkten
  const [editing, setEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Omit<ProductInterface, "_id">>({
    name: product.name ?? "", 
    description: product.description ?? "", 
    brand: product.brand ?? "", 
    price: product.price ?? "0", 
    amount: product.amount ?? 0, 
  });

  //Updeteerar updatedproduct vid inmatning i inputfälten
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  //Sparar uppgifterna och stänger redigeringsruta
  const handleSave = async () => {
    await editProduct(id, updatedProduct); //Anropar editProduct från productcontext
    alert("Produkten uppdaterad!"); //TODO ÄNDRA DETTA
    setEditing(false);
  };

  //Raderar product
  const handleDelete = async () => {
    if (!window.confirm("Är du säker på att du vill ta bort produkten?")) return;
    await deleteProduct(id); //Anripar deleteProuct från productcontext
    alert("Produkten har tagits bort!"); //TODO ÄNDRA DETTA
    navigate("/");
  };

  return (
    <div className="product-detail">
      {editing ? (
        <>
          <h1>Redigera Produkt</h1>
          <label htmlFor="name">Produktnamn</label>
          <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} />
          <label htmlFor="description">Beskrivning</label>
          <textarea name="description" value={updatedProduct.description} onChange={handleChange} />
          <label htmlFor="brand">Märke</label>
          <input type="text" name="brand" value={updatedProduct.brand} onChange={handleChange} />
          <label htmlFor="price">Pris</label>
          <input type="text" name="price" value={updatedProduct.price} onChange={handleChange} />
          <label htmlFor="amount">Antal i lager</label>
          <input type="number" name="amount" value={updatedProduct.amount} onChange={handleChange} />
          <button onClick={handleSave}>Spara</button>
          <button onClick={() => setEditing(false)}>Avbryt</button>
        </>
      ) : (
        <>
          <h1>{product.name}</h1>
          <p><strong>Beskrivning:</strong> {product.description}</p>
          <p><strong>Märke:</strong> {product.brand}</p>
          <p><strong>Antal i lager:</strong> {product.amount} st</p>
          <p className="price"><strong>Pris:</strong> {product.price} kr</p>
          <button onClick={() => setEditing(true)}>Redigera</button>
          <button onClick={handleDelete} className="delete-btn">Ta bort</button>
        </>
      )}
    </div>
  );
};

export default ProductPage;
