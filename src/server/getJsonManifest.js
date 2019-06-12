const { writeFileSync, existsSync } = require("fs");
const axios = require("axios");

axios.defaults.headers.common["X-API-KEY"] = process.env.API_KEY;

module.exports = async () => {
  try {
    const {
      data: {
        Response: {
          jsonWorldContentPaths: { en }
        }
      }
    } = await axios("https://www.bungie.net/platform/Destiny2/Manifest/");

    const pathArray = en.split("/");
    const serverFileName = pathArray[pathArray.length - 1];
    const isFile = existsSync(`/tmp/${serverFileName}`);

    if (!isFile) {
      const { data } = await axios(`https://www.bungie.net${en}`);
      writeFileSync(`/tmp/${serverFileName}`, JSON.stringify(data));
      return true;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
