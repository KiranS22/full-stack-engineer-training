const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=51ce1ae4c31f95d8ef09f1a50a37c94e";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

let parentDiv = document.querySelector(".container");
let popupContent = document.querySelector(".popupcontent");
fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    let movies = data.results;
    movies.forEach((element) => {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
      <div class='movie-img'>
      <img src='${IMG_PATH + element.poster_path}' class="main-img"/>
      <div class="movie-strip">
      <div class="rating">
      <img src="https://img.icons8.com/ios-glyphs/30/000000/star--v1.png" width="30px" height="30px" /> <span>${
        element.vote_average
      }</span>
      </div>
      <h2> ${element.title}</h2>
      </div>
      </div>

  `;
      newDiv.classList.add("movie");
      newDiv.setAttribute("data-movieid", element.id);
      parentDiv.appendChild(newDiv);
      $(newDiv).click(function () {
        let movieID = $(this).data("movieid");

        let filteredMovies = movies.filter((id) => id.id == movieID);

        document.querySelector(".popup").classList.add("slideIn");
        popupContent.innerHTML = `<h2>${element.title} </h2>
          <div class='imageAndText'>
          <div class="movie-img"><img src='${
            IMG_PATH + element.poster_path
          }' class="main-img"/>
          </div>
          <p>${element.overview}</p>
          </div>`;
      });
    });

    const button = document.querySelector("button");

    button.addEventListener("click", () => {});

    $(".close").click(() => {
      $(".popup").removeClass("slideIn");
    });
  });
