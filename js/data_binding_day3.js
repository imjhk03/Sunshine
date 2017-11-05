var x = document.getElementById("weather-test");
var y = document.getElementById("today-weather");

var currlat, currlon;

/* #page_movie에서 영화 정보 표시를 위해 JSON 읽기 */

$(document).on('pageinit', '#weather_page', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currlat = position.coords.latitude;
            currlon = position.coords.longitude;

            //x.innerHTML = "Latitude: " + currlat + "<br>Longitude: " + currlon;

            var day3_url = 'http://apis.skplanetx.com/weather/forecast/3days',
                version = '?version=1',
                lat = '&lat=' + currlat,
                lon = '&lon=' + currlon;

            //y.innerHTML = url;

            //Setup headers here and than call ajax
            $.ajaxSetup({
                headers: { 'appKey': 'c8c6aa51-4987-3e6e-8c1f-e28ddcdb0303' }
            });

            /* JSON 포맷으로 데이터 읽음*/
            $.ajax({
                url: day3_url + version + lat + lon,
                dataType: 'json',
                async: true,
                success: function (result) {
                    //y.innerHTML = "json success";
                    ajax_data.parseJSON_D3(result);
                },
                error: function (request, error) {
                    //y.innerHTML = '네트워크 오류가 발생했습니다!';
                }
            });
        });
    }
    else { x.innerHTML = "Geolocation is not supported by this browser."; }
});

/* #page_movie에 읽어온 JSON 값을 동적으로 태그와 데이터바인딩 생성 */
var ajax_data = {
    parseJSON_D3: function (result) {
        var city = JSON.stringify(result['weather']['forecast3days'][0]['grid']['city']);
        city = city.substring(1, city.length - 1);
        // var county = JSON.stringify(result['weather']['forecast3days'][0]['grid']['county']);
        // county = county.substring(1, county.length - 1);
        // var village = JSON.stringify(result['weather']['forecast3days'][0]['grid']['village']);
        // village = village.substring(1, village.length - 1);

        // var sky_code_4hour = JSON.stringify(result['weather']['forecast3days'][0]['fcst3hour']['dky']['code4hour']);
        // sky_code_4hour = sky_code_4hour.substring(1, sky_code_4hour.length - 1);

        // var sky_code_img;

        // switch (sky_code_4hour.substring(5)) {
        //     case '00': sky_code_img = '38.png'; break;
        //     case '01': sky_code_img = '01.png'; break;
        //     case '02': sky_code_img = '02.png'; break;
        //     case '03': sky_code_img = '03.png'; break;
        //     case '04': sky_code_img = '12.png'; break;
        //     case '05': sky_code_img = '13.png'; break;
        //     case '06': sky_code_img = '14.png'; break;
        //     case '07': sky_code_img = '18.png'; break;
        //     case '08': sky_code_img = '21.png'; break;
        //     case '09': sky_code_img = '32.png'; break;
        //     case '10': sky_code_img = '04.png'; break;
        //     case '11': sky_code_img = '29.png'; break;
        //     case '12': sky_code_img = '26.png'; break;
        //     case '13': sky_code_img = '27.png'; break;
        //     case '14': sky_code_img = '28.png';
        // }

        // var sky_name_4hour = JSON.stringify(result['weather']['forecast3days'][0]['fcst3hour']['dky']['name4hour']);
        // sky_name_4hour = sky_name_4hour.substring(1, sky_name_4hour.length - 1);

        // var temp_4hour = JSON.stringify(result['weather']['forecast3days'][0]['fcst3hour']['temperature']['temp4hour']);
        // temp_4hour = temp_4hour.substring(1, temp_4hour.length - 4);
        // var temp_7hour = JSON.stringify(result['weather']['forecast3days'][0]['fcst3hour']['temperature']['temp7hour']);
        // temp_7hour = temp_7hour.substring(1, temp_7hour.length - 4);
        // var temp_10hour = JSON.stringify(result['weather']['forecast3days'][0]['fcst3hour']['temperature']['temp10hour']);
        // temp_10hour = temp_10hour.substring(1, temp_10hour.length - 4);
        // var temp_13hour = JSON.stringify(result['weather']['forecast3days'][0]['fcst3hour']['temperature']['temp13hour']);
        // temp_13hour = temp_13hour.substring(1, temp_13hour.length - 4);
        // var temp_16hour = JSON.stringify(result['weather']['forecast3days'][0]['fcst3hour']['temperature']['temp16hour']);
        // temp_16hour = temp_16hour.substring(1, temp_16hour.length - 4);

        $('#day3-weather-listview').append(
            '<li class="ui-li-has-thumb"><h3>' + '4시간 뒤' + '</h3><p>' + city + '</p></li>');
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currlat = position.coords.latitude;
            currlon = position.coords.longitude;

            //x.innerHTML = "Latitude: " + lat + "<br>Longitude: " + lon;
        });
    }
    else { x.innerHTML = "Geolocation is not supported by this browser."; }
}