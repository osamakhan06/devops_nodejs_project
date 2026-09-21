pipeline {
    agent none

    stages {

        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:20-alpine'
                }
            }

            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }

        stage('Build Docker Image') {
            agent {
                docker {
                    image 'docker:27-cli'
                    args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
                }
            }

            environment {
                HOME = "${env.WORKSPACE}"
            }

            steps {
                sh 'docker --version'
                sh 'docker build -t osamaahmadkhan/devops_nodejs_project:latest .'
            }
        }

        stage('Docker Hub Login') {
            agent {
                docker {
                    image 'docker:27-cli'
                    args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
                }
            }

            environment {
                HOME = "${env.WORKSPACE}"
            }

            steps {
                withCredentials([
                    string(
                        credentialsId: 'dockerhub-token',
                        variable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                            --username "osamaahmadkhan" \
                            --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            agent {
                docker {
                    image 'docker:27-cli'
                    args '-v /var/run/docker.sock:/var/run/docker.sock -u root'
                }
            }

            environment {
                HOME = "${env.WORKSPACE}"
            }

            steps {
                sh '''
                    docker push osamaahmadkhan/devops_nodejs_project:latest
                '''
            }
        }
    }
}