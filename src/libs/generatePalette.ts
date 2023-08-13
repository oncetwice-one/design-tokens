import fs from "fs";
import path from "path";
import { figmaRGBAToRGB } from "../helpers/convertColor";
import { generateSCSSVariables, generateGroupSCSSVariables } from "../helpers/generateSCSSVar";
import getCurrentDateTime from "../helpers/getCurrentDateTime";

export const generatePalette = (rawPalette: any) => {
  try {
    let res = {};
    const rawTsString = [];
    const contents = rawPalette.children;

    for (const section of contents) {
      let value = {};
      const sectionContent = section.children;
      const name = sectionContent[0].name;
      const colorsContainer = sectionContent[1].children;

      for (const colorCard of colorsContainer) {
        const RECTANGLE = colorCard.children[0];
        const METADATA = colorCard.children[1];
        const GROUP_VALUE = METADATA.children[0];
        const RAW_VALUE = GROUP_VALUE.children[0].characters;

        const fill = RECTANGLE.fills[0];
        const rawColor = figmaRGBAToRGB(fill.color);
        const color = `rgba(${rawColor.join(", ")})`;

        value[RAW_VALUE] = color;
      }

      // Generate typescript const
      const tsString = `export const ${name.toLowerCase()} = ${JSON.stringify(value, null, 2)} as const`;
      rawTsString.push(tsString);

      res[name.toLowerCase()] = value;
    }

    const mainPath = path.join("src/colors");
    if (!fs.existsSync(mainPath)) fs.mkdirSync(mainPath);

    // Generate typescript file
    const tsStringRes = rawTsString.join("\n\n");
    fs.writeFileSync(`${mainPath}/palettes.ts`, tsStringRes);

    // Generate JSON file
    const palletes = JSON.stringify(res, null, 2);
    fs.writeFileSync(`${mainPath}/palettes.json`, palletes);

    // Generate SCSS file with single var
    const scssCode = generateSCSSVariables(res);
    fs.writeFileSync(`${mainPath}/palettes.scss`, scssCode);

    // Generate SCSS file with group var
    const scssCodeGroup = generateGroupSCSSVariables(res);
    fs.writeFileSync(`${mainPath}/palettes.map.scss`, scssCodeGroup);

    const currentDate = getCurrentDateTime();
    const markdownContent = `### ${currentDate} (UTC)\nAuto generate on ${currentDate} (UTC).`;
    fs.writeFileSync(`${mainPath}/README.md`, markdownContent, { encoding: "utf-8" });

    return res;
  } catch (error) {
    console.log("Cannot generate palettes");
    console.log(error);
  }
};
