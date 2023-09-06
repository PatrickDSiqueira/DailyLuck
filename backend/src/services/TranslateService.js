const axios = require('axios');

class TranslateService {

    constructor() {

        this.enTOPt = 'en|pt';
        this.url = 'https://api.mymemory.translated.net/get?q=textToTranslateValue&langpair=langPairValue'
    }

    async translateEnglishToPortuguese($text) {
        try {
            let url = this.url.replace('textToTranslateValue', $text);
            url = url.replace('langPairValue', this.enTOPt)

            const data = await axios.get(url)
                .then((response) => {
                    return response.data.responseData.translatedText;
                })
                .catch((error) => {
                    console.log(error)
                })

            return data;

        } catch (error) {

            return {error: 'Internal error'}
        }
    }
}

module.exports = new TranslateService();