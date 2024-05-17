const addBtn = document.querySelector("#add-btn")
const showBtn = document.querySelector("#menu")
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const result = document.querySelector("#result")
const sortBtn = document.querySelector("#sort-btn")
const clearBtn = document.querySelector("#clear-btn")


function newMenu(n,p){
    this.id = (Math.floor(Math.random() * 100000)+ 1).toString().padStart(6, "0")
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

clearBtn.addEventListener("click", () => {
    window.location.reload();
    localStorage.clear()
})


sortBtn.addEventListener("click" , sortMenuByPrice)
addBtn.addEventListener("click", addNewMenu)
showBtn.addEventListener("click", showMenu)
searchBtn.addEventListener("click", searchFood);

