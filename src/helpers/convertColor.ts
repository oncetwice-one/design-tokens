const namesRGB = ["r", "g", "b"];

export const figmaRGBAToRGB = (color: any) => {
  const rgb = [];

  namesRGB.forEach((e, i) => {
    rgb[i] = Math.round(color[e] * 255);
  });

  if (color["a"] !== undefined) rgb[3] = Math.round(color["a"] * 100) / 100;
  return rgb;
};
