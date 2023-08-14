import fs from "fs";
import path from "path";
import getCurrentDateTime from "../helpers/getCurrentDateTime";
import generateSCSSString from "../helpers/generateSCSSString";

export const generateColorToken = (rawColorTokens: any) => {
  try {
    const mainPath = path.join("src/results/tokens");
    if (!fs.existsSync(mainPath)) fs.mkdirSync(mainPath);

    const res = [];

    for (const rawTokens of rawColorTokens.children) {
      const pageName = rawTokens.name.toLowerCase();
      const fileName = pageName.split(" ")[0];

      if (pageName.includes("color tokens")) {
        const scssVar = [],
          newProps = {},
          rawTsString = [];
        let scssGroupVars = "";

        const sectionContent = rawTokens.children[1];
        const contents = sectionContent.children.find((child) => child.name === "Contents");
        for (const content of contents.children) {
          const properties: any = {};
          const rawProperties = content.componentProperties;
          for (const key in rawProperties) {
            const newKey = key.replace(/#\d+:\d+/, ""); // Remove component id
            properties[newKey] = rawProperties[key];
          }

          const { token, value, isLink } = properties;
          const variableValue = isLink.value ? "var(--" + value.value + ")" : value.value;

          newProps[token.value] = variableValue;
          const variable = `${token.value}: ${variableValue}`;

          scssVar.push(variable);
          res.push(properties);
        }

        // Generate typescript const
        const tsString = `export const ${fileName.toLowerCase()} = ${JSON.stringify(newProps, null, 2)} as const`;
        rawTsString.push(tsString);

        // Generate typescript file
        const tsStringRes = rawTsString.join("\n\n");
        fs.writeFileSync(`${mainPath}/${fileName}.ts`, tsStringRes);

        // Generate JSON file
        const tokens = JSON.stringify(newProps, null, 2);
        fs.writeFileSync(`${mainPath}/${fileName}.json`, tokens);

        const generateSCSSFile = () => {
          const scssGroupKeys = Object.keys(newProps);
          const scssSingleVars = scssVar.join(";\n$");

          for (const key of scssGroupKeys) {
            scssGroupVars += `${key}: $${key},\n`;
          }

          const scssString = generateSCSSString(scssSingleVars, fileName, scssGroupVars);
          fs.writeFileSync(`${mainPath}/${fileName}.scss`, scssString);
        };
        generateSCSSFile();

        const currentDate = getCurrentDateTime();
        const markdownContent = `### ${currentDate} (UTC)\nAuto generate on ${currentDate} (UTC).`;
        fs.writeFileSync(`${mainPath}/README.md`, markdownContent, { encoding: "utf-8" });
      }
    }

    return res;
  } catch (error) {
    console.log("Cannot generate tokens");
    console.log(error);
  }
};
