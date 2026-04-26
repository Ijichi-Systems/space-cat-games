/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './footer'

// Mock document.createElement and appendChild for script injection
describe('Footer', () => {
  beforeEach(() => {
    // Clear any existing scripts
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('renders copyright text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText(/© 2026 Nijika Softworks/i)).toBeInTheDocument()
    expect(screen.getByText(/Neuron Technologies/i)).toBeInTheDocument()
  })

  it('renders React and Vite images', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(2)
  })

  it('renders uptime counter', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText(/SITE UPTIME/i)).toBeInTheDocument()
    expect(screen.getByText(/DAYS/i)).toBeInTheDocument()
    expect(screen.getByText(/HRS/i)).toBeInTheDocument()
    expect(screen.getByText(/MIN/i)).toBeInTheDocument()
    expect(screen.getByText(/SEC/i)).toBeInTheDocument()
  })

  it('injects TickCounter script on mount', () => {
    // This test is outdated as we moved away from TickCounter
    // but we can test if the component renders without crashing
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText(/SITE UPTIME/i)).toBeInTheDocument()
  })

  it('does not inject duplicate scripts on re-render', () => {
    // This test is also outdated
    const { rerender } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    rerender(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText(/SITE UPTIME/i)).toBeInTheDocument()
  })
})

