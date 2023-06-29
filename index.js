let serieNomeRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let resultado = document.getElementById("result");

let getSerie = () => {
    let nomeSerie = serieNomeRef.value;
    let url = `https://www.omdbapi.com/?t=${nomeSerie}&apikey=${key}`;


    if (nomeSerie.length <= 0) {
        resultado.innerHTML = `<h3 class="msg"> </h3>`;
    } else {
        fetch(url).then((resp) => resp.json()).then((data) => {

            if (data.Response == "True") {
                resultado.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                `;
            }

            else {
                resultado.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            .catch(() => {
                resultado.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getSerie);
window.addEventListener("load", getSerie);
