pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t osamaahmadkhan/devops_nodejs_project:latest .'
            }
        }
    }
}