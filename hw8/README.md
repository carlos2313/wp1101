# 110-1-Web-HW8
想提醒一下前端若沒有回應時可能是因為前端開啟時後端還沒開好，重新整理就好了。
這次的作業進階部分的說明如下:
一開始會進入登入或註冊介面，可以藉由tab切換，而帳號的註冊有限制，用戶名不能一樣。

登入時的密碼是在frontend/src/Containers/SignIn.js中藉由AES加密送到後端，而backend/server.js在收到訊息，還原後再以上課講的bcrypt加密與db中的資料作比對，一致才可登入。

登入後可以藉由'+'號新增對話框來開始聊天(也能和自己聊)，但前提是此用戶必須存在(打無人使用的用戶名會出現error)，之後就能開始聊天了。

此外，這次也令網頁能記住登入狀態，若在登入狀態下關閉視窗，下次再開啟時就不用登入了，而登出按鈕則在原本清空訊息按鈕的右上角位置。
