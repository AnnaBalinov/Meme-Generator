'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

var gElCanvas;
var gCtx;
var gStartPos;

// var gCurrLineIdx = 0

var gLestTxt;
var gLastTxtPos;
var gCurrTxtPos;
var gIsDraw = false;

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    // resizeCanvas()
}

function renderMeme() {
    var meme = getMeme()
    var img = new Image()
    img.src = `img/meme/${meme.imgId}.jpg`;
    img.onload = () => {
        gCtx.save()
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        renderTxt()
        gCtx.restore()
    }
    // console.log('render meme')
}

function renderTxt() {
    // var line = getLine()
    var meme = getMeme()
    meme.lines.forEach((line, idx) => {
        drawText(line.txt, line.pos.x, line.pos.y)
        // /drawTextByIdx(idx, line.txt)
    });
  
    // drawText(line.xt, line.pos.x, line.pos.y)
}

function onSelectedImg(ev) {
    setMeme(ev.id, 0)
    renderMeme()
    // console.log('img select')
}

function onSwitchLine() {
    // onSaveLineTxt()
    switchLineIdx()
    renderMeme()
}

function onSaveLineTxt() {
    var input = document.querySelector('#user-txt')
    saveLineTxt(input.value)

    input.value = ''
    onSwitchLine()
}

function onInputTxt(value) {
    var meme = getMeme()
    var idx = meme.selectedLineIdx
    drawTextByIdx(idx, value)
    console.log('you draw in line:', meme.selectedLineIdx)
}

function drawTextByIdx(idx, txt) {
    switch (idx) {
        case 0:
            drawText(txt, 50, 100)
            break;
        case 1:
            drawText(txt, 50, 250)
            break;
        case 2:
            drawText(txt, 50, 400)
            break;
    }
}

function drawText(text, x, y, size = 50) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = `${size}px IMPACT`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth
//     gElCanvas.height = elContainer.offsetHeight
// }

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    // console.log('onDown()');
    if (!isTxtClicked(pos)) return
    setTxtDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // console.log('onMove()');
    const line = getLine();
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveTxt(dx, dy)
        gStartPos = pos
        renderMeme()
    }
}

function onUp() {
    // console.log('onUp()');
    setTxtDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}