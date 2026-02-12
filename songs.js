const audioPlayer = document.getElementById("audio-player");
const songCards = document.querySelectorAll(".song-card");

const previewPanel = document.getElementById("songPreview");
const previewTitle = document.getElementById("previewTitle");
const previewArtist = document.getElementById("previewArtist");
const previewImage = document.getElementById("previewImage");
const previewToggle = document.getElementById("previewToggle");
const progressBar = document.getElementById("previewProgressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let currentCard = null;

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

songCards.forEach(card => {

    const toggleBtn = card.querySelector(".toggle-btn");
    const songSrc = card.getAttribute("data-src");
    const title = card.querySelector("h3").textContent;
    const artist = card.querySelector("p").textContent;

    toggleBtn.addEventListener("click", () => {

        if (currentCard && currentCard !== card) {
            currentCard.querySelector(".toggle-btn").textContent = "▶";
        }

        if (audioPlayer.src.includes(songSrc) && !audioPlayer.paused) {
            audioPlayer.pause();
            toggleBtn.textContent = "▶";
            previewToggle.textContent = "▶";
            previewPanel.classList.remove("active");

        } else {
            audioPlayer.src = songSrc;
            audioPlayer.play();

            toggleBtn.textContent = "⏸";
            previewToggle.textContent = "⏸";

            previewTitle.textContent = title;
            previewArtist.textContent = artist;

            // Example: Each song can have matching video
            // Load matching image instead of video
            const imageName = songSrc.split("/").pop().replace(".mp3", ".jpeg");

            previewImage.style.opacity = 0;

            setTimeout(() => {
                previewImage.src = "covers/" + imageName;
                previewImage.style.opacity = 1;
            }, 200);


            previewPanel.classList.add("active");

            currentCard = card;
        }

    });

});

// Sync preview toggle
previewToggle.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        previewToggle.textContent = "⏸";
    } else {
        audioPlayer.pause();
        previewToggle.textContent = "▶";
    }
});

// Progress
audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + "%";
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

audioPlayer.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});

// Hide preview when ended
audioPlayer.addEventListener("ended", () => {
    previewToggle.textContent = "▶";
});
