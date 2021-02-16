// const searchSongs = async () => {
//     const searchText = document.getElementById("search-item").value;
//     console.log(searchText);
//     const urlOfSongs = `https://api.lyrics.ovh/suggest/${searchText}`
//     const response = await fetch(urlOfSongs);
//     const importSongs = await response.json();
//     displaySongs(importSongs.data);
// }

// function for Enter Keypress//
var searchButton = document.getElementById("search-button");
searchItem = document.getElementById("search-item")
    .addEventListener("keypress", function (event) {
        if (event.key == 'Enter') {
            searchButton.click();
        }
    });

const searchSongs = () => {
    const searchText = document.getElementById("search-item").value;
    // console.log(searchText);
    const urlOfSongs = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(urlOfSongs);
    // toggleSpinner(false); //not using toggle /
    toggleSpinner();    // using toggle /
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
        console.log(song)
        // debugger
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <button onclick = "getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        <div class="col-md-3 text-center">
            <img src="${song.album.cover}" class="rounded mx-auto d-block"></img>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        `;
        songContainer.appendChild(songDiv);
        // toggleSpinner(false); //not using toggle /
        toggleSpinner();    // using toggle /
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
        console.log(importLyric);
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
    lyricsDiv.innerHTML = `<pre> ${lyrics} </pre>`;
}

const displayError = error => {
    const errorIs = document.getElementById("error-message")
    errorIs.innerText = error;
}

// // using non-toggle methods (if-else with true,false) /
// const toggleSpinner = (show) => {
//     const spinner = document.getElementById("loading-spinner");
//     // console.log(spinner.classList);
//     if (show) {
//         spinner.classList.remove('d-none');
//     }
//     else {
//         spinner.classList.add('d-none');
//     }

// }

// using toggle methods /
const toggleSpinner = (show) => {
    const spinner = document.getElementById("loading-spinner");
    const songs = document.getElementById("song-container");
    // console.log(spinner.classList);
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');

}