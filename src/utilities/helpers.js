const randomStringGenerator = (length=100) => {
    const chars = '-_.0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const len = chars.length
    let random = '';
    for(let i = 1; i <= length; i++) {
        let randPosn = Math.ceil(Math.random() * (len-1))
        random += chars[randPosn]
    } 

    return random
}

module.exports = {
    randomStringGenerator
}