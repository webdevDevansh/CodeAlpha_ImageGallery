const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleImages = [];
let currentIndex = 0;

// Get images that match the selected category
function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => {
        return !item.classList.contains("hide");
    });
}

// Filter images by category
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const category = button.dataset.category;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        galleryItems.forEach(item => {
            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.classList.remove("hide");
            } else {
                item.classList.add("hide");
            }
        });

        updateVisibleImages();
    });
});

// Open lightbox
galleryItems.forEach(item => {
    item.addEventListener("click", () => {

        updateVisibleImages();

        currentIndex = visibleImages.indexOf(item);

        if (currentIndex !== -1) {
            showImage();
            lightbox.classList.add("show");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            closeBtn.focus();
        }
    });
});

// Display current image
function showImage() {
    const item = visibleImages[currentIndex];

    if (!item) return;

    const img = item.querySelector("img");
    const title = item.querySelector("h3");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title.textContent;

    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleImages.length}`;
}

// Next image
nextBtn.addEventListener("click", () => {
    if (visibleImages.length === 0) return;

    currentIndex = (currentIndex + 1) % visibleImages.length;
    showImage();
});

// Previous image
prevBtn.addEventListener("click", () => {
    if (visibleImages.length === 0) return;

    currentIndex =
        (currentIndex - 1 + visibleImages.length) %
        visibleImages.length;

    showImage();
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking outside the image
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "Escape") {
        closeLightbox();
    }
});

// Initial gallery setup
updateVisibleImages();