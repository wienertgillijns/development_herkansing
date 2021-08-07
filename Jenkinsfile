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
        stage('run test') {
            steps {
                sh "npm run test"
            }
        }

        stage('build & run') {
            steps {
                sh "docker build -t ${packageJSONVersion} ."
                sh "docker run -dp 3000:3000 ${packageJSONVersion}"
            }
        }

    }
}