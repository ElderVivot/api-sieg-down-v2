const api = require('./api')
const { implementsFilterInURL } = require('../util/functions')

class PostSkips{
    constructor(filter={}, values={}){
        this.skips = []
        this.filter = filter
        this.values = values
        this.url = implementsFilterInURL('/skips', this.filter)
    }

    async postData(){
        let skip = null
        try {
            const responseSkips = await api.get(this.url)
            if(responseSkips.statusText === "OK"){
                this.skips = responseSkips.data
            }
            
            if(this.skips.length === 0){
                skip = await api.post(`/skips`, this.values)
            } else {
                skip = await api.put(this.url, this.values)
            }
        } catch (error) {
            console.log(error)
        }
        return skip
    }
}
module.exports = PostSkips