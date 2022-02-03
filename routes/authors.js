const express = require('express')
const router = express.Router()
const Author = require('../models/author')
    //ALL AUTHORS ROUTE
router.get('/', async(req, res) => {
    let searchOptions = {}

    if (req.query.name !== null && req.body.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions: req.query })

    } catch {
        console.log("error agaya")
        res.redirect('/')
    }
})

//NEW Author ROUTE

router.get('/new', (req, res) => {
    res.render('authors/new', { author: " " })
})

//Create Author ROUTE


router.post('/', async(req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        console.log(newAuthor)
        res.redirect(`authors`)

    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
        })
    }

})

module.exports = router