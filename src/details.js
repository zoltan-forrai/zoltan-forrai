const allDetails = document.querySelectorAll("details");

const topLevelDetails = [...allDetails].filter(
  (detail) => !detail.parentElement.closest("details"),
);

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "o") {
    const shouldOpen = topLevelDetails.some((detail) => !detail.open);

    topLevelDetails.forEach((detail) => {
      detail.open = shouldOpen;
    });
  }
});

allDetails.forEach((detail) => {
  detail.addEventListener("toggle", () => {
    playDetails(detail.open);
  });
});

document.querySelectorAll("summary").forEach((el) => {
  el.addEventListener("mousedown", (e) => {
    if (e.detail > 1) {
      // double-click or more
      e.preventDefault(); // prevents text selection
    }
  });
});