const api = require('./api')

class PostLogSIEG{
    constructor(values={}){
        this.values = values
    }

    async postData(){
        try {
            await api.post('/log_sieg', this.values)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = PostLogSIEG