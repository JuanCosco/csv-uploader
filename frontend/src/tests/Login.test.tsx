import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/login'

vi.mock('../services/api', () => ({
    login: vi.fn(),
}))

import { login } from '../services/api'

describe('Login page', () => {
    it('debería renderizar el campo email', () => {
        render(<MemoryRouter><Login /></MemoryRouter>)
        expect(screen.getByPlaceholderText('admin@admin.com')).toBeInTheDocument()
    })

    it('debería renderizar el campo password', () => {
        render(<MemoryRouter><Login /></MemoryRouter>)
        expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
    })

    it('debería renderizar el botón Ingresar', () => {
        render(<MemoryRouter><Login /></MemoryRouter>)
        expect(screen.getByText('Ingresar')).toBeInTheDocument()
    })

    it('debería mostrar error con credenciales inválidas', async () => {
        vi.mocked(login).mockResolvedValue({ ok: false, message: 'Credenciales inválidas' })

        render(<MemoryRouter><Login /></MemoryRouter>)

        fireEvent.change(screen.getByPlaceholderText('admin@admin.com'), {
            target: { value: 'wrong@test.com' }
        })
        fireEvent.change(screen.getByPlaceholderText('••••••••'), {
            target: { value: 'wrongpass' }
        })
        fireEvent.click(screen.getByText('Ingresar'))

        await waitFor(() => {
            expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
        })
    })
})