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

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}