node{

    stage('SCM Checkout')
    {
        git url: 'https://github.com/raquelbatista/PD_CD.git'
    }
    
    
    stage('Run Docker Compose File')
    {
        sh 'sudo docker-compose build'
        sh 'sudo docker-compose up -d'
    }
  stage('PUSH image to Docker Hub')
    {
      /* withCredentials([string(credentialsId: 'DockerHubPassword', variable: 'DHPWD')]) 
        {
            sh "docker login -u upasanatestdocker -p ${DHPWD}"
        }
        sh 'docker push vardhanns/phpmysql_app'
        */
        //docker.withRegistry( 'https://registry.hub.docker.com', 'DockerHubPassword' ) {
             
             sh 'sudo docker login -u "raquelbatista" -p "pd_20202021" docker.io'
             //sh 'sudo docker push upasanatestdocker/mysql'
             //sh 'sudo docker push upasanatestdocker/job1_web1.0'
             sh 'sudo docker push raquelbatista/myappimage:1.0'
            // sh 'docker push upasanatestdocker/mysql'
          
    }
    stage('Execute ansible')
    {
        steps{
            ansiblePlaybook credentialsId: 'privatekey_', disableHostKeyChecking: true, installation: 'ansible2', inventory: 'hosts.inv', playbook: 'install_application.yml'
        }
    }
}
