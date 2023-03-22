window.addEventListener("load", () => {
  showContainers();
});

let url = "https://swapi.dev/api/";
let peopleFetchRes = "";
let starshipsFetchRes = "";
let planetsFetchRes = "";

function showContainers() {
  const peopleContainer = createElement(
    "div",
    "",
    { className: "bg-secondary text-white p-2 gap-2 flex-md-column d-flex category-container", id: "people" },
    null,
    "#main"
  );
  const vehiclesContainer = createElement(
    "div",
    "",
    { className: "bg-secondary text-white p-2 gap-2 flex-md-column d-flex category-container", id: "starships" },
    null,
    "#main"
  );
  const planetsContainer = createElement(
    "div",
    "",
    { className: "bg-secondary text-white p-2 gap-2 flex-md-column d-flex category-container", id: "planets" },
    null,
    "#main"
  );
  const categoryContainersArray = Array.from(document.getElementsByClassName("category-container"));
  categoryContainersArray.forEach((container) => {
    createElement(
      "button",
      `Show me ${container.id}`,
      { className: "btn btn-primary", id: `${container.id}BtnPrimary` },
      {
        click: {
          callback: () => showData(container.id),
        },
      },
      container
    );

    createElement(
      "div",
      `Welcome to ${container.id}`,
      {
        className: "gap-2 fs-3 flex-md-column d-flex bg-info text-black text-center overflow-auto data-container",
        id: `${container.id}Data`,
      },
      null,
      container
    );

    createElement(
      "button",
      `More ${container.id}`,
      { className: "btn btn-info disabled", id: `${container.id}BtnSecondary` },
      {
        click: {
          callback: () => showMoreData(container.id),
        },
      },
      container
    );
  });
}

function showData(category) {
  fetch(`${url}${category}`)
    .then((res) => res.json())
    .then((res) => {
      if (category === "people") {
        peopleFetchRes = res;
      } else if (category === "starships") {
        starshipsFetchRes = res;
      } else if (category === "planets") {
        planetsFetchRes = res;
      }
      const data = res.results;

      showNames(data, category);
    });

  document.getElementById(`${category}BtnPrimary`).classList.add("disabled");
  document.getElementById(`${category}BtnSecondary`).classList.remove("disabled");
}

function showMoreData(category) {
  let response = "";

  if (category === "people") {
    response = peopleFetchRes;
  } else if (category === "starships") {
    response = starshipsFetchRes;
  } else if (category === "planets") {
    response = planetsFetchRes;
  }

  fetch(response.next)
    .then((res) => res.json())
    .then((res) => {
      if (category === "people") {
        peopleFetchRes = res;
      } else if (category === "starships") {
        starshipsFetchRes = res;
      } else if (category === "planets") {
        planetsFetchRes = res;
      }
      const data = res.results;

      if (!res.next) {
        document.getElementById(`${category}BtnSecondary`).classList.add("disabled");
      }

      showNames(data, category);
    });
}

function showNames(data, category) {
  for (let item of data) {
    const parent = document.getElementById(`${category}Data`);
    createElement(
      "p",
      `${item.name}`,
      { className: "fs-5 names" },
      { click: { callback: () => showFullInfo(item, category) } },
      parent
    );
    const names = Array.from(document.getElementsByClassName("names"));
    names.forEach((name) => {
      name.setAttribute("data-bs-toggle", "modal");
      name.setAttribute("data-bs-target", "#infoModal");
    });
  }
}

function showFullInfo(item, category) {
  clearContent("#modal-header");
  clearContent("#modal-body");
  createElement("h1", `${item.name}`, { classList: "modal-title fs-5" }, null, "#modal-header");
  if (category === "people") {
    createElement("p", `Birth year: ${item.birth_year}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Mass: ${item.mass}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Height: ${item.height}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Eye color: ${item.eye_color}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Skin color: ${item.skin_color}`, { classList: "fs-3" }, null, "#modal-body");
  } else if (category === "starships") {
    createElement("p", `Manufacturer: ${item.manufacturer}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Model: ${item.model}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Cargo capacity: ${item.cargo_capacity}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Price: ${item.cost_in_credits} credits`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Hyperdrive rating: ${item.hyperdrive_rating}`, { classList: "fs-3" }, null, "#modal-body");
  } else if (category === "planets") {
    createElement("p", `Climate: ${item.climate}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Diameter: ${item.diameter}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Gravity: ${item.gravity}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Population: ${item.population}`, { classList: "fs-3" }, null, "#modal-body");
    createElement("p", `Terrain: ${item.terrain}`, { classList: "fs-3" }, null, "#modal-body");
  }
}
