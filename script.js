let currentSong = new Audio();


async function getSongs() {
  let api = await fetch("http://localhost:8158/song.html");
  let response = await api.text();
  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.querySelectorAll("a");

  let songs = [];
  for (let i = 0; i < as.length; i++) {
    let element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

function playMusic(track) {
  currentSong.src = "/songs/" + track;
  currentSong.play();
}

async function main() {
  let songs = await getSongs();
  console.log(songs);
  let songul = document.querySelector('.song').getElementsByTagName('ul')[0];
  let cardCont = document.querySelector(".cardCont");
  for (song of songs) {
    songul.innerHTML = songul.innerHTML + `<li>${song.replaceAll("%20"," ")}</li>`;
    cardCont.innerHTML = cardCont.innerHTML + `
      <div class="card">
        <div class="cover"></div>
        <div class="crname">${song.replaceAll("%20"," ")}</div>
      </div>`;
  }

  Array.from(document.querySelector(".song").getElementsByTagName('li')).forEach(e => {
    e.addEventListener("click", () => {
      playMusic(e.innerHTML.trim());
    });
  });

  Array.from(document.querySelector(".cardCont").querySelectorAll(".crname")).forEach(el => {
    el.addEventListener("click", () => {
      console.log(el.innerHTML);
      playMusic(el.innerHTML.trim());
      document.querySelector(".playbar").getElementsByTagName("div")[0].innerHTML = el.innerHTML
    });
  });

let play = document.querySelector(".play");
let x = 1;

play.addEventListener("click", () => {
  if (x === 1) {
    play.src = "/img/pause.svg";
    currentSong.play()
    x = 0;
  } else {
    play.src = "/img/play.svg";
    
    currentSong.pause()
    x = 1;
  }
});

let vl = document.querySelector(".volume")
let y = 1
vl.addEventListener("click", () => {
  if (y === 1) {
    vl.src = "/img/volume.svg"
    currentSong.volume = 1
    y = 0;
  } else {
    vl.src = "/img/mute.svg";
    currentSong.volume = 0
    y = 1;
  }
});




}

main();
