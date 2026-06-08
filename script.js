/* ==========================
   Hossam Website Script (Clean)
========================== */

/* الوضع الليلي والنهاري */

const themeBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "🌙";
    }

});

let visits = localStorage.getItem("visits");
let unique = localStorage.getItem("unique");

if (!visits) {
    visits = 0;
}

visits++;
localStorage.setItem("visits", visits);

// أول مرة يدخل
if (!unique) {
    unique = 1;
    localStorage.setItem("unique", unique);
}

document.getElementById("visits").textContent = visits;
document.getElementById("unique").textContent = unique;

/* ==========================
   تأثير ظهور الصفحة
========================== */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".logo,.title,.subtitle,.social-btn,.stat-card"
    );

    elements.forEach((element, index) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";

        setTimeout(() => {

            element.style.transition = ".7s ease";

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }, index * 120);

    });

});

/* ==========================
   تأثير اللوكو
========================== */

const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {

    logo.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.15)" },
        { transform: "scale(1)" }
    ], {
        duration: 500
    });

});

/* ==========================
   حركة خفيفة للماوس (اختياري)
========================== */

const avatar = document.querySelector(".logo");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;

    avatar.style.transform = `
        rotateY(${x}deg)
        rotateX(${y}deg)
    `;
});

/* ==========================
   تأثير الأزرار
========================== */

const buttons = document.querySelectorAll(".social-btn");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-4px) scale(1.05)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0) scale(1)";
    });

});

console.log("Hossam Website Loaded Successfully");

document.querySelector(".card-btn").addEventListener("click", function(e){
  e.preventDefault();

  document.querySelector("#socials").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});
