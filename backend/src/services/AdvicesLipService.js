const axios = require('axios');

class AdvicesLipService {

    constructor() {

        this.url = 'https://api.adviceslip.com/advice';
    }

    async getRandomMessage() {

        return await axios.get(this.url);
    }
}

module.exports = new AdvicesLipService();