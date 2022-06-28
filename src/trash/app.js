function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { contatos : [ 
            {Nome: "Nome:Rommel Vieira Carneiro",  
            Email: "Email:Romminho@sga.pucminas.br",
            Telefone: "Telefone:+55(31)91234-5678",
            Senha: "Senha:********",
            Sexo: "Sexo:Masculino",
            Cpf: "Cpf:128.678.098-12",
            Profissao: "Profissão:Professor",
            Data_de_nascimento: "Data de Nascimento:12/02/1972"},
        ]}
    }

    return objDados;
}

function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function incluirContato (){
    // Ler os dados do localStorage
    let objDados = leDados();

    // Incluir um novo contato
    let strEmail = document.getElementById ('campoEmail').value;
    let strNome = document.getElementById ('campoNome').value;
    let strTelefone = document.getElementById ('campoTelefone').value;
    let strSenha = document.getElementById ('campoSenha').value;
    let strSexo = document.getElementById ('campoSexo').value;
    let strCpf = document.getElementById ('campoCpf').value;
    let strProfissao = document.getElementById ('campoProfissao').value;
    let strData_de_nascimento = document.getElementById ('campoData_de_nascimento').value;
    let novoContato = {
        Email: strEmail,
        Nome: strNome,
        telefone: strTelefone,
        strSenha: strSenha,
        Sexo: strSexo,
        Cpf: strCpf,
        Profissao: strProfissao,
        Data_de_nascimento: strData_de_nascimento
    };
    objDados.contatos.push (novoContato);

    // Salvar os dados no localStorage novamente
    salvaDados (objDados);

    // Atualiza os dados da tela
    imprimeDados ();
}

function imprimeDados () {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados ();

    for (i=0; i< objDados.contatos.length; i++) {
        strHtml += `<p>${objDados.contatos[i].Nome} -
         ${objDados.contatos[i].Telefone} -
          ${objDados.contatos[i].Email} -
           ${objDados.contatos[i].Senha} -
            ${objDados.contatos[i].Sexo} -
             ${objDados.contatos[i].Cpf} -
              ${objDados.contatos[i].Profissao} -
               ${objDados.contatos[i].Data_de_nascimento}</p>`
    }

    tela.innerHTML = strHtml;
}

// Configura os botões
document.getElementById ('btnCarregaDados').addEventListener ('click', imprimeDados);
document.getElementById ('btnIncluirContato').addEventListener ('click', incluirContato);

