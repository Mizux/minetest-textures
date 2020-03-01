// Theme struct
var theme = new Theme();
var atlas = new Atlas();
var svg = new SVG();

function updateGUI() {
  for (i = 0; i < arguments.length; i++) {
    for (var j in arguments[i].__controllers) {
      arguments[i].__controllers[j].updateDisplay();
    }
  }
}

function redraw() {
  document.getElementById("main-div").innerHTML = svg.print(atlas, theme);
}

// First define Dat.Gui instances
var themeGUI = new dat.GUI({ load: JSON });
// must be call before gui construction
themeGUI.remember(theme, 'Theme');
themeGUI.remember(theme.colors, 'Color Palette');
themeGUI.remember(theme.filters, 'Filters');

var themeGUI = themeGUI.addFolder("Theme");
{
  themeGUI
    .add(theme, "name", theme.getThemeList())
    .onChange(setTheme);
  themeGUI.open();
}

function setTheme() {
  theme.resetTheme(theme);
  updateGUI(themeGUI, colorPaletteGUI, filterGUI);
  redraw();
}

var colorPaletteGUI = themeGUI.addFolder("Color Palette");
{
  colorPaletteGUI.addColor(theme.colors, "fg").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "bg").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "color0").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "color1").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "color2").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "color3").onChange(redraw);
  colorPaletteGUI.addColor(theme.colors, "light").onChange(redraw);
  colorPaletteGUI.open();
}

var filterGUI = themeGUI.addFolder("Filters");
{
  filterGUI.add(theme.filters, "seed", 0, 8).onChange(redraw);
  filterGUI.add(theme.filters, "numOctaves", 2, 8, 1).onChange(redraw);
  filterGUI.add(theme.filters, "baseFrequency", 0.00001, 0.7).onChange(redraw);
  filterGUI.add(theme.filters, "blendMode", theme.getBlendModeList()).onChange(redraw);
  filterGUI.open();
}

var atlasGUI = new dat.GUI({ load: JSON });
// must be call before gui construction
atlasGUI.remember(atlas, 'atlas');

var atlasGUI = atlasGUI.addFolder("Atlas");
{
  atlasGUI
    .add(atlas, "name", atlas.getTileList())
    .onChange(setAtlas);
  atlasGUI.open();
}

function setAtlas() {
  atlas.resetAtlas(atlas);
  updateGUI(atlasGUI);
  redraw();
}

var sizeGUI = atlasGUI.addFolder("Size");
{
  sizeGUI.add(atlas.size, "width", 64, 1024, 64).onChange(redraw);
  sizeGUI.add(atlas.size, "height", 64, 1024, 64).onChange(redraw);
  sizeGUI.open();
}
// Init
//theme.name = "Deus Ex";
//setTheme();
//var update = function() {
//  requestAnimationFrame(update);
//  redraw();
//};
//update();

// Download button stuff
function triggerDownload (imgURI) {
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  var a = document.createElement('a');
  a.setAttribute('download', `${theme.name}_${atlas.name}.png`);
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);
}

document.getElementById("btn-png").addEventListener('click', function () {
  var canvas = document.getElementById('canvas');
  canvas.setAttribute('width', `${atlas.size.width}`); // clears the canvas
  canvas.setAttribute('height', `${atlas.size.height}`); // clears the canvas
  var ctx = canvas.getContext('2d');

  var svg = document.querySelector('svg');
  var data = (new XMLSerializer()).serializeToString(svg);
  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  var url = DOMURL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);

    var imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
  };

  img.src = url;
});


document.getElementById("btn-svg").addEventListener('click', function () {
  const svg = document.querySelector('svg');
  const data = (new XMLSerializer()).serializeToString(svg);
  const DOMURL = window.URL || window.webkitURL || window;

  const svgBlob = new Blob([data], {type:"image/svg+xml;charset=utf-8"});
  const svgUrl = DOMURL.createObjectURL(svgBlob);

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  const a = document.createElement('a');
  a.setAttribute('download', `${theme.name}_${atlas.name}.svg`);
  a.setAttribute('href', svgUrl);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);
});
