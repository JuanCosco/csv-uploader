import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorRow from '../components/ErrorRow'

vi.mock('../services/api', () => ({
    correctRow: vi.fn(),
}))

const mockError = {
    row: 4,
    values: { name: 'William Ashford', email: 'william.ashford@', age: '57' },
    details: { email: 'El formato del campo email es inválido' },
}

describe('ErrorRow', () => {
    it('debería pre-cargar los valores originales del CSV', () => {
        render(
            <table><tbody>
                <ErrorRow error={mockError} />
            </tbody></table>
        )
        expect(screen.getByDisplayValue('William Ashford')).toBeInTheDocument()
        expect(screen.getByDisplayValue('william.ashford@')).toBeInTheDocument()
        expect(screen.getByDisplayValue('57')).toBeInTheDocument()
    })

    it('debería mostrar el mensaje de error del campo inválido', () => {
        render(
            <table><tbody>
                <ErrorRow error={mockError} />
            </tbody></table>
        )
        expect(screen.getByText('El formato del campo email es inválido')).toBeInTheDocument()
    })

    it('debería renderizar el botón Retry', () => {
        render(
            <table><tbody>
                <ErrorRow error={mockError} />
            </tbody></table>
        )
        expect(screen.getByText('Retry')).toBeInTheDocument()
    })
})