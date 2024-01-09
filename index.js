import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "*HIDDEN"
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
    
    if (snapshot.exists()) {
        let itemsArr = Object.entries(snapshot.val())

        clearShoppingListEl()


        for (let i = 0; i < itemsArr.length; i++) {
            let currentItem = itemsArr[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
        }
    }else {
        shoppinglistEl.innerHTML = "Nothing to shop!"
    }
})

function clearShoppingListEl() {
    shoppinglistEl.innerHTML = ""
}

function clearInputFieldValue() {
    inputField.value = ""
}

function appendItemToShoppingListEl(item) {

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    shoppinglistEl.append(newEl)

}



