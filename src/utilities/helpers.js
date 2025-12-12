const randomStringGenerator = (length=100, type=null) => {
  let chars = '-_.0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if(type === 'number') {
    chars = "0987654321"
  }
  const len = chars.length
  let random = '';
  
  for(let i = 1; i <= length; i++) {
    let randPosn = Math.ceil(Math.random() * (len-1))
    random += chars[randPosn]
  }

  return random

}

// let otp = randomStringGenerator(4, 'number')


module.exports = {
  randomStringGenerator
}