const parse = require('mongo-error-parser');
 
try {
  // mongo code here which throws e.g. unique index error
} catch (e) {
  parse(e); // -> {name:, message:, code:, index:}
}
