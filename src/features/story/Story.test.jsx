import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import Story from './Story'
import { renderWithRouterProvider } from '../../common/utils/test-utils'

const handlers = [
  http.get('https://hacker-news.firebaseio.com/v0/item/:id.json', ({ params }) => {
    const { id } = params

    if (id === '123') {
      return HttpResponse.json({
        id: 123,
        title: 'Test Story',
        by: 'Test Author',
        time: 1633024800,
        descendants: 42,
        url: 'https://example.com',
        score: 1,
        type: 'story',
      })
    } else {
      return new HttpResponse(null, { status: 404 })
    }
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Story Feature', () => {
  it('renders loading state initially', () => {
    renderWithRouterProvider(<Story />, { id: '123' })
    expect(screen.getByTestId('skeleton-loading')).toBeInTheDocument()
  })

  it('renders error state when API fails', async () => {
    server.use(
      http.get('https://hacker-news.firebaseio.com/v0/item/:id.json', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    renderWithRouterProvider(<Story />, { id: '123' })

    await waitFor(() => {
      expect(screen.getByText(/Request failed with status code 500/i)).toBeInTheDocument()
    })
  })

  it('renders story data on successful fetch', async () => {
    renderWithRouterProvider(<Story />, { id: '123' })

    await waitFor(() => {
      expect(screen.getByText('Test Story')).toBeInTheDocument()
      expect(screen.getByText('Author: Test Author')).toBeInTheDocument()
      expect(screen.getByText('Comments: 42')).toBeInTheDocument()

      expect(screen.queryByText(/Request failed with status code 500/i)).not.toBeInTheDocument()
      expect(screen.queryByText('skeleton-loading')).not.toBeInTheDocument()
    })
  })
})
