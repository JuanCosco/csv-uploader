import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Upload from '../pages/upload'

vi.mock('../services/api', () => ({
    getMe: vi.fn().mockResolvedValue({ ok: true }),
    uploadCSV: vi.fn(),
}))

describe('Upload page', () => {
    it('debería renderizar el input de archivo', () => {
        render(<MemoryRouter><Upload /></MemoryRouter>)
        expect(document.querySelector('input[type="file"]')).toBeInTheDocument()
    })

    it('debería tener el botón Upload File deshabilitado sin archivo', () => {
        render(<MemoryRouter><Upload /></MemoryRouter>)
        expect(screen.getByText('Upload File')).toBeDisabled()
    })
})