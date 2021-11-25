"use strict";
const path = require("path");
const fs = require("fs");
import ESCPOSImageProcessor from "@printurmessages/escpos-image-processor";
const sharp = require("sharp");
const escpos = require("escpos");
var gm = require("gm");
// install escpos-usb adapter module manually
escpos.USB = require("escpos-usb");

// Select the adapter based on your printer type
const device = new escpos.USB(0x1504, 0x002b);
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const options = { encoding: "GB18030" /* default */ };
// encoding is optional

const printer = new escpos.Printer(device, options);

const processor = new ESCPOSImageProcessor({
  width: 500 /* optional, defaults to 185 (default 40mm printer roll width in px) */,
  quality: "best" /* optional, defaults to 'best' (slowest). another option is 'good', which is faster but produces worse results */,
});

// device.open(function(error){
//   printer
//   .font('a')
//   .align('ct')
//   .style('bu')
//   .size(1, 1)
//   .text('The quick brown fox jumps over the lazy dog')
//   .text('敏捷的棕色狐狸跳过懒狗')
//   .barcode('1234567', 'EAN8')
//   .table(["One", "Two", "Three"])
//   .tableCustom(
//     [
//       { text:"Left", align:"LEFT", width:0.33, style: 'B' },
//       { text:"Center", align:"CENTER", width:0.33},
//       { text:"Right", align:"RIGHT", width:0.33 }
//     ],
//     { encoding: 'cp857', size: [1, 1] } // Optional
//   )
//   .qrimage('https://github.com/song940/node-escpos', function(err){
//     this.cut();
//     this.close();
//   });
// });

//const tux = path.join(__dirname, 'test.png');
//escpos.Image.load(tux, function(image){
//console.log(image)
//device.open(function(){

//printer.font('a').drawLine().raster(image).size(1,1).drawLine().text("RANDOM DIVERSITY").drawLine().newLine().cut().close();

//});

// });

// for server

var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var http = require("http").Server(app);
var cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");

  return response;
}

app.post("/print", (req, res) => {
  if (req.method == "POST") {
    var NewImageName = "images/" + Date.now();
    var imageBuffer = decodeBase64Image(req.body.image);
    fs.writeFile("./" + NewImageName + ".png", imageBuffer.data, function (err) {
      // image processor
      /* processor.convert('./'+NewImageName+'1.png','./'+NewImageName+'.png').then(path => {
          // The callback will return the path if all went well, if there was an error it will return 'false'.
          if(path){
              console.log(`Processed image saved to ${path}`)
              print("./"+NewImageName+'.png')
          }
          else
              console.log('An Error Occurred')
      }).catch(error => console.error(error)) */

      if (path) {
        console.log(`Processed image saved to ${path}`);
        // sharp("./" + NewImageName + ".png")
        //   //.threshold(73)
        //   .grayscale()
        //   .rotate(90)
        //   .resize(500, null)
        //   .toFile("./" + NewImageName + "1.png", () => {
        //     print("./" + NewImageName + "1.png");
        //   });
        gm(NewImageName + ".png")
          .rotate("white", -90)
          .resize(1000, 1000)
          .modulate(160)
          .monochrome()
          .write(NewImageName + "1.png", function (err) {
            if (!err) print("./" + NewImageName + "1.png");
            if (err) console.log(err);
          });
      } else console.log("An Error Occurred");
    });
    res.json(200, { profileImgName: NewImageName });
  }
});

http.listen(port, () => {
  console.log(`Printer: http://localhost:${port}`);
});

const print = (tux) => {
  escpos.Image.load(tux, function (image) {
    escpos.Image.load('./logo.png',function (logo){
      device.open(function () {
        //printer.font("a").drawLine().raster(image).size(1, 1).drawLine().text("RANDOM DIVERSITY").drawLine().newLine().cut().close();
        printer.raster(image).size(1, 1).raster(logo).size(1, 1).newLine().cut().close();
        // printer
        //   .align("ct")
        //   .image(image)
        //   .then(() => {
        //     printer.cut().close();
        //   });
      });
    })
  });
};
