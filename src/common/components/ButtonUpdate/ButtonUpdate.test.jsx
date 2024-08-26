import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import ButtonUpdate from './index'

describe('ButtonUpdate Component', () => {
  it('renders with correct title', () => {
    render(<ButtonUpdate onClick={() => {}} isLoading={false} title='Update Now' />)

    const buttonElement = screen.getByRole('button', { name: /update now/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('renders with default title', () => {
    render(<ButtonUpdate onClick={() => {}} isLoading={false} />)

    const buttonElement = screen.getByRole('button', { name: /update/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('displays loading icon and disables button when loading', () => {
    render(<ButtonUpdate onClick={() => {}} isLoading={true} title='Update Now' />)

    const buttonElement = screen.getByRole('button', { name: /update now/i })
    expect(buttonElement).toBeDisabled()
    expect(buttonElement).toHaveClass('ant-btn-loading')
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<ButtonUpdate onClick={handleClick} isLoading={false} title='Update Now' />)

    const buttonElement = screen.getByRole('button', { name: /update now/i })

    expect(buttonElement).not.toBeDisabled()

    await userEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when loading', async () => {
    const handleClick = vi.fn()
    render(<ButtonUpdate onClick={handleClick} isLoading={true} title='Update Now' />)

    const buttonElement = screen.getByRole('button', { name: /update now/i })
    await userEvent.click(buttonElement)

    expect(handleClick).not.toHaveBeenCalled()
  })
})
