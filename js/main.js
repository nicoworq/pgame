$(document).ready(function () {



});







function pascalGame() {

    var _stop = false;
    var _sec = 60;
    var _min = 0;
    var _ttime = 0;


    var boxopened = "";
    var imgopened = "";
    var count = 0;
    var found = 0;
    var score = 0;
    var matchScore = 50;


    function initialize() {

        $('#btn-comenzar').click(showInstructionsScreen);

        $('#btn-start-game').click(startGame);
        $(".card img").hide();
        $(".card").click(showCard);
        //randomizeCards();

        $('input[type=text]').keydown(function () {
            $(this).removeClass('input-error')
        });




        $('#form-save-player').submit(function (e) {

            e.preventDefault();
            formSubmit();
        });

    }

    initialize();





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




    /*
     * CARTAS
     */



    function showCard() {

        var id = $(this).attr("id");

        if ($("#" + id + " img").is(":hidden")) {
            $(".card").unbind("click", showCard);

            $("#" + id + " img").fadeIn().css("display", "block");

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


                    cardFound($("#" + id));
                    cardFound($("#" + boxopened));

                    countFound();
                    updateScore();
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
                allMatchesFound();
            }
        }
    }

    function cardFound(card) {

        card.addClass('animated flipOutY');

        setTimeout(function () {

            card.removeClass('animated flipOutY').addClass('animated flipInY card-found');

        }, 800);

    }


    function allMatchesFound() {
        stopTimer();

        showScoresScreen();

    }


    /*
     * SHOW SCREENS
     */


    function showInstructionsScreen() {

        $('#intro-content1').fadeOut(function () {
            $('#intro-content2').fadeIn();
        });
    }


    function showScoresScreen() {


        var scoreScreenHtml = $('#score-screen');

        scoreScreenHtml.find('#score-time .score-item-value').html(_sec);
        scoreScreenHtml.find('#score-tries .score-item-value').html(count);
        scoreScreenHtml.find('#score-matches .score-item-value').html(found);
        scoreScreenHtml.find('#total-score-value b').html(score);




        $('#game-container').css('background', 'none');

        //$('.reno-bg').fadeOut();

        $('#memo-game').fadeOut('slow', function () {
            scoreScreenHtml.css('display', 'block').addClass('animated bounceInDown');
            setTimeout(function () {
                scoreScreenHtml.removeClass('animated bounceInDown');
                animateSuperSanta();
            }, 1200)
        });



        ;
    }


    function showSanta8Bit() {

        var santa = $('#papa-noel-8bit');
        santa.addClass('show-santa')

        $.timer(1000, function () {
            santa.removeClass('show-santa')
        }, 'timeout');

    }

    function updateScore() {

        score = found * matchScore;


        var scoreHtml = $('#score span.value');


        scoreHtml.html(score);

        scoreHtml.addClass('animated bounceIn')

        window.setTimeout(function () {
            scoreHtml.removeClass('animated bounceIn');
        }, 1000)


    }

    function countFound() {
        found++;
        $('#matches span').html(found);
    }


    /*
     * FORM
     */

    function formSubmit() {
        var form = $('#form-save-player');

        var formOK = true;

        form.find('input[type=text]').not('input[name=sex]').each(function () {
            $(this).removeClass('input-error');
            if ($(this).val() === '') {
                formOK = false;
                $(this).addClass('input-error');
            }
        });

        if (!formOK) {
            swal("Oops...", "Debe completar todos los campos", "error");
            return false;
        }


        if (!validateEmail(form.find('input[name=email]').val())) {
            form.find('input[name=email]').addClass('input-error');

            swal("Oops...", "Debe ingresar un Email Valido.", "error");
            return false;
        }



        $('.ajaxing').fadeIn();

        var formData = $('#form-save-player').serializeArray();


        formData.push({
            name: 'score',
            value: score
        });
        formData.push({
            name: 'matches',
            value: found
        });
        formData.push({
            name: 'tries',
            value: count
        });
        formData.push({
            name: 'time',
            value: _sec
        });



        $.post('php/ajax.php', $.param(formData), function (json) {
            $('.ajaxing').fadeOut();
            if (json.enviado) {
                swal("Gracias!", "Se han enviado tus datos. Ya estás participando del sorteo", "success");
            } else {
                swal("Oops...", "Error al enviar tus datos!", "error");

            }
        });

    }



    /*
     * TIMER
     */

    function updateTime() {

        if (_sec === 0) {
            timesUp();
            return false;
        }

        _sec -= 1;
        if (_sec >= 60) {
            _sec = 0;
            _min -= 1;
        }

        var timeValue = $('#time span.value');

        timeValue.removeClass('tada')

        if (_sec === 30) {
            timeValue.addClass('pulse animated infinite').css('color', 'yellow');
        }
        if (_sec === 15) {
            timeValue.removeClass('pulse').addClass('flash animated infinite').css('color', 'red');
        }

        $('#time span.value').html(padZero(_sec));
    }

    function timesUp() {
        console.log('timesup')

        stopTimer();
        $(".card").unbind("click", showCard);

    }

    function stopTimer() {
        console.log('stopTImer')
        _stop = true;
        console.log(_stop);
    }


    function startTimer() {
        _ttime += 1;
        console.log('start timer')
        $.timer(1000, function (timer) {
            if (_stop) {
                timer.stop();
                return false;
                console.log('timer.stop()')
            }
            updateTime();
        }, 'interval');
    }
    ;





    function startGame() {
        $('#content-container').fadeOut();
        $('#memo-game').fadeIn();
        $('#ready-set-go').fadeIn();

        $.timer(600, function () {
            animateReadySetGo();
        }, 'timeout');

    }


    /*
     * ANIMATIONS
     */

    function animateSuperSanta() {

        var superSanta = $('#papa-noel-puntaje');

        superSanta.css('left', '-160px')

    }

    function animateCount() {

        var countHtml = $('#tries span');

        if (countHtml.hasClass('flip')) {
            return false;
        }

        countHtml.addClass('animated flip');

        setTimeout(function () {
            countHtml.removeClass('animated flip');
        }, 750);

    }

    function animateReadySetGo() {
        var readyScreen = $('#ready-set-go');

        var ready1 = $('#ready1');
        var ready2 = $('#ready2');
        var ready3 = $('#ready3');

        var setGo = $('#set-go');


        var numberDisplayTime = 500;
        var fadeOutTime = 500;

        var setGoDisplayTime = 1500;

        ready1.css('display', 'block').addClass('animated bounceIn');

        window.setTimeout(function () {
            ready1.fadeOut(fadeOutTime, function () {

                ready2.css('display', 'block').addClass('animated bounceIn');

                window.setTimeout(function () {

                    ready2.fadeOut(fadeOutTime, function () {

                        ready3.css('display', 'block').addClass('animated bounceIn');


                        window.setTimeout(function () {

                            ready3.fadeOut(fadeOutTime, function () {

                                setGo.css('display', 'block').addClass('animated zoomIn');

                                window.setTimeout(function () {

                                    setGo.fadeOut(fadeOutTime, function () {

                                        readyScreen.fadeOut(function () {

                                            $('#time span.value').addClass('animated tada');

                                            startTimer();

                                        });

                                    })
                                }, setGoDisplayTime);

                            });


                        }, numberDisplayTime)


                    })


                }, numberDisplayTime)

            });

        }, numberDisplayTime);
    }


    /*
     * AUX 
     */

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function padZero(num) {
        return (num < 10) ? "0" + num : "" + num;
    }

    function nextRand(start, end) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }


}
;


pg = new pascalGame();












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