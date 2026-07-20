import { useState } from 'react'
import { z } from 'zod'
import type { ErrorRecord } from '../types'
import { correctRow } from '../services/api'

interface Props {
    error: ErrorRecord
}

const rowSchema = z.object({
    name: z.string().min(1, 'El campo name no puede estar vacío'),
    email: z.string().email('El formato del campo email es inválido'),
    age: z.string().optional().refine(
        val => !val || Number(val) > 0,
        'El campo age debe ser un número positivo'
    ),
})

export default function ErrorRow({ error }: Props) {
    const [name, setName] = useState(error.values?.name ?? '')
    const [email, setEmail] = useState(error.values?.email ?? '')
    const [age, setAge] = useState(error.values.age ?? '')
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errors, setErrors] = useState<Record<string, string>>(error.details)


    const validateField = (field: string, value: string) => {
        const fieldSchema = rowSchema.shape[field as keyof typeof rowSchema.shape]
        const result = fieldSchema.safeParse(value)
        if (!result.success) {
            setErrors(prev => ({ ...prev, [field]: result.error.issues[0].message }))
        } else {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const handleNameChange = (value: string) => {
        setName(value)
        validateField('name', value)
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        validateField('email', value)
    }

    const handleAgeChange = (value: string) => {
        setAge(value)
        validateField('age', value)
    }

    const hasErrors = Object.values(errors).some(e => e !== '' && e !== undefined)
    const isEmpty = !name || !email  // name y email son obligatorios
    const isValid = !hasErrors && !isEmpty

    console.log('errors:', errors)
    console.log('hasErrors:', hasErrors)
    console.log('isEmpty:', isEmpty)
    console.log('isValid:', isValid)

    const handleCorrect = async () => {
        const result = rowSchema.safeParse({ name, email, age })
        if (!result.success) return

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
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400
                         ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
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
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 
                        ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
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
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 
                        ${errors.age ? 'border-red-400 bg-red-50' : 'border-gray-300'
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
                    disabled={!isValid}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg px-4 py-1.5 transition-colors"
                >
                    Retry
                </button>
            </td>
        </tr>
    )
}