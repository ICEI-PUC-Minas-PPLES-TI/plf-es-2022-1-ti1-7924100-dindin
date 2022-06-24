const userWishList = localStorage.getItem("userWishList") == undefined
    ? [
        {
            title: 'Pc Gamer',
            price: Number(5000).toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
            timeAtWork: 40,
            salary: 2000
        }
    ] 
    : JSON.parse(localStorage.getItem("userWishList"))
localStorage.setItem("userWishList", JSON.stringify(userWishList))

/**
 * 89 - 100%
 * 34 - x
 * x = 34*100/89
 */

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

function handleAddWish(userWish) {
    const userWishList = document.querySelector("#user-wish-list");

    userWishList.innerHTML += `
        <div class="user-wish-list-item">
            <div>
                <p>${userWish.title}</p>
                <p>${userWish.price}</p>
            </div>
            <p>Este item vale <strong>${userWish.result}</strong> horas do seu trabalho.</p>
        </div>
    `
}


function handleModalInfo(event){
    event.preventDefault();

    const title = document.querySelector("#title")
    const price = document.querySelector("#price")
    const timeAtWork = document.querySelector("#time-at-work")
    const salary = document.querySelector("#salary")

    if (title.value.trim() === "") return alert("Por favor preencha todos os campos")
    if (price.value < 0 && timeAtWork.value < 0 && salary.value < 0) return alert("Por favor preencha todos os campos")
    
    const result = (price.value / (salary.value / (timeAtWork.value*4))).toFixed(1)

    const userWish = {
        title: title.value,
        price: Number(price.value).toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
        timeAtWork: timeAtWork.value,
        salary: salary.value,
        result,
    }

    handleAddWish(userWish)

    console.log(userWish)


    title.value = ""
    price.value = 0
    timeAtWork.value = 0
    salary.value = 0
    closeModal()
}
