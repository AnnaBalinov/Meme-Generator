'use strict'

var gMeme;
var gCurrLine;

function getMeme() {
    return gMeme
}

function getCurrLine() {
    return gCurrLine
}

function setMeme(id, idx) {
    gMeme = _creatMeme(id, idx)
    gCurrLine = gMeme.lines[0]
}

function txtBorder() {
    var idx = gMeme.selectedLineIdx
    gMeme.lines[idx].isBorder = !gMeme.lines[idx].isBorder
}

function txtSetColor(color) {
    var idx = gMeme.selectedLineIdx
    gMeme.lines[idx].color = color
}

function txtResize(OA) {
    var idx = gMeme.selectedLineIdx
    if (OA === 'increase') gMeme.lines[idx].size += 5
    if (OA === 'decrease') gMeme.lines[idx].size -= 5
}

function deleteTxt() {
    gMeme.lines.forEach(line => {
        line.txt = ' '
    })
}

function switchLineIdx() {
    if (gMeme.selectedLineIdx === 2) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    var idx = gMeme.selectedLineIdx
    gCurrLine = gMeme.lines[idx]
}

function saveLineTxt(txt) {
    var idx = gMeme.selectedLineIdx
    gMeme.lines[idx].txt = txt
}

function _createLineTxt
    (txt, pos = { x: 50, y: 100 },
        size = 50, color = 'white',
        isBorder = true, isDrag = false,
        posSize = 120) {
    return {
        txt,
        pos,
        size,
        color,
        isBorder,
        isDrag,
        posSize,
    }
}

function _creatMeme(id = 1, idx = 0) {
    return {
        imgId: id,
        selectedLineIdx: idx,
        lines: [_createLineTxt(' ', { x: 50, y: 70 }),
        _createLineTxt(' ', { x: 50, y: 180 }),
        _createLineTxt(' ', { x: 50, y: 300 })]
    }
}

function setTxtDrag(isDrag) {
    gCurrLine.isDrag = isDrag
}


