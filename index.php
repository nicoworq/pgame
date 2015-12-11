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
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="css/bootstrap.min.css">

        <link href='https://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Passion+One:700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/extCss.css">

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>
    <body>

        <div id="game-container">

            <div class="ajaxing">
                <img src="img/loader.png" alt="Loading"/>
            </div>

            <div class="reno-bg" id="reno-izq">
                <img src="img/reno_back.svg" alt="Reno" />

            </div>
            <div class="reno-bg" id="reno-der">
                <img src="img/reno.svg" alt="Reno" />
            </div>

            <div class="reno-bg" id="reno-middle-der">
                <img src="img/reno_middle.svg" alt="Reno"/>
            </div>

            <div class="reno-bg" id="reno-bottom">
                <img src="img/reno_middle.svg" alt="Reno"/>
            </div>
            <div class="reno-bg" id="reno-top">
                <img src="img/reno_middle.svg" alt="Reno"/>
            </div>




            <div id="content-container">

                <div id="intro">
                    <div class="container">

                        <!-- Objetos -->

                        <div id="papa-noel-intro" >
                            <img src="img/santa_1.svg" alt="Papa Noel"/>
                        </div>
                        <div id="papa-noel-intro-rastrillo">
                            <img src="img/rastrillos.svg" alt="Rastrillo"/>
                        </div>


                        <div id="arbol-grande" class="arbol-bg">
                            <img src="img/arbol2.svg" alt="Arbol"/>
                        </div>
                        <div id="arbol-chico" class="arbol-bg">
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
                <div id="score-container">
                    <div class="container">

                        <div id="papa-noel-puntaje">
                            <img src="img/super_santa.svg" alt="Super Santa" />
                        </div>

                        <div id="total-score">

                            <span id="total-score-text">¡Estupendo! <br/> Sumaste</span>
                            <span id="total-score-value"><b>350</b>                        
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
                            <input type="text" name="name" placeholder="Nombre Completo *" value="nico"/>
                            <input type="text" name="email" placeholder="Email *" value="email@email.co"/>
                            <input type="text" name="dni" placeholder="DNI * " value="333"/>
                            <input type="text" name="phone" placeholder="Teléfono" value="telefono"/>

                            <button class="btn-primary">Enviar y participar</button>
                        </form>

                    </div>
                </div>


            </div>

            <div id="ranking-screen">
                <div id="ranking-container" data-ranking-code="<?php echo $tk->generateFormToken('get-ranking') ?>">
                    <div class="container">

                        <div id="papa-noel-ranking">
                            <img src="img/super_santa_small.svg" alt="Papa Noel"/>
                        </div>

                        <div id="arboles-ranking">
                            <img src="img/arbol_doble.svg"/>
                        </div>

                        <div class="ranking-title">
                            <div class="logo-pascal">
                                <img src="img/pascal-logo.png" alt="Pascal"/>
                            </div>
                            <h3>Ranking</h3>
                        </div>

                        <div class="ranking-table">

                            <div class="ranking-head">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Puesto</td>
                                            <td>Nombre</td>
                                            <td>Tiempo<small>(Seg)</small></td>
                                            <td>Intentos</td>
                                            <td>Aciertos</td>
                                            <td>Puntaje</td>
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
                        <div class="ranking-share">
                            <h3>¡Demostrá que sos el mejor!</h3>
                            <h4>Compartí el juego con tus amigos en faceboook y retalos a que superen tu puntaje.</h4>
                            <button class="btn-primary btn-fb"><img src="img/fb.svg"/> <span>Compartir</span></button>
                        </div>

                    </div>
                </div>
            </div>

        </div>







        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>



        <script src="js/plugins.min.js"></script>
        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function (b, o, i, l, e, r) {
                b.GoogleAnalyticsObject = l;
                b[l] || (b[l] =
                        function () {
                            (b[l].q = b[l].q || []).push(arguments)
                        });
                b[l].l = +new Date;
                e = o.createElement(i);
                r = o.getElementsByTagName(i)[0];
                e.src = '//www.google-analytics.com/analytics.js';
                r.parentNode.insertBefore(e, r)
            }(window, document, 'script', 'ga'));
            ga('create', 'UA-XXXXX-X', 'auto');
            ga('send', 'pageview');
        </script>
    </body>
</html>
