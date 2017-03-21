'use strict';

const fs = require('fs');
const camelCase = require('camel-case');
const imageComparison = require('../');
const path = require('path');
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

    xdescribe('basics', () => {
        it('should copy an image to the baseline when autoSaveBaseline is true', () => {
            const tagName = 'autoSaveBaseline';
            const baselineFolder = path.resolve(__dirname, '../.tmp/baseline/desktop/');

            browser.imageComparson = new imageComparison({
                baselineFolder: baselineFolder,
                autoSaveBaseline: true,
                formatImageName: `{tag}-${logName}-{width}x{height}-dpr-{dpr}`,
                screenshotPath: './.tmp/'
            });

            expect(helpers.fileExistSync(`${baselineFolder}/${tagName}-${logName}-${resolution}-dpr-1.png`)).toBe(false, 'Error: Baseline image already exists.');
            browser.imageComparson.checkScreen(tagName)
                .then(() => expect(helpers.fileExistSync(`${baselineFolder}/${tagName}-${logName}-${resolution}-dpr-1.png`)).toBe(true, 'File is saved in the baseline'));
        });
    });

    describe('compare screen', () => {
        const examplePage = 'example-page-compare';

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

        xit('should fail comparing with a baseline', () => {
            browser.executeScript('arguments[0].scrollIntoView(); arguments[0].style.color = "#2d7091";arguments[0].style.background = "#0afd02";', dangerAlert.getWebElement())
                .then(() => browser.sleep(5000))
                .then(() => expect(browser.imageComparson.checkElement(dangerAlert, dangerAlertElementFail)).toBeGreaterThan(0));
        });
    });

    describe('compare fullpage screenshot', () => {
        const exampleFullPage = 'example-fullpage-compare';

        it('should compare successful with a baseline', () => {
            expect(browser.imageComparson.checkFullPageScreen(exampleFullPage)).toEqual(0);
        });
    });
});