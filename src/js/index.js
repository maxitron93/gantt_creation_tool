require('!style-loader!css-loader!../css/style.css')

import num from './test';

console.log(`I imported ${num} from another module`)
console.log("It all works :D")