const treesContainer = document.querySelector(".trees-container");
const loader = document.querySelector(".loader");

// Category
const categoriesContainer = document.querySelector(".categories-container");

// Cart
const cartContainer = document.querySelector(".cart-container");
const totalPriceElement = document.querySelector(".total-price");

// Modal
const modalBox = document.querySelector(".modal-box");

let categories = [];
let activeCategory = "All Trees";
let trees = [];
let cart = [];

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
        allCategoriesElement.innerHTML = `<button class="category btn btn-sm btn-ghost bg-green-700 text-white w-full justify-start whitespace-nowrap" aria-label="All Trees">All Trees</button>`;
        categoriesContainer.appendChild(allCategoriesElement);
        allCategoriesElement.onclick = handleCategoryChange;

        categories.forEach((category) => {
            const ctg = document.createElement("li");

            ctg.innerHTML = `<button class="category btn btn-sm btn-ghost w-full justify-start whitespace-nowrap" aria-label="${category?.category_name}">${category?.category_name}</button>`;
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
    loader.classList.add("flex");
    loader.classList.remove("hidden");

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
                <img src="${tree.image}" class="image" /></span>
              </figure>
              <div class="card-body">
                <h3 class="title font-bold cursor-pointer" onclick="handleModalShow(event)">${tree.name}</h3>
                <p class="description text-sm text-gray-600">
                  ${tree.description}
                </p>
                <div class="flex justify-between items-center mt-2">
                  <span class="category badge badge-outline text-green-600"
                    >${tree.category}</span
                  >
                  <span class="price font-semibold">৳${tree.price}</span>
                </div>
                <button class="btn bg-green-700 text-white mt-3 rounded-full" onclick="handleAddToCart(event)">
                  Add to Cart
                </button>
              </div>
            `;

                treesContainer.appendChild(treeCard);
            });

            loader.classList.add("hidden");
            loader.classList.remove("flex");
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
                <img src="${tree.image}" class="image"/></span>
              </figure>
              <div class="card-body">
                <h3 class="title font-bold cursor-pointer" onclick="handleModalShow(event)">${tree.name}</h3>
                <p class="description text-sm text-gray-600">
                  ${tree.description}
                </p>
                <div class="flex justify-between items-center mt-2">
                  <span class="category badge badge-outline text-green-600"
                    >${tree.category}</span
                  >
                  <span class="price font-semibold">৳${tree.price}</span>
                </div>
                <button class="btn bg-green-700 text-white mt-3 rounded-full" onclick="handleAddToCart(event)">
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

// Add to Cart
const handleAddToCart = (e) => {
    const card = e.srcElement.parentElement;
    const title = card.querySelector(".title");
    const price = card.querySelector(".price");

    if (!card && !title && !price) return;

    const itemObj = {
        title: title.innerText,
        price: parseFloat(price.innerText.split("৳")[1]),
        quantity: 1,
    };

    const cartItem = document.createElement("li");
    cartItem.setAttribute("class", "flex justify-between items-center");
    cartItem.innerHTML = `<span>${itemObj.title}
                              <span class="text-sm text-gray-500">৳${itemObj.price} × ${itemObj.quantity}</span>
                          </span>
                          <button class="text-red-500 cursor-pointer" onclick="handleRemoveFromCart(event)">✕</button>`;
    itemObj.element = cartItem;
    cart.push(itemObj);
    cartContainer.appendChild(cartItem);
    handleCartTotal();
    window.alert(`${title.innerText} has been added to cart`);
};

// Remove from Cart
const handleRemoveFromCart = (e) => {
    const card = e.srcElement.parentElement;
    cart = cart.filter((item) => {
        return item.element !== card;
    });

    handleCartTotal();
    cartContainer.removeChild(card);
};

// Total Cart Update
const handleCartTotal = () => {
    const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);
    totalPriceElement.innerHTML = `৳${totalPrice}`;
};

// Card Modal Functionality
const handleModalShow = (e) => {
    const card = e.srcElement.parentElement.parentElement;
    const image = card.querySelector(".image").src;
    const category = card.querySelector(".category").innerText;
    const title = card.querySelector(".title").innerText;
    const price = card.querySelector(".price").innerText;
    const description = card.querySelector(".description").innerText;

    modalBox.innerHTML = `<h2 class="text-xl font-bold">${title}</h2>
                        <img src="${image}" class="w-full max-h-[300px] rounded-md my-5 object-cover" />
                        <ul class="space-y-2">
                          <li class="font-bold">Category: <span class="font-normal">${category}</span></li>
                          <li class="font-bold">Price: <span class="font-normal">${price}</span></li>
                          <li class="font-bold">Description: <span class="font-normal">${description}</span></li>
                        </ul>
                        <div class="modal-action">
                            <form method="dialog">
                                <button class="btn">Close</button>
                            </form>
                        </div>`;

    my_modal_1.showModal();
};
