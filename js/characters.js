const characterURL =
  "https://dragonball-api.com/api/characters?page=1&limit=100";

async function fetchcharacters() {
  try {
    const response = await fetch(characterURL);
    if (!response.ok) {
      throw new Error(`Error en la peticion al Json ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los personajes de la Api : ", error);
    return null;
  }
}

function createCharacterCard({name, ki, maxKi, race, gender, image, affiliation,}) {
  return `
        <div class="characterCard" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="${name}">
            <div class="card-body">
                <h1>${name}</h1>
                <h2>${race} - ${gender}</h2>
                <p>Base KI: </p>
                <h2>${ki}</h2>
                <p>Total KI: </p>
                <h2>${maxKi}</h2>
                <p>Afilliation: </p>
                <h2>${affiliation}</h2>
            </div>
        </div>
    `;
}

async function displayCharacters() {
  const characterSection = document.getElementById("characterContainer");
  const characterData = await fetchcharacters();

  if (characterData && characterData.items) {
    const characterCards = characterData.items
      .map(createCharacterCard)
      .join("");
    characterSection.innerHTML = characterCards;
  } else {
    characterSection.innerHTML = `<p>No se ha podido cargar el Json de los personajes</p>`;
  }
}

displayCharacters();
