const addBtn = document.querySelector("#add-btn")
const showBtn = document.querySelector("#menu")
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const result = document.querySelector("#result")
const sortBtn = document.querySelector("#sort-btn")
const clearBtn = document.querySelector("#clear-btn")
const filterBtn = document.querySelector("#filter-btn")


function newMenu(n,p){
    this.id = (Math.floor(Math.random() * 100)+ 1).toString().padStart(3, "0")
    this.name = n;
    this.price = p
     
}

const ALL_MENU = JSON.parse(localStorage.getItem("menu")) || [];

const addNewMenu = function(){
    let newFoodName = prompt("Enter new food: ").toUpperCase()
    let newFoodPrice = prompt("Enter new food price: ")
    if(
        newFoodName && newFoodName.trim() !== "" && newFoodPrice && newFoodPrice.trim() !== ""
    ){
        let newMenuResult = new newMenu(newFoodName,newFoodPrice);
        ALL_MENU.push(newMenuResult);
        localStorage.setItem("menu", JSON.stringify(ALL_MENU))
    }
    else{
        alert("Please enter food name or price!")
    }
}


const showMenu = function(){
    result.innerHTML = ""
    if (ALL_MENU.length === 0) {
        result.innerHTML = `<div class="food-item">
            <p>No matching items found</p>
        </div>`;
        return;
    }
    ALL_MENU.forEach(menu => {
        result.innerHTML += `
            <div class="food-item">
                <span>${menu.id}</span>
                <h2>${menu.name}</h2>
                <span>${`${menu.price}  so'm`}</span>
            </div>
        `
    })
}
// food name buyicha search qilish 
const searchFood = function() {
    let searchInfo = searchInput.value.toUpperCase();
    let elements = ALL_MENU.filter(element => element.name.includes(searchInfo));
    showSearchResult(elements);
};

// price buyicha search qilish uchun
// const searchFood = function() {
//     let searchInfo = searchInput.value
//     let elements = ALL_MENU.filter(element => element.price.includes(searchInfo));
//     showSearchResult(elements);
// };
const showSearchResult = function(results) {
    result.innerHTML = "";
    
    if (results.length === 0) {
        result.innerHTML = `<div class="food-item">
            <p>No matching items found</p>
        </div>`;
        return;
    }
    results.forEach(menu => {
        result.innerHTML += `
            <div class="food-item">
                <span>${menu.id}</span>
                <h2>${menu.name}</h2>
                <span>${`${menu.price} so'm`}</span>
            </div>
        `;
    });
};



let sorted = false;

const sortMenuByPrice = function(){

    if(sorted === false){
        sorted = true;
        ALL_MENU.sort((a, b) => {
            if(parseFloat(a.price) > parseFloat(b.price)){
                return -1
            }
            else{
                return 1
            }
        })
    }
    else{
        sorted = false;
        ALL_MENU.sort((a, b) => {
            if(parseFloat(a.price) > parseFloat(b.price)){
                return 1
            }
            else{
                return -1
            }
        })
    }
    
    showMenu();
}





function filterFood() {
    let startFoodPrice = parseFloat(prompt("Enter the starting food price: "));
    while (isNaN(startFoodPrice)) {
        alert("Please enter a valid numeric food price!");
        startFoodPrice = parseFloat(prompt("Enter the starting food price: "));
    }
    
    let fromTo = parseFloat(prompt("Enter the end food price: "));
    while (isNaN(fromTo)) {
        alert("Please enter a valid numeric food price!");
        fromTo = parseFloat(prompt("Enter the end food price: "));
    }
    
    let elements = ALL_MENU.filter(element => {
        let price = parseFloat(element.price);
        return price >= startFoodPrice && price <= fromTo;
    });
    
    displayFoods(elements);
    console.log(elements);
}


function displayFoods(db) {
    result.innerHTML = ""
    db.forEach(menu => {
        result.innerHTML += `
            <div class="food-item">
                <span>${menu.id}</span>
                <h2>${menu.name}</h2>
                <span>${`${menu.price}  so'm`}</span>
            </div>
        `
    })
}


 const showRemoveResult = function(results) {
    result.innerHTML = "";
    
    if (results.length === 0) {
        result.innerHTML = `<div class="food-item">
            <p>No matching items found</p>
        </div>`;
        return;
    }
    results.forEach(menu => {
        result.innerHTML += `
            <div class="food-item">
                <span>${menu.id}</span>
                <h2>${menu.name}</h2>
                <span>${`${menu.price} so'm`}</span>
            </div>
        `;
    });
};
let removeProduct = function () {
    let removeId = prompt("Enter id to remove:  ");

    if (!removeId) {
        alert("Enter id to remove!!!: ");
        return;
    }

    let updatedMenu = ALL_MENU.filter(element => element.id !== removeId);

    localStorage.setItem("menu", JSON.stringify(updatedMenu));

    showRemoveResult(updatedMenu);
};





clearBtn.addEventListener("click", removeProduct)
filterBtn.addEventListener("click", filterFood)
sortBtn.addEventListener("click" , sortMenuByPrice)
addBtn.addEventListener("click", addNewMenu)
showBtn.addEventListener("click", showMenu)
searchBtn.addEventListener("click", searchFood);

