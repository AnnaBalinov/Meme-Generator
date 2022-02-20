'use strict'

function initGallery() {
    var imgs = getImgs()
    renderGallery(imgs)

    renderKeywords()
}

function renderGallery(imgs) {
    var strHTML = imgs.map((img) => {
        return `
        <img id="${img.id}" onclick="onSelectedImg(this)" 
        src="img/meme/${img.id}.jpg" alt="${img.keywords[0]}"></img>`
    })

    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTML.join('')
}

function onFilterGallery(filterBy) {

    var keywords = getKeywords()
    var imgs = getImgs()
    filterBy = filterBy.toLowerCase()

    if (!filterBy) {
        renderGallery(imgs)
        return
    }

    imgs = imgs.filter((img) => {
        var txtValue = img.keywords
        return txtValue.includes(filterBy)
    })

    renderGallery(imgs)

    var keyword = filterBy
    var keywordCurrSize = keywords[keyword]
    var newSize = keywordCurrSize + 1

    updateKeywordsSize(keyword, newSize)
    renderKeywordsSize()
}

function renderKeywords() {

    var keywords = getKeywords()
    var words = Object.getOwnPropertyNames(keywords)
    var strHTML = words.map((word) => {

        return ` <li><a id="${word}" 
                        onclick="onKeywordsClick(this)" 
                        href="#">${word}</a></li>`
    })

    var elList = document.querySelector('.keywords-list')
    elList.innerHTML = strHTML.join('')

    renderKeywordsSize()
}

function renderKeywordsSize() {

    var keywords = getKeywords()
    var words = Object.getOwnPropertyNames(keywords)

    for (var i = 0; i < words.length; i++) {

        var word = words[i]
        var wordSize = keywords[word]
        var elA = document.getElementById(word)

        elA.style.fontSize = (wordSize) + 'px';
    }
}

function onKeywordsClick(ev) {

    var Keyword = ev.innerText
    var input = document.getElementById('search-Input')
    input.value = Keyword

    onFilterGallery(Keyword)
}