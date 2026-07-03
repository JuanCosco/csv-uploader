import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SuccessTable from '../components/SuccessTable'

const mockRecords = [
    { id: 1, name: 'John Smith', email: 'john@example.com', age: 34 },
    { id: 2, name: 'Emily Johnson', email: 'emily@example.com', age: null },
]

describe('SuccessTable', () => {
    it('debería renderizar los registros exitosos', () => {
        render(<SuccessTable records={mockRecords} />)
        expect(screen.getByText('John Smith')).toBeInTheDocument()
        expect(screen.getByText('Emily Johnson')).toBeInTheDocument()
    })

    it('debería mostrar - cuando age es null', () => {
        render(<SuccessTable records={mockRecords} />)
        expect(screen.getByText('-')).toBeInTheDocument()
    })

    it('debería mostrar mensaje cuando no hay registros', () => {
        render(<SuccessTable records={[]} />)
        expect(screen.getByText('No hubo registros exitosos')).toBeInTheDocument()
    })
})