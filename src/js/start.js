editor.keyboard = new MD.Keyboard();
editor.menu = new MD.Menu();
editor.toolbar = new MD.Toolbar();
editor.rulers = new MD.Rulers();
editor.canvas = new MD.Canvas();
editor.text = new MD.Text();
editor.panel = new MD.Panel();
editor.zoom = new MD.Zoom();

editor.paintBox = {
  fill: new MD.PaintBox('#fill_color', 'fill'),
  stroke: new MD.PaintBox('#stroke_color', 'stroke'),
  canvas: new MD.PaintBox('#canvas_color', 'canvas')
};
editor.palette = new MD.Palette();
editor.pan = new MD.Pan();

editor.import = new MD.Import();
editor.contextMenu = new MD.ContextMenu();
editor.darkmode = new MD.Darkmode();
editor.title = new MD.Title();

// bind the selected event to our function that handles updates to the UI
svgCanvas.bind("selected", editor.selectedChanged);
svgCanvas.bind("transition", editor.elementTransition);
svgCanvas.bind("changed", editor.elementChanged);
svgCanvas.bind("exported", editor.exportHandler);
svgCanvas.bind("zoomed", editor.zoom.changed);
svgCanvas.bind("contextset", editor.contextChanged);
svgCanvas.bind("extension_added", editor.extensionAdded);
svgCanvas.textActions.setInputElem($("#text")[0]);
const shapeLib = svgCanvas.addExtension.apply(this, ["shapes", MD.Shapelib]);
const eyedropper = svgCanvas.addExtension.apply(this, ["eyedropper", MD.Eyedropper]);
state.set("canvasId", t("Untitled"));
state.set("canvasMode", state.get("canvasMode"));

// load from param
if (!window.location.search.includes("?load=")) {
  svgCanvas.setSvgString(state.get("canvasContent"));
}
else {
  
  const error = function(err) {
      console.log(err);
      svgCanvas.setSvgString(state.get("canvasContent"));
  }

  const url = utils.findGetParameter("load");
  fetch(url)
    .then(r => r.text())
    .then(text => {
      if (text.includes("Error response")) return error("Error response");
      svgCanvas.setSvgString(text);
    })
    .catch(error);
}

state.set("canvasTitle", svgCanvas.getDocumentTitle());

//editor.paintBox.fill.setPaint(state.get("canvasFill"));
//editor.paintBox.stroke.setPaint(state.get("canvasStroke"));
//editor.paintBox.canvas.setPaint(state.get("canvasBackground"));


state.set("serveImage", false);
const objects = {
  "Cтолы": {
    "Стол деревянный":"table1.png",
    "Стол 2":"table2.png",
    "Стол 3":"table3.png",
    "Стол 4":"table4.png",
    },
  "Утварь кухонная":{
    "Кулер":"cooler.png"
  }
}

var servingImage = false;
for(category in objects ) {
  $(`<div class="menu_item disabled">${category}</div>`).appendTo("#objects_list");
  $(`<div class="separator"></div>`).appendTo("#objects_list");
  for(object in objects[category]) {
    let id = objects[category][object];
     $(`<div class="menu_item add_item" data-action="duplicateSelected" id="${id}">${object}</div>`).appendTo("#objects_list");
    $(`.add_item`).on('click', function (e) {
      if(servingImage)
        return;
      servingImage = true;
      state.set("serveImage", true);
      $('#menu_bar').removeClass('active')
      var xhr = new XMLHttpRequest();
      xhr.open("GET", `https://api.dunicewinners.ru/static/${e.target.id}`);
      xhr.responseType = "blob";
      xhr.onload = function (e) {
        var urlCreator = window.URL || window.webkitURL;
        console.log(this.response, typeof this.response);
        var imageUrl = urlCreator.createObjectURL(this.response);
          insertNewImage = function(img_width, img_height){
              var newImage = svgCanvas.addSvgElementFromJson({
              "element": "image",
              "attr": {
                "x": 0,
                "y": 0,
                "width": img_width,
                "height": img_height,
                "id": svgCanvas.getNextId(),
                "style": "pointer-events:inherit"
              }
            });
            svgCanvas.setHref(newImage, imageUrl);
            svgCanvas.selectOnly([newImage])
            svgCanvas.alignSelectedElements("m", "page")
            svgCanvas.alignSelectedElements("c", "page")
            editor.panel.updateContextPanel();
          }
          // put a placeholder img so we know the default dimensions
          var img_width = 100;
          var img_height = 100;
          var img = new Image()
          img.src = imageUrl;
          document.body.appendChild(img);

          img.onload = function() {
            img_width = img.offsetWidth
            img_height = img.offsetHeight
            insertNewImage(img_width, img_height);
            document.body.removeChild(img);
            console.log("Loaded");
            servingImage = false;
          }
        }
      
      console.log("aha");
      xhr.send();
      });

  }
}


document.body.classList.remove("loading");
document.getElementById("svgcanvas").removeAttribute("title");
