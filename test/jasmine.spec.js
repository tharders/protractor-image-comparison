'use strict';

const fs = require('fs');
const camelCase = require('camel-case');
const imageComparison = require('../');
const path = require('path');
const screenshotPath = path.resolve(__dirname, '../.tmp/actual/');
const differencePath = path.resolve(__dirname, '../.tmp/diff/');
const helpers = require('./helpers');

describe('protractor-image-comparison', () => {
    beforeEach(done => {
        browser.imageComparson = new imageComparison({
            baselineFolder: './test/baseline/desktop/',
            debug: false,
            formatImageName: `{tag}-${logName}-{width}x{height}-dpr-{dpr}`,
            screenshotPath: './.tmp/'
        });

        browser.get(browser.baseUrl)
            .then(() => browser.sleep(500))
            .then(done);
    });

    // Chrome remembers the last postion when the url is loaded again, this will reset it.
    afterEach(() => browser.executeScript('window.scrollTo(0, 0);'));

    const logName = camelCase(browser.logName);
    const resolution = '1366x768';
    const dangerAlert = element(by.css('.uk-alert-danger'));
    const headerElement = element(by.css('h1.uk-heading-large'));


    describe('compare screen', () => {
        const examplePage = 'example-page-compare';
        const examplePageFail = `${examplePage}-fail`;

        it('should compare successful with a baseline', () => {
            expect(browser.imageComparson.checkScreen(examplePage)).toEqual(0);
        });
    });

    describe('compare element', () => {
        const dangerAlertElement = 'dangerAlert-compare';
        const dangerAlertElementFail = `${dangerAlertElement}-fail`;

        it('should compare successful with a baseline', () => {
            browser.executeScript('arguments[0].scrollIntoView();', dangerAlert.getWebElement())
                .then(() => browser.sleep(500))
                .then(() => expect(browser.imageComparson.checkElement(dangerAlert, dangerAlertElement)).toEqual(0));
        });
    });

    describe('compare fullpage screenshot', () => {
        const exampleFullPage = 'example-fullpage-compare';
        const examplePageFail = `${exampleFullPage}-fail`;

        it('should compare successful with a baseline', () => {
            expect(browser.imageComparson.checkFullPageScreen(exampleFullPage)).toEqual(0);
        });
    });
});