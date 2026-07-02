import { useLocation, useNavigate } from 'react-router-dom'
import type { UploadResult } from '../types'
import SuccessTable from '../components/SuccessTable'
import ErrorRow from '../components/ErrorRow'

export default function Results() {
    const location = useLocation()
    const navigate = useNavigate()
    const result = location.state?.result as UploadResult | undefined

    if (!result) {
        navigate('/')
        return null
    }

    return (
        <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
            <h1>Resultados</h1>

            <h2>Exitoso ({result.success.length})</h2>
            <SuccessTable records={result.success} />

            <h2> Errores ({result.errors.length})</h2>
            {result.errors.length === 0 ? (
                <p>No hubo errores</p>
            ) : (
                result.errors.map(error => (
                    <ErrorRow key={error.row} error={error} />
                ))
            )}

            <button onClick={() => navigate('/')} style={{ marginTop: 24 }}>
                Cargar otro archivo
            </button>
        </div>
    )
}