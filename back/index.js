const app = require('./src/server')
const dbConfig = require('./src/config/dbConfig')
require('dotenv').config()

const PORT = process.env.PORT

dbConfig()
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server listening in http://localhost:${PORT}`);
        })
    })