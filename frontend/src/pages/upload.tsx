import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadCSV } from "../services/api";
import type { UploadResult } from "../types";

export default function Upload() {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleUpload = async () => {
        if (!file) return

        setLoading(true)
        const res = await uploadCSV(file)
        setLoading(false)

        if (!res.ok) {
            alert(res.message)
            return
        }

        navigate('/results', { state: { result: res.data as UploadResult } })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-md">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">Cargar CSV</h1>
                <p className="text-gray-500 mb-8">Selecciona un archivo CSV para procesar</p>

                <div className="flex flex-col gap-4">
                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                        {file ? (
                            <span className="text-sm font-medium text-blue-600">{file.name}</span>
                        ) : (
                            <span className="text-sm text-gray-500">Click para seleccionar archivo</span>
                        )}
                        <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={e => setFile(e.target.files?.[0] ?? null)}
                        />
                    </label>

                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2 transition-colors"
                    >
                        {loading ? 'Procesando...' : 'Upload File'}
                    </button>
                </div>
            </div>
        </div>
    )
}