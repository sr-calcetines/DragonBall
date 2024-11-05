const planetURL = "https://dragonball-api.com/api/planets?page=1&limit=100";

async function fetchplanets() {
  try {
    const response = await fetch(planetURL);
    if (!response.ok) {
      throw new Error(`Error en la peticion al Json ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los personajes de la Api : ", error);
    return null;
  }
}

function createplanetCard({ name, isDestroyed, description, image }) {
  return `
        <div class="planetCard" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="${name}">
            <div class="card-body">
                <h1>${name}</h1>
                <p>Descripción: </p>
                <h2>${description}</h2>
                <p>Destruido: </p>
                <h2>${isDestroyed}</h2>
            </div>
        </div>
    `;
}

async function displayplanets() {
  const planetSection = document.getElementById("planetContainer");
  const planetData = await fetchplanets();

  if (planetData && planetData.items) {
    const planetCards = planetData.items.map(createplanetCard).join("");
    planetSection.innerHTML = planetCards;
  } else {
    planetSection.innerHTML = `<p>No se ha podido cargar el Json de los planetas</p>`;
  }
}

displayplanets();
