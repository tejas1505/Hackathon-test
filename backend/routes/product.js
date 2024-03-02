var express = require('express');
const connection = require('../db')
var router = express.Router();
const middleware = require('../middleware/middleware')
const JWT_SECRET = 'hackathon'
const multer = require('multer')
//ghzb mpeu njlk osbb
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'images',);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 10
    }
})


const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
                return;
            } else {
                resolve(results);
            }
        });
    });
};

router.post('/addproduct', middleware, upload.single('images'), (req, res) => {
    const { name, pack_size, category, mrp, status } = req.body
    try {
        connection.query(`insert into products(name, pack_size, category, mrp, image, status) values (?, ?, ?, ?, ?, ?);`, [name, pack_size, category, `Rs ${mrp}`, req.file.filename, status], (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: "Something went wrong!" })
            } else {
                res.json({ success: "Product added", data })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})

router.get('/getproduct', middleware, async (req, res) => {
    try {
        const product = await executeQuery('select * from products;')
        res.json({ success: "success", product })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})

router.post('/editproduct', middleware, upload.single('images'), (req, res) => {
    const { name, pack_size, category, mrp, status, product_id } = req.body
    var stringQuery = []
    if (name) {
        stringQuery.push(`name='${name}'`)
    }
    if (pack_size) {
        stringQuery.push(`status='${status}'`)
    }
    if (category) {
        stringQuery.push(`status='${status}'`)
    }
    if (status) {
        stringQuery.push(`status='${status}'`)
    }
    if (req.file) {
        stringQuery.push(`image='${req.file.filename}'`)
    }
    console.log(stringQuery.join(','));
    try {
        connection.query(`update products set ${stringQuery.join(',')} where id=${product_id};`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: "Something went wrong!" })
            } else {
                res.json({ success: "Product Updated", data })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})

router.post('/deleteproduct', middleware, (req, res) => {
    const { product_id } = req.body
    try {
        connection.query(`delete from products where id=${product_id};`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: "Something went wrong!" })
            } else {
                res.json({ success: "Product Deleted", data })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})


module.exports = router;