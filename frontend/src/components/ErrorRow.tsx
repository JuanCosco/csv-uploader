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

    const handleNameChange = (value: string) => {
        setName(value)
        setErrors(prev => ({ ...prev, name: '' }))
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        setErrors(prev => ({ ...prev, email: '' }))
    }

    const handleAgeChange = (value: string) => {
        setAge(value)
        setErrors(prev => ({ ...prev, age: '' }))
    }

    if (status === 'success') {
        return (
            <tr className="border-b border-gray-100">
                <td className="py-3 pr-4 text-gray-400">{error.row}</td>
                <td colSpan={3} className="py-3 text-green-600 font-medium">
                    Fila corregida exitosamente
                </td>
                <td></td>
            </tr>
        )
    }

    return (
        <tr className="border-b border-gray-100">
            <td className="py-3 pr-4 text-gray-500">{error.row}</td>

            {/* Name */}
            <td className="py-3 pr-4">
                <input
                    value={name}
                    onChange={e => handleNameChange(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                    placeholder="Name"
                />
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
            </td>

            {/* Email */}
            <td className="py-3 pr-4">
                <input
                    value={email}
                    onChange={e => handleEmailChange(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                    placeholder="Email"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
            </td>

            {/* Age */}
            <td className="py-3 pr-4">
                <input
                    value={age}
                    onChange={e => handleAgeChange(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.age ? 'border-red-400 bg-red-50' : 'border-gray-300'
                        }`}
                    placeholder="Age"
                />
                {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
            </td>

            {/* Retry */}
            <td className="py-3">
                <button
                    onClick={handleCorrect}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-4 py-1.5 transition-colors"
                >
                    Retry
                </button>
            </td>
        </tr>
    )
}