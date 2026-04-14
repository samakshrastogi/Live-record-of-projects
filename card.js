import { PROJECTS } from "./data.js";

const USERNAME = "user";
const PASSWORD = "admin";
const SESSION_KEY = "isLoggedIn";

/* LOGIN */
window.login = function () {
  if (username.value === USERNAME && password.value === PASSWORD) {
    localStorage.setItem(SESSION_KEY, "true");
    showDashboard();
  } else {
    error.classList.remove("d-none");
  }
};

/* AUTO LOGIN */
function checkSession() {
  if (localStorage.getItem(SESSION_KEY) === "true") {
    showDashboard();
  }
}

/* SHOW DASHBOARD */
function showDashboard() {
  loginPage.classList.add("d-none");
  dashboard.classList.remove("d-none");
  init();
}

/* LOGOUT */
window.logout = function () {
  localStorage.removeItem(SESSION_KEY);
  location.reload();
};

/* CATEGORY */
function getCategories() {
  return ["all", ...new Set(PROJECTS.map(p => p.category))];
}

function loadCategories() {
  filterCategory.innerHTML = "";
  getCategories().forEach(c => {
    filterCategory.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

/* PROJECTS */
window.loadProjects = function () {
  const container = projectContainer;
  const filter = filterCategory.value;
  const search = searchInput.value.toLowerCase();

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
                <h6>${p.name}</h6>
                <span class="badge bg-primary">${p.category}</span>
              </div>

              <p class="project-link">${p.link}</p>
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

/* INIT */
function init() {
  loadCategories();
  loadProjects();
}

/* RUN */
checkSession();
