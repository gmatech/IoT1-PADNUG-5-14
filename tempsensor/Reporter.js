function Reporter() {
}

Reporter.prototype = {
    report: function() {
        //throw "Not Implemented";
        console.log('reported');
    }
}

module.exports.Reporter = Reporter;
