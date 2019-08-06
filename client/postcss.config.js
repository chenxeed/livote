const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project 
  content: [
    './src/**/*.tsx',
  ],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-css-variables'),
    tailwindcss('./tailwind.config.js'),
    autoprefixer(),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}
