const express = require('express');
const consign = require('consign');

const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./src/swagger-output.json')

const app = express();

const cors = require('cors');

app.use(express.json())
app.use(cors())
consign()
    .include('src/routes')
    .then('src/repositories')
    .then('src/controllers')
    .into(app);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(3003, function(){
    console.log('APP rodando na porta 3003');
});