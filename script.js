// const searchSongs = async () => {
//     const searchText = document.getElementById("search-item").value;
//     console.log(searchText);
//     const urlOfSongs = `https://api.lyrics.ovh/suggest/${searchText}`
//     const response = await fetch(urlOfSongs);
//     const importSongs = await response.json();
//     displaySongs(importSongs.data);
// }

const searchSongs = () => {
    const searchText = document.getElementById("search-item").value;
    // console.log(searchText);
    const urlOfSongs = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(urlOfSongs);
    fetch(urlOfSongs)
        .then(res => res.json())
        .then(importSongs => displaySongs(importSongs.data))
        // .catch(error => console.log(error))
        .catch(error => displayError(error));
}

const displaySongs = songs => {
    // console.log(songs);
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
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

const getLyric = async (artist, title) => {
    // console.log(artist, title);
    const urlOfLyric = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // console.log(urlOfLyric);
    // fetch(urlOfLyric)
    //     .then(res => res.json())
    //     .then(importLyric => displayLyric(importLyric.lyrics))

    try {
        const response = await fetch(urlOfLyric);
        const importLyric = await response.json();
        displayLyric(importLyric.lyrics);

    } catch (error) {
        // displayError('sorry! nothing found try again later');
        console.log(error);
        displayError(error);
        // if (error.length === 5) {
        //     console.log(error);
        // }
        // else {
        //     displayError('sorry! nothing found try again later')
        // }
    }

    // const response = await fetch(urlOfLyric);
    // const importLyric = await response.json();
    // displayLyric(importLyric.lyrics);
}

const displayLyric = lyrics => {
    const lyricsDiv = document.getElementById('song-lyric')
    lyricsDiv.innerHTML = lyrics;
}

const displayError = error => {
    const errorIs = document.getElementById("error-message")
    errorIs.innerText = error;
}
