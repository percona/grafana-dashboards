const parse = require('mongo-error-parser');
 
try {
  // mongo code here which throws e.g. unique index error
} catch (e) {
  parse(e); // -> {name:, message:, code:, index:}
}
//This is a simple helper package allows for parsing MongoDB error messages. 
//Use this package to get detailed data from the error message (e.g. index name for code 11000).

