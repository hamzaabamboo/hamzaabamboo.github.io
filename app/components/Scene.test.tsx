import { render } from '@testing-library/react'
import Scene from './Scene'
import { describe, it, vi, expect } from 'vitest'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: any }) => <div>CanvasMock {children}</div>,
  useFrame: vi.fn(),
  useThree: () => ({ camera: { position: { z: 0 } } })
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', systemTheme: 'dark' })
}))

vi.mock('./Experience', () => ({
  Experience: () => <div>ExperienceMock</div>
}))

vi.mock('./Overlay', () => ({
  Overlay: () => <div>OverlayMock</div>
}))

describe('Scene', () => {
  it('renders structure correctly', () => {
    const mockMessages = { Overlay: { title: 'Test' } }
    const { getByText } = render(<Scene messages={mockMessages} locale="en" />)
    expect(getByText('CanvasMock')).toBeInTheDocument()
    expect(getByText('OverlayMock')).toBeInTheDocument()
  })
})