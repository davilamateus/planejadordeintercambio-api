const jwt = require('jsonwebtoken');
const JWTsecret = require('./JWTsecret');



function authAdmin(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken !== undefined) {

        const token = authToken.split(' ')[1];
        jwt.verify(token, JWTsecret, (error, data) => {
            if (error) {
                res.json({ error: 'INVALID TOKEN' });
            } else {
                req.user = data;
                if (data.category == '1') {
                    next();
                } else {
                    res.status(400).json({ error: ' No Auth' });
                }
            }
        })

    } else {
        res.json({ error: ' THERE NO TOKEN' });
    }
}



module.exports = authAdmin;

