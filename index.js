
const _ = require('lodash');
const express = require('express');
const BodyParser = require('body-parser');

const db = require('./db');
const config = require('./config');
const PORT = config.PORT;

const app = express();

function respondOk(res, body) {
    res.status(200).json(body);
}

function respondError(res, err) {
    res.status(500).json({
        error: err,
    });
}

function describeSequelizeModel(modelName) {
    const model = db[modelName];
    if (!model) {
      respondError(res, new Error(`Invalid modelName: ${ modelName }`));
    }
    return (req, res) => {
        const attrs = _.reduce(model.rawAttributes, (result, attr, name) => {
            result[name] = {
                type: '' + attr.type,
            };
            return result;
        }, {});
        respondOk(res, attrs);
    }
}

function describePostgresModel(modelName) {
    const model = db[modelName];
    if (!model) {
        respondError(res, new Error(`Invalid modelName: ${ modelName }`))
    }
    return (req, res) => {
        model.describe().then(desc => {
            respondOk(res, desc);
        }).catch(err => {
            respondError(res, err);
        })
    }
}

// middleware

app.use(BodyParser.json());

// routes
app.get('/test', (req, res) => {
    respondOk(res, { response: 'ok' });
});

app.get('/users', (req, res) => {
    db.User.findAll().then(users => {
        respondOk(res, {
            users: users
        });
    }).catch(err => {
        respondError(res, err)
    })
});
app.post('/users', (req, res) => {
    const user = db.User.build(req.body);
    user.save().then(() => {
        respondOk(res, user);
    }).catch(err => {
        respondError(res, err);
    })
})
app.get('/users/dsql', describeSequelizeModel('MigrationUser'))
app.get('/users/dpg', describePostgresModel('MigrationUser'))

app.listen(PORT, function() {
	console.log(`Migration server listening on port ${ PORT }`);
});
