const audioPlayer = document.getElementById("audio-player");
const songCards = document.querySelectorAll(".song-card");

let currentCard = null;

songCards.forEach(card => {

    const toggleBtn = card.querySelector(".toggle-btn");
    const songSrc = card.getAttribute("data-src");

    toggleBtn.addEventListener("click", () => {

        // If clicking a different song
        if (currentCard && currentCard !== card) {
            currentCard.querySelector(".toggle-btn").textContent = "▶";
        }

        if (audioPlayer.src.includes(songSrc) && !audioPlayer.paused) {
            // Pause current song
            audioPlayer.pause();
            toggleBtn.textContent = "▶";
        } else {
            // Play new song
            audioPlayer.src = songSrc;
            audioPlayer.play();
            toggleBtn.textContent = "⏸";
            currentCard = card;
        }

    });

});

// When song ends → reset button
audioPlayer.addEventListener("ended", () => {
    if (currentCard) {
        currentCard.querySelector(".toggle-btn").textContent = "▶";
    }
});
