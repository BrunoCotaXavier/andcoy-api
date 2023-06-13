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
app.use(express.urlencoded({ extended: true }));
app.use(timeout('120s'));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

app.use(product_routes);
app.use(user_routes);
app.use(auth_routes);
app.use(bag_routes);
app.use(email_routes);
app.use(payment_routes);
app.use(etiqueta_routes);
const port = 80
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando na poprta: ${port}`);
    });
});