#!/usr/bin/env bash
# 
# 1、Standard Variables:
#
#   DP (DEPLOY_ENV)        sit/uat/...!
# 
#  默认不推，git commit信息后跟 ">sit" 即可推sit环境
# 
DEPLOY_ENV=$DP
APP_NAME="app-param-home"

envStr=`git log --pretty=format:%s -1`
echo "commitMsg: $envStr"
echo "DEPLOY_ENV: $DP"

if [[ "$envStr" =~ ">sit" ]]; then
  DEPLOY_ENV="sit"
elif [[ "$envStr" =~ ">uat" ]]; then
  DEPLOY_ENV="uat"
fi

TIP="192.168.35.181"
if [ "$DEPLOY_ENV" = "sit" ]; then
  TIP="192.168.35.181"
elif [ "$DEPLOY_ENV" = "uat" ]; then
  TIP="192.168.35.183"
elif [ "$DEPLOY_ENV" = "pre" ]; then
  TIP="10.10.1.61"
else
  echo "pls assign the deploy ENV: sit/uat..."
  exit 0
fi

COMMAND=$1
if [ "$COMMAND" = "" ]; then
  echo "pls assign the stage COMMAND: setup/build/deploy"
  exit 1
fi

function setupFunc() {
    yarn config set ignore-engines true
    yarn install --registry http://registry.paramcloud.cn/
}

function buildFunc() {
    echo running build $DEPLOY_ENV $APP_NAME
    yarn build:${DEPLOY_ENV}
}

function deployFunc() {
    echo running deploy $DEPLOY_ENV $APP_NAME
    if [ "$DEPLOY_ENV" = "pre" ]; then
      rsync -avz --exclude "static/config.prod.js" ./dist/ root@$TIP:/www/app/nginx/pre/$APP_NAME
    else
      #排除本地配置文件
      #传输时-z压缩文件
      rsync -avz --exclude "static/config.prod.js" ./dist/ root@$TIP:/usr/share/ngin3rd/html/$APP_NAME
    fi
}


case $COMMAND in

(setup)
    setupFunc
  ;;


(build)
    buildFunc
  ;;

(deploy)
    deployFunc
  ;;

(*)
  echo "pls assign the args[0]: build or deploy"
  exit 1
  ;;
esac



# --END LINE -- THE LAST LINE --勿在下方添加