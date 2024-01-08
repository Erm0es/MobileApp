import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "*HIDDEN*"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addButton = document.getElementById("add-button")
const inputField = document.getElementById("input-field")
const shoppinglistEl = document.getElementById("shopping-list")


addButton.addEventListener("click" ,function(){
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)

    appendItemToShoppingListEl(inputValue)
    clearInputFieldValue()
   
})

onValue(shoppingListInDB, function(snapshot) {
    let arr = Object.values(snapshot.val())
    console.log(arr)

})

function clearInputFieldValue(){
    inputField.value = ""
    
}

function appendItemToShoppingListEl(itemValue){
    shoppinglistEl.innerHTML += `<li>${itemValue}</li>`
    
}

