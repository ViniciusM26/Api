/*
    1) Baixar o npm express e o package.json;
    2) Database;
    3) Criar o App;
    4) Aplicar middlewares;
    5) Mandar o Servidor rodar;
*/

    const express = require ("express")

    // Fake database
        let books = []

    // Criar o App
        const app = express()

        app.use (express.json())

    // Rota para adicionar livros

        app.post ("/books", (req,res) =>{
        const { id, title, author, publishedat} = req.body;
        const book = { id, title, author, publishedat};
        books.push (book);
        return res.status (201).json(book);

        })

    // Rota para mostrar lista dos livros

        app.get ("/books", (req,res) => {
        const allbooks = books;
        return res.status(200).json(allbooks);

        } )

    // Rota para acessar livro específico

        app.get ("/books/:book_id", (req, res) => {
        const { book_id } = req.params
        const book = books.find ((book) => book.id === book_id)
        if (!book) res.status(404).json("not found")
        return res.status(200).json(book)

        })

    // Rota para deletar um livro

        app.delete ("/books/:book_id", (req, res) => {
        const { book_id } = req.params
         const filteredBooks = books.filter((book) => book.id !== book_id)
        books = filteredBooks
        return res.status(204).json("deleted")

        })

    // Rota para atualiar um livro
        
        app.patch ("/books/:book_id", (req,res) => {
        const { author, title, publishedat} = req.body
        const { book_id } = req.params
        const book = books.find(book => book.id === book_id)
        book.id = book.id
        book.title = title ? title : book.title
        book.author = author ? author : book.author
        book.publishedat = publishedat ? publishedat : book.publishedat
        return res.status(200).json(book)

        })

    // Mandar o Servidor rodar
        app.listen(3333, () => console.log ("Server is running"))
