import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "*HIDDEN*"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addButton = document.getElementById("add-button")
const inputField = document.getElementById("input-field")
const shoppinglistEl = document.getElementById("shopping-list")


addButton.addEventListener("click", function () {
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)

    clearInputFieldValue()

})

onValue(shoppingListInDB, function (snapshot) {
    let itemsArr = Object.entries(snapshot.val())
    clearShoppingListEl()


    for (let i = 0; i < itemsArr.length; i++) {
        let currentItem = itemsArr[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(currentItemValue)
    }
})

function clearShoppingListEl() {
    shoppinglistEl.innerHTML = ""
}

function clearInputFieldValue() {
    inputField.value = ""
}

function appendItemToShoppingListEl(itemValue) {
    shoppinglistEl.innerHTML += `<li>${itemValue}</li>`
}

