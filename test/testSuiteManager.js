var loadModule = require("./testHelpers/moduleLoader.js").loadModule;
var should = require("should");

var suiteManagerModule = loadModule("./lib/suiteManager.js");
var suiteManager = suiteManagerModule.module.exports;

var Suite = suiteManager.Suite;
var Result = suiteManager.Result;

exports.testCreateTestResult = function (test) {
    var testResult = suiteManager.createTestResult("testName", Result.PASS);
    should.exist(testResult);
    should.equal("testName", testResult.getName());
    should.equal(Result.PASS, testResult.getResult());
    test.done();
};

exports.testCreateSuite = function (test) {
    var suite = suiteManager.createSuite("suitename");
    should.exist(suite);
    should.ok(suite instanceof Suite);
    should.equal("suitename", suite.getName());
    suite = suiteManager.createSuite("suitename", "description");
    should.exist(suite);
    should.equal("suitename", suite.getName());
    should.equal("description", suite.getDescription());
    should.equal(0, suite.getTestCount());
    should.equal(0, suite.getFailedCount());
    should.equal(0, suite.getSuccessCount());
    should.equal(0, suite.getErrorCount());
    test.done();
};

exports.testRunSuiteTest = function (test) {

    var test1 = function () {
    };

    suiteManager.runSuiteTest("Test1", "Topic1", "Suite1", test1);

    var suites = suiteManagerModule.suites;
    should.exist(suites.Suite1);
    var topic = suites.Suite1.getTopics().Topic1;
    should.exist(topic);
    var results = topic.getTestResults();

    results.length.should.equal(1);
    results[0].getName().should.equal("Test1");
    results[0].getResult().should.equal(suiteManager.Result.PASS);

    topic.getName().should.equal("Topic1");
    topic.getTestCount().should.equal(1);
    topic.getSuccessCount().should.equal(1);
    topic.getFailedCount().should.equal(0);
    topic.getErrorCount().should.equal(0);
    topic.getResult().should.equal(suiteManager.Result.PASS);

    suites.Suite1.getName().should.equal("Suite1");
    suites.Suite1.getTestCount().should.equal(1);
    suites.Suite1.getSuccessCount().should.equal(1);
    suites.Suite1.getFailedCount().should.equal(0);
    suites.Suite1.getErrorCount().should.equal(0);

    // todo add more tests in particular for multiple suites, tests and topics
    
    test.done();
};
