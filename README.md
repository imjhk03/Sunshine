# Sunshine
간단하게 날씨를 알려주는 하이브리드 앱 

기간 : 2017.06.07 - 2017.06.21

구분 : 개인 프로젝트

구현 목적 : 하이브리드앱 공부하면서 배웠던 기술을 이용하여 현재 위치의 날씨와 어제, 내일, 모레의 날씨를 보여주는 앱을 개발했습니다.

기술 설명 :
- JQuery Mobile용 멀티리얼 디자인 테마인 NativeDroid2를 사용하여 안드로이드용 모던한 디자인앱을 구현했습니다.
- SK Planet Weather API를 사용하여 JSON을 파싱하고 데이터 바인딩하여 사용했습니다.
- Google Maps 이용하여 현재 위치 정보를 찾게 하였습니다.

구현 기술 :
- 하나의 index.html 파일만 구성되게 하여 한 화면에서 정보를 다 보여줄 수 있게 했습니다.
- data_binding.js 파일에서 날씨 API JSON을 파싱하고 필요한 데이터만 추출하여 화면에 보이게 구현했습니다.
- Google Maps를 이용하여 현재 위치를 찾는 getLocation 함수를 구현했습니다.
- getSkyImage 함수를 이용하여 날씨 코드에 따른 날씨 아이콘을 지정하는 함수를 구현했습니다.

주의 사항 : html 파일들만 있으며, phonegap을 이용하여 안드로이드앱 또는 아이폰 앱으로 변환해야 합니다.

![ScreenShot](https://user-images.githubusercontent.com/28954046/32413972-c2e55bdc-c25f-11e7-97b7-62ad74993053.png)
