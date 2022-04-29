const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */

 function repeat(str, sep, times) {
  if (times === 0) return '';
  if (times === 1) return str;
  let result = str;
  for (let i = 1; i < times; i++) {
    result += sep;
    result += str;
  }
  return result;
}

function repeater(str, options) {
  const newOptions = {
    repeatTimes: 1,
    separator: '+',
    addition: '',
    additionRepeatTimes: 1,
    additionSeparator: '|',
    ...options,
  };
  const addition = repeat(newOptions.addition, newOptions.additionSeparator, newOptions.additionRepeatTimes);
  return repeat(str + addition, newOptions.separator, newOptions.repeatTimes);
}

module.exports = {
  repeater
};
