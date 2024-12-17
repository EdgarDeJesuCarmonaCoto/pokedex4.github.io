let value1=1;
let value2 = 20;
const card= document.getElementById("carta");
const footer= document.getElementById("footer");
const nav=document.querySelectorAll(".navbar-btn")
const navbarList= document.getElementById("navbar-list");

function filtrarPorTipo(tipo) {
    value1 = 1;  
    value2 = 20;
    card.innerHTML = ''; 
    footer.innerHTML = ''; 
    if (tipo === '') {
        buscarPokemon(); 
    } else {
        obtenerPokemonPorTipo(tipo); 
    }
    cerrarMenuResponsive();
}

function cerrarMenuResponsive() {
    navbarList.classList.remove("active"); 
}

function buscarPokemon(){
    for(let i=value1;i<=value2;i++){
        let url=`https://pokeapi.co/api/v2/pokemon/${i}`;
        fetch(url)
        .then(response => response.json())
        .then(response => mostrarPokemon(response,response.id))
        .catch(error=>mostrarError(error));
    }
    value1=value2+1;
    value2=value2+20;
    footer.innerHTML=`
    <button onclick="cargarMas()">Cargar mas pokémones</button>
    `
}

function obtenerPokemonPorTipo(tipo) {
    let url = `https://pokeapi.co/api/v2/type/${tipo}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.pokemon.forEach((item) => {
                let pokemonUrl = item.pokemon.url;
                fetch(pokemonUrl)
                    .then(response => response.json())
                    .then(response => mostrarPokemon(response,response.id))
                    .catch(error => mostrarError(error));
            });
        })
        .catch(error => mostrarError(error));
}


function buscarPokemonConInput(){
    let input= document.getElementById("pokemonInput").value.trim().toLowerCase();
    if(input===""){
        value1=1;
        value2=20;
        card.innerHTML="";
        buscarPokemon();
    }
    else{
    let url =`https://pokeapi.co/api/v2/pokemon/${input}`;
    fetch(url)
    .then(response => response.json())
    .then(response => mostraPokemonSolo(response,input))
    .catch(error=> mostrarError(error))
    }
}


function mostraPokemonSolo(dataPokemon,position){
    let tipos=dataPokemon.types.map(index=>`<p class="tipo">${index.type.name}</p>`);
    tipos=tipos.join("");
    card.innerHTML=`
    <a href="pokemonSolo.html?id=${position}" class="card">
    <div class="content">
            <h2><p class="nombre">${dataPokemon.name.toUpperCase()}</p></h2>
            <img src="${dataPokemon.sprites.other["official-artwork"].front_default}">
            <p class="id">Numero:${dataPokemon.id}</p>
            ${tipos}
    </div>
    </a>
    `;
    footer.innerHTML="";

}
function mostrarPokemon(dataPokemon,position){
    let tipos=dataPokemon.types.map(index=>`<p class="${index.type.name}">${index.type.name}</p>`);
    tipos=tipos.join("");

    card.innerHTML+=`
    <a href="pokemonSolo.html?id=${position}" class="card">
    <div class="content">
            <h2><p class="nombre">${dataPokemon.name.toUpperCase()}</p></h2>
            <img src="${dataPokemon.sprites.other["official-artwork"].front_default}">
            <p class="id">Numero:${dataPokemon.id}</p>
            ${tipos}
    </div>
    </a>
    `
}
function mostrarError(){
    card.innerHTML=`
    <p class="error">No existe ese pokémon</p>
    `
}
window.onload=function(){
    buscarPokemon();
}

function cargarMas(){
    buscarPokemon();
}

