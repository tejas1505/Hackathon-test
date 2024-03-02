var express = require('express');
const connection = require('../db')
var router = express.Router();
const middleware = require('../middleware/middleware')
const JWT_SECRET = 'hackathon'

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

router.post('/addcategory', middleware, (req, res) => {
    const { name, description, status } = req.body
    try {
        connection.query(`insert into category(name, description, status) values (?, ?, ?);`, [name, description, status], (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: "Something went wrong!" })
            } else {
                res.json({ success: "Category added", data })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})

router.get('/getcategory', middleware, async (req, res) => {
    try {
        const category = await executeQuery('select * from category;')
        res.json({ success: "success", category })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})

router.post('/editcategory', middleware, (req, res) => {
    const { category_id, name, description, status } = req.body
    var stringQuery = []
    if (name) {
        stringQuery.push(`name='${name}'`)
    }
    if (description) {
        stringQuery.push(`description='${description}'`)
    }
    if (status) {
        stringQuery.push(`status='${status}'`)
    }
    console.log(stringQuery.join(','));
    try {
        connection.query(`update category set ${stringQuery.join(',')} where id=${category_id};`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: "Something went wrong!" })
            } else {
                res.json({ success: "Category Updated", data })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})

router.post('/deletecategory', middleware, (req, res) => {
    const { category_id } = req.body
    try {
        connection.query(`delete from category where id=${category_id};`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: "Something went wrong!" })
            } else {
                res.json({ success: "Category Deleted", data })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" })
    }
})

module.exports = router;