import Differencify from '../oldTests/index';

const differencify = new Differencify({ debug: false, headless: false });

describe('Differencify', () => {
  beforeAll(async () => {
    await differencify.launchBrowser({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  });
  afterAll(async () => {
    await differencify.cleanup();
  });
  it('simple unchained', async () => {
    const target = differencify.init({ chain: false });
    const page = await target.newPage();
    await page.goto('https://demo.sightmachine.io/');
    await page.setViewport({ width: 1600, height: 1200 });
    await page.waitFor(1000);
    const image = await page.screenshot();
    const result = await target.toMatchSnapshot(image);
    await page.close();
    expect(result).toEqual(true);
  }, 30000);
  it('Launch new browser per test when unchained', async () => {
    const target = differencify.init({ chain: false });
    await target.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await target.newPage();
    await page.goto('https://demo.sightmachine.io/');
    await page.setViewport({ width: 1600, height: 1200 });
    await page.waitFor(1000);
    const image = await page.screenshot();
    const result = await target.toMatchSnapshot(image);
    await page.close();
    await target.close();
    expect(result).toEqual(true);
  }, 30000);
  it('Using toMatchSnapshot callback for result details', async () => {
    await differencify
      .init()
      .newPage()
      .setViewport({ width: 1600, height: 1200 })
      .goto('https://demo.sightmachine.io/')
      .waitFor(1000)
      .title()
      .screenshot()
      .toMatchSnapshot((resultDetail) => {
        expect(resultDetail).toEqual({
          testConfig: {
            chain: true,
            imageType: 'png',
            isJest: true,
            isUpdate: false,
            testId: 6,
            testName: 'Differencify Using toMatchSnapshot callback for result details',
            testNameProvided: false,
            testPath: '/differencify/src/sm/sm1.test.js',
          },
          testResult: {
            diffPercent: 0,
            distance: 0,
            matched: true,
            snapshotPath:
              '/differencify/src/sm/__image_snapshots__/Differencify Using toMatchSnapshot callback for result details.snap.png',
          },
        });
      })
      .close()
      .end();
  }, 30000);
  it('Multiple toMatchSnapshot when unchained', async () => {
    const target = differencify.init({ chain: false });
    const page = await target.newPage();
    await page.goto('http://example.com/');
    await page.setViewport({ width: 1600, height: 1200 });
    await page.waitFor(1000);
    const image = await page.screenshot();
    const result = await target.toMatchSnapshot(image);
    await page.goto('http://example.net/');
    await page.setViewport({ width: 1600, height: 1200 });
    await page.waitFor(1000);
    const image2 = await page.screenshot();
    const result2 = await target.toMatchSnapshot(image2);
    await page.close();
    expect(result).toEqual(true);
    expect(result2).toEqual(true);
  }, 30000);
  it('Custom test name', async () => {
    const target = differencify.init({
      testName: 'test1',
      chain: false,
    });
    const page = await target.newPage();
    await page.goto('http://example.com/');
    await page.setViewport({ width: 1600, height: 1200 });
    await page.waitFor(1000);
    const image = await page.screenshot();
    const result = await target.toMatchSnapshot(image);
    await page.close();
    expect(result).toEqual(true);
  }, 30000);
  it('Custom test path', async () => {
    const customDifferencify = new Differencify({
      imageSnapshotPath: './src/integration.tests/__image_snapshots__/custom_test_path',
      debug: true,
    });
    await customDifferencify.launchBrowser({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const target = customDifferencify.init({
      chain: false,
    });
    const page = await target.newPage();
    await page.setViewport({ width: 1600, height: 1200 });
    await page.goto('http://example.com/');
    await page.waitFor(1000);
    const image = await page.screenshot();
    const result = await target.toMatchSnapshot(image);
    await page.close();
    await customDifferencify.cleanup();
    expect(result).toEqual(true);
  }, 30000);
  it('Freeze image in page', async () => {
    await differencify
      .init()
      .newPage()
      .setViewport({ width: 1600, height: 1200 })
      .goto('https://i.giphy.com/media/xTiTnoUnHxVaaVNWhO/giphy.webp')
      .waitFor('body > img')
      .freezeImage('body > img')
      .screenshot()
      .toMatchSnapshot()
      .close()
      .end();
  }, 30000);
  it('simple with mock requests', async () => {
    await differencify
      .init()
      .newPage()
      .mockRequests()
      .setViewport({ width: 1600, height: 1200 })
      .goto('http://example.com/')
      .waitFor(1000)
      .screenshot()
      .toMatchSnapshot()
      .close()
      .end();
  }, 30000);
  it('simple unchained with mock requests', async () => {
    const target = differencify.init({ chain: false });
    const page = await target.newPage();
    await target.mockRequests();
    await page.goto('http://example.com/');
    await page.setViewport({ width: 1600, height: 1200 });
    await page.waitFor(1000);
    const image = await page.screenshot();
    const result = await target.toMatchSnapshot(image);
    await page.close();
    expect(result).toEqual(true);
  }, 30000);
});
