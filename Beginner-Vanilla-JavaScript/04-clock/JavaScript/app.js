

const updateClock = () => {
  const currentDate = new Date();
  let hours = currentDate.getHours();
  let seconds = currentDate.getSeconds();
  let minutes = currentDate.getMinutes();
  let secondsDegrees = minutes * 6;
  document.querySelector(".second").style.transform =
    "rotate(" + secondsDegrees + "deg)";
  let minutesDegrees = seconds * 6;
  document.querySelector(".minute").style.transform =
    "rotate(" + minutesDegrees + "deg)";
  let hoursDegrees = minutes / 2 + hours * 30;
  document.querySelector(".hour").style.transform =
    "rotate(" + hoursDegrees + "deg)";
};

setInterval(() => {
  updateClock();
}, 1000);
updateClock();
