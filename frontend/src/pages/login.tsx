import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setError("")
        const res = await login(email, password)

        if (!res.ok) {
            setError(res.message)
            return
        }

        navigate("/")
    }

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
            <h1>Login</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handleSubmit}>Ingresar</button>
            </div>
        </div>
    )

}

