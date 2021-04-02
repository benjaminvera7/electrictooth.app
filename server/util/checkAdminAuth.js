const encrypt = require('../services/encryption');
const Admin = require('../models/admin');

async function checkAdminAuth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        try {
            const { sub } = encrypt.decode(token);
            const admin = await Admin.findById(sub);

            if (admin && admin._id) {
                next();
                return;
            }
        } catch (err) {
            req.admin = null;
        }
    }

    res.status(403).send({ error: 'unauthorized' });
}

module.exports = checkAdminAuth;