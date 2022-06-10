const images = document.querySelectorAll(".images"); //returns n array of images
let tracker = 0;
const arrayLength = images.length - 1;
setInterval(() => {
  imageDisplay(tracker++);
}, 2000);

function imageDisplay(img) {
  if (img < 0) {
    img = images.length - 1;
    tracker = images.length - 1;
  }

  if (img > arrayLength) {
    img = 0;
    tracker = 0;
  }
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    image.style.display = "none";
  }
  images[img].style.display = "block";
}

function handleClick(index) {
  imageDisplay((tracker += index));
}

//set an interval for going onto the next image
