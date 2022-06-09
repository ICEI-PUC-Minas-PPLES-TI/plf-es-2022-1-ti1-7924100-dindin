const balanceData = localStorage.getItem("balanceData") == undefined
    ? [
        {
            title: 'Saida com os amigos',
            price: 300,
            category: 'withdraw',
            type: 'variable',
            date: new Date(),
        },
        {
            title: 'Freelance',
            price: 3000,
            category: 'deposit',
            type: 'variable',
            date: new Date(),
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

function getModalInfo(event){
    event.preventDefault();

    const title = document.querySelector("#title")
    const price = document.querySelector("#price")
    const category = document.querySelector("#category")
    const type = document.querySelector("#type")
    const data = document.querySelector("#data")


    balanceData.push({
        title: title.value,
        price: price.value,
        category: category.value,
        type: type.value,
        date: new Date(data.value)
    })
    localStorage.setItem("balanceData", JSON.stringify(balanceData))

    updateTable()

    title.value = ""
    price.value = 0
    data.value = 0 
    closeModal()
}