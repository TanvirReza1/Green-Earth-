const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayData(data.plants));
};

const displayData = (cards) => {
  const parentCardContainer = document.getElementById("card-container");
  parentCardContainer.innerHTML = "";

  for (let card of cards) {
    const cardChild = document.createElement("div");

    cardChild.innerHTML = `
      <div class="card bg-base-100 h-120 shadow-sm rounded-lg">
        <figure class="px-4 pt-4">
          <img src="${card.image}" alt="${card.name}"
              class="rounded-md h-48 w-full object-cover" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${card.name}</h2>
          <p>${card.description}</p>
          <div class='flex justify-between'>
            <div>
              <button class='btn'>${card.category}</button>
            </div>
            <div class="card-actions">
              <p>${card.price}৳</p>
            </div>
          </div>
          <div>
            <button class="btn rounded-3xl bg-[#15803D] w-full text-white">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    parentCardContainer.appendChild(cardChild);
  }
};

loadData();

const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data));
};
