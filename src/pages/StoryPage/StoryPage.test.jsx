import { getByTestId, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import StoryPage from './index'
import Story from '@/features/story/Story'
import Comments from '@/features/comments/Comments'
import ButtonBack from '@/common/components/ButtonBack'

vi.mock('@/common/components/ButtonBack')
vi.mock('@/features/story/Story')
vi.mock('@/features/comments/Comments')

describe('StoryPage', () => {
  it('renders with correct title and components', () => {
    ButtonBack.mockImplementation(() => (
      <button data-testid='mock-button-back'>Button to news</button>
    ))
    Comments.mockImplementation(() => <div data-testid='mock-comments'>Comments</div>)
    Story.mockImplementation(() => <div data-testid='mock-story'>Story</div>)

    render(<StoryPage />)

    const titleElement = screen.getByRole('heading')
    expect(titleElement.tagName).toBe('H1')
    expect(titleElement).toHaveTextContent(/story/i)

    const buttonBackElement = screen.getByTestId('mock-button-back')
    const commentsElement = screen.getByTestId('mock-comments')
    const storyElement = screen.getByTestId('mock-story')

    expect(buttonBackElement).toBeInTheDocument()
    expect(commentsElement).toBeInTheDocument()
    expect(storyElement).toBeInTheDocument()
  })
})
