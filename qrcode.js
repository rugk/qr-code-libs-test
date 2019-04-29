/**
 * Starter module for QR code.
 */
"use strict";

/* globals kjua, qrencode */

import * as QrLibQrGen from "./modules/QrLib/qrgen.js";
import * as QrLibKjua from "./modules/QrLib/kjua.js";

const DEFAULT_TEXT = "test2165621538521831253651826214314324321";
const DEFAULT_SIZE = 500;

QrLibKjua.init();

function generateQrCodes(text = DEFAULT_TEXT, size = DEFAULT_SIZE) {
	QrLibKjua.set("size", size);
	QrLibKjua.set("crisp", true);
	QrLibKjua.set("qrQuietZone", 1);
	QrLibKjua.set("qrColor", "#000");
	QrLibKjua.set("qrBackgroundColor", "#fff");
	QrLibKjua.set("qrErrorCorrection", "H");

	QrLibQrGen.set("size", text);
	QrLibQrGen.set("qrQuietZone", 1);
	QrLibQrGen.set("qrColor", "#000");
	QrLibQrGen.set("qrBackgroundColor", "#fff");
	QrLibQrGen.set("qrErrorCorrection", "H");

	QrLibKjua.set("text", text);
	QrLibQrGen.set("text", text);

	const kjuaCanvasCrisp = QrLibKjua.getQr();
	const qrgenSvg = QrLibQrGen.getQr();

	// and without fish & chips
	QrLibKjua.set("crisp", false);
	const kjuaCanvas = QrLibKjua.getQr();

	const qrElements = {kjuaCanvasCrisp, kjuaCanvas, qrgenSvg};
	console.log(qrElements);

	return qrElements;
}
function updateHtml(qrElements, size = DEFAULT_SIZE) {
	const {kjuaCanvasCrisp, kjuaCanvas, qrgenSvg} = qrElements;

	elKjuaCanvasCrisp.parentElement.replaceChild(kjuaCanvasCrisp, elKjuaCanvasCrisp);
	elKjuaCanvas.parentElement.replaceChild(kjuaCanvas, elKjuaCanvas);
	elQrGenSvg.parentElement.replaceChild(qrgenSvg, elQrGenSvg);

	elKjuaCanvasCrisp = kjuaCanvasCrisp;
	elKjuaCanvas = kjuaCanvas;
	elQrGenSvg = qrgenSvg;

	elQrGenSvg.style.height = `${size}px`;
	elQrGenSvg.style.width = `${size}px`;

	QrLibQrGen.drawQrCanvas(elQrGenCanvas, 200);
}

const qrElements = generateQrCodes();

let elTextInput, elSizeInput;
let elKjuaCanvasCrisp, elKjuaCanvas, elQrGenSvg, elQrGenCanvas;
document.addEventListener('DOMContentLoaded', function() {

// elParent = document.getElementById("qrcode");
elTextInput = document.getElementById("textInput");
elSizeInput = document.getElementById("size");
elKjuaCanvasCrisp = document.getElementById("kjuaCanvasCrisp");
elKjuaCanvas = document.getElementById("kjuaCanvas");
elQrGenSvg = document.getElementById("qrgenSvg");
elQrGenCanvas = document.getElementById("qrgenCanvas");

elTextInput.value = DEFAULT_TEXT;
elSizeInput.value = DEFAULT_SIZE;

// actually display stuff
updateHtml(qrElements);

// allow later update
function updateQr() {
	const qrElements = generateQrCodes(elTextInput.value, elSizeInput.value);
	updateHtml(qrElements);
}
elTextInput.addEventListener("input", updateQr);
elSizeInput.addEventListener("input", updateQr);

}, false);

