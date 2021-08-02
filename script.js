let now_playing = document.querySelector(".now-playing");
let music_bg = document.querySelector(".music-bg");
let music_name = document.querySelector(".music-name");
let music_artist = document.querySelector(".music-artist");

let playpause_btn = document.querySelector(".playpause-music");
let next_btn = document.querySelector(".next-music");
let prev_btn = document.querySelector(".prev-music");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let music_index = 0;
let isPlaying = false;
let updateTimer;

// Creating our new audio element
let curr_music = document.createElement('audio');

// Let's hardcode musics for now (collecting music & pics from open source for free).
let music_list = [
  {
    name: "Lets make this a song (Free-Music-Archive)",
    artist: "by : Balkan Jingles",
    image: "https://www.securitymagazine.com/ext/resources/images/Deepfakes-freepik.jpg?1617050679?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/rK7L5FPZwUOH94azJzEWIgEtU6QRwdeIsWsd5SUU.mp3"
  },
  {
    name: "A Feather (Free-Music-Archive)",
    artist: "by : Eric Van Der Westen",
    image: "https://www.bensound.com/bensound-img/happyrock.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/yCdsBY5ExjnMHv1lIIx13azbeiy9aIhF8hUc7020.mp3"
  },
  {
    name: "Jamaica Jive (Free-Music-Archive)",
    artist: "by : Mr. Ruiz",
    image: "https://i.dlpng.com/static/png/6998905_preview.png?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/N9KETKhhznaLcQlUoZki3UIn2cBzsbxPYWeP4Wip.mp3",
  },
  {
    name: "Refraction (Free-Music-Archive)",
    artist: "by : Another Brick",
    image: "	https://img.freepik.com/free-vector/international-…al-instruments_23-2148865774.jpg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/5u5fqd2JUEG7btIkcQILRu5pWIU54f8wmWsFEtzC.mp3",
  },

];

function random_bg_color() {

  // For lighter colors, lets derive a number between 64 to 256.
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct mix bg color
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadMusic(music_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_music.src = music_list[music_index].path;
  curr_music.load();

  music_bg.style.backgroundImage = "url(" + music_list[music_index].image + ")";
  music_name.textContent = music_list[music_index].name;
  music_artist.textContent = music_list[music_index].artist;
  now_playing.textContent = "PLAYING SONG NUMBER " + (music_index + 1) + " OF TOTAL " + music_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_music.addEventListener("ended", nextMusic);
  random_bg_color();
  document.getElementById("rotateMe").style.animationPlayState = "paused";
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Loading 1st music in the list
loadMusic(music_index);

function playpauseMusic() {
  if (!isPlaying) playMusic();
  else pauseMusic();
}

function playMusic() {
  curr_music.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  document.getElementById("rotateMe").style.animationPlayState = "running";
}

function pauseMusic() {
  curr_music.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  document.getElementById("rotateMe").style.animationPlayState = "paused";
}

function nextMusic() {
  if (music_index < music_list.length - 1)
  music_index += 1;
  else music_index = 0;
  loadMusic(music_index);
  playMusic();
}

function prevMusic() {
  if (music_index > 0)
  music_index -= 1;
  else music_index = music_list.length;
  loadMusic(music_index);
  playMusic();
}

function seekTo() {
  let seekto = curr_music.duration * (seek_slider.value / 100);
  curr_music.currentTime = seekto;
}

function setVolume() {
  curr_music.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_music.duration)) {
    seekPosition = curr_music.currentTime * (100 / curr_music.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_music.currentTime / 60);
    let currentSeconds = Math.floor(curr_music.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_music.duration / 60);
    let durationSeconds = Math.floor(curr_music.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}