pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
             script {
            def packageJSON = readJSON file: 'package.json'
            def packageJSONVersion = packageJSON.version
            echo "${packageJSONVersion}"
         }
         }
        }
    }
}