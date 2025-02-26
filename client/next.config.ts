import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{
      hostname :"via.placeholder.com",
    },
  {
    hostname :"images.pexels.com",
  },
{
  hostname:"www.google.com"
},
{
  hostname:"inventory-management-16062000.s3.ap-south-1.amazonaws.com"
}
]
  }
};

export default nextConfig;
