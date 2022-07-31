//Initialize DOM elements.
const categoriesDOM = document.querySelector(".categories");
const menuDOM = document.querySelector(".menu");

//Display categories and foods at startup.
getCategories();
getFoods();

//Get categories and foods data from JSON file.
function getCategories() {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      addButtons(data.categories, data.foods); //Pass these data to the addButtons function.
    })
    .catch((err) => console.log("Error: " + err));
}

//Get foods data from JSON file.
function getFoods() {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      addFoods(data.foods);
    })
    .catch((err) => console.log("Error: " + err));
}

//Add foods into the menu DOM element.
const addFoods = (foods) => {
  menuDOM.innerHTML = ""; // clear the menu DOM element.
  foods.forEach((item) => {
    console.log(item);
    //Create DOM elements dynamically and defining their properties.
    const foodWrapper = document.createElement("div");
    foodWrapper.classList.add("food-wrapper");
    const food = document.createElement("div");
    food.classList.add("food");
    const foodImgWrapper = document.createElement("div");
    foodImgWrapper.classList.add("food-image");
    const foodImg = document.createElement("img");
    foodImg.src = item.thumbnail;
    foodImg.alt = item.name;
    const foodDetails = document.createElement("div");
    foodDetails.classList.add("food-details");
    const foodTitle = document.createElement("h3");
    foodTitle.innerHTML = item.name;
    const foodDesc = document.createElement("p");
    foodDesc.innerHTML = item.description;
    const foodPrice = document.createElement("div");
    foodPrice.classList.add("price");
    foodPrice.innerHTML = `${item.price}¥`;

    //Add items together.
    foodImgWrapper.appendChild(foodImg);
    foodDetails.appendChild(foodTitle);
    foodDetails.appendChild(foodDesc);
    foodDetails.appendChild(foodPrice);
    food.appendChild(foodImgWrapper);
    food.appendChild(foodDetails);
    foodWrapper.appendChild(food);

    //Add the food item wrapper into menu DOM element.
    menuDOM.appendChild(foodWrapper);
  });
};

//Add category buttons into the DOM.
const addButtons = (categories, foods) => {
  categories.forEach((item) => {
    const btnCategory = document.createElement("button");
    btnCategory.classList.add("btn-category");
    btnCategory.setAttribute("data-id", item);
    item == "All" ? btnCategory.classList.add("selected") : null; //Add selected class to the "All" button at startup
    btnCategory.addEventListener("click", function () {
      let selectedCategory = document.querySelector(".selected");
      selectedCategory.classList.remove("selected");
      this.classList.add("selected");
      listFoodsInCategories(this.innerHTML, foods);
    });
    btnCategory.innerHTML = item;
    categoriesDOM.appendChild(btnCategory);
  });
};

function listFoodsInCategories(category, foods) {
  //Filter foods relative to their categories, then pass the returned list which has been filtered to the addFoods function.
  const result =
    category == "All"
      ? foods
      : foods.filter((item) => {
          return item.category == category;
        });
  console.log(result);
  addFoods(result);
}
