const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const withSass = require('@zeit/next-sass')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = withSass({
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }
    // Add dotenv variable
    config.plugins.push(new Dotenv({
      path: '../.env'
    }))

    // Add alias paths
    // Synchronize it with the alias defined in tsconfig.json
    config.resolve.alias['@components'] = path.join(__dirname, 'components')
    config.resolve.alias['@layout'] = path.join(__dirname, 'layout')
    config.resolve.alias['@services'] = path.join(__dirname, 'services')

    return config
  }
})
