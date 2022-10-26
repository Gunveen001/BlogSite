const express = require("express")
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const Article = require('./models/artilcle')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')
dotenv.config()
const port = 3000;

mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs')


app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/',  async (req, res) => {
    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    res.render("articles/index", {articles : articles})
})
app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})