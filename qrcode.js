/**
 * Starter module for QR code.
 */
"use strict";

/* globals kjua, qrencode */

import * as QrLibQrGen from "./modules/QrLib/qrgen.js";
import * as QrLibKjua from "./modules/QrLib/kjua.js";

/**
 * Generates an SVG element out of an SVG string.
 *
 * @function
 * @private
 * @param {string} svgString the SVG+XML string
 * @returns {SVGSVGElement}
 */
function getSvgElement(svgString) {
    const svg = (new DOMParser()).parseFromString(svgString, "image/svg+xml"); // XMLDocument
    const elSvg = svg.documentElement; // SVGSVGElement

    // modify SVG
    // transparent background
    elSvg.querySelector("rect").setAttribute("fill", "transparent");
    elSvg.querySelector("path").setAttribute("fill", qrColor);

    return elSvg;
}



/**
 * Return new QR code.
 *
 * @function
 * @returns {SVGSVGElement}
 */
function getQr() {
    console.info("generated new QrGen qr code");

    try {
        const qrElem = QRC.encodeText(qrText, qrErrorCorrection);
        const svgString = qrElem.toSvgString(qrQuietZone);
        return getSvgElement(svgString);
    } catch (err) {
        throw (err === "Data too long")
            ? new QrError.DataOverflowError() : err;
    }
}

const DEFAULT_TEXT = "test2165621538521831253651826214314324321";
const SIZE = 500;

QrLibKjua.init();

QrLibKjua.set("size", SIZE);
QrLibKjua.set("crisp", true);
QrLibKjua.set("qrQuietZone", 1);
QrLibKjua.set("qrColor", "#000");
QrLibKjua.set("qrBackgroundColor", "#fff");
QrLibKjua.set("qrErrorCorrection", "H");

QrLibQrGen.set("size", SIZE);
QrLibQrGen.set("qrQuietZone", 1);
QrLibQrGen.set("qrColor", "#000");
QrLibQrGen.set("qrBackgroundColor", "#fff");
QrLibQrGen.set("qrErrorCorrection", "H");

QrLibKjua.set("text", DEFAULT_TEXT);
QrLibQrGen.set("text", DEFAULT_TEXT);

const kjuaCanvasCrisp = QrLibKjua.getQr();
const qrgenSvg = QrLibQrGen.getQr();

// and without fish & chips
QrLibKjua.set("crisp", false);
const kjuaCanvas = QrLibKjua.getQr();

console.log(kjuaCanvas, qrgenSvg);

let elTextInput, elKjuaCanvasCrisp, elKjuaCanvas, elQrGenSvg, elQrGenCanvas;
document.addEventListener('DOMContentLoaded', function() {

// elParent = document.getElementById("qrcode");
elTextInput = document.getElementById("textInput");
elKjuaCanvasCrisp = document.getElementById("kjuaCanvasCrisp");
elKjuaCanvas = document.getElementById("kjuaCanvas");
elQrGenSvg = document.getElementById("qrgenSvg");
elQrGenCanvas = document.getElementById("qrgenCanvas");

elKjuaCanvasCrisp.parentElement.replaceChild(kjuaCanvasCrisp, elKjuaCanvasCrisp);
elKjuaCanvas.parentElement.replaceChild(kjuaCanvas, elKjuaCanvas);
elQrGenSvg.parentElement.replaceChild(qrgenSvg, elQrGenSvg);

elKjuaCanvasCrisp = kjuaCanvasCrisp;
elKjuaCanvas = kjuaCanvas;
elQrGenSvg = qrgenSvg;

elQrGenSvg.style.height = `${SIZE}px`;
elQrGenSvg.style.width = `${SIZE}px`;

QrLibQrGen.drawQrCanvas(elQrGenCanvas, 200);

elTextInput.value = DEFAUL_TEXT;

}, false);

