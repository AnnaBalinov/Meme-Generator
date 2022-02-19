'use strict'

function initGallery() {
    renderGallery()
    renderKeywords()
}

function renderGallery() {

    var imgs = getImgs()
    var strHTML = imgs.map((img) => {
        return `
        <img id="${img.id}" onclick="onSelectedImg(this)" 
        src="img/meme/${img.id}.jpg" alt="${img.keywords[0]}"></img>`
    })

    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = strHTML.join('')
}

function onFilterGallery() {

    var keywords = getKeywords()
    var imgs = getImgs()
    var input = document.getElementById('search-Input');
    var filter = input.value.toLowerCase();

    for (var i = 0; i < imgs.length; i++) {

        var img = imgs[i]
        var txtValue = img.keywords
        var elCurrImg = document.getElementById(img.id)

        if (txtValue.indexOf(filter) > -1) {
            elCurrImg.style.display = "";
        } else {
            elCurrImg.style.display = "none";
        }
    }

    var keyword = filter
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

    onFilterGallery()
}