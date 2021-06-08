#!/bin/bash

APP_NAME=${APP_NAME:-syzygy}

start () {
  export ENV=${ENV:-'local'}
  npm start
}

build_push_aws () {

    AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-$1}
    ECR_REGION=${ECR_REGION:-$2}
    TAG=${TAG:-$3}

    if [[ -z ${AWS_ACCOUNT_ID} ]] || [[ -z ${ECR_REGION} ]] || [[ -z ${TAG} ]] ; then
        echo 'missing arguments'
        exit 1
    fi
    ECR_NAME=${AWS_ACCOUNT_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com

    aws ecr get-login-password --region ${ECR_REGION} | docker login --username AWS --password-stdin ${ECR_NAME}

    docker build -t ${ECR_NAME}/beee-${APP_NAME}:${TAG} --file=./docker/app/Dockerfile .

    docker push ${ECR_NAME}/beee-${APP_NAME}:${TAG}
}


deploy_aws () {
    AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-$1}
    ECR_REGION=${ECR_REGION:-$2}
    TAG=${TAG:-$3}
    NODESELECTOR=${NODESELECTOR:-$4}
    APP_ENV=${APP_ENV:-$5}

    if [[ -z ${AWS_ACCOUNT_ID} ]] || [[ -z ${ECR_REGION} ]] || [[ -z ${TAG} ]] || [[ -z ${NODESELECTOR} ]] || [[ -z ${APP_ENV} ]] ; then
        echo 'missing arguments'
        exit 1
    fi
    ECR_NAME=${AWS_ACCOUNT_ID}.dkr.ecr.${ECR_REGION}.amazonaws.com

    case $APP_ENV in
        dev | production)
            ENVVARS_ENV=$APP_ENV
            ;;
        *)
            echo 'allowed values for $APP_ENV: [dev|production]'
            exit 1
            ;;
    esac

    MANIFESTS=$(helm template $APP_NAME ./helm/hx-${APP_NAME} \
        --set nodeSelector."eks\.amazonaws\.com/nodegroup"=$NODESELECTOR \
        --set image.tag=$TAG --set image.repository=${ECR_NAME}/beee-${APP_NAME} \
        --set envVars.ENV=$ENVVARS_ENV)
    
    echo "$MANIFESTS"
    echo
    read -p "Do you want to deploy (Y/N)? " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "$MANIFESTS" | kubectl apply -f -
    fi
}


$*