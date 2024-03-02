const express = require('express')
const app = express()
const port = 8000
const auth = require('./routes/auth')
const category = require('./routes/category')
const product = require('./routes/product')
const cors = require('cors');


app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use('/images/',express.static('images/')); 
app.use('/auth/', auth)
app.use('/category/', category)
app.use('/product/', product)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
  
})