'use strict'

const YOUTUBE_SECRET_KEY = process.env.YOUTUBE_API_KEY
const youtubeDB = 'youtubeDB'
const gYouTubeCache = loadFromStorage(youtubeDB) || {}

function askVideo(value) {
    if (gYouTubeCache[value]) return Promise.resolve(gYouTubeCache[value])
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_SECRET_KEY}&q=${value}`)
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