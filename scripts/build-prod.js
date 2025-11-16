const utils = require('./utils');
const { execSync } = require('child_process');

console.log('Building project (production):');

utils.clean();
utils.copyStatic();

console.log('Bundling with Webpack...');
try {
    execSync('npx webpack --config webpack.config.js', { stdio: 'inherit' });
    console.log('Webpack bundle created.');
} catch (e) {
    console.error('❌ Webpack error', e);
    process.exit(1);
}

utils.zip();
console.log('Finished!');
