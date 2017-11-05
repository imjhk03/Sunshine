/*

    + JSON 데이터를 읽어 태그와 동적으로 데이터바인딩 하는 소스입니다.
    + 데이터타입은 JSONP를 사용합니다.
    + http://api.themoviedb.org에서 영화정보를 가져옵니다.

*/
/* 목록에서 사용자가 선택한 영화정보를 담는 데이터셋 */
var movieInfo = {
    id : null,
    result : null
}

/* 영화 검색 키워드를 지정합니다. */
var strSearchKeword = "Star Trek";

/* #page_movie에서 영화 정보 표시를 위해 JSON 읽기 */
$(document).on('pageinit', '#movie_page', function(){      
    var url = 'https://api.themoviedb.org/3/search/movie',
        mode = '?query=',
        key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919',
        movieName = '&query='+encodeURI(strSearchKeword);        

    /* JSON 포맷으로 데이터 읽음*/
    $.ajax({
        url: url + mode + key + movieName ,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajax_data.parseJSONP(result);
        },
        error: function (request,error) {
            alert('네트워크 오류가 발생했습니다!');
        }
    });  
});

/* #page_movie에 읽어온 JSON 값을 동적으로 태그와 데이터바인딩 생성 */
var ajax_data = {
    parseJSONP:function(result){  
        movieInfo.result = result.results;
        
        $.each(result.results, function(i, row) {
            //console.log(JSON.stringify(row.poster_path));
            if (row.poster_path != null ) {
                $('#movie-list').append(
                    '<li><a href="" data-id="' + row.id + '">' + 
                    '<img  src="https://image.tmdb.org/t/p/w92'+row.poster_path + '"' + 'class="ui-thumbnail ui-thumbnail-circular"/>' + 
                    '<h2>' + row.title + '</h2>' + 
                    '<p>별점:' + row.vote_average + '</p></a></li>');
            }
        });
        $('#movie-list').listview('refresh');
    }
}

/* #page_movie_detail에서 영화 상세 정보 표시 */
$(document).on('pagebeforeshow', '#movie_detail_page', function(){      

    $('#movie-data').empty();
    $.each(movieInfo.result, function(i, row) {
        
        /* 사용자가 선택한 영화와 일치하는 ID를 표시  */
        /* movieInfo에는 클릭할 당시 선택한 영화의 정보가 담김 */
        if(row.id == movieInfo.id) {

            /* 카드 UI로 데이터 바인딩 */
            var strResultCard = 
                "<div class='nd2-card card-media-right card-media-medium'>" +
                   "<div class='card-media'>" +
                      "<img src='" + "https://image.tmdb.org/t/p/w92" +row.poster_path + "'>" +
                   "</div>" +                            
                   "<div class='card-title has-supporting-text'>" + 
                      "<h3 class='card-primary-title'>" +row.original_title +"</h3>" +
                      "<h5 class='card-subtitle'>" + row.release_date + "</h5>" +
                   "</div>" +
                   "<div class='card-supporting-text has-action has-title'>" +
                      row.overview +
                   "</div>" +
                   "<div class='card-action'>" +
                        "<div class='row between-xs'>" + 
                            "<div class='col-xs-12'>" +
                                "<div class='box'>" +
                                    "별점점수 : " + row.vote_average + 
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>";
            $('#movie-data').append(strResultCard);
        }
    }); 

});      