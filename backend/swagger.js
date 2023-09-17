const swaggerAutogen = require('swagger-autogen')()
const fs = require('fs');
const path = require('path');

const filesPath = './src/routes';

const generateSwagger = async () => {

    try {

        const files = await fs.promises.readdir(filesPath);
        const filesNames = files.map(file => path.join(filesPath, file));
        await swaggerAutogen('./src/swagger-output.json', filesNames);

        console.log("Swagger created");

    } catch (e) {

        console.log("Erro to create Swagger : ", e.message)
    }
}

generateSwagger();