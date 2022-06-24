const today = new Date()

const balanceData = localStorage.getItem("balanceData") == undefined
    ? [
        {
            id: uuid(),
            title: 'Saida com os amigos',
            price: Number(300).toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
            category: 'Saida',
            type: 'Variavel',
            date: today.getFullYear()+'-'+(today.getMonth()+01)+'-'+today.getDate()
        },
        {
            id: uuid(),
            title: 'Freelance',
            price: Number(300).toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
            category: 'Entrada',
            type: 'Variavel',
            date: today.getFullYear()+'-'+(today.getMonth()+01)+'-'+today.getDate()
        },
    ] 
    : JSON.parse(localStorage.getItem("balanceData"))
localStorage.setItem("balanceData", JSON.stringify(balanceData))

//? Initialized functions
updateTable()
onCalculateDesposit()
onCalculateWithdraw()
onCalculateTotalReturn()


function fromCurrencyToNumber(num) {
    dotPos = num.indexOf('.');
    commaPos = num.indexOf(',');

    if (dotPos < 0)
        dotPos = 0;

    if (commaPos < 0)
        commaPos = 0;

    if ((dotPos > commaPos) && dotPos)
        sep = dotPos;
    else {
        if ((commaPos > dotPos) && commaPos)
            sep = commaPos;
        else
            sep = false;
    }

    if (sep == false)
        return parseFloat(num.replace(/[^\d]/g, ""));

    return parseFloat(
        num.substr(0, sep).replace(/[^\d]/g, "") + '.' + 
        num.substr(sep+1, num.length).replace(/[^0-9]/, "")
    );

}

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

function onCalculateDesposit() {
    const depositCard = document.querySelector("#deposit-card");

    let deposit = balanceData.reduce(function (acc, balance) {
        if (balance.category === 'Entrada') {
            return acc + fromCurrencyToNumber(balance.price)
        }
        return acc
    }, 0)

    depositCard.innerHTML = Number(deposit).toLocaleString("pt-br", {style: "currency", currency: "BRL"})

    return deposit
}

function onCalculateWithdraw() {
    const withdrawCard = document.querySelector("#withdraw-card");

    let withdraw = balanceData.reduce(function (acc, balance) {
        if (balance.category === 'Saida') {
            return acc + fromCurrencyToNumber(balance.price)
        }
        return acc
    }, 0)

    withdrawCard.innerHTML = Number(withdraw).toLocaleString("pt-br", {style: "currency", currency: "BRL"})
    
    return withdraw
}

function onCalculateTotalReturn() {
    const totalReturn = document.querySelector("#total-return")

    const deposit = onCalculateDesposit()
    const withdraw = onCalculateWithdraw()

    const result = deposit - withdraw

    if (result > 0) {
        totalReturn.classList.remove("red-return")
        totalReturn.classList.add("green-return")
    }
    if (result < 0) {
        totalReturn.classList.remove("green-return")
        totalReturn.classList.add("red-return")
    }

    totalReturn.innerHTML = Number(result).toLocaleString("pt-br", {style: "currency", currency: "BRL"})
}

function updateTable() {
    const tableInfo = balanceData
    const table = document.querySelector("#table-content")
    
    tableInfo.forEach((info) => {
        const tableRow = document.createElement("tr")
        
        tableRow.id = info.id
        info.id = undefined
        
        const informationArray = Object.values(info)

        informationArray.forEach((infoArray) => {
            if (infoArray !== undefined) {
                const tableData = document.createElement("td")
                tableData.appendChild(document.createTextNode(`${infoArray}`))
                tableRow.appendChild(tableData)
            }
        })

        const button = document.createElement("button")
        button.innerText = "Deletar"
        button.onclick = function(e){
            const parentId = e.target.parentNode.id
            const parentElement = document.getElementById(parentId)
            parentElement.remove()


            const balanceData = JSON.parse(localStorage.getItem("balanceData"))

            const newBalanceData = balanceData.filter(balance => balance.id !== parentId)
            localStorage.setItem("balanceData", JSON.stringify(newBalanceData))
        }

        tableRow.appendChild(button)
        table.appendChild(tableRow)
    })
}

/**
 * @param { = object, title, price, category, type, date }
 * @abstract creates <td / > for every element in the array, then appends in the <tr/ > and finally appends to <table/ > 
 */
function handleAddElementToTable(balanceContent) {
    const table = document.querySelector("#table-content")

    const tableRow = document.createElement("tr")
    tableRow.id = balanceContent.id

    balanceContent.id = undefined
    const tableContent = Object.values(balanceContent)


    tableContent.forEach((content) => {
        if (content != undefined) {
            const tableData = document.createElement("td")
            tableData.appendChild(document.createTextNode(`${content}`))
            tableRow.appendChild(tableData)
        }
    })

    const button = document.createElement("button")
    button.innerText = "Deletar"
    button.onclick = function(e){
        const parentId = e.target.parentNode.id
        const parentElement = document.getElementById(parentId)
        parentElement.remove()

        const balanceData = JSON.parse(localStorage.getItem("balanceData"))

        const newBalanceData = balanceData.filter(balance => balance.id !== parentId)
        localStorage.setItem("balanceData", JSON.stringify(newBalanceData))
    }

    tableRow.appendChild(button)

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
        id: uuid(),
        title: title.value,
        price: Number(price.value).toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
        category: category.value === "deposit" ? "Entrada" : "Saida",
        type: type.value === "fixed" ? "Fixa" : "Variavel",
        date: data.value
    }

    balanceData.push(balance)
    localStorage.setItem("balanceData", JSON.stringify(balanceData))

    handleAddElementToTable(balance)
    onCalculateDesposit()
    onCalculateWithdraw()
    onCalculateTotalReturn()

    title.value = ""
    price.value = 0
    data.value = 0 
    closeModal()
}

/*? Generate uuid */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }