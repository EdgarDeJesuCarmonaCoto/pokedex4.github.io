/*
Para acceder a los parámetros crearemos un objeto de tipo URLSearchParams y usaremos el método get() para obtener cada uno de los valores, usando su nombre.
*/
const valores = window.location.search;
console.log(valores)
//Creamos la instancia
const urlParams = new URLSearchParams(valores);
//Accedemos a los valores
let id = urlParams.get('id');
console.log(id);

const card= document.getElementById("carta");

function buscarPokemon(id){
    let url=`https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
    .then(response=>response.json())
    .then(response=>mostrarPokemon(response))
    .catch()
}

function mostrarPokemon(dataPokemon){
    let tipos=dataPokemon.types.map(index=>`<p class="${index.type.name}">${index.type.name}</p>`);
    tipos=tipos.join("");
    let abilities=dataPokemon.abilities.map(index=>index.ability.name).join(", ");

    let stats=dataPokemon.stats.map(index=>`<p class="${index.stat.name}">${index.stat.name}: ${index.base_stat}</p>`);
    stats=stats.join(" ");

    card.innerHTML=`
    <div class="card">
    <div class="content">
            <h2><p class="nombre">${dataPokemon.name.toUpperCase()}</p></h2>
            <img src="${dataPokemon.sprites.other["official-artwork"].front_default}">
            <p class="id">Numero:${dataPokemon.id}</p>
            <p class="peso">Peso:${dataPokemon.weight}kg</p>
            <p class="medida">Medida:${dataPokemon.height/10}m</p>
            <p class="tipo">tipo:</p>
            ${tipos}
            <p class="stats">Estadisticas nivel 1:</p>
            ${stats}
            <p class="habilidades">Habilidades: <span>${abilities}</span></p>
    </div>
    </div>
    `
}

buscarPokemon(id);
