const pages = document.querySelectorAll(".page");

let currentPage = 0;

// EXCLUDE LAST PAGE FROM FLIP COUNT
const totalFlippablePages = pages.length - 1;

// Set stacking order
pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
});

document.querySelector(".book").addEventListener("click", (e) => {

    const bookWidth = e.currentTarget.clientWidth;
    const clickX = e.offsetX;

    // RIGHT SIDE → Forward
    if (clickX > bookWidth / 2) {

        // Stop before last page
        if (currentPage < totalFlippablePages) {
            pages[currentPage].classList.add("flipped");
            currentPage++;
        }

    } 
    // LEFT SIDE → Backward
    else {

        if (currentPage > 0) {
            currentPage--;
            pages[currentPage].classList.remove("flipped");
        }

    }

});
