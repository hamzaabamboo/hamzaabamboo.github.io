import repos from "../data/repos.json";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Repo {
  name: string;
  description: string;
  url: string;
  homepageUrl: string;
  stargazerCount: number;
  languages: { size: number; node: { name: string } }[];
  openGraphImageUrl: string;
  screenshotPath?: string | null;
}

const HIGHLIGHTS = ["pazuru-pico", "aibou", "video-clipper"];

export function Overlay() {
  const t = useTranslations("Overlay");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const highlightRepos = (repos as Repo[]).filter((r) =>
    HIGHLIGHTS.includes(r.name)
  );
  const otherRepos = (repos as Repo[]).filter(
    (r) => !HIGHLIGHTS.includes(r.name)
  );

  const deployedRepos = otherRepos.filter((r) => r.homepageUrl);
  const libRepos = otherRepos.filter((r) => !r.homepageUrl);

  return (
    <div className="w-full text-zinc-900 dark:text-white p-10 font-sans pointer-events-auto relative">
      {/* Language / Theme Toggles */}
      <div className="absolute top-10 right-10 z-50 flex gap-4">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 bg-black/10 dark:bg-white/10 rounded-full backdrop-blur hover:bg-black/20 dark:hover:bg-white/20 uppercase text-xs tracking-widest border border-black/20 dark:border-white/20"
          >
            {theme === "dark" ? "LIGHT MODE" : "DARK MODE"}
          </button>
        )}
        <div className="flex gap-2">
          <a
            href="/en"
            className="px-3 py-2 bg-black/10 dark:bg-white/10 rounded-full hover:bg-black/20 dark:hover:bg-white/20 text-xs"
          >
            EN
          </a>
          <a
            href="/ja"
            className="px-3 py-2 bg-black/10 dark:bg-white/10 rounded-full hover:bg-black/20 dark:hover:bg-white/20 text-xs"
          >
            JP
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-4 tracking-tighter text-zinc-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.3em] sm:tracking-[0.5em] text-cyan-600 dark:text-cyan-300 animate-pulse">
          {t("subtitle")}
        </p>
        <div className="mt-20 animate-bounce">{t("scrollHint")}</div>
      </section>

      {/* Highlights Section */}
      <section className="min-h-screen py-20">
        <h2 className="text-6xl font-bold mb-20 text-center uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          {t("featured")}
        </h2>
        <div className="flex flex-col gap-32 max-w-6xl mx-auto">
          {highlightRepos.map((repo, i) => (
            <div
              key={repo.name}
              className={`flex flex-col ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-10 items-center group`}
            >
              <div className="flex-1 w-full relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.2)] border border-black/10 dark:border-white/10 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={repo.screenshotPath || repo.openGraphImageUrl}
                  alt={repo.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
              </div>
              <div className="flex-1 space-y-6 text-left">
                <h3 className="text-5xl font-black uppercase tracking-tighter group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {repo.name}
                </h3>
                <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed border-l-4 border-cyan-500 pl-6">
                  {repo.description || t("noDescription")}
                </p>
                <div className="flex gap-4 flex-wrap">
                  {repo.languages.slice(0, 4).map((lang, j) => (
                    <span
                      key={j}
                      className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-sm font-bold tracking-widest uppercase text-cyan-700 dark:text-cyan-200"
                    >
                      {lang.node.name}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <a
                    href={repo.homepageUrl || repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-widest rounded-full transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                  >
                    {t("launch")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deployed Apps Grid */}
      <section className="min-h-screen py-20">
        <h2 className="text-4xl font-bold mb-10 border-b border-black/20 dark:border-white/20 pb-4">
          {t("deployed")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deployedRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-80 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-cyan-500/50 transition-all hover:-translate-y-2"
            >
              <Image
                src={repo.screenshotPath || repo.openGraphImageUrl}
                alt={repo.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 dark:from-black dark:via-black/50 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold uppercase tracking-tight text-black dark:text-white">
                  {repo.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-2">
                  {repo.description || t("noDescription")}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* The Archives (Libs/Code) */}
      <section className="py-20 mb-20">
        <h2 className="text-4xl font-bold mb-10 border-b border-black/20 dark:border-white/20 pb-4">
          {t("libs")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {libRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 rounded-lg transition-colors group"
            >
              <h3 className="font-mono text-lg text-cyan-700 dark:text-cyan-300 mb-2 group-hover:underline">
                {repo.name}
              </h3>
              <p className="text-xs text-zinc-500 mb-4 h-8 line-clamp-2">
                {repo.description || t("noDescription")}
              </p>
              <div className="flex flex-wrap gap-2">
                {repo.languages.slice(0, 2).map((l, k) => (
                  <span
                    key={k}
                    className="text-[10px] uppercase bg-white/50 dark:bg-black/30 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400"
                  >
                    {l.node.name}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="text-center py-20 text-zinc-600 text-xs tracking-[0.5em] uppercase">
        {t("footer")}
      </footer>
    </div>
  );
}
