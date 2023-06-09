require("dotenv").config

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY
  }
}
