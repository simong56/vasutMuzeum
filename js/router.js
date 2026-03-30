const routes = {
  "/": { title: "Főoldal", file: "/routes/home.html" },
  "/mozdonyok": { title: "Mozdonyok", file: "/routes/mozdonyok.html" },
  "/nagysebessegu": { title: "Nagysebességű vonatok", file: "/routes/nagysebessegu.html" },
  "/szemely-motorkocsik": { title: "Személykocsik és motorkocsik", file: "/routes/szemely-motorkocsik.html" },
  "/palyafenntarto": { title: "Pályafenntartó és különleges járművek", file: "/routes/palyafenntarto.html" },
  "/muszerek": { title: "Műszerek, berendezések és jelzőeszközök", file: "/routes/muszerek.html" },
  "/dokumentumok": { title: "Dokumentumok, modellek és relikviák", file: "/routes/dokumentumok.html" },
};

const app = document.getElementById("app");

async function navigateTo(path) {
  const route = routes[path] || routes["/"];
  document.title = `${route.title} | Vasút Múzeum`;

  const response = await fetch(route.file);
  app.innerHTML = await response.text();

  document.querySelectorAll("nav a[data-link]").forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/^#/, "");
    link.classList.toggle("active", linkPath === path);
  });
}

function router() {
  const path = window.location.hash.slice(1) || "/";
  navigateTo(path);
}

window.addEventListener("hashchange", router);

router();

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

app.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    lightboxImg.src = e.target.src;
    lightboxImg.alt = e.target.alt;
    lightbox.classList.remove("hidden");
  }
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
  }
});
