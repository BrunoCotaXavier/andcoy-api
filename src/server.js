const express = require('express');

const db = require('./models');
const user_routes = require('./routes/user.routes');
const auth_routes = require('./routes/auth.routes');
const app = express();

app.use(express.json());

app.use(user_routes);
app.use(auth_routes);

db.sequelize.sync().then(() => {
    app.listen(80, () => {
        console.log('Servidor rodando na porta 80');
    });
});