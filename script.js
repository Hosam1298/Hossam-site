/* ==========================
   Hossam Website Script
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

// ==========================
// 🔥 Firebase CONFIG (جاهز)
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSyDrer2hM034u3LvVYDKp-r2-AEVCY9uARc",
  authDomain: "hossam-site-da44b.firebaseapp.com",
  projectId: "hossam-site-da44b",
  storageBucket: "hossam-site-da44b.firebasestorage.app",
  messagingSenderId: "344582850386",
  appId: "1:344582850386:web:a68dc0b5bae6ea47519c8b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const statsRef = db.collection("stats").doc("main");

// ==========================
// 👤 Unique User ID
// ==========================
let uid = localStorage.getItem("uid");

if (!uid) {
  uid = Math.random().toString(36).substring(2);
  localStorage.setItem("uid", uid);
}

// ==========================
// 📊 Add Visit
// ==========================
async function addVisit() {

  const doc = await statsRef.get();

  if (!doc.exists) {
    await statsRef.set({
      total: 1,
      unique: 1,
      users: [uid]
    });
  } else {

    let data = doc.data();
    let users = data.users || [];

    if (!users.includes(uid)) {
      users.push(uid);
    }

    await statsRef.update({
      total: data.total + 1,
      unique: users.length,
      users: users
    });
  }

  loadStats();
}

// ==========================
// 📊 Load Stats
// ==========================
async function loadStats() {

  const doc = await statsRef.get();

  if (doc.exists) {
    let data = doc.data();

    document.getElementById("visits").innerText = data.total;
    document.getElementById("unique").innerText = data.unique;
  }
}

// تشغيل
addVisit();

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

        button.style.transform =
            "translateY(-4px) scale(1.05)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translateY(0) scale(1)";

    });

});

fetch("https://ipapi.co/json/")
.then(res => res.json())
.then(data => {

  console.log("🌍 Visitor Info:");
  console.log("Country:", data.country_name);
  console.log("City:", data.city);
  console.log("IP:", data.ip);

});

db.collection("stats").doc("main").set({
  totalVisits: 1,
  uniqueVisitors: 1,
  lastVisit: new Date().toString()
});


/* ==========================
   رسالة تجريبية
========================== */

console.log("Hossam Website Loaded Successfully");