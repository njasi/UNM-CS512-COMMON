/**
 * Nav content to fall back to if we cant request from
 * the parent repo
 */
const FALLBACK_NAV_CONTENT = {
  homework: [
    {
      label: "HW1: Glass Shatter",
      link: "https://cs512.njasi.com/homework/hw1",
    },
    {
      label: "HW2: Glass Shatter 2",
      link: "https://cs512.njasi.com/homework/hw2",
    },
    {
      label: "HW3: Cannon Minigame",
      link: "https://cs512.njasi.com/homework/hw3",
    },
    { label: "HW4: BVH Loader", link: "https://cs512.njasi.com/homework/hw4" },
    {
      label: "HW5: Primitive Surfers",
      link: "https://cs512.njasi.com/homework/hw5",
    },
  ],
  projects: [
    {
      label: "Potato Engine",
      link: "https://github.com/njasi/UNM-CS512-PotatoEngine",
    },
    {
      label: "OBJ Loader",
      link: "https://cs512.njasi.com/projects/sp1/",
    },
  ],
  misc: [],
};

/**
 * Load bootstrap script into head
 */
function loadBS() {
  const bsscript = document.createElement("script");
  bsscript.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
  bsscript.integrity =
    "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM";
  //   bsscript.crossorigin = "anonymous";
  bsscript.setAttribute("crossorigin", "anonymous");

  document.head.appendChild(bsscript);
}

/**
 * Only alphanumeric & "/.-:"
 * @param {*} input
 */
function cleanInput(input) {
  return input.replace(/[^A-Za-z0-9/.\-:]/g, "");
}

/**
 * Generate a dropdown nav link
 * @param {*} id
 * @param {*} label
 * @param {*} children
 * @param {*} link
 * @returns
 */
function dropdownLink(id, label, children = [], link = "") {
  const dropdown = document.createElement("li");
  dropdown.className = "nav-item dropdown";
  dropdown.innerHTML = `<a
                  class="nav-link dropdown-toggle"
                  href="${link}"
                  id="${id}"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ${label}
                </a>`;
  const list = document.createElement("ul");
  list.className = "dropdown-menu";
  list.setAttribute("aria-labelledby", "navbarDropdownMenuLink");
  children.forEach((c) => list.appendChild(c));

  dropdown.appendChild(list);
  return dropdown;
}

/**
 * Generate a dropdown item to go in a dropdown nav link
 * @param {*} label
 * @param {*} link
 * @returns
 */
function dropdownItem(label, link) {
  const item = document.createElement("li");
  item.innerHTML = `<a class="dropdown-item" href="${link}">${label}</a>`;
  return item;
}

/**
 * Generate a nav item
 * @param {*} label
 * @param {*} link
 * @returns
 */
function navItem(label, link) {
  const item = document.createElement("li");
  item.className = "nav-item dropdown";
  item.innerHTML = `<a class="nav-link" href="${link}">${label}</a>`;
  return item;
}

/**
 * Populate a specified drop down menu
 * @param {*} key
 * @param {*} id
 * @param {*} navContent
 */
function populateDropdown(key, id, navContent = FALLBACK_NAV_CONTENT) {
  const menu = document.getElementById(id);
  navContent[key].forEach((i) =>
    menu.appendChild(dropdownItem(i.label, i.link)),
  );
}

/**
 * Populate the misc links in the bar
 * @param {*} navContent
 */
function populateMisc(navContent = FALLBACK_NAV_CONTENT) {
  const mainNav = document.getElementsByClassName("navbar-nav")[0];
  navContent["misc"].forEach((i) =>
    mainNav.appendChild(navItem(i.label, i.link)),
  );
}

/**
 * Populate the navbar from file in host repo
 */
async function populateNav() {
  const target_file = "/navbar.json";
  let navContent = FALLBACK_NAV_CONTENT;

  try {
    const response = await fetch(target_file);
    if (!response.ok) {
      throw new Error(`Failed to load ${target_file}: ${response.status}`);
    }
    navContent = await response.json();
  } catch {}

  try {
    populateDropdown("homework", "dropdown-homework", navContent);
    populateDropdown("projects", "dropdown-projects", navContent);
    populateMisc();
  } catch (error) {}
}

populateNav();
loadBS();
