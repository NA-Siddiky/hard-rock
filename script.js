const searchSongs = () => {
    const searchText = document.getElementById("search-item").value;
    // console.log(searchText);
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(url);
    // load data /
    fetch(url)
        .then(res => res.json())
        .then(importSongs => displaySongs(importSongs.data));

}

const displaySongs = songs => {
    // console.log(songs);
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML ="";
    songs.forEach(song => {
        // console.log(song.title)
        // console.log(song)
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>

        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick = "getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    })
}

const getLyric = (artist, title) => {
    // console.log(artist, title);
    const urlOfLyric = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // console.log(urlOfLyric);
    fetch(urlOfLyric)
        .then(res => res.json())
        .then(importLyric => displayLyric(importLyric.lyrics))
}

const displayLyric = lyrics => {
    const lyricsDiv = document.getElementById('song-lyric')
    lyricsDiv.innerHTML = lyrics;
}