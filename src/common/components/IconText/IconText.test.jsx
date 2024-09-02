import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { RiseOutlined } from '@ant-design/icons'

import IconText from './index'

describe('IconText Component', () => {
  const icon = <RiseOutlined />
  const text = '0'

  beforeEach(() => {
    render(<IconText icon={icon} text={text} />)
  })

  it('renders with correct icon and text', () => {
    const iconElement = screen.getByRole('img')
    expect(iconElement).toHaveClass('anticon anticon-rise')

    const textElement = screen.getByText(text)
    expect(textElement).toBeInTheDocument()
  })

  it('renders with correct order', () => {
    const iconElement = screen.getByRole('img')
    const textElement = screen.getByText(text)
    expect(textElement.compareDocumentPosition(iconElement)).toBe(2)
  })
})
