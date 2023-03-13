const featuredCardContainer = document.querySelector("#feature-container");
const badgeContainer = document.querySelector("#badge-container");

let coffees = [];
let ingredients = [
  "Coffee",
  "Espresso",
  "Steamed Milk",
  "Foam",
  "Hot Water",
  "1oz Espresso",
  "2oz Espresso",
  "1oz Steamed Milk",
  "Foamed milk",
  "Long pulled espresso",
];

badgeContainer.addEventListener("click", (event) => {
  const clickedBtn = event.target.closest(".custom-badge");
  const selectedIngredient = clickedBtn.textContent;
  const filteredCoffees = coffees.filter((item) =>
    item.ingredients.includes(selectedIngredient)
  );

  loadCoffeeToUI(filteredCoffees);
});

window.addEventListener("DOMContentLoaded", () => {  
  featuredCardContainer.innerHTML = `
    <button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processing...
</button>
    `;
  getCoffee();
});

async function getCoffee() {
  const res = await fetch("https://api.sampleapis.com/coffee/hot");
  const data = await res.json();
  coffees = data;

  loadCoffeeToUI(coffees);

  ingredients.forEach((item) => {
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("custom-badge");
    buttonEl.textContent = item;
    badgeContainer.appendChild(buttonEl);
  });
}

function loadCoffeeToUI(coffeeToLoad) {
  featuredCardContainer.innerHTML = "";

  coffeeToLoad.forEach((item) => {
    addCardToContainer(item);
  });
}

function addCardToContainer(coffee) {
  const featuredCardEl = document.createElement("article");
  featuredCardEl.classList.add("feature-style");
  featuredCardEl.innerHTML = `
        <figure class="max-h-36">
              <img
                src="${coffee.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">
                ${coffee.title}
                <div class="badge badge-secondary">Hot</div>
              </h2>
              <p>
                ${coffee.description}
              </p>
              <div class="card-actions justify-end">
                <div class="badge badge-outline">${coffee.ingredients} </div>
              </div>
            </div>
`;
  featuredCardContainer.appendChild(featuredCardEl);
}

// .slice(3, 6)

//   <article class="feature-style">
//     <figure>
//       <img
//         src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG"
//         alt="Shoes"
//       />
//     </figure>
//     <div class="card-body">
//       <h2 class="card-title">
//         Black
//         <div class="badge badge-secondary">NEW</div>
//       </h2>
//       <p>
//         Black coffee is as simple as it gets with ground coffee beans
//         steeped in hot water, served warm.
//       </p>
//       <div class="card-actions justify-end">
//         <div class="badge badge-outline">Cafe Noir</div>
//       </div>
//     </div>
//   </article>
