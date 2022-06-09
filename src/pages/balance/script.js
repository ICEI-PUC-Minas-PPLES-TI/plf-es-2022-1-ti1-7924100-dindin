const today = new Date()

const balanceData = localStorage.getItem("balanceData") == undefined
    ? [
        {
            title: 'Saida com os amigos',
            price: Number(300).toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
            category: 'Saida',
            type: 'Variavel',
            date: today.getFullYear()+'-'+(today.getMonth()+01)+'-'+today.getDate()
        },
        {
            title: 'Freelance',
            price: Number(300).toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
            category: 'Entrada',
            type: 'Variavel',
            date: today.getFullYear()+'-'+(today.getMonth()+01)+'-'+today.getDate()
        },
    ] 
    : JSON.parse(localStorage.getItem("balanceData"))
localStorage.setItem("balanceData", JSON.stringify(balanceData))
updateTable()

function closeMenu() {
    const main = document.querySelector("#main");
    const aside = document.querySelector("#aside")

    aside.classList.remove("open-menu");
    aside.classList.add("close-menu");

    main.classList.remove("close-menu");
}

function openMenu() {
    const main = document.querySelector("#main");
    const aside = document.querySelector("#aside")

    aside.classList.remove("close-menu");
    aside.classList.add("open-menu");
    main.classList.add("close-menu");
}


function openModal() {
    const modal = document.querySelector("#modal");

    modal.classList.remove("close-modal");
    modal.classList.add("open-modal");
}

function closeModal() {
    const modal = document.querySelector("#modal");

    modal.classList.remove("open-modal");
    modal.classList.add("close-modal");
}


function updateTable() {
    const tableInfo = balanceData
    const table = document.querySelector("#table-content")

    tableInfo.forEach((info) => {
        const informationArray = Object.values(info)
        const tableRow = document.createElement("tr")

        informationArray.forEach((infoArray) => {
            const tableData = document.createElement("td")
            tableData.appendChild(document.createTextNode(`${infoArray}`))

            tableRow.appendChild(tableData)
        })
        table.appendChild(tableRow)
    })
}

/**
 * @param { = object, title, price, category, type, date }
 * @abstract creates <td / > for every element in the array, then appends in the <tr/ > and finally appends to <table/ > 
 */
function handleAddElementToTable(balanceContent) {
    const table = document.querySelector("#table-content")

    const tableContent = Object.values(balanceContent)
    
    const tableRow = document.createElement("tr")

    tableContent.forEach((content) => {
        const tableData = document.createElement("td")
        tableData.appendChild(document.createTextNode(`${content}`))

        tableRow.appendChild(tableData)
    })

    table.appendChild(tableRow)
}


function handleModalInfo(event){
    event.preventDefault();

    const title = document.querySelector("#title")
    const price = document.querySelector("#price")
    const category = document.querySelector("#category")
    const type = document.querySelector("#type")
    const data = document.querySelector("#data")

    const balance = {
        title: title.value,
        price: Number(price.value).toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
        category: category.value === "deposit" ? "Entrada" : "Saida",
        type: type.value === "fixed" ? "Fixa" : "Variavel",
        date: data.value
    }

    balanceData.push(balance)
    localStorage.setItem("balanceData", JSON.stringify(balanceData))

    handleAddElementToTable(balance)

    title.value = ""
    price.value = 0
    data.value = 0 
    closeModal()
}