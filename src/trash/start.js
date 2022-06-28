function start () {

 let nome = document.querySelector("#nome")
 let cpf = document.querySelector("#cpf")
 let sexo = document.querySelector("#sexo")
 let datadenascimento = document.querySelector("#datadenascimento")
 let email = document.querySelector("#email")
 let senha = document.querySelector("#senha")
 let telefone = document.querySelector("#telefone")
 let profissao = document.querySelector("#profissao")
 let objetivo = document.querySelector("#objetivo")
 let salario = document.querySelector("#salario")
var database = {
    name:"nome",
    cpf:"cpf",
    sexo:"sexo",
    datadenascimento:"datadenascimento",
    email:"email",
    senha:"senha",
    telefone:"telefone",
    profissao:"profissao",
    objetivo:"objetivo",
    salario:"salario",
}
nome.innerHTML = database.name
cpf.innerHTML = database.cpf
sexo.innerHTML = database.sexo
datadenascimento.innerHTML = database.datadenascimento
email.innerHTML = database.email
senha.innerHTML = database.senha
telefone.innerHTML = database.telefone
profissao.innerHTML = database.profissao
objetivo.innerHTML = database.objetivo
salario.innerHTML = database.salario

console.log(nome.value)
console.log(cpf.value)
console.log(nome.value)
console.log(nome.value)
console.log(nome.value)
console.log(nome.value)
console.log(nome.value)
console.log(nome.value)
console.log(nome.value)

}