const express = require('express');

//controller
const {getAllQuotes, getQuote, addQuote, editQuote, deleteQuote} = require('./controller/quoteController')

const app = express();

app.use(express.json())

//quote endpoints
app.get('/api/quotes', getAllQuotes)
app.get('/api/quotes/:id', getQuote)
app.post('/api/addQuote', addQuote)
app.put('/api/editQuote/:id', editQuote)
app.delete('/api/deleteQuote/:id', deleteQuote)


const PORT = 6050
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))