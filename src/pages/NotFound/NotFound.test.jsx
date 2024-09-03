import { render, screen, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import NotFound from './index'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

describe('NotFound Page', () => {
  it('renders heading with the text "404"', () => {
    render(<NotFound />)

    const titleElement = screen.getByRole('heading')
    expect(titleElement).toHaveTextContent('404')
    expect(titleElement.tagName).toBe('H1')
  })

  it('renders component ErrorMessage with the text "Page not found"', () => {
    render(<NotFound />)

    const errorElement = screen.getByRole('alert')
    const messageElement = within(errorElement).getByText(/page not found/i)
    expect(messageElement).toBeInTheDocument()
  })
})
