import { render, screen } from '@testing-library/react'
import { Overlay } from './Overlay'
import { describe, it, expect, vi } from 'vitest'

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}))

// Mock repos.json
vi.mock('../data/repos.json', () => ({
  default: [
    {
      name: 'pazuru-pico',
      description: 'Puyo-puyo game',
      url: 'http://github.com/hamzaabamboo/pazuru-pico',
      homepageUrl: 'https://hamzaabamboo.github.io/pazuru-pico',
      languages: [{ size: 100, node: { name: 'TypeScript' } }],
      openGraphImageUrl: 'img.png',
      screenshotPath: '/screenshots/pazuru-pico.png'
    },
    {
      name: 'other-app',
      description: 'Some other app',
      url: 'http://github.com/other',
      homepageUrl: 'http://other.com',
      languages: [{ size: 100, node: { name: 'JavaScript' } }],
      openGraphImageUrl: 'img.png'
    },
    {
      name: 'some-lib',
      description: 'A library',
      url: 'http://github.com/lib',
      homepageUrl: '',
      languages: [{ size: 100, node: { name: 'Rust' } }],
      openGraphImageUrl: 'img.png'
    }
  ]
}))

describe('Overlay', () => {
  it('renders the main heading', () => {
    render(<Overlay />)
    // t('title') returns 'title'
    expect(screen.getByText('title')).toBeInTheDocument()
  })

  it('renders highlights correctly', () => {
    render(<Overlay />)
    expect(screen.getByText('featured')).toBeInTheDocument()
    expect(screen.getByText('pazuru-pico')).toBeInTheDocument()
    expect(screen.getByText('Puyo-puyo game')).toBeInTheDocument()
  })

  it('renders deployed apps', () => {
    render(<Overlay />)
    expect(screen.getByText('deployed')).toBeInTheDocument()
    expect(screen.getByText('other-app')).toBeInTheDocument()
  })

  it('renders libraries', () => {
    render(<Overlay />)
    expect(screen.getByText('libs')).toBeInTheDocument()
    expect(screen.getByText('some-lib')).toBeInTheDocument()
  })
})