/*global arithmeticListener */
/*global antlr4 */
//load("jvm-npm.js");
var console = {};
console.log = print;
console.error = print;
var exports = {};
var log = function() { };

log("log is a " + (typeof log));

var load_once = function () {
    var cache = typeof cache === 'undefined' ? {} : cache;
    
    function _load(filename, log) {
        if (cache[filename]) {
            log(filename + " already loaded.");
        }
        else {
            cache[filename] = true;
            log("loading " + filename);
            load(filename);
        }
    }
    
    return _load;
}();

load_once("antlr4/index.js", log);
load_once("arithmeticLexer.js", log);
load_once("arithmeticListener.js", log);
load_once("arithmeticParser.js", log);

var ruleListener = function() {
    arithmeticListener.call(this);
    return this;
};
        
ruleListener.prototype.tokenMap = {};

// Enter a parse tree produced by arithmeticParser#equation.
ruleListener.prototype = Object.create(arithmeticListener.prototype);
ruleListener.prototype.constructor = ruleListener;

ruleListener.prototype.exitEquation = function(ctx) {
	//var rule = parser.getRuleNames()[ctx.getRuleIndex()];
	//var value = ctx.getText();
	//this.tokenMap[rule] = value;
        print("Exit equation");
};

function parse(toParse) {
    var input = new antlr4.InputStream(toParse);
    var lexer = new arithmeticLexer(input);
    //lexer.removeErrorListeners();
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new arithmeticParser(tokens);
    parser.buildParseTrees = true;
    //parser.removeErrorListeners();
    var tree = parser.equation();
    var printer = new ruleListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree);
    //var walker = new ParseTreeWalker();
    //var l = new ArithmeticListener();
    //walker.walk(l, tree);
}

var exp = "a = 4 + 5;";
parse(exp);