//var x = document.getElementById("weather-test");
var y = document.getElementById("today-weather");
var currlat, currlon;

/* #weather_page에서 날씨 정보 표시를 위해 JSON 읽기 */
$(document).on('pageinit', '#weather_page', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currlat = position.coords.latitude;
            currlon = position.coords.longitude;

            //x.innerHTML = "Latitude: " + currlat + "<br>Longitude: " + currlon;

            var h_url = 'http://apis.skplanetx.com/weather/current/hourly',
                version = '?version=1',
                lat = '&lat=' + currlat,
                lon = '&lon=' + currlon;

            //y.innerHTML = url;

            //Setup headers here and than call ajax
            $.ajaxSetup({
                headers: { 'appKey': '1eeb8f5e-e22e-3813-958b-8c989dae028c' }
            });

            /* JSON 포맷으로 데이터 읽음*/
            $.ajax({
                url: h_url + version + lat + lon,
                dataType: 'json',
                async: true,
                success: function (result) {
                    //y.innerHTML = "json success";
                    //y.innerHTML = "json " + JSON.stringify(result);
                    ajax_data.parseJSON_H(result);

                    var day3_url = 'http://apis.skplanetx.com/weather/summary'

                    $.ajaxSetup({
                        headers: { 'appKey': '1eeb8f5e-e22e-3813-958b-8c989dae028c' }
                    });

                    /* JSON 포맷으로 데이터 읽음*/
                    $.ajax({
                        url: day3_url + version + lat + lon,
                        dataType: 'json',
                        async: true,
                        success: function (result) {
                            ajax_data.parseJSON_SUM(result);
                        },
                        error: function (request, error) {
                            //y.innerHTML = '네트워크 오류가 발생했습니다!';
                        }
                    });
                },
                error: function (request, error) {
                    //y.innerHTML = '네트워크 오류가 발생했습니다!';
                }
            });
        });
    }
    else { x.innerHTML = "Geolocation is not supported by this browser."; }
});

