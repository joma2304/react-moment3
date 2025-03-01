import "./ProductPage.css";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { ProductInterface } from "../types/product.types";
import Modal from "../components/Modal"; //modal för bekräftelse
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProductPage = () => {
  const { id } = useParams(); //ID från url
  const navigate = useNavigate();
  const { products, editProduct, deleteProduct } = useProducts(); //Funktioner från ProductContext
  const { user } = useAuth(); //användare från authcontext

  // Skapa en state för produkten
  const [product, setProduct] = useState<ProductInterface | null>(null);
  //State för redigering av produkt
  const [editing, setEditing] = useState(false);
  //State för att lagra redigerad produkt
  const [updatedProduct, setUpdatedProduct] = useState<Omit<ProductInterface, "_id"> | null>(null);
  const [modalMessage, setModalMessage] = useState(""); // meddelande i modalen
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (!id) return;
    const foundProduct = products.find((p) => p._id === id); //Hitta produkt med rätt id
    if (foundProduct) {
      setProduct(foundProduct); //Uppdatera statet till den valda produkten
      setUpdatedProduct({ //KOpia av produkten för redigering
        name: foundProduct.name,
        description: foundProduct.description,
        brand: foundProduct.brand,
        price: foundProduct.price,
        amount: foundProduct.amount,
      });
    }
  }, [id, products]); //Körs när id eller produkt ändras

  // Om produktens id inte finns finns inte produkten, visa ett felmeddelande
  if (!id) return <p className="loading">Fel: Produkt-ID saknas</p>;
  //Produkten laddas in
  if (!product) return <p className="loading">Laddar produkt...</p>;

  //Ändrar updatedproduct vid input i formulär
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!updatedProduct) return;
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  //Sparar ändrad prodult
  const handleSave = async () => {
    if (!updatedProduct) return;
    await editProduct(id, updatedProduct); //Anropar editProduct
    setModalMessage("Produkten har uppdaterats!");
    setShowModal(true); // Visa modal
    setEditing(false); //Stäng modal
  };

  //Modal med meddelande för borttagning
  const handleDelete = async () => {
    setModalMessage("Är du säker på att du vill ta bort produkten?");
    setShowModal(true);
  };

  // Ta boprt produckten
  const confirmDelete = async () => {
    await deleteProduct(id); //anropa deleteProduct
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <NavLink to={"/"} className="backToStart">
      <FontAwesomeIcon icon={faArrowLeft} /> Gå till alla produkter
      </NavLink>
      <div className="product-detail">
        {editing ? (
          <>
            <h1>Redigera Produkt</h1>
            <label htmlFor="name">Produktnamn</label>
            <input type="text" name="name" value={updatedProduct?.name || ""} onChange={handleChange} />

            <label htmlFor="description">Beskrivning</label>
            <textarea name="description" value={updatedProduct?.description || ""} onChange={handleChange} />

            <label htmlFor="brand">Märke</label>
            <input type="text" name="brand" value={updatedProduct?.brand || ""} onChange={handleChange} />

            <label htmlFor="price">Pris</label>
            <input type="number" name="price" value={updatedProduct?.price || "0"} onChange={handleChange} />

            <label htmlFor="amount">Antal i lager</label>
            <input type="number" name="amount" value={updatedProduct?.amount || "0"} onChange={handleChange} />
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
            {user && (
              <>
                <button onClick={() => setEditing(true)}><FontAwesomeIcon icon={faEdit} /> Redigera
                </button>
                <button onClick={handleDelete} className="delete-btn"><FontAwesomeIcon icon={faTrash} /> Ta bort
                </button>
              </>
            )}
          </>
        )}
        {showModal && (
          <Modal
            message={modalMessage}
            onClose={() => setShowModal(false)}
            onConfirm={modalMessage.includes("ta bort") ? confirmDelete : undefined}
          />
        )}
      </div>
    </>
  );
};

export default ProductPage;
