import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useNavigate } from 'react-router-dom'

import ButtonBack from './index'
import routes from '../../utils/routes'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

describe('ButtonBack Component', () => {
  it('renders with correct text and icon', () => {
    render(<ButtonBack />)

    const iconElement = screen.getByRole('img')
    expect(iconElement).toHaveClass('anticon-arrow-left')

    const textElement = screen.getByText(/back to news/i)
    expect(textElement).toBeInTheDocument()
  })

  it('navigate to the home route when clicked', () => {
    const mockedNavigate = vi.fn()
    useNavigate.mockReturnValue(mockedNavigate)

    render(<ButtonBack />)

    const buttonElement = screen.getByRole('button')
    fireEvent.click(buttonElement)

    expect(mockedNavigate).toHaveBeenCalledWith(routes.HOME)
  })
})
