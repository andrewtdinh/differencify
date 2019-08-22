import Differencify from '../oldTests/index';

const differencify = new Differencify({ debug: true, headless: false });

(async () => {
  await differencify
    .init()
    .launch()
    .newPage()
    .setViewport({ width: 1600, height: 1200 })
    .goto('https://demo.sightmachine.io')
    .waitFor(1000)
    .screenshot()
    .toMatchSnapshot()
    .result((result) => {
      console.log(result);
    })
    .close()
    .end();
})();
