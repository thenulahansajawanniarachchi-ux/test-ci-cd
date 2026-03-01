import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Login from '../../pages/Login'

// Mock the useNavigate hook
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Login Component', () => {
  const mockOnLogin = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    )

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('allows user to type in username and password fields', () => {
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    )

    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })

    expect(usernameInput.value).toBe('testuser')
    expect(passwordInput.value).toBe('testpass')
  })

  it('calls onLogin and navigates to home on successful login', async () => {
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    )

    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/home')
    })
  })

  it('does not call onLogin when username is empty', async () => {
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    )

    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(usernameInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    
    // Find the form using closest method
    const form = usernameInput.closest('form')
    if (form) {
      fireEvent.submit(form)
    }

    expect(mockOnLogin).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('handles whitespace-only username correctly', async () => {
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    )

    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: '   ' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnLogin).not.toHaveBeenCalled()
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })
})
