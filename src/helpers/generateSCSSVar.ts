const PREFIX = "ot-color";
export function generateSCSSVariables(jsonData: any) {
  let scss = "";

  for (const category in jsonData) {
    const colors = jsonData[category];

    for (const shade in colors) {
      scss += `$${PREFIX}-${category}-${shade}: ${colors[shade]};\n`;
    }
  }

  return scss;
}

export function generateGroupSCSSVariables(jsonData: any) {
  let scss = "";

  for (const category in jsonData) {
    scss += `$${PREFIX}-${category}: (\n`;
    const colors = jsonData[category];

    for (const shade in colors) {
      scss += `  ${shade}: $${PREFIX}-${category}-${shade},\n`;
    }

    scss += ");\n\n";
  }

  return scss;
}
