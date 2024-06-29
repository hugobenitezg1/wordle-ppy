const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es"
let diccionario = ["APPLE", "ANGEL", "MOUSE", "HOUSE", "PLATE", "PLACE","PADRE"]
let random = Math.random()*diccionario.length //numero aleatorio entre 0 y 5
random = Math.floor(random)
let palabraSecreta = diccionario[random]

fetch(API)
.then((response)=>{
    response.json()
    .then((data)=>{
        palabraSecreta = data[0].toUpperCase()
    })}).catch((e)=>{
        console.log("ERROR")
    })

let oportunidades = 6

let button = document.getElementById("guess-button")
let input = document.getElementById("guess-input")
let grid = document.getElementById("grid")

button.addEventListener("click", enter)

function enter() {
    let intento = input.value.toUpperCase()
    if (intento == palabraSecreta) {
        gameOver("Ganaste 😀")
    }
    let row = document.createElement("div")
    row.className = "row"
    for (let i in palabraSecreta) {
        let letra = document.createElement("span")
        letra.className = "letter"
        letra.innerHTML = intento[i]
        if (palabraSecreta[i] == intento[i]) {
            letra.style.backgroundColor = "green"
        } else if (palabraSecreta.includes(intento[i])) {
             letra.style.backgroundColor = "yellow"
        } else {
            letra.style.backgroundColor = "gray"
        }
        row.appendChild(letra)
    }
    grid.appendChild(row)
    oportunidades--
    if (oportunidades == 0) {
        gameOver("Perdiste 😞");
    }
}

function gameOver(mensaje) {
    button.disabled = true;
    input.disabled = true;
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = "<h1>" + mensaje + "</h1>";
}