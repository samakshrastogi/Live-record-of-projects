import { PROJECTS } from "./data.js";

function getCurrentCredentials() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return {
    username: `samako${year}`,
    password: `d${day}/o${month}/l${year}l`
  };
}

window.login = function () {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  const creds = getCurrentCredentials();

  if (user === creds.username && pass === creds.password) {
    localStorage.setItem("isLoggedIn", "true");
    showDashboard();
  } else {
    document.getElementById("error").classList.remove("d-none");
  }
};

function checkSession() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    showDashboard();
  }
}

function showDashboard() {
  document.getElementById("loginPage").classList.add("d-none");
  document.getElementById("dashboard").classList.remove("d-none");
  init();
}

window.logout = function () {
  localStorage.removeItem("isLoggedIn");
  location.reload();
};

function getCategories() {
  return ["all", ...new Set(PROJECTS.map(p => p.category))];
}

function loadCategories() {
  const filter = document.getElementById("filterCategory");
  filter.innerHTML = "";

  getCategories().forEach(cat => {
    filter.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

window.loadProjects = function () {
  const container = document.getElementById("projectContainer");
  const filter = document.getElementById("filterCategory").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  container.innerHTML = "";

  PROJECTS.forEach(p => {
    const matchCategory = filter === "all" || p.category === filter;
    const matchSearch =
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search);

    if (!matchCategory || !matchSearch) return;

    const preview = `https://image.thum.io/get/width/600/${p.link}`;

    container.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card glass card-custom text-white h-100">
          <img src="${preview}" 
               onerror="this.src='https://via.placeholder.com/600x400?text=Preview'"
               class="card-img-top">

          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between mb-2">
                <h6 class="mb-0">${p.name}</h6>
                <span class="badge bg-primary">${p.category}</span>
              </div>

              <p class="project-link small">${p.link}</p>
            </div>

            <a href="${p.link}" target="_blank" class="text-info mt-2">
              Visit →
            </a>
          </div>
        </div>
      </div>
    `;
  });
};

function init() {
  loadCategories();
  loadProjects();
}

checkSession();
