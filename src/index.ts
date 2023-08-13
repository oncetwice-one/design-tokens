require("dotenv").config();
import fs from "fs";
import path from "path";
import { generateColorToken } from "./libs/generateColorTokens";
import { generatePalette } from "./libs/generatePalette";

const FILE_ID = "yFEtRTBv8piX8VZyaFKdTN"; // File id can be obtained from the figma file link
const FETCH_URL = `https://api.figma.com/v1/files/${FILE_ID}`;
const FIGMA_API_KEY = process.env.FIGMA_API_KEY;

const main = async () => {
  try {
    await fetch(FETCH_URL, {
      method: "GET",
      headers: {
        "X-Figma-Token": FIGMA_API_KEY,
      },
    }).then(async (res) => {
      const data = await res.json();
      if (data.status === 403) throw "Invalid figma token / you can't access the file";

      const response = JSON.stringify(data, null, 2);
      fs.writeFileSync(`./src/response.json`, response);
    });

    const resultPath = path.join("src/results");
    if (!fs.existsSync(resultPath)) fs.mkdirSync(resultPath);

    let rawdata = fs.readFileSync("./src/response.json");
    const rawResponse = JSON.parse(rawdata.toString());

    const documentChild = rawResponse.document.children;
    const primitive = documentChild.find((child) => child.name === "Primitive");

    const rawPalette = primitive.children.find((child) => child.name === "Colors Palette");
    generatePalette(rawPalette.children[1]);

    const ions = documentChild.find((child) => child.name.toLowerCase().includes("ions"));
    generateColorToken(ions);
  } catch (error) {
    console.log(error);
  }
};

main();
