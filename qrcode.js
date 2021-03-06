/**
 * Starter module for QR code.
 */
"use strict";

/* globals kjua, qrencode */

import * as QrLibQrGen from "./modules/QrLib/qrgen.js";
import * as QrLibKjua from "./modules/QrLib/kjua-svg.js";

const DEFAULT_TEXT = "test2165621538521831253651826214314324321";
const DEFAULT_SIZE = 500;

QrLibKjua.init();

function generateQrCodes(text = DEFAULT_TEXT, size = DEFAULT_SIZE) {
	QrLibKjua.set("render", 'canvas');
	QrLibKjua.set("size", size);
	QrLibKjua.set("crisp", true);
	QrLibKjua.set("qrQuietZone", 1);
	QrLibKjua.set("qrColor", "#000");
	QrLibKjua.set("qrBackgroundColor", "#fff");
	QrLibKjua.set("qrErrorCorrection", "H");

	QrLibKjua.set("size", size);
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

	// and SVG
	QrLibKjua.set("render", 'svg');
	QrLibKjua.set("crisp", false);
	const kjuaSvg = QrLibKjua.getQr();
	
	// and SVG+fish/ships
	QrLibKjua.set("render", 'svg');
	QrLibKjua.set("crisp", true);
	const kjuaSvgCrisp = QrLibKjua.getQr();
	
	const qrElements = {kjuaCanvasCrisp, kjuaCanvas, qrgenSvg, kjuaSvg, kjuaSvgCrisp};
	console.log(qrElements);

	return qrElements;
}
function updateHtml(qrElements, size = DEFAULT_SIZE) {
	const {kjuaCanvasCrisp, kjuaCanvas, qrgenSvg, kjuaSvg, kjuaSvgCrisp} = qrElements;

	elKjuaCanvasCrisp.parentElement.replaceChild(kjuaCanvasCrisp, elKjuaCanvasCrisp);
	elKjuaCanvas.parentElement.replaceChild(kjuaCanvas, elKjuaCanvas);
	elQrGenSvg.parentElement.replaceChild(qrgenSvg, elQrGenSvg);
	elKjuaSvg.parentElement.replaceChild(kjuaSvg, elKjuaSvg);
	elKjuaSvgCrisp.parentElement.replaceChild(kjuaSvgCrisp, elKjuaSvgCrisp);

	elKjuaCanvasCrisp = kjuaCanvasCrisp;
	elKjuaCanvas = kjuaCanvas;
	elQrGenSvg = qrgenSvg;
	elKjuaSvg = kjuaSvg;
	elKjuaSvgCrisp = kjuaSvgCrisp;

	elQrGenSvg.style.height = `${size}px`;
	elQrGenSvg.style.width = `${size}px`;

	elQrGenCanvas.style.height = `${size}px`;
	elQrGenCanvas.style.width = `${size}px`;

	elKjuaSvg.style.height = `${size}px`;
	elKjuaSvg.style.width = `${size}px`;

	elKjuaSvgCrisp.style.height = `${size}px`;
	elKjuaSvgCrisp.style.width = `${size}px`;

	QrLibQrGen.drawQrCanvas(elQrGenCanvas, size);
}

const qrElements = generateQrCodes();

let elTextInput, elSizeInput;
let elKjuaCanvasCrisp, elKjuaCanvas, elQrGenSvg, elQrGenCanvas, elKjuaSvg, elKjuaSvgCrisp;
document.addEventListener('DOMContentLoaded', function() {

// elParent = document.getElementById("qrcode");
elTextInput = document.getElementById("textInput");
elSizeInput = document.getElementById("size");
elKjuaCanvasCrisp = document.getElementById("kjuaCanvasCrisp");
elKjuaCanvas = document.getElementById("kjuaCanvas");
elQrGenSvg = document.getElementById("qrgenSvg");
elQrGenCanvas = document.getElementById("qrgenCanvas");
elKjuaSvg = document.getElementById("kjuaSvg");
elKjuaSvgCrisp = document.getElementById("kjuaSvgCrisp");

elTextInput.value = DEFAULT_TEXT;
elSizeInput.value = DEFAULT_SIZE;

// actually display stuff
updateHtml(qrElements);

// allow later update
function updateQr() {
	const qrElements = generateQrCodes(elTextInput.value, elSizeInput.value);
	updateHtml(qrElements, elSizeInput.value);
}
elTextInput.addEventListener("input", updateQr);
elSizeInput.addEventListener("input", updateQr);

}, false);

