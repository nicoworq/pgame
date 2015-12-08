$(document).ready(function () {

    $('#btn-comenzar').click(function () {

        $('#intro-content1').fadeOut(function () {
            $('#intro-content2').fadeIn();
        });

    });




    //getTopTenScores();


});










function resetGame() {
    document.location.reload();
}





function pascalGame() {

    var __timer = null;
    var _stop = false;
    var _sec = 60;
    var _min = 0;
    var _ttime = 0;


    var boxopened = "";
    var imgopened = "";
    var count = 0;
    var found = 0;
    var score = 0;

    this.getTtime = function () {
        return _ttime;
    }

    function padZero(num) {
        return (num < 10) ? "0" + num : "" + num;
    }


    function randomizeCards() {
        var children = $(".card");

        var array_img = [];
        var i;


        $(".card").each(function (i, obj) {
            array_img.push($(obj).find('img').attr("src"));
        });


        var child = $(".card").first();
        var z;

        for (z = 0; z < children.length; z++) {
            var randIndex = nextRand(0, array_img.length - 1);

            // set new image
            $("#" + child.attr("id") + " img").attr("src", array_img[randIndex]);
            array_img.splice(randIndex, 1);

            child = child.next();
        }
    }

    function nextRand(start, end) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }


    function showCard() {

        var id = $(this).attr("id");

        if ($("#" + id + " img").is(":hidden")) {
            $(".card").unbind("click", showCard);

            $("#" + id + " img").fadeIn('fast').css("display", "block");


            if (imgopened === "") {
                boxopened = id;
                imgopened = $("#" + id + " img").attr("src");

                $.timer(100, function (timer) {
                    $(".card").bind("click", showCard);
                });


            } else {
                var currentopened = $("#" + id + " img").attr("src");
                if (imgopened !== currentopened) {
                    $.timer(400, function (timer) {
                        $("#" + id + " img").fadeOut().css('display', 'block');
                        $("#" + boxopened + " img").fadeOut().css('display', 'block');
                        boxopened = "";
                        imgopened = "";
                    });

                } else {
                    // found
                    $("#" + id).addClass("card-found");
                    $("#" + boxopened).addClass("card-found");
                    found++;

                    $('#matches span').html(found);

                    showSanta8Bit();

                    boxopened = "";
                    imgopened = "";
                }

                $.timer(400, function () {
                    $(".card").bind("click", showCard);
                });
            }
            if (_ttime === 0) {
                startTimer();
            }

            count++;
            
            animateCount();
            
            $("#tries span").html(count);

            if (found === 8) {
                var msg = '<span id="msg">Congrats ! You Found All Sushi With </span>';
                $("span.link").prepend(msg);
                stopTimer();

                $.timer(200, function () {
                    // $("#win").jqm().jqmShow();
                    //$("#dialogImg").show();
                });
            }
        }
    }


    function animateCount(){
        
        var count = $('#tries span');
        
        if(count.hasClass('flip')){
           return false; 
        }
       
        
        count.addClass('animated flip');
        
        setTimeout(function(){
            count.removeClass('animated flip');
        },750);
        
    }

    function updateTime() {
        _sec -= 1;        
        if (_sec >= 60) {
            _sec = 0;
            _min -= 1;
        }
        
        var timeValue = $('#time span.value');
        
        if(_sec === 55 ){
            timeValue.addClass('pulse animated infinite').css('color','yellow');
        }
        if(_sec === 50 ){
            timeValue.removeClass('pulse').addClass('flash animated infinite').css('color','red');
        }
        
        $('#time span.value').html(padZero(_sec));
    }

    function stopTimer() {
        _stop = true;
    }




    function startTimer() {
        _ttime += 1;
        console.log('start timer')
        $.timer(1000, function (timer) {
            if (_stop)
                timer.stop();

            updateTime();
        }, 'interval');
    }
    ;


    function showSanta8Bit() {

        var santa = $('#papa-noel-8bit');
        santa.addClass('show-santa')

        $.timer(1000, function () {
            santa.removeClass('show-santa')
        }, 'timeout');

    }


    this.startGame = function () {

        $(".card img").hide();
        $(".card").click(showCard);
        //randomizeCards();

    };



}
;


pg = new pascalGame();

pg.startGame();










/*
 function LogScore() {
 var username = $("#username").val();
 saveScore(username, count);
 }
 
 
 function saveScore(name, time) {
 
 var url = host + "LogScore.php";
 
 $.ajax({
 type: "GET",
 url: url, //?playername=kira&timetaken=5'
 data: "playername=" + name + "&clicks=" + time,
 async: false,
 success: function () {
 //reload page to start a new game
 document.location.reload();
 },
 error: function () {
 console.log("could not be logged");
 }
 
 });
 }
 */


/**
 * Retrieve top 10 scores from server
 
 function getTopTenScores() {
 var url = host + "TopPlayers.php?type=" + gameType;
 getPlayerData(url);
 }
 */

/**
 * Retrieve all scores from server
 
 function getLeaderBoard() {
 var url = host + "LeaderBoard.php?type=" + gameType;
 getPlayerData(url);
 }
 */


/**
 * The following function retrieve player data and append it to the table view
 * @param url
 
 function getPlayerData(url) {
 console.log(url);
 $.getJSON(url, function (data) {
 if (data) { //check if any data is returned
 $.each(data, function (key, val) {
 $("#tbBody").append('<tr>' +
 '<td><i>' + val.name + '</i></td>' +
 '<td>' + (val.clicks) + '</td>' +
 '</tr>');
 });
 }
 else {
 console.log("Aw Snap! : Something went wrong loading the articles");
 }
 
 });
 }
 */
/**
 * the following function gets the direct url for the link
 
 function getURL() {
 var local = document.location;
 return local.protocol + "//" + local.host;
 }
 */