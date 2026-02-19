import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import AppLoadingScreen from './index'

describe('AppLoadingScreen', () => {
  it('renders with role status and loading aria-label', () => {
    render(<AppLoadingScreen progress={0} />)
    const status = screen.getByRole('status', { name: 'Loading contacts' })
    expect(status).toBeInTheDocument()
  })

  it('renders the Lendsqr logo', () => {
    render(<AppLoadingScreen progress={0} />)
    const logo = screen.getByRole('img', { name: 'Lendsqr' })
    expect(logo).toBeInTheDocument()
  })

  it('renders a progressbar with correct aria attributes', () => {
    render(<AppLoadingScreen progress={45} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '45')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '100')
  })

  it('displays the progress percentage text', () => {
    render(<AppLoadingScreen progress={67} />)
    expect(screen.getByText('67%')).toBeInTheDocument()
  })

  it('applies progress width to the fill element', () => {
    const { container } = render(<AppLoadingScreen progress={30} />)
    const fill = container.querySelector('[style*="width: 30%"]')
    expect(fill).toBeInTheDocument()
  })
})
