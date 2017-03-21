'use strict';

const fs = require('fs');
const camelCase = require('camel-case');
const imageComparison = require('../');
const path = require('path');
const helpers = require('./helpers');

describe('protractor-protractor-image-comparison', () => {
    const logName = camelCase(browser.logName);
    const dangerAlert = element(by.css('.uk-alert-danger'));

    let ADBScreenshot;

    // Chrome remembers the last postion when the url is loaded again, this will reset it.
    afterEach(() => browser.executeScript('window.scrollTo(0, 0);'));

    describe('compare screen', () => {
        beforeEach(done => {
            browser.getProcessedConfig()
                .then(_ => {
                    ADBScreenshot = _.capabilities.nativeWebScreenshot || false;

                    browser.imageComparson = new imageComparison({
                        baselineFolder: './test/baseline/mobile/',
                        blockOutStatusBar: true,
                        formatImageName: `{tag}-${logName}-{width}x{height}-dpr-{dpr}`,
                        nativeWebScreenshot: ADBScreenshot,
                        screenshotPath: './.tmp/'
                    });

                    return browser.get(browser.baseUrl);
                })
                .then(() => browser.sleep(1000))
                .then(done);
        });

        const examplePage = 'example-page-compare';

        it('should compare successful with a baseline', () => {
            expect(browser.imageComparson.checkScreen(examplePage, {ignoreAntialiasing: true})).toEqual(0);
        });
    });

    describe('compare element', () => {
        beforeEach(done => {
            browser.getProcessedConfig()
                .then(_ => {
                    ADBScreenshot = _.capabilities.nativeWebScreenshot || false;

                    browser.imageComparson = new imageComparison({
                        baselineFolder: './test/baseline/mobile/',
                        formatImageName: `{tag}-${logName}-{width}x{height}-dpr-{dpr}`,
                        nativeWebScreenshot: ADBScreenshot,
                        screenshotPath: './.tmp/'
                    });

                    return browser.get(browser.baseUrl);
                })
                .then(() => browser.sleep(1000))
                .then(done);
        });

        const dangerAlertElement = 'dangerAlert-compare';

        it('should compare successful with a baseline', () => {
            browser.executeScript('arguments[0].scrollIntoView();', dangerAlert.getWebElement())
                .then(() => browser.sleep(1000))
                .then(() => expect(browser.imageComparson.checkElement(dangerAlert, dangerAlertElement)).toEqual(0));
        });
    });

    describe('compare fullpage screenshot', () => {
        beforeEach(function () {
            browser.getProcessedConfig()
                .then(_ => {
                    ADBScreenshot = _.capabilities.nativeWebScreenshot || false;

                    browser.imageComparson = new imageComparison({
                        baselineFolder: './test/baseline/mobile/',
                        debug: false,
                        formatImageName: `{tag}-${logName}-{width}x{height}-dpr-{dpr}`,
                        nativeWebScreenshot: ADBScreenshot,
                        screenshotPath: './.tmp/'
                    });

                    return browser.get(browser.baseUrl);
                })
                .then(() => browser.sleep(2000));
        });

        const exampleFullPage = 'example-fullpage-compare';

        it('should compare successful with a baseline', () => {
            expect(browser.imageComparson.checkFullPageScreen(exampleFullPage, {ignoreAntialiasing: true})).toEqual(0);
        });
    });
});
