const express = require('express')
const app = express()
const Database = require('better-sqlite3')
const db = new Database('livros.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS livros(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    lido INTEGER DEFAULT 0
    )
`)

app.use(express.json())
app.use(express.static('.'))

app.listen(3000, function(){
    console.log('Servidor rodando em http:localhost/3000')
})

app.post('/livros', function(req, res){
    const titulo = req.body.titulo
    const autor = req.body.autor

    if(!titulo || titulo.trim() === ''){
        return res.status(400).json({ erro: 'Titulo é obrigatorio.'})
    }
    if(!autor || autor.trim() === ''){
        return res.status(400).json({erro: 'Autor é obrigatorio.'})
    }

    db.prepare("INSERT INTO livros (titulo, autor) VALUES (?, ?)").run(titulo, autor)
    res.json({sucesso: true})
})

app.get('/livros', function(req, res){
    const todosLivros = db.prepare("SELECT * FROM livros").all()
    res.json(todosLivros)
})

app.put('/livros/concluir', function(req, res){
    const titulo = req.body.titulo
    const resultado = db.prepare("UPDATE livros SET lido = 1 WHERE titulo = ?").run(titulo)

    if(resultado.changes === 0){
        return res.status(404).json({erro: 'Livro nao encontrado.'})
    }
    res.json({sucesso: 'Livro lido!'})

})

app.delete('/livros/delete', function(req, res){
    const titulo = req.body.titulo
    const resultado = db.prepare("DELETE FROM livros WHERE titulo = ?").run(titulo)

    if(resultado.changes === 0){
        return res.status(404).json({erro: 'Livro nao encontrado.'})
    }

    res.json({sucesso: 'Livro excluido com sucesso!'})
    
})
