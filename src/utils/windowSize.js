export const setSize = () => {
  const mainContainer = document.getElementById("mainContainer");
  if (!mainContainer) return;
  const width = window.innerWidth;
  const height = window.innerHeight;

  document.documentElement.style.setProperty("--windowHeight", `${height}px`);
  document.documentElement.style.setProperty("--windowWidth", `${width}px`);

  if (width < 1280) {
    mainContainer.style.width = "100%";
    mainContainer.style.height = `${(width * 720) / 1280}px`;
  } else {
    mainContainer.style.height = "100%";
    mainContainer.style.width = `${(height * 1280) / 720}px`;
  }

  document.documentElement.style.setProperty(
    "--vw",
    `${mainContainer.clientWidth / 100}px`
  );
  document.documentElement.style.setProperty(
    "--vh",
    `${mainContainer.clientHeight / 100}px`
  );
};
