pipeline {
    agent {
        docker {
            image 'docker:27-cli'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node.js') {
            steps {
                sh '''
                    apk add --no-cache nodejs npm
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker --version'
                sh 'docker build -t osamaahmadkhan/devops_nodejs_project:latest .'
            }
        }
    }
}