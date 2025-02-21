import { useAuth } from "../context/AuthContext"
import "./AdminPage.css"

const AdminPage = () => {

    const {user} = useAuth();
    
    return (
        <div>
            <h1 className="title">Admin</h1>
            <p className="userInfo">Du är inloggad som: <strong>{user?.firstName + " " + user?.lastName}</strong></p>
        </div>
    )
}

export default AdminPage