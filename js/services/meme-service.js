'use strict'

// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
// var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];

var gMeme;
var gCurrLine;

function getMeme() {
    return gMeme
}

function getLine() {
    return gCurrLine
}

function setMeme(id, idx) {
    gMeme = _creatMeme(id, idx)
    console.log('meme:', gMeme)
}

function switchLineIdx() {
    if (gMeme.selectedLineIdx === 2) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    console.log('Line Idx switch to:', gMeme.selectedLineIdx)
}

function saveLineTxt(txt, size, color) {
    if (!gMeme) gMeme = _creatMeme()

    var idx = gMeme.selectedLineIdx
    var pos = { x: 50, y: 100 }
    if (idx === 0) pos.y = 100;
    else if (idx === 1) pos.y = 250;
    else pos.y = 400;

    var line = _createLineTxt(txt, pos, size, color)
    gMeme.lines.splice(idx, 1, line)

    gCurrLine = line

    console.log('idx', idx)
    console.log('gMeme.lines', gMeme.lines)
}

function _createLineTxt(txt, pos = { x: 50, y: 100 }, size = 120, color = 'black', isDrag = false) {
    return {
        txt,
        pos,
        size,
        color,
        isDrag
    }
}

function _creatMeme(id = 1, idx = 0) {
    // console.log('meme created')

    return {
        imgId: id,
        selectedLineIdx: idx,
        lines: []
    }
}


///////Txt drag service
function isTxtClicked(clickedPos) {
    const { pos } = gCurrLine
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCurrLine.size
}

function setTxtDrag(isDrag) {
    gCurrLine.isDrag = isDrag
}

function moveTxt(dx, dy) {
    gCurrLine.pos.x += dx
    gCurrLine.pos.y += dy
}








