import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Home from '../../pages/Home'

// Mock the useNavigate hook
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders home page correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(screen.getByRole('heading', { name: /welcome to the home page/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('navigates to login when logout button is clicked', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })

  it('has correct CSS class for container', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    const container = screen.getByRole('heading', { name: /welcome to the home page/i }).closest('.home-container')
    expect(container).toBeInTheDocument()
  })
})
