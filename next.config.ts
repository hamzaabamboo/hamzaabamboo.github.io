import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default withNextIntl(nextConfig);