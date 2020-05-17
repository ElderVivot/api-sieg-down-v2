const api = require('./api')
const { implementsFilterInURL } = require('../util/functions')

class PostSkips{
    constructor(filter={}, values={}){
        this.skips = null
        this.filter = filter
        this.values = values
        this.url = implementsFilterInURL('/skips', this.filter)
    }

    async postData(){
        try {
            const responseSkips = await api.get(this.url)
            if(responseSkips.statusText === "OK"){
                this.skips = responseSkips.data
            }
            
            if(this.skips === null){
                await api.post(`/skips`, this.values)
            } else {
                await api.put(this.url, this.values)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = PostSkips