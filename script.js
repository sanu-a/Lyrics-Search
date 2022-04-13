const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = search.value.trim();

  if (!searchValue) {
    alert("Type the name of the song or the artist");
  } else {
    searchSong(searchValue);
  }
});

// search by song or artist
async function searchSong(searchValue) {
  const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
  const data = await searchResult.json();
  showData(data);
}
//updating DOM
function showData(data) {
  result.innerHTML = `<ul class="song-list">
            ${data.data
              .map(
                (song) =>
                  `<li class="list-item">
                    <div>
                        <strong>
                            ${song.artist.name}
                        </strong>
                        ${song.title}
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                        get lyrics
                    </span>
                </li>`
              )
              .join("")}
        </ul>`;
}

result.addEventListener("click", (e) => {
  const clickedElement = e.target;

  if (clickedElement.tagName === "SPAN") {
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");
    getLyrics(artist, songTitle);
  }
});

// get lyrcis
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `
                    <h2 class="final-name">
                          ${artist} - ${songTitle}
                    </h2>
                    <p>${lyrics}</p>
                    `;
}
