const mongoose = require('mongoose')
const { database } = require('../config')

mongoose.connect( database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log(`Ustanowiono polaczenie z baza danych ${database}`);
}).catch ( err => {
    console.log('nie mozna polaczyc sie z baza danych! ', err);
    process.exit()
}) 
