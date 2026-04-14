import { PROJECTS } from "./data.js";

const USERNAME = "user";
const PASSWORD = "admin";

const SESSION_KEY = "isLoggedIn";

/* ================= LOGIN ================= */
window.login = function () {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === USERNAME && pass === PASSWORD) {
    localStorage.setItem(SESSION_KEY, "true");
    showDashboard();
  } else {
    document.getElementById("error").classList.remove("d-none");
  }
};

/* ================= AUTO LOGIN ================= */
function checkSession() {
  if (localStorage.getItem(SESSION_KEY) === "true") {
    showDashboard();
  }
}

/* ================= SHOW DASHBOARD ================= */
function showDashboard() {
  document.getElementById("loginPage").classList.add("d-none");
  document.getElementById("dashboard").classList.remove("d-none");
  init();
}

/* ================= LOGOUT (UPDATED) ================= */
window.logout = function () {
  localStorage.removeItem(SESSION_KEY);
  location.reload();
};

/* ================= CATEGORY ================= */
function getCategories() {
  return ["all", ...new Set(PROJECTS.map((p) => p.category))];
}

function loadCategories() {
  const select = document.getElementById("filterCategory");
  select.innerHTML = "";

  getCategories().forEach((cat) => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

/* ================= LOAD PROJECTS ================= */
window.loadProjects = function () {
  const container = document.getElementById("projectContainer");
  const filter = document.getElementById("filterCategory").value;
  const search = document.getElementById("searchInput").value.toLowerCase();

  container.innerHTML = "";

  PROJECTS.forEach((p) => {
    const matchCategory = filter === "all" || p.category === filter;
    const matchSearch =
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search);

    if (!matchCategory || !matchSearch) return;

    const preview = `https://image.thum.io/get/width/600/${p.link}`;

    container.innerHTML += `
      <div class="col-12">
        <div class="card glass card-custom text-white p-2">

          <div class="row g-0 align-items-center">

            <div class="col-md-4">
              <img src="${preview}" 
                   onerror="this.src='https://via.placeholder.com/600x400?text=Preview+Not+Available'"
                   class="img-fluid w-100 h-100">
            </div>

            <div class="col-md-8">
              <div class="card-body d-flex flex-column justify-content-between h-100">

                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="mb-0">${p.name}</h5>
                  <span class="badge bg-primary">${p.category}</span>
                </div>

                <p class="text-muted small mb-2">${p.link}</p>

                <a href="${p.link}" target="_blank" class="text-info">
                  Visit →
                </a>

              </div>
            </div>

          </div>

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

/* ================= RUN ================= */
checkSession();
