const AqalityAPI = require('./tests/helpers/aquality.api')
const Status = { PASSED: 2, INPROGRESS: 4, FAILED: 1, PENDING: 5 };

class AqualityReporter {

  /**
   * Params for reporter
   * @param {token, project_id, api_url, suite_name, testrun_id, execution_environment} config 
   */
  constructor(config) {
    this.aqalityAPI = new AqalityAPI(config.token, config.project_id, config.api_url)
    this.config = config;
    this.testrun = {
      project_id: this.config.project_id,
      execution_environment: this.config.execution_environment,
    }
    if (this.config.testrun_id) {
      this.existingTestRun = true;
      this.testrun.id = this.config.testrun_id
      this.testrun = this.aqalityAPI.getTestRun({ id: this.testrun.id, project_id: this.config.project_id })
      this.suite = { id: this.testrun.test_suite_id }
    }
  }

  jasmineStarted() {
    if (!this.existingTestRun) {
      this.suite = this.aqalityAPI.createOrUpdateSuite({ name: this.config.suite_name, project_id: this.config.project_id });
      this.testrun.test_suite_id = this.suite.id;
      this.testrun.start_time = new Date()
      this.testrun = this.aqalityAPI.createOrUpdateTestRun(this.testrun)
    }
  }

  jasmineDone() {
    if (!this.existingTestRun) {
      this.testrun.finish_time = new Date();
      this.aqalityAPI.createOrUpdateTestRun(this.testrun)
    }
  }

  specStarted(result) {
    try {
      this.currentTest = this.aqalityAPI.createOrUpdateTest({
        name: result.fullName,
        project_id: this.config.project_id,
        test_suite_id: this.suite.id,
        suites: [this.suite]
      })
      this.currentResult = this.aqalityAPI.createOrUpdateResult({
        project_id: this.config.project_id,
        test_id: this.currentTest.id,
        final_result_id: Status.INPROGRESS,
        test_run_id: this.testrun.id,
        start_date: new Date()
      })
    } catch (err) {
      console.log(err)
    }
  }

  specDone(result) {
    try {
      this.currentResult.final_result_id = this._getTestcaseStatus(result.status);
      if (this.currentResult.final_result_id !== Status.PASSED) {
        const error = this._getTestcaseError(result);
        this.currentResult.fail_reason = error.message;
        this.currentResult.log = error.stack;
      }
      this.currentResult.finish_date = new Date();
      this.currentResult = this.aqalityAPI.createOrUpdateResult(this.currentResult)
    } catch (err) {
      console.log(err)
    }
  }

  _getTestcaseStatus(status) {
    if (status === 'disabled' || status === 'pending') {
      return Status.PENDING;
    } else if (status === 'passed') {
      return Status.PASSED;
    } else {
      return Status.FAILED;
    }
  };

  _getTestcaseError(result) {
    if (result.status === 'disabled') {
      return {
        message: 'This test was ignored',
        stack: ''
      };
    } else if (result.status === 'pending') {
      return {
        message: result.pendingReason,
        stack: ''
      };
    }
    var failure = result.failedExpectations ? result.failedExpectations[0] : null;
    if (failure) {
      return {
        message: failure.message,
        stack: failure.stack
      };
    }
  };
}

module.exports = AqualityReporter;
