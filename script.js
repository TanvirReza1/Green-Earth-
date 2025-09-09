let allPlants = [];
let cart = [];

// DOM Elements
const cardContainer = document.getElementById("card-container");
const categoryContainer = document.getElementById("Categories-Parent");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Modal Elements (for viewing only)
const modalCheckbox = document.getElementById("plant-modal");
const modalName = document.getElementById("modal-plant-name");
const modalImage = document.getElementById("modal-plant-image");
const modalDesc = document.getElementById("modal-plant-description");
const modalPrice = document.getElementById("modal-plant-price");
const modalCategory = document.getElementById("modal-plant-category"); 

// Fetch Plants
const spinner = document.getElementById("loading-spinner");

const loadData = () => {
  spinner.classList.remove("hidden"); // show spinner

  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      allPlants = data.plants;
      displayData(allPlants);
    })
    .finally(() => {
      spinner.classList.add("hidden"); // hide spinner
    });
};

// Fetch Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

// Display Categories
const displayCategories = (categories) => {
  categoryContainer.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className =
      "btn w-full mb-2 text-black hover:bg-[#15803D] hover:text-white transition duration-300";
    btn.textContent = cat.category_name;

    btn.addEventListener("click", () => {
      spinner.classList.remove("hidden");
      fetch(`https://openapi.programming-hero.com/api/category/${cat.id}`)
        .then((res) => res.json())
        .then((data) => {
          displayData(data.plants || []); 
          setActiveCategory(btn);
        })
        .catch(() => {
          cardContainer.innerHTML = `<p class="text-center col-span-full text-red-500">Failed to load category data!</p>`;
        })
        .finally(() => spinner.classList.add("hidden"));
    });

    categoryContainer.appendChild(btn);
  });
};

// Highlight active category
const setActiveCategory = (activeBtn) => {
  Array.from(categoryContainer.children).forEach((btn) =>
    btn.classList.remove("bg-[#15803D]", "text-white")
  );
  activeBtn.classList.add("bg-[#15803D]", "text-white");
};

// Display Plant Cards
const displayData = (plants) => {
  spinner.classList.remove("hidden");

  setTimeout(() => {
    cardContainer.innerHTML = "";

    if (!plants.length) {
      cardContainer.innerHTML = `<p class="text-center col-span-full text-red-500">No plants found!</p>`;
      spinner.classList.add("hidden");
      return;
    }

    plants.forEach((plant) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card bg-base-100 h-120 shadow-sm rounded-lg";
      cardDiv.innerHTML = `
      <figure class="px-4 pt-4">
        <img src="${plant.image}" alt="${plant.name}" class="rounded-md h-48 w-full object-cover"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title cursor-pointer text-blue-600 hover:underline">${plant.name}</h2>
        <p>${plant.description}</p>
        <div class='flex justify-between items-center mb-2'>
          <button class=' w-auto btn btn-sm rounded-lg text-emerald-500 border-emerald-500'>${plant.category}</button>
            <div class="flex-none">
          <p class="text-lg font-semibold text-[#15803D] px-3 py-1 ">${plant.price}৳</p>
          </div>

        </div>
        <button class="btn add-to-cart-btn rounded-3xl bg-[#15803D] w-full text-white">Add to Cart</button>
      </div>
    `;
      cardContainer.appendChild(cardDiv);

      // Modal open on card title
      cardDiv.querySelector(".card-title").addEventListener("click", () => {
        modalName.textContent = plant.name;
        modalImage.src = plant.image;
        modalDesc.textContent = plant.description;
        modalPrice.textContent = plant.price;
        modalCategory.textContent = plant.category;
        modalCheckbox.checked = true;
      });

      // Add to Cart button click
      const addBtn = cardDiv.querySelector(".add-to-cart-btn");
      addBtn.addEventListener("click", () => addToCart(plant));
    });
    // Hide spinner after cards render
    spinner.classList.add("hidden");
  }, 300); // small delay to see spinner
};

// Add to Cart with alert
const addToCart = (plant) => {
  cart.push(plant);
  updateCart();
  alert(`${plant.name} has been added to your cart!`);
};

// Remove from Cart
const removeFromCart = (index) => {
  cart.splice(index, 1);
  updateCart();
};

// Update Cart
const updateCart = () => {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-green-100 p-2 rounded-md";
    div.innerHTML = `
   <div class="flex flex-col">
    <span class="font-bold">${item.name}</span>
    <span class="font-semibold text-[#15803D]">৳${item.price}</span>
  </div>
      <button class="text-red-500 font-bold">❌</button>
    `;
    div
      .querySelector("button")
      .addEventListener("click", () => removeFromCart(i));
    cartItemsContainer.appendChild(div);
  });
  cartTotal.textContent = total;
};

// Initialize
loadData();
loadCategories();
