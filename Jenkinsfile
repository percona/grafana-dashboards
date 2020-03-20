library changelog: false, identifier: 'lib@master', retriever: modernSCM([
    $class: 'GitSCMSource',
    remote: 'https://github.com/Percona-Lab/jenkins-pipelines.git'
]) _

pipeline {
    agent {
        label 'large-amazon'
    }
    parameters {
        choice(
            choices: [ 'test', 'e2e' ],
            description: 'Select test to run',
            name: 'RUN_TEST')
        choice(
            choices: [ '80.0' ],
            description: 'Google Chrome version',
            name: 'CHROME_VERSION')
        choice(
            choices: [ '12.14' ],
            description: 'Node.js version',
            name: 'NODEJS_VERSION')
    }
    stages {
        stage('Prepare') {
            steps {
                installDocker()
                withCredentials([usernamePassword(credentialsId: 'hub.docker.com', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh """
                        sg docker -c "
                            docker login -u "${USER}" -p "${PASS}"
                        "
                    """
                    sh '''
                        if [[ ! -x $(command -v docker-compose) ]]; then
                            sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
                            sudo chmod +x /usr/local/bin/docker-compose
                            sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
                            sudo docker-compose --version
                        fi
                    '''
                    sh """
                        if [[ ! -x \${HOME}/.nvm/nvm.sh ]]; then
                            curl -o - https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
                            export NVM_DIR="\${HOME}/.nvm"
                            [ -s "\${NVM_DIR}/nvm.sh" ] && source "\${NVM_DIR}/nvm.sh"
                            nvm install ${params.NODEJS_VERSION}
                            nvm use ${params.NODEJS_VERSION}
                        fi
                    """
                }
                // slackSend channel: '#pmm-ci', color: '#FFFF00', message: "[${JOB_NAME}]: build started - ${BUILD_URL}"
            }
        }
        stage('UI tests') {
            steps {
                sh """
                    sg docker -c "
                        export CHROME_VERSION=${params.CHROME_VERSION}
                        export NVM_DIR="\${HOME}/.nvm"
                        [ -s "\${NVM_DIR}/nvm.sh" ] && source "\${NVM_DIR}/nvm.sh"
                        nvm use ${params.NODEJS_VERSION}
                        make ${params.RUN_TEST}
                    "
                """
                // stash includes: 'results/docker/TAG', name: 'IMAGE'
                // archiveArtifacts 'results/docker/TAG'
            }
        }
    }
    post {
        always {
            script {
                if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
                    // slackSend channel: '#pmm-ci', color: '#00FF00', message: "[${JOB_NAME}]: build finished - ${IMAGE}"
                } else {
                    // slackSend channel: '#pmm-ci', color: '#FF0000', message: "[${JOB_NAME}]: build ${currentBuild.result}"
                }
            }
            deleteDir()
        }
    }
}
