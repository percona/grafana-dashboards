library changelog: false, identifier: 'lib@master', retriever: modernSCM([
    $class: 'GitSCMSource',
    remote: 'https://github.com/Percona-Lab/jenkins-pipelines.git'
]) _

pipeline {
    agent {
        label 'large-amazon'
    }
    environment {
        MYSQL_HOST=credentials('mysql-remote-host')
        MYSQL_USER=credentials('mysql-remote-user')
        MYSQL_PASSWORD=credentials('mysql-remote-password')
        AWS_MYSQL_USER=credentials('pmm-dev-mysql-remote-user')
        AWS_MYSQL_PASSWORD=credentials('pmm-dev-remote-password')
        AWS_MYSQL57_HOST=credentials('pmm-dev-mysql57-remote-host')
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
                       export NVM_DIR=/usr/local/nvm
                       [[ ! -d \${NVM_DIR} ]] && sudo mkdir -p \${NVM_DIR}
                       if [[ ! -r \${NVM_DIR}/nvm.sh ]]; then
                          [ -s "\${NVM_DIR}/nvm.sh" ] && source "\${NVM_DIR}/nvm.sh"
                          curl -o - https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | sudo -E bash
                       fi

                       sudo -E bash -c \"source \${NVM_DIR}/nvm.sh; nvm install ${params.NODEJS_VERSION}\"
                       sudo -E bash -c \"source \${NVM_DIR}/nvm.sh; nvm use ${params.NODEJS_VERSION}\"
                    """
                }
                slackSend channel: '#pmm-ci', color: '#FFFF00', message: "[${JOB_NAME}]: tests started - ${BUILD_URL}"
            }
        }
        stage('Build') {
            steps {
                sh """
                    sg docker -c "
                        source \"/usr/local/nvm/nvm.sh\"

                        make release
                    "
                """
            }
        }
        stage('Tests') {
            parallel {
                stage('e2e tests') {
                    steps {
                        sh """
                            sg docker -c "
                                export CHROME_VERSION=${params.CHROME_VERSION}
                                source \"/usr/local/nvm/nvm.sh\"

                                make e2e
                            "
                        """
                    }
                }
                stage('Generate code coverage') {
                    steps {
                        withCredentials([string(credentialsId: 'CODECOV_GRAFANA_DASHBOARDS_TOKEN', variable: 'CODECOV_GRAFANA_DASHBOARDS_TOKEN')]) {
                            sh """
                                sg docker -c "
                                    export CODECOV_TOKEN=\"${CODECOV_GRAFANA_DASHBOARDS_TOKEN}\"
                                    source \"/usr/local/nvm/nvm.sh\"

                                    make generate_coverage
                                "
                            """
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            sh '''
               sg docker -c "make docker_clean"
               sudo chmod 755 -R pmm-app/tests/
            '''
            script {
                if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
                    slackSend channel: '#pmm-ci', color: '#00FF00', message: "[${JOB_NAME}]: build finished"
                } else {
                    slackSend channel: '#pmm-ci', color: '#FF0000', message: "[${JOB_NAME}]: build ${currentBuild.result}"
                    archiveArtifacts 'pmm-app/video/*.mp4'
                    onlyIfSuccessful: false
                    archiveArtifacts artifacts: 'pmm-app/tests/output/parallel_chunk*/*.png'
                }
            }
            deleteDir()
        }
    }
}
