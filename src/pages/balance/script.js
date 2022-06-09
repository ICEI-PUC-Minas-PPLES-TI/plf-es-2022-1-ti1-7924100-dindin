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

function getModalInfo(event){
    event.preventDefault();

    const title = document.querySelector("#title")
    const price = document.querySelector("#price")
    const category = document.querySelector("#category")
    const type = document.querySelector("#type")
    const data = document.querySelector("#data")

    console.log(title.value, price.value, category.value, type.value, data.value)
    


    title.value = ""
    price.value = 0
    data.value = 0 
    closeModal()
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

