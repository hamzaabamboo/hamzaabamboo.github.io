import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import repos from '../../../data/repos.json'
import ProjectBackground from '../../../components/ProjectBackground'

interface Repo {
  name: string
  description: string
  url: string
  homepageUrl: string
  stargazerCount: number
  languages: { size: number, node: { name: string } }[]
  openGraphImageUrl: string
  screenshotPath?: string | null
}

export async function generateStaticParams() {
  const locales = ['en', 'ja']
  return locales.flatMap((locale) => 
    (repos as Repo[]).map((repo) => ({
      locale,
      name: repo.name,
    }))
  )
}

export default async function ProjectPage({ params }: { params: Promise<{ name: string, locale: string }> }) {
  const { name, locale } = await params
  
  setRequestLocale(locale)

  const repo = (repos as Repo[]).find((r) => r.name === name)

  if (!repo) {
    notFound()
  }

  const t = await getTranslations({locale, namespace: 'Project'})

  return (
    <main className="min-h-screen text-zinc-900 dark:text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      
      {/* 3D Background */}
      <ProjectBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24">
        
        {/* Header / Nav */}
        <div className="mb-12 md:mb-24">
          <Link 
            href={`/${locale}`}
            className="group inline-flex items-center gap-2 text-sm md:text-base font-bold uppercase tracking-widest text-zinc-500 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400 transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {t('back')}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Visual Side */}
          <div className="space-y-8">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,255,255,0.15)] group">
              <Image
                src={repo.screenshotPath || repo.openGraphImageUrl}
                alt={repo.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            <div className="flex gap-4">
              {repo.homepageUrl && (
                <a 
                  href={repo.homepageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-500 text-black text-center font-black uppercase tracking-widest rounded-xl transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                >
                  {t('visitSite')}
                </a>
              )}
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex-1 py-4 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-center font-black uppercase tracking-widest rounded-xl transition-all ${!repo.homepageUrl ? 'w-full' : ''}`}
              >
                {t('viewSource')}
              </a>
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 leading-[0.9] mb-8 break-words">
                {repo.name}
              </h1>
              <p className="text-xl md:text-2xl font-light text-zinc-600 dark:text-zinc-300 leading-relaxed border-l-4 border-cyan-500 pl-6">
                {repo.description || "No description provided."}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                {t('languages')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {repo.languages.map((lang, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg font-mono text-sm text-cyan-700 dark:text-cyan-400"
                  >
                    {lang.node.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 text-xs text-zinc-400 font-mono">
              REPO ID: {btoa(repo.url).substring(0, 12)}...
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
