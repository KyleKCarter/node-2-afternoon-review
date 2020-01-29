const quotes = require('./../../data.json')
let id = 6

getAllQuotes = (req, res) => {
    res.status(200).json(quotes)
}

getQuote = (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < quotes.length; i++) {
        if (+id === quotes[i].id) {
            res.status(200).json(quotes[i])
        }
    }
}

addQuote = (req, res) => {
    const { movie, character, quote } = req.body;
    quotes.push({
        id,
        movie,
        character,
        quote
    });
    id++;
    res.status(200).json(quotes)
}

editQuote = (req, res) => {
    const { id } = req.params;
    const { movie, character, quote } = req.body;
    for (let i = 0; i < quotes.length; i++) {
        if (quotes[i].id == +id) {
            quotes[i] = {
                id: quotes[i].id,
                movie: movie || quotes[i].movie,
                character: character || quotes[i].character,
                quote: quote || quotes[i].quote
            }
        }
    }
    res.status(200).json(quotes)
}

deleteQuote = (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < quotes.length; i++) {
        if (quotes[i].id == +id) {
            quotes.splice(i, 1)
        }
    }
    res.status(200).json(quotes)
}

module.exports = {
    getAllQuotes,
    getQuote,
    addQuote,
    editQuote,
    deleteQuote
}