/* 읽어온 JSON 값을 동적으로 태그와 데이터바인딩 생성 */
var ajax_data = {
    parseJSON_H: function (result) {
        var city = JSON.stringify(result['weather']['hourly'][0]['grid']['city']);
        city = city.substring(1, city.length - 1);
        var county = JSON.stringify(result['weather']['hourly'][0]['grid']['county']);
        county = county.substring(1, county.length - 1);
        var village = JSON.stringify(result['weather']['hourly'][0]['grid']['village']);
        village = village.substring(1, village.length - 1);

        var sky_code = JSON.stringify(result['weather']['hourly'][0]['sky']['code']);
        sky_code = sky_code.substring(1, sky_code.length - 1);

        var sky_code_img;

        switch (sky_code.substring(5)) {
            case '00': sky_code_img = '38.png'; break;
            case '01': sky_code_img = '01.png'; break;
            case '02': sky_code_img = '02.png'; break;
            case '03': sky_code_img = '03.png'; break;
            case '04': sky_code_img = '12.png'; break;
            case '05': sky_code_img = '13.png'; break;
            case '06': sky_code_img = '14.png'; break;
            case '07': sky_code_img = '18.png'; break;
            case '08': sky_code_img = '21.png'; break;
            case '09': sky_code_img = '32.png'; break;
            case '10': sky_code_img = '04.png'; break;
            case '11': sky_code_img = '29.png'; break;
            case '12': sky_code_img = '26.png'; break;
            case '13': sky_code_img = '27.png'; break;
            case '14': sky_code_img = '28.png';
        }

        var sky_name = JSON.stringify(result['weather']['hourly'][0]['sky']['name']);
        sky_name = sky_name.substring(1, sky_name.length - 1);

        var temp_tc = JSON.stringify(result['weather']['hourly'][0]['temperature']['tc']);
        temp_tc = temp_tc.substring(1, temp_tc.length - 4);
        var temp_tmax = JSON.stringify(result['weather']['hourly'][0]['temperature']['tmax']);
        temp_tmax = temp_tmax.substring(1, temp_tmax.length - 4);
        var temp_tmin = JSON.stringify(result['weather']['hourly'][0]['temperature']['tmin']);
        temp_tmin = temp_tmin.substring(1, temp_tmin.length - 4);
        // weatherInfo.weather = JSON.stringify(JSON.parse(weatherInfo.result).weather);

        //y.innerHTML = "지역 = " + city + " 시군구 = " + county + " 스카이 코드 이미지 = " + sky_code
        //  + '<img  src="img/weather_icons/' + sky_code_img + '"' + ' class="ui-thumbnail ui-thumbnail-circular"/>';

        $('#today-forecast').append(
            '<div class="card-title has-supporting-text"><h2 style="text-align: center; max-width: 100%;" class="card-primary-title">' + village + '</h2>' +
            '<h3 style="text-align: center; color: white!important; max-width: 100%;" class="card-subtitle">' + city + ", " + county + '</h3></div>' +
            '<div style="height: 50%;" class="card-media"><img src="img/weather_icons/' + sky_code_img + '" style="width: auto; margin: auto;"></div>' +
            '<div class="card-title has-supporting-text"><h5 style="color: white!important; font-size: 16px; margin: 5px, 0px;" class="card-subtitle">' + sky_name + '</h5>' +
            '<h1 style="font-size: 30px;" class="card-primary-title">' + temp_tc + '&deg;C</h1>' +
            '<p style="margin: 5px;"><i class="zmdi zmdi-upload"></i>&nbsp;' + temp_tmax + '&deg;C' + '&nbsp;&nbsp;&nbsp;' +
            '<i class="zmdi zmdi-download"></i>&nbsp;' + temp_tmin + '&deg;C</p></div>');
        /*
        $.each(result.weather.minutely, function (i, row) {
            console.log(JSON.stringify(row.sation.name));
            $('#weather-json-test').append(
                '<a href="" data-id="' + row.station.id + '">' +
                '<h2>' + row.station.name + '</h2>' +
                '<p>날씨:' + row.sky.name + '</p></a>');
        });
        $('#movie-list').listview('refresh');
        */
    },

    parseJSON_SUM: function (result) {
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] = "일요일";
        weekday[1] = "월요일";
        weekday[2] = "화요일";
        weekday[3] = "수요일";
        weekday[4] = "목요일";
        weekday[5] = "금요일";
        weekday[6] = "토요일";

        var yesterday_day = weekday[d.getDay() - 1];
        var today_day = weekday[d.getDay()];
        var tomorrow_day = weekday[d.getDay() + 1];
        var dayAfterTomorrow_day = weekday[d.getDay() + 2];

        var yst_sky_code = JSON.stringify(result['weather']['summary'][0]['yesterday']['sky']['code']);
        yst_sky_code = yst_sky_code.substring(1, yst_sky_code.length - 1);

        var yst_sky_code_img = getSkyImage(yst_sky_code);

        var yst_temp_tmax = JSON.stringify(result['weather']['summary'][0]['yesterday']['temperature']['tmax']);
        yst_temp_tmax = yst_temp_tmax.substring(1, yst_temp_tmax.length - 4);
        var yst_temp_tmin = JSON.stringify(result['weather']['summary'][0]['yesterday']['temperature']['tmin']);
        yst_temp_tmin = yst_temp_tmin.substring(1, yst_temp_tmin.length - 4);

        $('#yesterday-weather').append(
            '<div class="card-media"><img src="img/weather_icons/' + yst_sky_code_img + '"></div>' +
            '<div class="card-title"><h3 class="card-primary-title">' + yesterday_day + '</h3>' +
            '<p style="margin: 5px; color: white!important;" class="card-subtitle"><i class="zmdi zmdi-upload"></i>&nbsp;' + yst_temp_tmax + '&deg;C' + '&nbsp;&nbsp;&nbsp;' +
            '<i class="zmdi zmdi-download"></i>&nbsp;' + yst_temp_tmin + '&deg;C</p></div>');


        var t_sky_code = JSON.stringify(result['weather']['summary'][0]['today']['sky']['code']);
        t_sky_code = t_sky_code.substring(1, t_sky_code.length - 1);

        var t_sky_code_img = getSkyImage(t_sky_code);

        var t_temp_tmax = JSON.stringify(result['weather']['summary'][0]['today']['temperature']['tmax']);
        t_temp_tmax = t_temp_tmax.substring(1, t_temp_tmax.length - 4);
        var t_temp_tmin = JSON.stringify(result['weather']['summary'][0]['today']['temperature']['tmin']);
        t_temp_tmin = t_temp_tmin.substring(1, t_temp_tmin.length - 4);

        $('#today-weather').append(
            '<div class="card-media"><img src="img/weather_icons/' + t_sky_code_img + '"></div>' +
            '<div class="card-title"><h3 class="card-primary-title">오늘 (' + today_day + ')</h3>' +
            '<p style="margin: 5px; color: white!important;" class="card-subtitle"><i class="zmdi zmdi-upload"></i>&nbsp;' + t_temp_tmax + '&deg;C' + '&nbsp;&nbsp;&nbsp;' +
            '<i class="zmdi zmdi-download"></i>&nbsp;' + t_temp_tmin + '&deg;C</p></div>');


        var tmr_sky_code = JSON.stringify(result['weather']['summary'][0]['tomorrow']['sky']['code']);
        tmr_sky_code = tmr_sky_code.substring(1, tmr_sky_code.length - 1);

        var tmr_sky_code_img = getSkyImage(tmr_sky_code);

        var tmr_temp_tmax = JSON.stringify(result['weather']['summary'][0]['tomorrow']['temperature']['tmax']);
        tmr_temp_tmax = tmr_temp_tmax.substring(1, tmr_temp_tmax.length - 4);
        var tmr_temp_tmin = JSON.stringify(result['weather']['summary'][0]['tomorrow']['temperature']['tmin']);
        tmr_temp_tmin = tmr_temp_tmin.substring(1, tmr_temp_tmin.length - 4);

        $('#tomorrow-weather').append(
            '<div class="card-media"><img src="img/weather_icons/' + tmr_sky_code_img + '"></div>' +
            '<div class="card-title"><h3 class="card-primary-title">' + tomorrow_day + '</h3>' +
            '<p style="margin: 5px; color: white!important;" class="card-subtitle"><i class="zmdi zmdi-upload"></i>&nbsp;' + tmr_temp_tmax + '&deg;C' + '&nbsp;&nbsp;&nbsp;' +
            '<i class="zmdi zmdi-download"></i>&nbsp;' + tmr_temp_tmin + '&deg;C</p></div>');


        var dat_sky_code = JSON.stringify(result['weather']['summary'][0]['dayAfterTomorrow']['sky']['code']);
        dat_sky_code = dat_sky_code.substring(1, dat_sky_code.length - 1);

        var dat_sky_code_img = getSkyImage(dat_sky_code);

        var dat_temp_tmax = JSON.stringify(result['weather']['summary'][0]['dayAfterTomorrow']['temperature']['tmax']);
        dat_temp_tmax = dat_temp_tmax.substring(1, dat_temp_tmax.length - 4);
        var dat_temp_tmin = JSON.stringify(result['weather']['summary'][0]['dayAfterTomorrow']['temperature']['tmin']);
        dat_temp_tmin = dat_temp_tmin.substring(1, dat_temp_tmin.length - 4);

        $('#dayAfterTomorrow-weather').append(
            '<div class="card-media"><img src="img/weather_icons/' + dat_sky_code_img + '"></div>' +
            '<div class="card-title"><h3 class="card-primary-title">' + dayAfterTomorrow_day + '</h3>' +
            '<p style="margin: 5px; color: white!important;" class="card-subtitle"><i class="zmdi zmdi-upload"></i>&nbsp;' + dat_temp_tmax + '&deg;C' + '&nbsp;&nbsp;&nbsp;' +
            '<i class="zmdi zmdi-download"></i>&nbsp;' + dat_temp_tmin + '&deg;C</p></div>');
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

function getSkyImage(skyCode) {
    var skyCodeImg;

    switch (skyCode.substring(5)) {
        case '00': skyCodeImg = '38.png'; break;
        case '01': skyCodeImg = '01.png'; break;
        case '02': skyCodeImg = '02.png'; break;
        case '03': skyCodeImg = '03.png'; break;
        case '04': skyCodeImg = '12.png'; break;
        case '05': skyCodeImg = '13.png'; break;
        case '06': skyCodeImg = '14.png'; break;
        case '07': skyCodeImg = '18.png'; break;
        case '08': skyCodeImg = '21.png'; break;
        case '09': skyCodeImg = '32.png'; break;
        case '10': skyCodeImg = '04.png'; break;
        case '11': skyCodeImg = '29.png'; break;
        case '12': skyCodeImg = '26.png'; break;
        case '13': skyCodeImg = '27.png'; break;
        case '14': skyCodeImg = '28.png';
    }

    return skyCodeImg;
}