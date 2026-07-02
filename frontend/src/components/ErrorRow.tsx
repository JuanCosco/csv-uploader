import { useState } from 'react'
import type { ErrorRecord } from '../types'
import { correctRow } from '../services/api'

interface Props {
    error: ErrorRecord
}

export default function ErrorRow({ error }: Props) {
    const [name, setName] = useState(error.values?.name ?? '')
    const [email, setEmail] = useState(error.values?.email ?? '')
    const [age, setAge] = useState(error.values.age ?? '')
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errors, setErrors] = useState<Record<string, string>>(error.details)

    const handleCorrect = async () => {
        setErrors({})
        const res = await correctRow({ name, email, age })

        if (!res.ok) {
            setErrors(res.errors)
            setStatus('error')
            return
        }

        setStatus('success')
    }

    if (status === 'success') {
        return (
            <div style={{ padding: 12, marginBottom: 12, backgroundColor: '#e6ffe6', borderRadius: 8 }}>
                Fila {error.row} corregida exitosamente
            </div>
        )
    }

    return (
        <div style={{ padding: 16, marginBottom: 16, border: '1px solid #ffcccc', borderRadius: 8, backgroundColor: '#fff5f5' }}>
            <p style={{ fontWeight: 'bold', marginBottom: 8 }}>Fila {error.row}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                    <input
                        placeholder='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ borderColor: errors.name ? 'red' : undefined }}
                    />
                    {errors.name && <p style={{ color: 'red', fontSize: 12 }}>{errors.name}</p>}
                </div>

                <div>
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ borderColor: errors.email ? 'red' : undefined }}
                    />
                    {errors.email && <p style={{ color: 'red', fontSize: 12 }}>{errors.email}</p>}
                </div>

                <div>
                    <input
                        placeholder="Age (opcional)"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        style={{ borderColor: errors.age ? 'red' : undefined }}
                    />
                    {errors.age && <p style={{ color: 'red', fontSize: 12 }}>{errors.age}</p>}
                </div>

                <button onClick={handleCorrect}>Reenviar Fila </button>
            </div>
        </div>
    )
}