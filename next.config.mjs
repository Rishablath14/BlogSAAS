/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'utfs.io'
            },
            {
                protocol: 'https',
                hostname: 'amrvlfmltd5p0rog.public.blob.vercel-storage.com',
                port: '',
              },
        ]
    }
};

export default nextConfig;
