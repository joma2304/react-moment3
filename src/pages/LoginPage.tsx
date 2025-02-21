import { useState } from "react"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
    };

    return (
        <div>
            <h2>Logga in</h2>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div>
                        {error}
                    </div>
                )}
                <div>
                    <label htmlFor="email">E-post</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Lösenord</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button
                    type="submit">Logga in
                </button>
            </form>
        </div>
    )
}

export default LoginPage