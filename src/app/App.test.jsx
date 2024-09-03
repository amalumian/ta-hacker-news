import { describe, expect, it } from 'vitest'
import { screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from './App'
import { renderWithProvider } from '../common/utils/test-utils'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

describe('App', () => {
  it('renders HomePage at root path', async () => {
    await act(async () => {
      renderWithProvider(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      )
    })

    expect(screen.getByText(/Hacker News/i)).toBeInTheDocument()
  })

  it('renders StoryPage at /story/:id path', async () => {
    await act(async () => {
      renderWithProvider(
        <MemoryRouter initialEntries={['/story/:id']}>
          <App />
        </MemoryRouter>,
      )
    })

    expect(screen.getByText(/Story/i)).toBeInTheDocument()
  })

  it('renders NotFound for an unknown route', async () => {
    await act(async () => {
      renderWithProvider(
        <MemoryRouter initialEntries={['/404']}>
          <App />
        </MemoryRouter>,
      )
    })

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
  })
})
