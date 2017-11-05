/*
    로딩 아이콘 기능 사용
*/
/* 페이지 생성 전에 로딩 아이콘 동작을 시작합니다. */
$(document).on('pagebeforecreate', '[data-role="page"]', function(){     
    loading('show', 1);
    
});

/* 페이지 생성 이 끝난 후 화면에 표시 직전에 로딩 아이콘 동작을 멈춥니다. */
$(document).on('pageshow', '[data-role="page"]', function(){  
    loading('hide', 1000);
});

/* 매개변수로 전달받은 시간만큼 로딩 아이콘을 동작합니다.  */
function loading(showOrHide, delay) {
    setTimeout(function(){
        $.mobile.loading(showOrHide);
    }, delay);
}