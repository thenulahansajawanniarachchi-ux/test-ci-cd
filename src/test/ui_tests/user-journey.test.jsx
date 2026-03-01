import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from '../../App'

describe('User Journey UI Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('complete user journey: login -> home -> logout', async () => {
    render(<App />)
    
    // Step 1: Verify login page is displayed
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    
    // Step 2: Fill login form
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    
    // Step 3: Submit login form
    fireEvent.click(loginButton)

    // Step 4: Verify navigation to home page
    expect(screen.getByRole('heading', { name: /welcome to the home page/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
    
    // Step 5: Click logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)

    // Step 6: Verify redirect back to login page
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  it('handles invalid login attempts gracefully', async () => {
    render(<App />)
    
    // Try to login with empty username
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    
    // Form should not submit due to HTML5 validation
    fireEvent.click(loginButton)
    
    // Should still be on login page
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  it('handles whitespace-only username gracefully', async () => {
    render(<App />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: '   ' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(loginButton)

    // Should still be on login page (whitespace-only username is invalid)
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  it('validates form fields correctly', () => {
    render(<App />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    // Both fields should be required
    expect(usernameInput).toBeRequired()
    expect(passwordInput).toBeRequired()
    
    // Check field types
    expect(usernameInput).toHaveAttribute('type', 'text')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('maintains form state during user interactions', () => {
    render(<App />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    // Type and verify values
    fireEvent.change(usernameInput, { target: { value: 'john_doe' } })
    fireEvent.change(passwordInput, { target: { value: 'secret123' } })

    expect(usernameInput.value).toBe('john_doe')
    expect(passwordInput.value).toBe('secret123')

    // Clear and verify
    fireEvent.change(usernameInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: '' } })

    expect(usernameInput.value).toBe('')
    expect(passwordInput.value).toBe('')
  })
})
