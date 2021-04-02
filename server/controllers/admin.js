const Admin = require('../models/admin');
const encrypt = require('../services/encryption');
const formidable = require('formidable');

const formParse = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

async function signin(req, res) {
    const { fields } = await formParse(req);

    if (!fields.password || !fields.username) {
        return res.status(422).send({ error: true, message: 'Unable to log in' });
    } else {
        const admin = await Admin.findOne({ username: fields.username });

        if (!admin) {
            return res.status(422).send({ error: true, message: 'Unable to log in' });
        }

        const isMatch = await encrypt.comparePassword(admin, fields.password);

        if (!isMatch) {
            return res.status(422).send({ error: true, message: 'Unable to log in' });
        }

        if (isMatch) {
            return res.status(200).json({
                token: encrypt.tokenForUser(admin),
            });
        }
    }
}

module.exports = { signin };