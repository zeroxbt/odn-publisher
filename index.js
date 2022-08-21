require("dotenv").config();
const { setTimeout } = require("timers/promises");
const { publish, get } = require("./src/queries/queryOTNode");
const apis = require("./src/util/apis");

(async () => {
  while (true) {
    for (const api of apis) {
      console.log(`About to publish dataset taken from ${api.name}`);
      const data = await api.getData();
      const publishResult = await publish(data);
      if (publishResult?.UAL) {
        get(publishResult.UAL);
      }
      await setTimeout(5 * 1000);
    }
  }
})();
