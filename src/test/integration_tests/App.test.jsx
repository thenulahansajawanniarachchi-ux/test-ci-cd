import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from '../../App'

describe('App Component Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders login page by default', () => {
    render(<App />)
    
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('renders login form with correct structure', () => {
    render(<App />)
    
    // Check form elements exist
    expect(screen.getByLabelText(/username/i)).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: /login/i })).toHaveAttribute('type', 'submit')
  })

  it('allows form input and submission', async () => {
    render(<App />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    // Fill form
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })

    // Verify values are set
    expect(usernameInput.value).toBe('testuser')
    expect(passwordInput.value).toBe('testpass')

    // Submit form - should navigate to home page
    fireEvent.click(loginButton)
    
    // Should show home page after successful login
    expect(screen.getByRole('heading', { name: /welcome to the home page/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('validates required fields', () => {
    render(<App />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    // Both fields should be required
    expect(usernameInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })

  it('handles form interactions correctly', () => {
    render(<App />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    // Test typing in fields
    fireEvent.change(usernameInput, { target: { value: 'user123' } })
    fireEvent.change(passwordInput, { target: { value: 'pass123' } })

    expect(usernameInput.value).toBe('user123')
    expect(passwordInput.value).toBe('pass123')

    // Clear fields
    fireEvent.change(usernameInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: '' } })

    expect(usernameInput.value).toBe('')
    expect(passwordInput.value).toBe('')
  })
})
