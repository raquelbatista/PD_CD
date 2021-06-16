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
             sh 'sudo docker login -u "raquelbatista" -p "pd_20202021" docker.io'
           
             sh 'sudo docker push raquelbatista/myappimage:3.0'
         
          
    }
    stage('Execute ansible')
    {
        ansiblePlaybook credentialsId: 'private_key', disableHostKeyChecking: true, installation: 'ansible2', inventory: 'hosts.inv', playbook: 'install_application.yml'
        
    }
}
