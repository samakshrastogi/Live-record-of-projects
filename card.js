import { PROJECTS } from "./data.js";

/* ================= AUTH ================= */

const USERNAME = "user";
const PASSWORD = "admin";

window.login = function () {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === USERNAME && pass === PASSWORD) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    init();
  } else {
    document.getElementById("error").classList.remove("hidden");
  }
};

window.logout = function () {
  location.reload();
};

/* ================= CATEGORY ================= */

function getCategories() {
  return ["all", ...new Set(PROJECTS.map((p) => p.category))];
}

function loadCategories() {
  const filter = document.getElementById("filterCategory");
  filter.innerHTML = "";

  getCategories().forEach((cat) => {
    filter.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

/* ================= PROJECT UI ================= */

window.loadProjects = function () {
  const container = document.getElementById("projectContainer");
  const selected = document.getElementById("filterCategory").value;

  container.innerHTML = "";

  PROJECTS.forEach((proj) => {
    if (selected !== "all" && proj.category !== selected) return;

    const preview = `https://image.thum.io/get/width/600/${proj.link}`;

    container.innerHTML += `
      <div class="bg-white/10 rounded-xl overflow-hidden border border-white/20 hover:scale-105 transition">

        <img src="${preview}" class="h-40 w-full object-cover">

        <div class="p-4">
          <div class="flex justify-between items-center">
            <h2 class="font-semibold">${proj.name}</h2>
            <span class="text-xs bg-purple-500 px-2 rounded">
              ${proj.category}
            </span>
          </div>

          <a href="${proj.link}" target="_blank"
            class="text-blue-400 text-sm block mt-2 truncate">
            Visit →
          </a>
        </div>
      </div>
    `;
  });
};

/* ================= INIT ================= */

function init() {
  loadCategories();
  loadProjects();
}
