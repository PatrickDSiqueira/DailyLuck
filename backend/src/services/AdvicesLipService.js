const TranslateService = require('./TranslateService')

const axios = require('axios');

class AdvicesLipService {

    constructor() {

        this.url = 'https://api.adviceslip.com/advice';
    }

    async getRandomMessage() {

        try {
            const data = await axios.get(this.url)
                .then((response) => {

                    return response.data

                }).catch((error) => {

                    console.log(error)
                    return {error}
                });


            const randomMessage = data.slip.advice;

            const randomMessageTranslate = await TranslateService.translateEnglishToPortuguese(randomMessage);

            return {en: randomMessage, pt: randomMessageTranslate};

        } catch (error) {

            return {error: 'Internal error'}
        }
    }
}

module.exports = new AdvicesLipService();