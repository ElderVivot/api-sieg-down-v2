const api = require('./api')
const { implementsFilterInURL } = require('../util/functions')

class GetSkips{
    constructor(filter={}){
        this.skips = []
        this.filter = filter
        this.url = implementsFilterInURL('/skips', this.filter)
    }

    async getData(){
        try {
            const responseSkips = await api.get(`/skips`)
            if(responseSkips.statusText === "OK"){
                this.skips = responseSkips.data   
            }
        } catch (error) {
            console.log(error)
        }
        return this.skips
    }
}
module.exports = GetSkips