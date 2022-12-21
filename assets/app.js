const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "Chill_with_MT";

const player = $(".music-player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    playedSong: [0],
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: "Die For You",
            singer: "The Weeknd",
            path: "./assets/audio/The_Weeknd_Die_For_You_(thinkNews.com.ng).mp3",
            image: "./assets/image/DieForYou.jpg",
        },
        {
            name: "Love Yourself",
            singer: "Justin Bieber",
            path: "./assets/audio/Justin_Bieber_-_Love_Yourself_(Jesusful.com).mp3",
            image: "./assets/image/LoveYourself.jpg",
        },
        {
            name: "I Like You",
            singer: "Post Malone",
            path: "./assets/audio/Post_Malone_Doja_Cat_Wrapped_Around_Your_Finger_(thinkNews.com.ng).mp3",
            image: "./assets/image/ILikeYou.jpg",
        },
        {
            name: "Save Your Tears",
            singer: "The Weeknd",
            path: "./assets/audio/Save Your Tears - The Weeknd.mp3",
            image: "./assets/image/SaveYourTears.jpg",
        },
        {
            name: "Heartbreak Anniversary",
            singer: "Giveon",
            path: "./assets/audio/HeartbreakAnniversary-Giveon-7692517.mp3",
            image: "./assets/image/HeartbreakAnniversary.jpg",
        },
        {
            name: "Double Take",
            singer: "Dhruv",
            path: "./assets/audio/DoubleTake-Dhruv-7016375.mp3",
            image: "./assets/image/DoubleTake.jpg",
        },
        {
            name: "Here With Me",
            singer: "D4vd",
            path: "./assets/audio/d4vd-here-with-me_456239153.mp3",
            image: "./assets/image/HereWithMe.jpg",
        },
        {
            name: "Deja Vu",
            singer: "D4vd",
            path: "./assets/audio/Deja Vu - Olivia Rodrigo.mp3",
            image: "./assets/image/DejaVu.jpg",
        },
        {
            name: "Kiss Me More",
            singer: "Doja Cat",
            path: "./assets/audio/Kiss Me More - Doja Cat_ SZA.mp3",
            image: "./assets/image/KissMeMore.jpg",
        },
        {
            name: "Night Changes",
            singer: "One Direction",
            path: "./assets/audio/Night-Changes(PagalWorld).mp3",
            image: "./assets/image/NightChanges.jpg",
        },
        {
            name: "Paris In The Rain",
            singer: "Lauv",
            path: "./assets/audio/Paris In The Rain - Lauv.mp3",
            image: "./assets/image/ParisInTheRain.jpg",
        },
        {
            name: "Summertime Sadness",
            singer: "Lana Del Rey",
            path: "./assets/audio/Summertime Sadness - Lana Del Rey.mp3",
            image: "./assets/image/SummertimeSadness.jpg",
        },
        {
            name: "Intentions",
            singer: "Justin Bieber",
            path: "./assets/audio/Intentions - Justin Bieber Quavo (NhacPro.net).mp3",
            image: "./assets/image/Intentions.jpg",
        },
        {
            name: "Positions",
            singer: "Ariana Grande",
            path: "./assets/audio/Positions - Ariana Grande.mp3",
            image: "./assets/image/Positions.jpg",
        },
        {
            name: "STAY",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./assets/audio/Stay - The Kid LAROI_ Justin Bieber.mp3",
            image: "./assets/image/Stay.jpg",
        },
        {
            name: "Dusk Till Dawn",
            singer: "ZAYN & Sia",
            path: "./assets/audio/Dusk_Till_Dawn.mp3",
            image: "./assets/image/DuskTillDawn.jpg",
        },
        {
            name: "Dancing With Your Ghost",
            singer: "Sasha Sloan",
            path: "./assets/audio/DancingWithYourGhost-SashaSloan-6033576.mp3",
            image: "./assets/image/DancingWithYourGhost.jpg",
        },
        {
            name: "Symphony",
            singer: "Clean Bandit",
            path: "./assets/audio/Symphony-CleanBanditZaraLarsson-4822950.mp3",
            image: "./assets/image/Symphony.jpg",
        },
        {
            name: "Childhood Dreams",
            singer: "ARY (Cover by Seraphine) ♪",
            path: "./assets/audio/Childhood dream - Seraphine.mp3",
            image: "./assets/image/ChildhoodDreams.jpg",
        },
        {
            name: "Rendezvous",
            singer: "DEAMN",
            path: "./assets/audio/Rendezvous - DEAMN.mp3",
            image: "./assets/image/Rendezvous.jpg",
        },
    ],

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
              <div class="song ${
                  index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                  <div
                      class="thumb"
                      style="
                          background-image: url('${song.image}');
                      "
                  ></div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fa-solid fa-ellipsis"></i>
                  </div>
              </div>
        `;
        });
        playlist.innerHTML = htmls.join("");
    },

    handleEvents: function () {
        const _this = this;

        // Xu ly CD quay
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000,
            iterations: Infinity,
        });
        cdThumbAnimate.pause();

        // Xu ly phong to / thu nho CD
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollValue = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollValue;

            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        };

        // Xu ly play / pause
        function playMusic() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        playBtn.addEventListener("click", playMusic);

        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        // Xu ly tien trinh bai hat
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercent;
            }
        };

        // Xu ly tua bai hat
        handleSeeking = function (e) {
            if (audio.duration) {
                const seekTime = (audio.duration * e.target.value) / 100;
                audio.currentTime = seekTime;
            }
        };
        progress.addEventListener("input", handleSeeking);

        // Xu ly next song / prev song
        handleNextSong = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToView();
        };
        handlePrevSong = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToView();
        };
        nextBtn.addEventListener("click", handleNextSong);
        prevBtn.addEventListener("click", handlePrevSong);

        // Xu ly trang thai nut random
        handleToggleRandom = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", _this.isRandom);
        };
        randomBtn.addEventListener("click", handleToggleRandom);

        // Xu ly trang thai nut repeat
        handleToggleRepeat = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };
        repeatBtn.addEventListener("click", handleToggleRepeat);

        // Xu ly ended song
        handleEndedSong = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                handleNextSong();
            }
        };
        audio.addEventListener("ended", handleEndedSong);

        // Xu ly play clicked song
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song");
            if (songNode || e.target.closest(".option")) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        };

        // Keyboard controls
        window.addEventListener("keydown", function (e) {
            if (e.key === " ") {
                e.preventDefault();
                playMusic();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                if (audio.currentTime <= audio.duration) audio.currentTime += 10;
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (audio.currentTime >= 0) audio.currentTime -= 10;
            } else if (e.key === "n") {
                e.preventDefault();
                handleNextSong();
            } else if (e.key === "v") {
                e.preventDefault();
                handlePrevSong();
            } else if (e.key === "s") {
                e.preventDefault();
                handleToggleRandom();
            } else if (e.key === "p") {
                e.preventDefault();
                handleToggleRepeat();
            }
        });
    },

    scrollToView: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }, 200);
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) this.currentIndex = 0;
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex == -1) this.currentIndex = this.songs.length - 1;
        this.loadCurrentSong();
    },

    isRandomRepeated: (array, value) => {
        return array.some(function (ArrayItem) {
            return ArrayItem === value;
        });
    },
    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (
            newIndex === this.currentIndex &&
            this.isRandomRepeated(this.playedSong, newIndex)
        );
        this.currentIndex = newIndex;
        this.playedSong.push(this.currentIndex);
        if (this.playedSong.length === this.songs.length) {
            this.playedSong = [];
        }
        this.loadCurrentSong();
    },

    start: function () {
        this.loadConfig();
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();

        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    },
};

app.start();
// Random but not repeat 1 song many times
