var Theme = function()  {
  function getThemeList() {
    return [
      'Default',
      'Blade Runner',
      'Deus Ex',
      'Tron',
    ];
  };

  function getBlendModeList() {
    return [
      "color",
      "color-burn",
      "color-doge",
      "darken",
      "difference",
      "exclusion",
      "hard-light",
      "hue",
      "lighten",
      "luminosity",
      "multiply",
      "normal",
      "overlay",
      "saturation",
      "screen",
      "soft-light"
    ];
  };

  const colorParams = {
    fg: "#ffffff", // white
    bg: "#000000", // black
    light: "#ffffff", // white
    color0: "#ff0000", // red
    color1: "#00ff00", // green
    color2: "#0000ff", // blue
    color3: "#ffff00", // yellow
  };

  const filterParams = {
    seed: 8, // CSS string
    numOctaves: 4,
    baseFrequency: 0.064,
    blendMode: "multiply"
  };

  function resetTheme(theme) {
    switch (theme.name) {
      case 'Default':
        theme.colors.fg = "white";
        theme.colors.bg = "black";
        theme.colors.light = "white";
        theme.colors.color0 = "red";
        theme.colors.color1 = "green";
        theme.colors.color2 = "blue";
        theme.colors.color3 = "yellow";
        break;
      case 'Blade Runner':
        theme.colors.fg = "#c0c0c0";
        theme.colors.light = "#805c1f";
        theme.colors.color3 = "#E08119"; // dark Cheddar
        theme.filters.baseFrequency = 0.012;
        theme.filters.blendMode = "multiply";
        break;
      case 'Deus Ex':
        theme.colors.fg = "#202020";
        theme.colors.light = "#a0a0a0";
        theme.filters.baseFrequency = 0.5;
        theme.filters.blendMode = "multiply";
        break;
      case 'Tron':
        theme.colors.fg = "#000";
        theme.colors.light = "#f0f0f0";
        theme.filters.baseFrequency = 0.064;
        break;
      default:
        console.log('Sorry, we are out of ' + theme.name + '.');
    }
    theme.filters.seed = Math.floor(Math.random() * 9);
  };


  // Theme Module
  return {
    // Public Members
    name: getThemeList()[0], // CSS string
    colors: colorParams,
    filters: filterParams,
    // Public Methods
    resetTheme: resetTheme,
    getThemeList: getThemeList,
    getBlendModeList: getBlendModeList,
  };
}
