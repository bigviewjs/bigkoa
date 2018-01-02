// http://nightwatchjs.org/guide#settings-file

const fs = require('fs');
const path = require('path');

let srcFolders = ['test/e2e/specs'];

// 如果测试模式是测试插件
if (process.env.KPLAYER_TEST_MODE === 'plugin_test') {
    srcFolders = [];
    const packagesPath = path.resolve(__dirname, '../../packages');
    const folderList = fs.readdirSync(packagesPath);
    // 如果是插件目录则添加到srcFolders
    folderList.forEach(function (item) {
        if (/plugin/.test(item)) {
            item = path.resolve(packagesPath, item, 'test/e2e');
            srcFolders.push(item);
        }
    });
}

module.exports = {
    'src_folders': srcFolders,
    'output_folder': 'test/e2e/reports',
    'custom_commands_path': ['node_modules/nightwatch-helpers/commands'],
    'custom_assertions_path': ['node_modules/nightwatch-helpers/assertions'],

    'selenium': {
        'start_process': true,
        'server_path': require('selenium-server').path,
        'host': '127.0.0.1',
        'port': 4444,
        'cli_args': {
            'webdriver.chrome.driver': require('chromedriver').path
            // , 'webdriver.gecko.driver': require('geckodriver').path
        }
    },

    'test_settings': {
        'default': {
            'selenium_port': 4444,
            'selenium_host': 'localhost',
            'silent': true,
            'screenshots': {
                'enabled': true,
                'on_failure': true,
                'on_error': false,
                'path': 'test/e2e/screenshots'
            }
        },

        'chrome': {
            'desiredCapabilities': {
                'browserName': 'chrome',
                'javascriptEnabled': true,
                'acceptSslCerts': true
            }
        }
    }
}
