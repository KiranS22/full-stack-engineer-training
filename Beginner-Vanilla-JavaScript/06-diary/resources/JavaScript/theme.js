search(".toggle-container").addEventListener("click", () => {
  let b = search("body");
  b.classList.contains("light")
    ? (b.classList.add("dark"), b.classList.remove("light"))
    : (b.classList.add("light"), b.classList.remove("dark"));
});

