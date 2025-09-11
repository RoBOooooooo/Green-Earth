// Categories
const categoriesContainer = document.querySelector(".categories-container");

let categories = [];

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

    

    categories.forEach((category) => {
      const list = document.createElement("li");

      list.innerHTML = `<button class="btn btn-sm btn-ghost w-full justify-start">${category?.category_name}</button>`;

      categoriesContainer.appendChild(list);
    });
  })
  .catch(() => {
    console.log("Error fetching categories");
  });
