const express = require('express');
const timeout = require('connect-timeout');
const cors = require('cors');

const path = require('path');

const db = require('./models');
const product_routes = require('./routes/produc.routes');
const user_routes = require('./routes/user.routes');
const auth_routes = require('./routes/auth.routes');
const bag_routes = require('./routes/bag.routes');
const email_routes = require('./routes/email.routes');
const etiqueta_routes = require('./routes/shipping.routes');
const payment_routes = require('./routes/payment.routes');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(timeout('120s'));
app.use(cors());
app.use(product_routes);
app.use(user_routes);
app.use(auth_routes);
app.use(bag_routes);
app.use(email_routes);
app.use(payment_routes);
app.use(etiqueta_routes);
const port = 8080
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Servidor rodando na porta 8080');
    });
});