#!/usr/bin/env groovy

def PROJECT_ID = 'linker-testing'
def APP_NAME = 'syzygy'

podTemplate(
  name: "jenkins-syzygy-build",
  label: "jenkins-syzygy-build",
  containers: [
    // containerTemplate(name: 'jnlp', image: 'jenkins/jnlp-slave:alpine'),
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
  ],
  volumes: [
    hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock'),
  ],
  {
    node("jenkins-syzygy-build") {
      container('docker'){
        stage('Checkout') {
          def scmVars = checkout scm
          echo "GIT_COMMIT: ${scmVars.GIT_COMMIT}"
          env.GIT_COMMIT = scmVars.GIT_COMMIT
          env.IMAGE_TAG = "gcr.io/${PROJECT_ID}/beee-${APP_NAME}:${env.GIT_COMMIT}"
        }

        stage('Docker Build') {
          echo "Building docker image: ${env.IMAGE_TAG}"
          sh 'docker build -t $IMAGE_TAG --file ./docker/app/Dockerfile .'
        }

        stage('Update k8s manifests in GCS') {
          step([$class: 'ClassicUploadStep', credentialsId: 'linker-testing',  bucket: "gs://${PROJECT_ID}-kubernetes-manifests", pattern: 'docker/k8s/deployments/*.yml', pathPrefix: 'docker/k8s/'])
          step([$class: 'ClassicUploadStep', credentialsId: 'linker-testing',  bucket: "gs://${PROJECT_ID}-kubernetes-manifests", pattern: 'docker/k8s/services/*.yml', pathPrefix: 'docker/k8s/'])
        }

        stage('Image Push') {
          withCredentials([file(credentialsId: "gcr-linker-testing", variable: 'GCR_KEY')]) {
            echo "Pushing docker image to GCR: ${env.IMAGE_TAG}"
            sh "docker login -u _json_key --password-stdin https://gcr.io < ${GCR_KEY}"
            sh "docker push ${env.IMAGE_TAG}"
          }
        }
      }
    }
  }
)