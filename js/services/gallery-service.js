'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 20, 'politics': 10, 'tv': 18, 'dog': 16 }

var gImgs;

function getKeywords() {
    return gKeywordSearchCountMap
}
function getImgs() {
    return gImgs
}

_creatImages()
function _creatImages() {
    gImgs = [
        _creatImage(1, ['politics', 'funny']),
        _creatImage(2, ['Animal', 'dog', 'cute',]),
        _creatImage(3, ['baby', 'Animal', 'dog', 'cute']),
        _creatImage(4, ['animal', 'cat']),
        _creatImage(5, ['baby']),
        _creatImage(6, ['tv']),
        _creatImage(7, ['baby', 'funny']),
        _creatImage(8, ['tv']),
        _creatImage(9, ['baby']),
        _creatImage(10, ['politics']),
        _creatImage(11, ['tv']),
        _creatImage(12, ['tv']),
        _creatImage(13, ['movie']),
        _creatImage(14, ['movie']),
        _creatImage(15, ['movie']),
        _creatImage(16, ['movie', 'funny']),
        _creatImage(17, ['politics']),
        _creatImage(18, ['movie'])
    ]
}

function _creatImage(id, keywords) {
    return {
        id,
        url: `img/${id}.jpg`,
        keywords
    }
}

function updateKeywordsSize(Keyword, size) {
    if(!gKeywordSearchCountMap[Keyword]) return
    gKeywordSearchCountMap[Keyword] = size
}

