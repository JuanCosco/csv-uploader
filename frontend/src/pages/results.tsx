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
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-8">Resultados</h1>

                {/* Exitosos */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Exitosos ({result.success.length})
                    </h2>
                    <SuccessTable records={result.success} />
                </div>

                {/* Errores */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Errores ({result.errors.length})
                    </h2>

                    {result.errors.length === 0 ? (
                        <p className="text-gray-500 text-sm">No hubo errores.</p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500 border-b border-gray-200">
                                    <th className="pb-3 pr-4 w-16">Fila</th>
                                    <th className="pb-3 pr-4">Name</th>
                                    <th className="pb-3 pr-4">Email</th>
                                    <th className="pb-3 pr-4">Age</th>
                                    <th className="pb-3 w-20"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.errors.map(error => (
                                    <ErrorRow key={error.row} error={error} />
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="mt-6 text-sm text-blue-600 hover:underline"
                >
                    Cargar otro archivo
                </button>
            </div>
        </div>
    )
}