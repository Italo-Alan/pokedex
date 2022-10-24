const form = document.querySelector('form');
let input = document.querySelector('#input_search');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    renderPokemon(input.value.toLowerCase());    
})

const pokemonNome = document.querySelector('.nome');
const pokemonId = document.querySelector('.numero');
const spritePokemon = document.querySelector('.normal');
const spriteAnimado = document.querySelector('.gif');
const typeOne = document.querySelector('.type_one');
const typeTwo = document.querySelector('.type_two');
const pokemonStats = document.querySelectorAll('.pokemonStats');

const fetchPokemon = async (pokemon) =>{
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`); //Resposta da API, por ser uma Promise, usamos o async e o await(faz com que o código espere a conclusão para retornar uma resposta, mas esse await só pode ser retornado em funçoes assíncronas)
    
    if(apiResponse.status == 200){
        const data = await apiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonNome.innerHTML = `Loading...`
    pokemonId.innerHTML = ``

    const data = await fetchPokemon(pokemon);

    if(data){
        console.log(data)
        for(let i = 0; i < data.types.length; i++){
            typeOne.src = "icons/" + data.types[0].type.name + ".png";
            i++
            if(data.types[1]){
                typeTwo.style.display = "inline-block";
                typeTwo.src = "icons/" + data.types[1].type.name + ".png";
            }else{
                typeTwo.style.display = "none";
            }
        }

        pokemonNome.innerHTML = `${data.name[0].toUpperCase() + data.name.substring(1)}`;
        pokemonId.innerHTML = `#${data.id}  `;

        spritePokemon.style.display = 'block';
        spriteAnimado.style.display = 'block';
        console.log(data.id)
        spritePokemon.src= `${data['sprites']['other']['dream_world'].front_default}`;
        spriteAnimado.src= (data['sprites']['versions']['generation-v']['black-white']['animated'].front_default);
    
        spritePokemon.style.width = "150px";
        spriteAnimado.style.width = "60px";
    
        for(let i = 0; i < pokemonStats.length; i++){
            pokemonStats[i].innerHTML = `${data['stats'][i].base_stat}`;
        }

        var chart = bb.generate({
            data: {
              x: "x",
              columns: [
              ["x", "HP", "Attack", "Defense", "Especial Attack", "Especial Defense", "Speed"],
              [`${data.name[0].toUpperCase() + data.name.substring(1)}`,`${data['stats']['0'].base_stat}`, `${data['stats']['1'].base_stat}`,
                       `${data['stats']['2'].base_stat}`, `${data['stats']['3'].base_stat}`,
                       `${data['stats']['4'].base_stat}`, `${data['stats']['5'].base_stat}`]
              ],
              type: "radar", // for ESM specify as: radar()
              labels: true
            },
            radar: {
              axis: {
                max: 255
              },
              level: {
                depth: 4
              },
              direction: {
                clockwise: true
              }
            },
            bindto: "#radarChart"
          });

    }else{
        pokemonNome.innerHTML = `Not found`
        pokemonId.innerHTML = `#???`
        spritePokemon.style.display = 'none';
        spriteAnimado.style.display = 'none';
    }

    input.value= "";
}

renderPokemon('1');

//Números acima de 649 não apresentam sprite e gifs