import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "../services/api";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        getMe()
            .then(res => setAuthorized(res.ok === true))
            .catch(() => setAuthorized(false))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Verificando sesion...</p>
    if (!authorized) return <Navigate to="/login" />

    return <>{children}</>
}