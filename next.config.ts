import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// This is the only config file. A separate next.config.js used to exist and,
// because Next loads .js before .ts, silently replaced this one.
const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.100"],
};

// Blog bodies in content/blog/*.mdx are imported by app/blog/[slug].
// Plugins are named as strings so Turbopack can load them; remark-gfm adds
// tables, which the posts use.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
