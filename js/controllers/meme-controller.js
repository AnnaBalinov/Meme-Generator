'use strict'

var gCanvas;
var gCtx;

var gLastPos;
var gPos;
var gIsDraw = false;

var gSelectedImgId;

function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    addMouseListeners()
}

function uploadSelectedImg(id) {
    var img = new Image()
    img.src = `img/meme/${id}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
    console.log('img Upload')
}

function renderMeme(id) {
    uploadSelectedImg(id)
    console.log('img render')
}

function onSelectedImg(ev) {
    renderMeme(ev.id)
    setMeme(ev.id)
    console.log('img select')
}

function onInputTxt(ev) {
    drawText(ev.value, 100, 100)
}

function onSave() {
    var newLine = document.querySelector('#user-txt').value
    setLineTxt(newLine)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '50px IMPACT';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function onMove(ev) {
    if (!gIsDraw) return
    draw(ev)
}

function onDown(ev) {
    gIsDraw = true
    draw(ev)
}

function onUp(ev) {
    gIsDraw = false
}

