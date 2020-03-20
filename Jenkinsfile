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
        def files = findFiles(glob: 'spec*.js')
        for(File file : files){
            echo file.getAbsoluteFile()
        }
    }
    stage('Run Tests') {
        script {

            sh "curl --header \"Content-Type:application/json\" \
                        --request POST \
                        --data '{  \"arguments\": \"-- --params.suite_name=\"All\" --params.testrun_id=308 --params.token=\"7aed6645-857f-4e0e-b2af-5cea44a001681570005255102\" --specs=\"tests/scenarios/uiTests/smoke/spec2.js\"\"}' \
                        https://uc2duney9k.execute-api.us-east-1.amazonaws.com/default/ExecuteTests"
        }
    }
}
