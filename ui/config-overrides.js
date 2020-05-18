const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

/* config-overrides.js */
module.exports = {
    webpack: function override(config, env) {
        config = rewireAliases.aliasesOptions({
            '@': path.resolve(__dirname, `${paths.appSrc}/`)
        })(config, env);
        return config;
    }
}