search(".toggle-container").addEventListener("click", () => {
  let b = search("body");
  b.classList.contains("light")
    ? (b.classList.add("dark"), b.classList.remove("light"))
    : (b.classList.add("light"), b.classList.remove("dark"));
});

const menuClick = document.querySelectorAll(
  "#menu.close, .form-container.close"
);
menuClick.forEach((element) =>
  element.addEventListener("click", (e) => {
    e.target.matches(".form-container *", '.form-container')
      ? search(".left-col").classList.remove("on")
      : search(".left-col").classList.toggle("on");
  })
);
