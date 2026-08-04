const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

const reveals = document.querySelectorAll(".reveal");
function revealSections(){
    reveals.forEach(item=>{
        const windowHeight = window.innerHeight;
        const top = item.getBoundingClientRect().top;
        if(top < windowHeight - 100){
            item.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealSections);
revealSections();

const scrollBtn = document.getElementById("scrollTopBtn");
if (scrollBtn) {
    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 400 ? "flex" : "none";
    });
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-links");
const menuIcon = document.getElementById("menu-icon");

if (menuToggle && navMenu && menuIcon) {
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {
            menuIcon.classList.replace("fa-bars", "fa-xmark");
        } else {
            menuIcon.classList.replace("fa-xmark", "fa-bars");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuIcon.classList.replace("fa-xmark", "fa-bars");
        });
    });
}

const projectGalleries = {
    "smart-inventory": {
        title: "Smart Inventory System",
        folder: "assets/images/projects/smart-inventory/",
        images: [
            "smart-inventory-01.jpg",
            "smart-inventory-02.jpg",
            "smart-inventory-03.jpg",
            "smart-inventory-04.jpg",
            "smart-inventory-05.jpg",
            "smart-inventory-06.jpg",
            "smart-inventory-07.jpg",
            "smart-inventory-08.jpg",
            "smart-inventory-09.jpg",
            "smart-inventory-10.jpg",
            "smart-inventory-11.jpg",
            "smart-inventory-12.jpg",
            "smart-inventory-13.jpg",
            "smart-inventory-14.jpg",
            "smart-inventory-15.jpg",
            "smart-inventory-16.jpg",
            "smart-inventory-17.jpg",
            "smart-inventory-18.jpg",
            "smart-inventory-19.jpg",
            "smart-inventory-20.jpg",
            "smart-inventory-21.jpg"
        ]
    }
};

function initGalleryTriggers() {
    Object.keys(projectGalleries).forEach(key => {
        const gallery = projectGalleries[key];
        const hasImages = gallery.images.length > 0;
        document.querySelectorAll('.project-gallery-trigger[data-gallery="' + key + '"]').forEach(trigger => {
            const coverImg = trigger.querySelector(".project-gallery-cover");
            const countValue = trigger.querySelector(".project-image-count-value");
            if (coverImg) {
                trigger.classList.toggle("has-images", hasImages);
                if (hasImages) {
                    coverImg.src = gallery.folder + gallery.images[0];
                    coverImg.alt = gallery.title + " screenshot preview";
                }
            } else if (!hasImages) {
                trigger.classList.add("is-hidden");
            }
            if (countValue) {
                countValue.textContent = gallery.images.length;
            }
        });
    });
}

initGalleryTriggers();

const lightbox = document.getElementById("galleryLightbox");

if (lightbox) {
    const track = document.getElementById("galleryLightboxTrack");
    const dotsWrap = document.getElementById("galleryLightboxDots");
    const titleEl = document.getElementById("galleryLightboxTitle");
    const counterEl = document.getElementById("galleryLightboxCounter");
    const closeBtn = document.getElementById("galleryLightboxClose");
    const prevBtn = document.getElementById("galleryLightboxPrev");
    const nextBtn = document.getElementById("galleryLightboxNext");

    let activeGallery = null;
    let activeIndex = 0;
    let touchStartX = 0;
    let touchDeltaX = 0;
    let isTouching = false;

    function renderSlides() {
        track.innerHTML = "";
        activeGallery.images.forEach((filename, index) => {
            const slide = document.createElement("div");
            slide.className = "gallery-lightbox-slide";
            const img = document.createElement("img");
            img.src = activeGallery.folder + filename;
            img.alt = activeGallery.title + " screenshot " + (index + 1);
            img.loading = "lazy";
            slide.appendChild(img);
            track.appendChild(slide);
        });
    }

    function renderDots() {
        dotsWrap.innerHTML = "";
        activeGallery.images.forEach((filename, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", "Go to screenshot " + (index + 1));
            if (index === activeIndex) {
                dot.classList.add("active");
            }
            dot.addEventListener("click", () => goToSlide(index));
            dotsWrap.appendChild(dot);
        });
    }

    function updatePosition() {
        track.style.transform = "translateX(" + (-activeIndex * 100) + "%)";
        counterEl.textContent = (activeIndex + 1) + " / " + activeGallery.images.length;
        Array.from(dotsWrap.children).forEach((dot, index) => {
            dot.classList.toggle("active", index === activeIndex);
        });
    }

    function goToSlide(index) {
        if (!activeGallery || activeGallery.images.length === 0) {
            return;
        }
        activeIndex = (index + activeGallery.images.length) % activeGallery.images.length;
        updatePosition();
    }

    function openGallery(galleryId) {
        const gallery = projectGalleries[galleryId];
        if (!gallery || gallery.images.length === 0) {
            return;
        }
        activeGallery = gallery;
        activeIndex = 0;
        titleEl.textContent = gallery.title;
        renderSlides();
        renderDots();
        updatePosition();
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    }

    function closeGallery() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
    }

    document.querySelectorAll(".project-gallery-trigger").forEach(trigger => {
        trigger.addEventListener("click", () => {
            openGallery(trigger.getAttribute("data-gallery"));
        });
        trigger.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGallery(trigger.getAttribute("data-gallery"));
            }
        });
    });

    closeBtn.addEventListener("click", closeGallery);
    prevBtn.addEventListener("click", () => goToSlide(activeIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(activeIndex + 1));

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeGallery();
        }
    });

    document.addEventListener("keydown", event => {
        if (!lightbox.classList.contains("active")) {
            return;
        }
        if (event.key === "Escape") {
            closeGallery();
        }
        if (event.key === "ArrowLeft") {
            goToSlide(activeIndex - 1);
        }
        if (event.key === "ArrowRight") {
            goToSlide(activeIndex + 1);
        }
    });

    track.addEventListener("touchstart", event => {
        isTouching = true;
        touchStartX = event.touches[0].clientX;
        touchDeltaX = 0;
    }, { passive: true });

    track.addEventListener("touchmove", event => {
        if (!isTouching) {
            return;
        }
        touchDeltaX = event.touches[0].clientX - touchStartX;
    }, { passive: true });

    track.addEventListener("touchend", () => {
        if (!isTouching) {
            return;
        }
        isTouching = false;
        if (touchDeltaX > 50) {
            goToSlide(activeIndex - 1);
        } else if (touchDeltaX < -50) {
            goToSlide(activeIndex + 1);
        }
        touchDeltaX = 0;
    });
}