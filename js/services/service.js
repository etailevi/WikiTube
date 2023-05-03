'use strict'

const API_KEY = 'AIzaSyC4AhuuH0mF9Qr2NxI7pkJSkmzqgefxY98'
const API_KEY2 = 'AIzaSyD-7JXS15AWR6Kt29jCftH2Vpc0Bszh2ig'
const API_KEY3 = 'AIzaSyA13ULgHZv3MrvSQoFX_MR3C2-5ALY-wgQ'
const youtubeDB = 'youtubeDB'
const gYouTubeCache = loadFromStorage(youtubeDB) || {}

function askVideo(value) {
    if (gYouTubeCache[value]) return Promise.resolve(gYouTubeCache[value])
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY3}&q=${value}`)
        .then(res => { // resolve
            gYouTubeCache[value] = res.data.items
            saveToStorage(youtubeDB, gYouTubeCache)
            console.log(res.data.items)
            return res.data.items
        })
        .catch(err => { // reject
            console.log(err)
            throw err
        })
        .finally(() => console.log('After Youtube service'))
}

function askWiki(value) {

    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${value}&format=json`)
        .then(res => { // resolve
            return res.data.query.search
        })
        .catch(err => { // reject
            console.log(err)
            throw err
        })
        .finally(() => console.log('After Wikipedia service'))
}