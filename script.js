const searchSongs = () => {
    const searchText = document.getElementById("search-item").value;
    // console.log(searchText);
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));

}