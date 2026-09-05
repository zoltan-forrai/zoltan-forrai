function getStoredPref() {
  try {
    return JSON.parse(localStorage.getItem("userPref")) ?? {};
  } catch {
    return {};
  }
}

function getStoredTheme() {
  const stored = getStoredPref();
  return stored?.themes?.theme?.userValue ?? "dark";
}

function setStoredTheme(value) {
  const stored = getStoredPref();

  if (!stored.themes) stored.themes = {};
  if (!stored.themes.theme)
    stored.themes.theme = { defValue: "dark", userValue: null };

  stored.themes.theme.userValue = value;

  localStorage.setItem("userPref", JSON.stringify(stored));
}

function applyTheme(value) {
  if (value === "light") {
    document.documentElement.id = "light";
  } else {
    document.documentElement.removeAttribute("id");
  }
  document.dispatchEvent(new Event("themechange"));
}

// Apply the stored theme immediately, before anything else runs,
// so there's no flash of the wrong theme on load.
applyTheme(getStoredTheme());

function toggleTheme() {
  const current = getStoredTheme();
  const next = current === "light" ? "dark" : "light";

  setStoredTheme(next);

  if (!document.startViewTransition) {
    applyTheme(next);
    return;
  }

  document.startViewTransition(() => {
    applyTheme(next);
  });
}

const btnTheme = {
  id: "btn-theme",
  html: `<button id="btn-theme" title="Press: 'T'"><span id="theme-track"></span><span id="theme-thumb"></span></button>`,
  onClick: toggleTheme,
};

const menuButtons = document.querySelector("#menu-buttons");
if (menuButtons) {
  menuButtons.insertAdjacentHTML("beforeend", btnTheme.html);
}

document
  .getElementById(btnTheme.id)
  .addEventListener("click", btnTheme.onClick);

document.addEventListener("keydown", (e) => {
  const target = e.target;
  const isTyping =
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable;

  if (isTyping) return;

  if (e.key.toLowerCase() === "t") {
    toggleTheme();
  }
});
