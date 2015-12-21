<?php
include_once './php/TokenCSRF.php';
include_once './php/Pascal.php';

$tk = new TokenCSRF();

$pg = new Pascal();
?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Navidad en Pascal</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" href="http://www.pascalgames.com.ar/favicon.ico" />
        <link rel="stylesheet" href="css/bootstrap.min.css">

        <link href='https://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Passion+One:700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/extCss.min.css">

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>

        <meta property="og:url"           content="http://pascalgames.com.ar" />
        <meta property="og:type"          content="website" />
        <meta property="og:title"         content="Navidad en Pascal" />
        <meta property="og:description"   content="Demostrale a Papá Noel tu buena memoria , jugá y ganá premios increíbles" />
        <meta property="og:image"         content="http://pascalgames.com.ar/img/share.jpg" />

    </head>
    <body>

        <div id="leave-popup">
            <div id="leave-popup-inner">
                <div id="leave-popup-content">                
                    <div id="leave-popup-close">
                        <span>x</span>
                    </div>
                    <a href="http://pascalonline.com.ar" target="blank">
                        <img src="img/leave-popup.jpg" />
                    </a>
                </div>
            </div>
        </div>

        <div id="main-loader">
            <img src="img/loader.png"/>
        </div>
        <div id="no-mobile">
            <div id="no-mobile-text">
                <h1>Lo Sentimos</h1>
                <p>El juego no esta preparado para ser disfrutado 100% en el dispositivo que utilizas.<br/>Sin embargo, puedes continuar bajo tu propio riesgo</p>

                <button class="btn-primary">Continuar</button>
            </div>

        </div>

        <div id="game-container">

            <div class="ajaxing">
                <img src="img/loader.png" alt="Loading"/>
            </div>

            <div class="reno-bg" id="reno-izq" data-parallaxify-range-x="0" data-parallaxify-range-y="25">
                <img src="img/reno_back.svg" alt="Reno" />

            </div>
            <div class="reno-bg" id="reno-der" data-parallaxify-range-x="0" data-parallaxify-range-y="15">
                <img src="img/reno.svg" alt="Reno" />
            </div>

            <div class="reno-bg" id="reno-middle-der">
                <img src="img/reno_middle.svg" alt="Reno"/>
            </div>

            <div class="reno-bg" id="reno-bottom" data-parallaxify-range-x="50" data-parallaxify-range-y="0">
                <img src="img/reno_middle.svg" alt="Reno"/>
            </div>
            <div class="reno-bg" id="reno-top" data-parallaxify-range-x="40" data-parallaxify-range-y="0">
                <img src="img/reno_middle.svg" alt="Reno"/>
            </div>




            <div id="content-container">

                <div id="intro">
                    <div class="container">

                        <div class='volume-bt'>                           
                            <button class='active'>&nbsp;</button>
                        </div>
                        <!-- Objetos -->

                        <div id="papa-noel-intro" data-parallaxify-range-x="50" data-parallaxify-range-y="25">
                            <img src="img/santa_1.svg" alt="Papa Noel"/>
                        </div>
                        <div id="papa-noel-intro-rastrillo" data-parallaxify-range-x="25" data-parallaxify-range-y="12">
                            <img src="img/rastrillos.svg" alt="Rastrillo"/>
                        </div>


                        <div id="arbol-grande" class="arbol-bg" data-parallaxify-range-x="35" data-parallaxify-range-y="15">
                            <img src="img/arbol2.svg" alt="Arbol"/>
                        </div>
                        <div id="arbol-chico" class="arbol-bg" data-parallaxify-range-x="40" data-parallaxify-range-y="10">
                            <img src="img/arbol.svg" alt="Arbol"/>
                        </div>

                        <!-- Contenido -->

                        <a href="" class="logo-pascal">
                            <img src="img/pascal-logo.png" alt="Pascal" />
                        </a>

                        <div id="intro-content1">
                            <div id="logo-desafio">
                                <img src="img/logo_desafio_navideño.svg" alt="Desafío Navideño"/>
                            </div>
                            <h1>Demostrale a Papá Noel tu buena memoria<br/>
                                jugá y ganá premios increíbles</h1>
                            <button id="btn-comenzar" class="btn-primary">Comenzar</button>

                        </div>


                        <div id="intro-content2">

                            <h2>3 Simples Pasos</h2>
                            <ul id="pasos">
                                <li>- Encontrá las coincidencias - </li>
                                <li>- Sumá puntos y entrá en el ranking -</li>
                                <li>- Participá de increíbles premios -</li>
                            </ul>


                            <h4>¡Recordá!</h4>
                            <p id="recuerda">Mientras más rápido encuentres las coincidencias<br/>
                                más puntos obtendrás</p>

                            <button id="btn-start-game" class="btn-primary">Ok, entendido</button>

                        </div>
                    </div>
                </div>

            </div>


            <div id="memo-game">

                <div id="memo-container">
                    <div class="container">

                        <div class='volume-bt'>                           
                            <button class='active'>&nbsp;</button>
                        </div>

                        <div class="col-md-2">
                            <a href="" class="logo-pascal">
                                <img src="img/pascal-logo.png" alt="Pascal" />
                            </a>

                            <div id="time">
                                <div id="time-bg"><span></span></div>
                                <span class="value">60</span>
                                <p>Seg</p>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div id="cards-container">


                                <div class="memo-row">
                                    <div id="card1" class="card"><img src="img/gameImg/1.jpg" alt="Pascal"></div>
                                    <div id="card2" class="card"><img src="img/gameImg/2.jpg" alt="Pascal"></div>
                                    <div id="card3" class="card"><img src="img/gameImg/3.jpg" alt="Pascal"></div>
                                    <div id="card4" class="card"><img src="img/gameImg/4.jpg" alt="Pascal"></div>
                                </div>

                                <div class="memo-row">
                                    <div id="card5" class="card"><img src="img/gameImg/5.jpg" alt="Pascal"></div>
                                    <div id="card6" class="card"><img src="img/gameImg/6.jpg" alt="Pascal"></div>
                                    <div id="card7" class="card"><img src="img/gameImg/7.jpg" alt="Pascal"></div>
                                    <div id="card8" class="card"><img src="img/gameImg/8.jpg" alt="Pascal"></div>
                                </div>

                                <div class="memo-row">
                                    <div id="card9" class="card"><img src="img/gameImg/1.jpg" alt="Pascal"></div>
                                    <div id="card10" class="card"><img src="img/gameImg/2.jpg" alt="Pascal"></div>
                                    <div id="card11" class="card"><img src="img/gameImg/3.jpg" alt="Pascal"></div>
                                    <div id="card12" class="card"><img src="img/gameImg/4.jpg" alt="Pascal"></div>

                                </div>
                                <div class="memo-row">
                                    <div id="card13" class="card"><img src="img/gameImg/5.jpg" alt="Pascal"></div>
                                    <div id="card14" class="card"><img src="img/gameImg/6.jpg" alt="Pascal"></div>
                                    <div id="card15" class="card"><img src="img/gameImg/7.jpg" alt="Pascal"></div>
                                    <div id="card16" class="card"><img src="img/gameImg/8.jpg" alt="Pascal"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">

                            <div id="score">
                                <div id="score-bg"><span></span></div>
                                <span class="value">0</span>
                                <p>Puntos</p>
                            </div>

                            <div id="tries">
                                <div id="tries-bg"></div>
                                <img src="img/cruz.svg" alt="Cruz" /> <span>0</span>
                            </div>

                            <div id="matches">
                                <div id="matches-bg">
                                    <span>0</span>
                                    <img src="img/tilde.svg" alt="Cruz" />                                
                                </div>
                            </div>

                            <div id="toasty">                           
                                <div id="toasty-bg"></div>
                                <div id="papa-noel-8bit" class="show-dan">
                                    <img src="img/santa_pixel.svg" alt="Papa Noel 8 Bit" />
                                </div>

                                <div id="toasty-fg"></div>
                            </div>

                        </div>

                    </div>  
                </div>

            </div>


            <div id="ready-set-go">

                <div id="ready-container">
                    <div id="ready1">
                        <img src="img/1.svg" alt="Ready 1" />
                    </div>
                    <div id="ready2">
                        <img src="img/2.svg" alt="Ready 2" />
                    </div>
                    <div id="ready3">
                        <img src="img/3.svg" alt="Ready 3" />
                    </div>

                    <div id="set-go">
                        <img src="img/dale.svg" alt="GOOO!" />
                    </div>
                </div>



            </div>


            <div id="score-screen">

                <div id="extra-score-container">
                    <div class="container">
                        <div class="extra-santa">
                            <img src="img/extra-points.png" alt="Extra Santa"/>
                        </div>
                        <h3>¡BONUS TRACK!</h3>

                        <div class="extra-points">
                            <span id="extra-number">50</span>
                            <span id="extra-text">
                                PUNTOS<br/>
                                EXTRA
                            </span>
                        </div>

                        <h4>¡Compartiendo tu resultado en Facebook
                            sumás 50pts y más chances de ganar!</h4>
                        <button id="share-extra" class="btn-primary btn-fb" data-code="<?php echo $tk->generateFormToken('code-fb'); ?>"
                                data-href="http://pascalgames.com.ar/">
                            <img src="img/fb.svg"/> <span>Compartir</span>
                        </button>
                        <a href="#" id="no-share">No, gracias</a>

                    </div>

                </div>

                <div id="score-container">
                    <div class="container">

                        <div id="papa-noel-puntaje">
                            <img src="img/super_santa.svg" alt="Super Santa" />
                        </div>

                        <div id="total-score">

                            <span id="total-score-text">¡Estupendo! <br/> Sumaste</span>
                            <span id="total-score-value"><b class="odometer">0</b>                        
                                <span id="total-score-unit">Pts</span>
                            </span>


                        </div>

                        <div id="score-items">
                            <div id="score-time" class="score-item">
                                <span class="score-item-text">Tiempo <small>(Seg)</small></span>
                                <span class="score-item-value">30</span>
                            </div>
                            <div id="score-tries" class="score-item">
                                <span class="score-item-text">Intentos</span>
                                <span class="score-item-value">30</span>
                            </div>
                            <div id="score-matches" class="score-item">
                                <span class="score-item-text">Aciertos</span>
                                <span class="score-item-value">30</span>
                            </div>                        
                        </div>

                        <form id="form-save-player" method="POST" action="#">

                            <input type="hidden" name="code" value="<?php echo $tk->generateFormToken('send-score') ?>" />

                            <h3>Papá Noel necesita saber a quien le tiene que entregar los premios</h3>

                            <h2>¡Dejanos tus datos y participá!</h2>

                            <input type="text" name="sex" placeholder="Sex *" value=""/>
                            <input type="text" name="name" placeholder="Nombre Completo *" value=""/>
                            <input type="text" name="email" placeholder="Email *" value=""/>
                            <input type="text" name="dni" placeholder="DNI * " value=""/>
                            <input type="text" name="phone" placeholder="Teléfono" value=""/>

                            <button class="btn-primary">Enviar y participar</button>
                        </form>

                    </div>
                </div>


            </div>

            <div id="ranking-screen">             

                <div id="ranking-container" data-ranking-code="<?php echo $tk->generateFormToken('get-ranking') ?>">
                    <div class="container">
                        <div class='volume-bt'>                           
                            <button class='active'>&nbsp;</button>
                        </div>

                        <div id="papa-noel-ranking" class="pulse">
                            <a href="http://pascalgames.com.ar">
                                <img src="img/super_santa_small.svg" alt="Papa Noel"/>
                            </a>

                        </div>

                        <div id="arboles-ranking">
                            <img src="img/arbol_doble.svg"/>
                        </div>

                        <a href="http://pascalgames.com.ar" class="ranking-title">
                            <div class="logo-pascal">
                                <img src="img/pascal-logo.png" alt="Pascal"/>
                            </div>
                            <h3>Ranking</h3>
                        </a>

                        <div class="ranking-table">

                            <div class="ranking-head">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Puesto</td>
                                            <td style="padding-left: 25px;">Nombre</td>
                                            <td>Tiempo<small>(Seg)</small></td>
                                            <td>Intentos</td>
                                            <td>Aciertos</td>
                                            <td style="padding-right: 22px;    padding-left: 4px;">Puntaje</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="ranking-body">
                                <table>

                                    <tbody>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <div id='ranking-share-screen' class="ranking-share" data-ranking-id='<?php echo $tk->generateFormToken('encoding-code') ?>'>
                            <h3>¡Demostrá que sos el mejor!</h3>
                            <h4>Compartí el juego con tus amigos en faceboook y retalos a que superen tu puntaje.</h4>


                            <button class="btn-primary btn-fb" 
                                    data-href="http://pascalgames.com.ar">
                                <img src="img/fb.svg"/> <span>Compartir</span>
                            </button>

                            <a href="http://www.pascalonline.com.ar/" class="volver-pascal">Volver a Pascal</a>


                        </div>

                        <div class="ranking-text">
                            <h5>El día 25/12/15 anunciaremos a los ganadores. Con tu puntaje ya estás participando de<br/>
                                los sorteos navideños de Pascal ¡Visitanos la semana que viene y jugá de nuevo por más premios! </h5>
                            <a href='http://www.pascalcomputadoras.com.ar/index.php?action=portal/viewContent&cntId_content=2732&id_section=172' id='bases' target="blank">Ver Bases y Condiciones</a>
                        </div>

                    </div>
                </div>
            </div>

        </div>







        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>



        <script src="js/plugins.min.js"></script>
        <script src="js/main.js"></script>

        <script>
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-34294796-9', 'auto');
            ga('send', 'pageview');

        </script>
    </body>
</html>
