import { describe, expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'

import ErrorMessage from './index'

describe('ErrorMessage Component', () => {
  test('renders with correct message', () => {
    const errorMessage = 'Error loading story'
    render(<ErrorMessage message={errorMessage} />)

    const alertElement = screen.getByRole('alert')
    const alertMessage = within(alertElement).getByText(errorMessage)

    expect(alertMessage).toBeInTheDocument()
  })

  test('matches snapshot', () => {
    const { asFragment } = render(<ErrorMessage message='Snapshot test' />)
    expect(asFragment()).toMatchSnapshot()
  })
})
