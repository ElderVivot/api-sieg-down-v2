const api = require('./api')

class PostProcessFrequency{
    constructor(values={}){
        this.values = values
    }

    async postData(){
        try {
            await api.post('/process_frequency', this.values)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = PostProcessFrequency