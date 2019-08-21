const Differencify = require("differencify");
const differencify = new Differencify({ debug: true });

(async () => {
  const result = await differencify
    .init()
    .launch()
    .newPage()
    .setViewport({ width: 1600, height: 1200 })
    .goto("https://demo.sightmachine.io")
    .waitFor(1000)
    .screenshot()
    .toMatchSnapshot()
    .result(result => {
      console.log(result);
    })
    .close()
    .end();
})();
