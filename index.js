let serieNomeRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let resultado = document.getElementById("result");


// Select
let strimings = document.querySelector(".strimings")
let statusSeries = document.querySelector("#status")
let prioridade = document.getElementById("prioridade")

let escolher = document.querySelector("#escolher")

let serie = {}

let series = []



strimings.addEventListener("change", () => {
    serie.striming = strimings.value
})

statusSeries.addEventListener("change", () => {
    serie.status = statusSeries.value
})

prioridade.addEventListener("change", () => {
    serie.prioridade = prioridade.value
})


escolher.addEventListener("click", () => {


    const serieExiste = series.find((serieAtual) => serieAtual.title == serie.title)
    if (serieExiste) {
        return alert("Serie já adicionada")
    }
    const tbodyAssistir = document.getElementById('tbody-assistir');
    const tbodyAssistido = document.getElementById('tbody-assistido');
    
    tbodyAssistir.innerHTML = ""
    tbodyAssistido.innerHTML = ""


    series.sort((a, b) => b.prioridade - a.prioridade);
    series.push(serie)
    console.log("series", series)
    for (const serie of series) {
        const row = document.createElement('tr');

        const colSerie = document.createElement('td');
        const colDistribuidor = document.createElement('td');
        const colStatus = document.createElement('td');
        const colPrioridade = document.createElement('td');

        colSerie.textContent = serie.title;
        colDistribuidor.textContent = serie.striming;
        colStatus.textContent = serie.status;
        colPrioridade.textContent = serie.prioridade;

        row.appendChild(colSerie);
        row.appendChild(colDistribuidor);
        row.appendChild(colStatus);

        if (serie.status == "assistir") {
            row.appendChild(colPrioridade);
            tbodyAssistir.appendChild(row)
        } else {
            tbodyAssistido.appendChild(row)
        }

    }
})

let getSerie = () => {
    let nomeSerie = serieNomeRef.value;
    let url = `http://www.omdbapi.com/?t=${nomeSerie}&apikey=${key}`;


    if (nomeSerie.length <= 0) {
        resultado.innerHTML = `<h3 class="msg"> </h3>`;
    } else {
        fetch(url).then((resp) => resp.json()).then((data) => {

            if (data.Response == "True") {
                serie = {
                    title: data.Title,
                    porter: data.Poster,
                    striming: strimings.value,
                    status: statusSeries.value,
                }
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