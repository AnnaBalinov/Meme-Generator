'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];

var gMeme;

function getMeme() {
    return gMeme
}

function setMeme(id, idx) {
    gMeme = _creatMeme(id, idx)
    console.log('meme:', gMeme)
}

function setLineTxt(txt, size, align, color) {
    if (!gMeme) gMeme = _creatMeme()

    var line = _createLineTxt(txt, size, align, color)
    gMeme.lines.push(line)

    console.log('gMeme.lines', gMeme.lines)
}

function _createLineTxt(txt, size = 20, align = 'left', color = 'black') {
    return {
        txt,
        size,
        align,
        color
    }
}

function _creatMeme(id = 1, idx = 0) {
    console.log('meme created')

    return {
        selectedImgId: id,
        selectedLineIdx: idx,
        lines: []
    }
}


