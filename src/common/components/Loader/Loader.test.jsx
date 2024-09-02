import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Loader from './index'

describe('Loader Component', () => {
  it('renders with small size', () => {
    render(<Loader size='small' />)
    const spinElement = screen.getByRole('img')
    expect(spinElement).toBeInTheDocument()

    const spinContainer = spinElement.closest('.ant-spin')
    expect(spinContainer).toHaveClass('ant-spin-sm')
  })

  it('renders with large size', () => {
    render(<Loader size='large' />)
    const spinElement = screen.getByRole('img')
    expect(spinElement).toBeInTheDocument()

    const spinContainer = spinElement.closest('.ant-spin')
    expect(spinContainer).toHaveClass('ant-spin-lg')
  })
})
