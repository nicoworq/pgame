<?php
include_once '../php/Pascal.php';

$pg = new Pascal();

$participantes = $pg->getRankingBackend();
?>

<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Pascal Navidad</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Pascal Navidad</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">

                </div><!--/.navbar-collapse -->
            </div>
        </nav>

        <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="jumbotron">
            <div class="container">
                <h1>Usuarios participantes</h1>
                <p>Cantidad: <?php echo $pg->getCount();?></p>
            </div>
        </div>

        <div class="container">
            <!-- Example row of columns -->

            <table class="table table-striped">
                <thead>
                    <tr>
                        <td>Posición</td>
                        <td>Nombre</td>
                        <td>Email</td>
                        <td>Puntaje</td>
                        <td>Compartio</td>
                        <td>Telefono</td>
                        <td>DNI</td>
                        <td>ID</td>
                        
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($participantes as $participante) {
                        ?>
                        <tr>
                            <td><?php echo $participante['pos'] ?></td>
                            <td><?php echo $participante['nombre'] ?></td>
                            <td><?php echo $participante['email'] ?></td>
                            <td><?php echo $participante['puntaje'] ?></td>
                            <td><?php echo $participante['compartio'] ?></td>
                            <td><?php echo $participante['telefono'] ?></td>
                            <td><?php echo $participante['dni'] ?></td>
                            <td><?php echo $participante['id'] ?></td>
                        </tr>
                        <?php
                    }
                    ?>

                </tbody>
            </table>

            <hr>

            <footer>
                <p>&copy; WORQ 2015</p>
            </footer>
        </div> <!-- /container -->        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>

        <script src="js/vendor/bootstrap.min.js"></script>

        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>


    </body>
</html>
