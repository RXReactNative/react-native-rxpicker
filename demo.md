# RXPicker
选择库


## support
#### react-native
#### react-native-web

# demo
#### iOS >=10
#### android

# app
```sh
## 要素一
# 浏览器打开 http://localhost:8081/debugger-ui/

## 要素二
#### iOS
# 1
# sh script/iosDebug.sh # iOS 项目编译 前会自动给 react-native 进行编译

# 2 vscode run -> Debug ios
# 3 run ios product

#### Android
# 1 Mac/Linux
sh script/androidDebug.sh

# 或者 window -> VSCode
powershell script/androidDebug.sh
# 或者 window -> Git Base Here
sh script/androidDebug.sh

# 2 vscode run -> Debug Android
# 3 run Android product
```

# web
```sh
  # test
  npm run dev

  # dev - build
  npm run devbuild

  # build
  npm run build
```

## iOS Cocoapods
```sh
# rvm install
# https://www.jianshu.com/p/9c9f8d4867eb

# Cocoapods install
# https://www.jianshu.com/p/9e4e36ba8574
```

### android
> error `Please select Android SDK`
- https://www.cnblogs.com/android-deli/p/9684805.html


### babel
https://zzz.buzz/zh/2017/12/30/babel-source-maps/


### nginx 本地配置
```conf
  # window
  server {
    listen 8054;
    location / {
      root   D:/react-native-rxpicker/docs;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }
  }

  # linux/mac 同一个配置
  server {
    listen 8054;
    location / {
      root   /user/username/react-native-rxpicker/docs;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }
  }
```