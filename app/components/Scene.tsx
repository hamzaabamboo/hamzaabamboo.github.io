"use client";
import React from "react";

import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Overlay } from "./Overlay";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { useTheme } from "next-themes";

interface SceneProps {
  messages: AbstractIntlMessages;
  locale: string;
}
export default function Scene({ messages, locale }: SceneProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="relative w-full min-h-screen">
      {/* Fixed 3D Background - Theme Aware Fallback (Prevents Black-on-Black) */}
      <div className="fixed inset-0 z-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-700">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          {mounted && (
            <React.Suspense fallback={null}>
              <Experience isDark={isDark} />
            </React.Suspense>
          )}
        </Canvas>
      </div>

      {/* Native Scrollable HTML Overlay */}
      <div className="relative z-10 pointer-events-none will-change-transform">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Overlay />
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
