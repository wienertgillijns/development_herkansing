pipeline {
    agent any

    stages {
        stage('nodeversion') {
            steps {
             script {
            def packageJSON = readJSON file: 'package.json'
            def packageJSONVersion = packageJSON.version
            echo "${packageJSONVersion}"
         }
         }
        }
        stage('build') {
            steps {
                sh 'docker build -t started .'
            }
        }

    }
}