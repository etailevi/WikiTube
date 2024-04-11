'use strict'

function onInit() {
    activatePromise('Ariana Grande')
}

function activatePromise(input) {
    Promise.all([askWiki(input), askVideo(input)])
        .then(([wikiData, videoDetails]) => {
            renderWiki(wikiData)
            renderVideos(videoDetails)
        })
}

function onSearchValue(ev) {
    ev.preventDefault()
    const input = ev.target.elements[0].value
    askWiki(input).then(data => renderWiki(data))
    askVideo(input).then(details => renderVideos(details))
    document.querySelector('[name="wiki-search"]').value = ''
}

function renderVideos(details) {

    renderVideoPlayer(details[0].id.videoId)
    const strHTML = details.map((detail) => {
        const vidUrl = detail.id.videoId
        return `<li onclick="renderVideoPlayer('${vidUrl}')">
        <img src="${detail.snippet.thumbnails.default.url}" alt="">
        <section class="description">
        <h2 class="video-title">${detail.snippet.title}</h2>
        <p class="channel-title">${detail.snippet.channelTitle}</p>
        </section>
        </li><hr>`
    })
    document.querySelector('.video-list').innerHTML = strHTML.join('')
}

function renderVideoPlayer(url) {
    const elVideoPlayer = document.querySelector('.video-player')
    elVideoPlayer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${url}?autoplay=1"
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>`
}

function renderWiki(data) {
    const wikiData = document.querySelector('.wikipedia')
    wikiData.innerHTML = `<h2>${data[0].title}</h2>
        <p>${data[0].snippet}</p>
            <h2>${data[4].title}</h2>
                <p>${data[4].snippet}</p>`
}