const userData = localStorage.getItem("userData") == undefined
    ? 
    {
        name: "Roberto",  
        email: "robertodoe@gmail.com",
        cellphone: "+55(31)99 9999-9999",
        password: "********",
        sex: "Masculino",
        cpf: "28.678.098-12",
        job: "Médico",
        birthday: "12/02/1972",
        salary: "1000",
        objective: "Independencia financeira"
    }
    : JSON.parse(localStorage.getItem("userData"))
localStorage.setItem("userData", JSON.stringify(userData))

loadUserData(userData)
onUpdateUserHeader(userData)

function loadUserData(userData) {
    const name = document.querySelector("#name-info").textContent = userData.name
    const email = document.querySelector("#email-info").textContent = userData.email
    const password = document.querySelector("#password-info").textContent = userData.password
    const birthday = document.querySelector("#birthday-info").textContent = userData.birthday
    const sex = document.querySelector("#sex-info").textContent = userData.sex
    const cellphone = document.querySelector("#cellphone-info").textContent = userData.cellphone
    const objective = document.querySelector("#objective-info").textContent = userData.objective
    const salary = document.querySelector("#salary-info").textContent = Number(userData.salary).toLocaleString("pt-br", {style: "currency", currency: "BRL"})
}

function handleChangeUserData(event) {
    event.preventDefault()

    const name = document.querySelector("#name")
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const birthday = document.querySelector("#birthday")
    const sex = document.querySelector("#sex")
    const cellphone = document.querySelector("#cellphone")
    const objective = document.querySelector("#objective")
    const salary = document.querySelector("#salary")

    const rawUserData = {
        name: name.value,
        email: email.value,
        password: password.value,
        birthday: birthday.value,
        sex: sex.value,
        cellphone: cellphone.value,
        objective: objective.value,
        salary: salary.value,
    }

    /**
     * 1-Transforming the objective into an array
     * 2-Filtering all the empty spots
     * 3-Returning into o an object
     * 4-Creating a object with old and new textContents
     */

    const userDataArray = Object.entries(rawUserData)

    const filterRawUserData = userDataArray.filter(([key, textContent]) => textContent.trim() !== "")
    
    const newUserData = Object.fromEntries(filterRawUserData)

    const updatedUserData = {...userData, ...newUserData}
    
    localStorage.setItem("userData", JSON.stringify(updatedUserData))
    loadUserData(updatedUserData)
    onUpdateUserHeader(updatedUserData)
}

function onUpdateUserHeader(userData){
    const name = document.querySelector("#user-name-avatar").innerHTML = userData.name
    const email = document.querySelector("#user-email-avatar").innerHTML = userData.email  

    const headerName = document.querySelector("#user-name-header").innerHTML = userData.name
    const headerEmail = document.querySelector("#user-email-header").innerHTML = userData.email
}

function closeMenu() {
    const main = document.querySelector("#main");
    const aside = document.querySelector("#aside")

    aside.classList.remove("open-menu");
    aside.classList.add("close-menu");

    main.classList.remove("close-menu");
}

function openMenu() {
    //const hamburguer = document.querySelector("#openMenu");
    const main = document.querySelector("#main");
    const aside = document.querySelector("#aside")

    aside.classList.remove("close-menu");
    aside.classList.add("open-menu");
    main.classList.add("close-menu");
}


