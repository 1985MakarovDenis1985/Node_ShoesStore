
module.exports = {
    ifeq(a, b, options){
        if (a == b){ // --- double equality --- //
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    }
}