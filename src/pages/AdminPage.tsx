import { useAuth } from "../context/AuthContext"
import "./AdminPage.css"

const AdminPage = () => {

    const {user} = useAuth();
    
    return (
        <div>
            <h1 className="title">Admin</h1>
            <p className="userInfo">Inloggad som: {user?.firstName + " " + user?.lastName}</p>
        </div>
    )
}

export default AdminPage