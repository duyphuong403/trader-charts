const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "src",
        tsConfigPath: "tsconfig.extend.json",
        debug: false
      }
    },
    { plugin: require('@semantic-ui-react/craco-less') },
  ]
}
