import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import HomePage from './index'
import Stories from '@/features/stories/Stories'

vi.mock('@/features/stories/Stories')

describe('HomePage', () => {
  it('render with correct title and component', () => {
    Stories.mockImplementation(() => <div data-testid='mock-stories'>Mocked Stories</div>)

    render(<HomePage />)

    const titleElement = screen.getByRole('heading')
    expect(titleElement.tagName).toBe('H1')
    expect(titleElement).toHaveTextContent(/hacker news/i)

    const storiesComponent = screen.getByTestId('mock-stories')
    expect(storiesComponent).toBeInTheDocument()
  })
})
