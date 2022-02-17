'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const gElMemeEditor = document.querySelector('#meme-editor-page')
const gElGallery = document.querySelector('#gallery-page')

var gElCanvas;
var gCtx;
var gStartPos;

var gLastTxtPos;
var gCurrTxtPos;
var gIsDraw = false;

function init() {
    gElMemeEditor.classList.add('hidden')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
}

function onGalleryNav() {
    gElGallery.classList.remove('hidden')
    gElMemeEditor.classList.add('hidden')
}

function renderMeme() {
    var meme = getMeme()
    var img = new Image()
    img.src = `img/meme/${meme.imgId}.jpg`;
    img.onload = () => {
        // gCtx.save()
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        renderTxt()
        // gCtx.restore()
    }
}

function renderTxt() {
    // gCtx.save()
    var meme = getMeme()
    meme.lines.forEach((line) => {
        drawText(line.txt, line.pos.x, line.pos.y)
    });
    // gCtx.restore()
}

function onSelectedImg(ev) {
    gElGallery.classList.add('hidden')
    gElMemeEditor.classList.remove('hidden')

    setMeme(ev.id, 0)
    renderMeme()
}

function onSwitchLine() {
    onSaveLineTxt()
    switchLineIdx()

    // renderMeme()
}

function onSaveLineTxt() {
    var input = document.querySelector('#user-txt')
    saveLineTxt(input.value)
    input.value = ''
    renderTxt()

    switchLineIdx()
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

////txt-editor
var gTxtColor = 'white'
var gTxtBorder = false
var gTxtSize = 50
function onTxtBorder() {
    gTxtBorder = !gTxtBorder
}

function onTxtColor(color) {
    console.log(color)
    gTxtColor = color
}

function onTxtIncrease() {
    console.log('Txt++')
    gTxtSize += 5
    renderTxt()
}

function onTxtDecrease() {
    console.log('Txt--')
    gTxtSize -= 5
    renderTxt()
}

function onDeleteTxt() {
    var meme = getMeme()
    meme.lines = []
    renderMeme()
}

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = gTxtColor;
    gCtx.font = `${gTxtSize}px IMPACT`;
    gCtx.fillText(text, x, y);
    if (gTxtBorder) gCtx.strokeText(text, x, y, [, 0])
    else gCtx.strokeText(text, x, y)
    // gCtx.strokeText(text, x, y); ///strokeText(text, x, y [, maxWidth])
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        renderMeme()
    })
}

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