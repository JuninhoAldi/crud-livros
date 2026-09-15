fetch('/livros')
.then(function(resposta){
    return resposta.json()
})
.then(function(livros){
    console.log(livros)
    const lista = document.getElementById('listaLivros')
    for (let i = 0; i < livros.length; i++){
        const item = document.createElement('li')
        const botaoLido = document.createElement('button')
        const botaoRemover = document.createElement('button')

        item.textContent = (livros[i].lido ? "[x]" : "[]") + livros[i].titulo +""+ livros[i].autor
        botaoLido.textContent = ('Marcar com lido')
        botaoRemover.textContent = ('Remover')

        botaoLido.addEventListener('click', function(){
            fetch('/livros/concluir', {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({id: livros[i].id})
            })
            .then(function(resposta){
                return resposta.json()
            })
            .then(function(resultado){
                console.log(resultado)
                location.reload()
            })
        })

        botaoRemover.addEventListener('click', function(){
            fetch('/livros/delete', {
                method: 'DELETE',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({id: livros[i].id})
            })
            .then(function(resposta){
                return resposta.json()
            })
            .then(function(resultado){
                console.log(resultado)
                location.reload()
            })
        })

        lista.appendChild(item)
        item.appendChild(botaoLido)
        item.appendChild(botaoRemover)
    }
})

const botao = document.getElementById('novoLivro')

botao.addEventListener('click', function(){
    const inputTitulo = document.getElementById('novoTitulo')
    const inputAutor = document.getElementById('novoAutor')
    const titulo = inputTitulo.value.trim()
    const autor= inputAutor.value.trim()

    if (titulo === ''){
        alert('Digite um titulo para o livro.')
        return
    } 
    if (autor === ''){
        alert('Digite o nome do autor do livro')
        return
    }

    fetch('/livros', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({titulo : titulo, autor: autor})
    })
    .then(function(resposta){
        return resposta.json()
    })
    .then(function(resultado){
        console.log(resultado)
        location.reload()
    })

})