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
        pokemonNome.innerHTML = `${data.name[0].toUpperCase() + data.name.substring(1)}`;
        pokemonId.innerHTML = `#${data.id}  `;

        spritePokemon.style.display = 'block';
        spriteAnimado.style.display = 'block';
        spritePokemon.src= `${data['sprites']['other']['dream_world'].front_default}`;
        spriteAnimado.src= (data['sprites']['versions']['generation-v']['black-white']['animated'].front_default);
    
        spritePokemon.style.width = "150px";
        spriteAnimado.style.width = "60px";
    

        // console.log(data.types[0]['type'].indexOf(data.types[0].type.name)
        // if(data.indexOf(data.types[0].type.name) == 1){
        //     console.log('existe')
        // }

        // typeOne.src = "icons/" + data.types[0].type.name + ".png";

        // data.type[1].type.name == true ?  typeTwo.src = "icons/" + data.types[1].type.name + ".png" : "";

            // if((data.types[1].type.name).indexOf() == -1){
            //     let typeTwo = new Image();
            //     document.querySelector('body').appendChild(typeTwo);
            //     typeTwo.style.display = "none";
            //     continue;
            // }else{
            //     typeTwo.src = "icons/" + data.types[1].type.name + ".png";
            // }


        for(let i = 0; i < pokemonStats.length; i++){
            pokemonStats[i].innerHTML = `${data['stats'][i].base_stat}`;
        }
    }else{
        pokemonNome.innerHTML = `Not found`
        pokemonId.innerHTML = `#???`
        spritePokemon.style.display = 'none';
        spriteAnimado.style.display = 'none';
    }

    input.value= "";
}

renderPokemon('4');

var chart = bb.generate({
    data: {
      x: "x",
      columns: [
      ["x", "HP", "Attack", "Defense", "Especial Attack", "Especial Defense", "Speed"],
      ["data1",`${data['stats']['0'].base_stat}`, `${data['stats']['1'].base_stat}`,
               `${data['stats']['2'].base_stat}`, `${data['stats']['3'].base_stat}`,
               `${data['stats']['4'].base_stat}`, `${data['stats']['5'].base_stat}`]
      ],
      type: "radar", // for ESM specify as: radar()
      labels: true
    },
    radar: {
      axis: {
        max: 200
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


 

    // Speed Attack, HP, Speed, Special Defense, Attack, Defense
    //Status dos pokemons
    // console.log(`HP: ${data['stats']['0'].base_stat}`)
    // console.log(`Attack: ${data['stats']['1'].base_stat}`)
    // console.log(`Defense: ${data['stats']['2'].base_stat}`)
    // console.log(`Especial Attack: ${data['stats']['3'].base_stat}`)
    // console.log(`Defense: ${data['stats']['4'].base_stat}`)
    // console.log(`Speed: ${data['stats']['5'].base_stat}`)














    // fetch(url)
    // .then(function (response){
    //     return response.json();
    // })
    // .then(function (pokemon){
    //     nome.innerHTML = `${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}`;
    //     id.innerHTML = "# " + pokemon.id;
    //     foto.style.width = "200px";
    //     fotoGif.style.width = "60px";
    //     foto.src= `${pokemon['sprites']['other']['dream_world'].front_default}`;
    //     fotoGif.src= (pokemon['sprites']['versions']['generation-v']['black-white']['animated'].front_default);

    //     function retornaTipos(){
    //         for(let i = 0; i < pokemon.types.length; i++){
    //             typeOne.src = "icons/" + pokemon.types[i].type.name + ".png";
    //             i++
    //             typeTwo.src = "icons/" + pokemon.types[i].type.name + ".png";
    //         }
    //     }
    //     retornaTipos();
    // })
    // .catch(function (error){
    //     console.log(`Failed retrieving information ${error}`)
    // })

//Números acima de 649 não apresentam sprite e gifs