'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
const gElMemeEditor = document.querySelector('#meme-editor-page');
const gElGallery = document.querySelector('#gallery-page');

var gElCanvas;
var gCtx;
var gStartPos;
var gIsDraw = false;
var gIsSaveMode = false;

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
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderTxt()
        renderRect()
    }
}

function renderTxt() {
    var meme = getMeme()
    meme.lines.forEach((line) => {
        drawText(line.txt, line.pos.x, line.pos.y,
            line.size, line.color, line.isBorder)
    });
}

function renderRect() {
    if (gIsSaveMode) return
    var meme = getMeme()
    var idx = meme.selectedLineIdx
    console.log(idx)
    var pos = meme.lines[idx].pos
    drawRect(pos.x - 35, pos.y - 60, 320, 70)
}

function onSelectedImg(ev) {
    gElGallery.classList.add('hidden')
    gElMemeEditor.classList.remove('hidden')

    setMeme(ev.id, 0)
    renderMeme()
}

function onSwitchLine() {
    var input = document.querySelector('#user-txt')
    saveLineTxt(input.value)
    switchLineIdx()
    renderMeme()
    clearInputTxt()
}

function onSaveLineTxt() {
    var input = document.querySelector('#user-txt')
    saveLineTxt(input.value)
    switchLineIdx()
    renderMeme()
    clearInputTxt()
}

function clearInputTxt() {
    var input = document.querySelector('#user-txt')
    input.value = ''
}

function onInputTxt(value) {
    saveLineTxt(value)
    gIsSaveMode = false
    renderMeme()
}

function onTxtBorder() {
    txtBorder()
    renderMeme()
}

function onTxtColor(color) {
    txtSetColor(color)
    renderMeme()
}

function onTxtResize(OA) {
    txtResize(OA)
    renderMeme()
}

function onDeleteTxt() {
    deleteTxt()
    renderMeme()
}

function onSaveMeme() {
    gIsSaveMode = true
    console.log('be:', gIsSaveMode)
    renderMeme()

    onDownloadMeme()
}

function onDownloadMeme() {
    gIsSaveMode = true
    renderMeme()
    var elLink = document.getElementById('link')
    var data = gElCanvas.toDataURL('image/jpeg')
    elLink.href = data
    console.log('Af:', gIsSaveMode)
}

function drawText(text, x, y, size, color, border) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color;
    gCtx.font = `${size}px IMPACT`
    gCtx.fillText(text, x, y);
    if (!border) gCtx.strokeText(text, x, y, [, 0])
    else gCtx.strokeText(text, x, y)
}

function drawRect(x, y, width, height) {
    gCtx.beginPath();
    gCtx.rect(x, y, width, height)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
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
    const line = getCurrLine();
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

function isTxtClicked(clickedPos) {
    var currLine = getCurrLine()
    const { pos } = currLine
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= currLine.posSize
}

function moveTxt(dx, dy) {
    var currLine = getCurrLine()
    currLine.pos.x += dx
    currLine.pos.y += dy
}