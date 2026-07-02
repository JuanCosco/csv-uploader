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
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
            <h1>Upload CSV</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input
                    type="file"
                    accept=".csv"
                    onChange={e => setFile(e.target.files?.[0] ?? null)}
                />
                <button onClick={handleUpload} disabled={!file || loading}>
                    {loading ? 'Cargando...' : ' Upload File'}
                </button>
            </div>
        </div>
    )
}