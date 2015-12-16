


/*
 * LOADER
 */

imagesLoaded('#intro', {background: true}, function (instance) {

    var d = document.getElementById("main-loader");
    d.className = "animated fadeOut";

    window.setTimeout(function () {
        var d = document.getElementById("main-loader");
        d.className = 'remove';
    }, 800);

});

function pascalGame() {

    var _stop = false;
    var _sec = 40;
    var _min = 0;
    var _ttime = 0;


    var boxopened = "";
    var imgopened = "";
    var count = 0;
    var found = 0;
    var score = 0;


    var totalScore = 0;

    var matchScore = 500;

    var timeScore = 50;

    var tryScore = -20;

    var idParticipante;

    function initialize() {

        window.addEventListener("hashchange", hashChanged);


        $(document).ready(function () {

            $('#no-mobile .btn-primary').click(function () {
                $('#no-mobile').fadeOut();
            })

            $('#btn-comenzar').click(showInstructionsScreen);

            $('#btn-start-game').click(startGame);
            $(".card img").hide();
            $(".card").click(showCard);
            randomizeCards();

            $('input[type=text]').keydown(function () {
                $(this).removeClass('input-error');
            });


            $('#time span.value').html(_sec);


            $('#form-save-player').submit(function (e) {

                e.preventDefault();
                formSubmit();
            });

            $('.btn-fb').click(function () {
                window.open('https://www.facebook.com/sharer/sharer.php?u=http%3A//pascalgames.com.ar/', 'Compartir en Facebook', 'width=500,height=300');

            });

            $('#share-extra').click(function () {
                window.open('https://www.facebook.com/sharer/sharer.php?u=http%3A//pascalgames.com.ar/', 'Compartir en Facebook', 'width=500,height=300');

            });
            $('#share-extra').click(function () {
                playerSharedGame($(this).attr('data-code'));
            });



            $('#no-share').click(function (e) {
                e.preventDefault();
                showRankingScreen();
            });

            $.parallaxify();


            $(window).on('resize', function () {
                $.parallaxify('destroy');
                $.parallaxify();
            });

            window.odometerOptions = {
                format: 'd'
            };

        });


        if (window.location.hash === '#ranking') {
            $('#reno-bottom , #reno-top, #reno-izq, #reno-der, #reno-middle-der').fadeOut();
            showRankingScreen();
        }


    }

    initialize();

    initializeSound();

    function initializeSound() {

        ion.sound({
            sounds: [
                {
                    name: "boton_click",
                    preload: true
                },
                {name: 'match', preload: true},
                {name: 'no_match', preload: true},
                {name: 'go', preload: true},
                {name: 'count', preload: true},
            ],
            volume: 0.5,
            path: "sound/",
            preload: true
        });
    }



    function hashChanged() {
        ga('send', 'pageview', {
            'page': window.location.pathname + window.location.search + window.location.hash
        });
    }


    function randomizeCards() {
        var children = $(".card");

        var array_img = [];

        $(children).each(function (i, obj) {
            array_img.push($(obj).find('img').attr("src"));
        });

        $(children).each(function (i, obj) {
            var randIndex = nextRand(0, array_img.length - 1);
            $(obj).find('img').attr("src", array_img[randIndex]);
            array_img.splice(randIndex, 1);
        });

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

                    ion.sound.play("no_match");
                } else {
                    // found

                    ion.sound.play("match");

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

        ion.sound.play("boton_click");

        window.location.hash = 'instrucciones';

        $('#intro-content1').fadeOut(function () {
            $('#intro-content2').fadeIn();
        });
    }

    function showExtraScoreScreen() {
        $('#score-container').fadeOut(function () {
            $('#extra-score-container').fadeIn();
        });
    }

    function showScoresScreen() {

        window.location.hash = 'puntaje';


        var scoreScreenHtml = $('#score-screen');

        scoreScreenHtml.find('#score-time .score-item-value').html(_sec);
        scoreScreenHtml.find('#score-tries .score-item-value').html(count);
        scoreScreenHtml.find('#score-matches .score-item-value').html(found);



        $('#game-container').css('background', 'none');

        //$('.reno-bg').fadeOut();

        $('#memo-game').fadeOut('slow', function () {
            scoreScreenHtml.css('display', 'block').addClass('animated bounceInDown');
            setTimeout(function () {
                scoreScreenHtml.removeClass('animated bounceInDown');
                animateSuperSanta();
            }, 1200);


            setTimeout(function () {
                scoreScreenHtml.find('#total-score-value b').html(calculateTotalScore());
            }, 600);

        });




    }

    function calculateTotalScore() {

        if (score <= 0) {
            totalScore = 0;
            return totalScore;
        }

        totalScore = totalScore + score;

        //totalScore = totalScore + (tryScore * count);

        totalScore = totalScore + (timeScore * _sec);

        return totalScore;
    }

    function showRankingScreen() {

        if (window.location.hash !== '#ranking') {
            window.location.hash = '#ranking';
        }


        var rankingHtml = $('#ranking-screen');

        rankingHtml.css('display', 'block').addClass('animated bounceInUp');

        getRankings();

        setTimeout(function () {
            rankingHtml.removeClass('animated bounceInUp');
        }, 1200);


    }


    function scrollToParticipantScore() {

        window.setTimeout(function () {
            $('.ranking-body').scrollTo($(".ranking-body .active"), 2000);
        }, 1000);



    }

    function showSanta8Bit() {

        var santa = $('#papa-noel-8bit');
        santa.addClass('show-santa');

        $.timer(1000, function () {
            santa.removeClass('show-santa');
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

        ion.sound.play("boton_click");

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
            value: totalScore
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
                idParticipante = json.idParticipante;
                showExtraScoreScreen();

            } else {

                if (!json.enviado && json.existente) {
                    swal("Oops...", "Parece que ya participaste. Intenta de nuevo la semana que viene. ", "error");
                } else {
                    swal("Oops...", "Error al enviar tus datos!", "error");
                }


            }
        });

    }

    function playerSharedGame(code) {

        $.post('php/ajaxShare.php', {idParticipante: idParticipante, code: code, totalScore: totalScore}, function () {
            showRankingScreen();
        });

    }

    /*
     * RANKING
     */

    function getRankings() {

        $.post('php/ajaxRanking.php', {code: $('#ranking-container').attr('data-ranking-code')}, function (data) {

            if (data.length > 0) {
                showRankingValues(data);
            } else {
                swal('Puede Fallar', 'Ocurrio un error al recuperar el ranking', 'error');
            }

        });

    }
    ;

    function showRankingValues(rankings) {

        $.each(rankings, function (i, ranking) {

            var pos = '<td><div class="ranking-position">' + ranking.pos + '</div> <td>'
            var nombre = '<td><div class="ranking-value">' + ranking.nombre + '</div> <td>';
            var tiempo = '<td><div class="ranking-value">' + ranking.tiempo + '</div> <td>';
            var coincidencias = '<td><div class="ranking-value">' + ranking.coincidencias + '/8</div> <td>';
            var intentos = '<td><div class="ranking-value">' + ranking.intentos + '</div> <td>';

            var puntaje = '<td><div class="ranking-value">' + ranking.puntaje + '</div> <td>';

            var trClass = '';

            if (ranking.id === idParticipante) {
                trClass = 'active';
            }
            var tr = $('<tr>', {class: trClass}).append(pos + nombre + tiempo + intentos + coincidencias + puntaje);

            $('.ranking-body tbody').append(tr);
        });



        scrollToParticipantScore();

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
        stopTimer();
        $(".card").unbind("click", showCard);
        showScoresScreen();
    }

    function stopTimer() {
        _stop = true;

    }


    function startTimer() {
        _ttime += 1;

        $.timer(1000, function (timer) {
            if (_stop) {
                timer.stop();
                return false;
            }
            updateTime();
        }, 'interval');
    }


    function startGame() {
        ion.sound.play("boton_click");
        window.location.hash = 'juego';

        $('#reno-bottom , #reno-top, #reno-izq, #reno-der, #reno-middle-der').fadeOut();

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


        var numberDisplayTime = 800;
        var fadeOutTime = 500;

        var setGoDisplayTime = 1500;

        ready1.css('display', 'block').addClass('animated bounceIn');
        ion.sound.play("count");

        window.setTimeout(function () {
            ready1.fadeOut(fadeOutTime, function () {

                ready2.css('display', 'block').addClass('animated bounceIn');
                ion.sound.stop("count");
                ion.sound.play("count");

                window.setTimeout(function () {

                    ready2.fadeOut(fadeOutTime, function () {

                        ready3.css('display', 'block').addClass('animated bounceIn');

                        ion.sound.stop("count");
                        ion.sound.play("count");

                        window.setTimeout(function () {

                            ready3.fadeOut(fadeOutTime, function () {

                                setGo.css('display', 'block').addClass('animated zoomIn');
                                ion.sound.play("go");

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


var pg = new pascalGame();


