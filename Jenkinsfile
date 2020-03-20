node {
    stage('Checkout Code') {
        checkout([
                $class: 'GitSCM',
                branches: [[name: 'refs/heads/master']],
                doGenerateSubmoduleConfigurations: false,
                submoduleCfg: [],
                userRemoteConfigs: [[url: 'https://github.com/VladislavKostyukevich/protractor-example-aws.git']]
        ])
    }
    stage("Getting list of spec files"){
        def files = findFiles(glob: 'tests/scenarios/uiTests/smoke/spec*.js')
        for(File file : files){
            String request = "curl --header \"Content-Type:application/json\" " +
            "--request POST " +
            "--data '{  \"arguments\": \"-- --params.suite_name=\\\"All\\\" --params.testrun_id=309 --params.token=\\\"7aed6645-857f-4e0e-b2af-5cea44a001681570005255102\\\" --specs=\\\"${file.path}\\\"\"}'" +
            "https://uc2duney9k.execute-api.us-east-1.amazonaws.com/default/ExecuteTests"
            echo request
            script { sh request }
        }
    }
}
