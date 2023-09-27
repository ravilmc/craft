/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/ravilmc/editor",
        permanent: true,
      },
      {
        source: "/npm",
        destination: "https://www.npmjs.com/package/@ravilmc/editor",
        permanent: true,
      },
      {
        source: "/feedback",
        destination: "https://github.com/ravilmc/editor/issues",
        permanent: true,
      },
    ];
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
