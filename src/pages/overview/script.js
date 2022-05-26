function closeMenu() {
    const hamburguer = document.querySelector("#openMenu");
    const aside = document.querySelector("#aside")

    aside.classList.remove("open-menu");
    aside.classList.add("close-menu");

    hamburguer.classList.remove("close-menu");
}

function openMenu() {
    const hamburguer = document.querySelector("#openMenu");
    const aside = document.querySelector("#aside")

    aside.classList.add("open-menu");
    hamburguer.classList.add("close-menu");
}


