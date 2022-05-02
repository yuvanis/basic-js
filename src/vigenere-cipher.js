const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  isReverse;

  constructor(isReverse = false) {
    this.isReverse = isReverse;
  }

  makeKey(key, length) {
    let result = key;
    while(result.length < length)
      result += key;
    return result.toUpperCase();
  }

  reverse(str){
    let result = '';
    for (let index = str.length - 1; index >= 0 ; index--) {
      const element = str[index];
      result += element;
    }
    return result;
  }

  crypt(m, k, isEncrypt) {
    if(m === undefined || k == undefined)
      throw new Error( 'Incorrect arguments!')
    const message = this.isReverse ? this.reverse(m.toUpperCase()) : m.toUpperCase();
    const key = this.makeKey(k, message.length);
    let result = '';
    for(let i = 0, j = 0; i < message.length; i++, j++) {
      const mLetterIndex = this.alphabet.indexOf(message[i]);
      if(mLetterIndex === -1) {
        result += message[i];
        j--;
        continue;
      }
      const kLetterIndex = this.alphabet.indexOf(key[j]);
      let newIndex;
      if(isEncrypt)
        newIndex = (kLetterIndex + mLetterIndex) % this.alphabet.length;
      else 
        newIndex = Math.abs(this.alphabet.length - kLetterIndex + mLetterIndex) % this.alphabet.length;
      result += this.alphabet[newIndex];
    }
    return !isEncrypt && this.isReverse ? this.reverse(result) : result;
  }

  encrypt(m, k) {
    return this.crypt(m, k, true);
  }
  decrypt(m, k) {
    return this.crypt(m, k, false);
  }
}

module.exports = {
  VigenereCipheringMachine
};
