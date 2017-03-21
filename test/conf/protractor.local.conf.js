let config = require('./protractor.shared.conf.js').config;

config.specs= ['../jasmine.spec.js'];

config.seleniumAddress = 'http://localhost:4444/wd/hub';

config.multiCapabilities = [
    {
        browserName: 'chrome',
        logName: "Chrome",
        'chromeOptions': {
            args: ['disable-infobars']
        },
        shardTestFiles: true,
    }
    ,
    {
        browserName: 'firefox',
        logName: 'Firefox',
        shardTestFiles: true
    }
];

exports.config = config;
