const treesContainer = document.querySelector(".trees-container");
const loader = document.querySelector(".loader");

// Categories
const categoriesContainer = document.querySelector(".categories-container");

let categories = [];
let activeCategory = "All Trees";
let trees = [];

const getAndSetCategories = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/categories"
    );

    const result = await res.json();

    return result ? result?.categories : null;
};

getAndSetCategories()
    .then((result) => {
        categories = result;

        categoriesContainer.innerHTML = "";

        const allCategoriesElement = document.createElement("li");
        allCategoriesElement.innerHTML = `<button class="category btn btn-sm btn-ghost bg-green-700 text-white w-full justify-start" aria-label="All Trees">All Trees</button>`;
        categoriesContainer.appendChild(allCategoriesElement);
        allCategoriesElement.onclick = handleCategoryChange;

        categories.forEach((category) => {
            const ctg = document.createElement("li");

            ctg.innerHTML = `<button class="category btn btn-sm btn-ghost w-full justify-start" aria-label="${category?.category_name}">${category?.category_name}</button>`;
            ctg.onclick = handleCategoryChange;

            categoriesContainer.appendChild(ctg);
        });
    })
    .catch(() => {
        console.log("Error fetching categories");
    });

// Handle Category Change

const handleCategoryChange = (e) => {
    const ctg = e.srcElement;
    const allCategories = categoriesContainer.querySelectorAll(".category");

    allCategories.forEach((category) => {
        category.classList.remove("bg-green-700", "text-white");
    });

    if ((ctg.ariaLabel === activeCategory) & (ctg.ariaLabel !== "All Trees")) {
        activeCategory = "All Trees";
        allCategories[0].classList.add("bg-green-700", "text-white");
        ctg.classList.remove("bg-green-700", "text-white");
    } else {
        activeCategory = ctg.ariaLabel;
        ctg.classList.add("bg-green-700", "text-white");
    }

    shiftTrees();
};

// Shift Trees
const shiftTrees = () => {
    const id =
        categories.map((ctg) => ctg.category_name).indexOf(activeCategory) + 1;
    treesContainer.innerHTML = "";
    // loader.classList.add("flex");
    // loader.classList.remove("hidden");

    const getCategoryTrees = async () => {
        const res = await fetch(
            id === 0
                ? `https://openapi.programming-hero.com/api/plants`
                : `https://openapi.programming-hero.com/api/category/${id}`
        );

        const result = await res.json();

        return result ? result?.plants : null;
    };

    getCategoryTrees()
        .then((result) => {
            trees = result;
  
            trees.forEach((tree) => {
                const treeCard = document.createElement("div");
                treeCard.setAttribute("class", "card bg-white shadow-md");

                treeCard.innerHTML = `
              <figure class="h-40 bg-gray-100 flex items-center justify-center">
                <span class="text-gray-400">
                <img src="${tree.image}" /></span>
              </figure>
              <div class="card-body">
                <h3 class="font-bold">${tree.name}</h3>
                <p class="text-sm text-gray-600">
                  ${tree.description}
                </p>
                <div class="flex justify-between items-center mt-2">
                  <span class="badge badge-outline text-green-600"
                    >${tree.category}</span
                  >
                  <span class="font-semibold">৳${tree.price}</span>
                </div>
                <button class="btn bg-green-700 text-white mt-3 rounded-full">
                  Add to Cart
                </button>
              </div>
            `;

                treesContainer.appendChild(treeCard);
            });

            // loader.classList.add("hidden");
            // loader.classList.remove("flex");
        })
        .catch(() => {
            console.log(`Error fetching ${activeCategory} category trees`);
        });
};

// Initial All Trees Management
const getAllTrees = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");

    const result = await res.json();

    return result ? result?.plants : null;
};

getAllTrees()
    .then((result) => {
        trees = result;

        treesContainer.innerHTML = "";

        trees.forEach((tree) => {
            const treeCard = document.createElement("div");
            treeCard.setAttribute("class", "card bg-white shadow-md");

            treeCard.innerHTML = `
              <figure class="h-40 bg-gray-100 flex items-center justify-center">
                <span class="text-gray-400">
                <img src="${tree.image}" /></span>
              </figure>
              <div class="card-body">
                <h3 class="font-bold">${tree.name}</h3>
                <p class="text-sm text-gray-600">
                  ${tree.description}
                </p>
                <div class="flex justify-between items-center mt-2">
                  <span class="badge badge-outline text-green-600"
                    >${tree.category}</span
                  >
                  <span class="font-semibold">৳${tree.price}</span>
                </div>
                <button class="btn bg-green-700 text-white mt-3 rounded-full">
                  Add to Cart
                </button>
              </div>
            `;

            treesContainer.appendChild(treeCard);
        });
    })
    .catch(() => {
        console.log("Error fetching all trees");
    });
