const routes = {
  "/": { title: "Főoldal", file: "/routes/home.html" },
  "/mozdonyok": { title: "Mozdonyok", file: "/routes/mozdonyok.html" },
  "/nagysebessegu": {title: "Nagysebességű vonatok", file: "/routes/nagysebessegu.html" },
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
    link.classList.toggle("active", link.getAttribute("href") === path);
  });
}

function router() {
  navigateTo(window.location.pathname);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    const path = link.getAttribute("href");
    if (path !== window.location.pathname) {
      history.pushState(null, "", path);
      router();
    }
  }
});

window.addEventListener("popstate", router);

router();
