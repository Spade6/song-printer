'use strict';
const escpos = require('escpos');
// install escpos-usb adapter module manually
const USB = require('escpos-usb');
const { SerialPort } = require('serialport');

const { playlist } = require('./playlist.js');

let sPort = null;
const USE_SCANNER = true;

let listUser = [];

async function listSerialPorts() {
    if (USE_SCANNER) {
        await SerialPort.list().then((ports, err) => {
            if (err) {
                console.log(err.message);
                return;
            } else {
                const filteredPorts = ports.filter((p) => {
                    return (
                        (p.vendorId === 'ac90' || p.vendorId === 'AC90') &&
                        p.productId === '3003'
                    );
                });

                if (filteredPorts.length > 0 && sPort === null) {
                    // barcode exists
                    const barcodeReader = filteredPorts[0];
                    const path = barcodeReader.path;
                    sPort = new SerialPort({ path: path, baudRate: 9600 });
                    // Switches the port into "flowing mode"
                    sPort.on('data', async function (data) {
                        // console.log('Data:', data);
                        // console.log(data.toString());
                        try {
                            let userId = data.toString().trim();
                            userId = userId.split('ticketId=')[1];
                            console.log(userId);
                            // check already added
                            let alreadyAdded = false;
                            listUser.forEach((user) => {
                                if (user === userId) {
                                    alreadyAdded = true;
                                }
                            });
                            if (!alreadyAdded) {
                                listUser.push(userId);
                                console.log('User added:', userId);
                                // getUser(userId);
                                let imageFile = await playlist();
                                print(imageFile);
                            } else {
                                console.log('User already added:', userId);
                            }
                        } catch (error) {
                            // console.log(error);
                        }
                    });
                    sPort.on('close', function () {
                        console.log('barcode lost, trying to reconnect');
                        sPort = null;
                    });
                    console.log('Barcode found');
                } else if (filteredPorts.length === 0) {
                    // barcode does not exist
                    console.log('Barcode not found');
                }

                if (ports.length === 0) {
                    console.log('No ports discovered');
                }
            }
        });
    }
}

// let tempId =
//   "https://rd2.randomdiversity.com/rd-2024?ticketId=37bf97f6-3902-4d2e-8d78-cc002b36d097";
// tempId = tempId.split("ticketId=")[1];
// getUser(tempId);

function listPorts() {
    listSerialPorts();
    setTimeout(listPorts, 2000);
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(listPorts, 2000);

escpos.USB = USB;
// Select the adapter based on your printer type
const device = new escpos.USB(0x1fc9, 0x2016); //0x1504, 0x002b
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const options = { encoding: 'GB18030' /* default */ };
// encoding is optional

const printer = new escpos.Printer(device, options);

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

const print = (tux) => {
    escpos.Image.load(tux, function (image) {
        // escpos.Image.load('./logo.png', function (logo) {
        device.open(function () {
            printer
                .raster(image)
                .size(1, 1)
                // .raster(logo)
                // .size(1, 1)
                .newLine()
                .cut()
                .close();
        });
        // });
    });
};
