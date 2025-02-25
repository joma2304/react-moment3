import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const {login, user} = useAuth(); 
    const navigate = useNavigate();

    //Kolla ifall användare redan finns, skicka till admin page i sånna fall
    useEffect(() => {
        if(user) {
            navigate("/admin")
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await login({email, password});
            navigate("/admin");
            
        } catch (error) {
            setError("Inloggningen misslyckades, kontrollera e-post och lösenord")
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Logga in</h2>
            <form onSubmit={handleSubmit} className="login-form">
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">E-post</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Lösenord</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                         />
                </div>

                <button className="submit-button"
                    type="submit"> <FontAwesomeIcon icon={faUser} className="login-icon" /> Logga in
                </button>
            </form>
        </div>
    )
}

export default LoginPage