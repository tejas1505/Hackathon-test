var express = require('express');
const connection = require('../db')
var router = express.Router();
const middleware = require('../middleware/middleware')
const JWT_SECRET = 'hackathon'
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const CryptoJS = require('crypto-js');

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

const sendMail = (email, link) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lordraiden1501@gmail.com',
            pass: 'ghzb mpeu njlk osbb'
        }
    });

    // Creating email options
    let mailOptions = {
        from: 'lordraiden1501@gmail.com',
        to: email,
        subject: 'Request New Password',
        html: `<p>Hello,</p>
        <p>You have requested to change your password. Please click <a href="${link}">here</a> to change your password.</p>
        <p>If you did not request this change, you can safely ignore this email.</p>`
    };

    // Sending email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { error: "error" }
        } else {
            console.log('Email sent: ' + info.response);
            return { success: "success email sent" }
        }
    });
}

router.get('/test', async (req, res) => {

    res.json({ message: "Hello there" })
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    const insertQuery = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
    const checkEmail = await executeQuery(`select * from admins where email='${email}'`)
    var salt = bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(password, salt);
    if (checkEmail.length !== 0) {
        return res.status(400).json({ error: "Sorry the user with this email is already exists!!!" })
    } else {
        connection.query(insertQuery, [name, email, secPass], (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "error": "Something went wrong!" })
            } else {
                res.json({ data, success: "You have successfully registered!!", email: email })
            }

        });
    }

})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    let success = true
    connection.query(
        'SELECT * FROM admins WHERE email = ?',
        [email], async (err, data) => {
            if (data.length === 0) {
                res.status(400).json({ error: "Invalid email or password!!" })
            } else if (!(await bcrypt.compare(password, data[0].password))) {
                res.status(400).json({ error: "Invalid email or password!!" })
            } else {
                const payload = {
                    user: {
                        id: data[0].id
                    }
                }
                const authtoken = jwt.sign(payload, JWT_SECRET)
                res.json({ success: 'Login successfull', authtoken: authtoken, email: email })
            }
        }
    );
})

router.post('/updatepass', async (req, res) => {
    const { email, password } = req.body
    try {
        var salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(password, salt);
        connection.query(`update admins set password='${secPass}' where email='${email}'`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).json({ "error": "Error changing password" })
            } else {
                res.json({ data, success: "Password Changed", email: email })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

const secretKey = 'hackathon'

const decrypt = (encryptedData) => {
    const decodedEncryptedData = decodeURIComponent(encryptedData);
    const bytes = CryptoJS.AES.decrypt(decodedEncryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData
}

const encrypt = (stringURL) => {
    const encryptedData = CryptoJS.AES.encrypt(stringURL, secretKey).toString()
    return encodeURIComponent(encryptedData)
}


router.post('/new-password', async (req, res) => {
    const { email } = req.body
    const encryptedLink = encrypt(email)
    const link = `http://localhost:3000/new-password/${encryptedLink}`
    const response = sendMail(email, link)
    res.json({ response })
})
module.exports = router