<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title><?= $title ?></title>
  <script src="//code.jquery.com/jquery-3.1.1.min.js" crossorigin="anonymous"></script>
  <script src="public/jquery.inputmask.min.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css">
  <script src="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.js"></script>
  <link href="public/style.css" rel="stylesheet" />
  <link href="public/animate.min.css" rel="stylesheet" />
  <script src="public/script.js"></script>
</head>

<body>
  <div class="ui fixed menu">
    <div class="ui container">
      <div class="header item">
        <img class="logo" src="public/img/logo.png">
        <div style="padding-left: 1em">France Gouv Prêt Immo <span style="font-size: 6px"> (non officiel)</span></div>
      </div>
      <a class="item" href="?action=guide">
        Guide
      </a>
      <a class="item" href="?action=simu-pret">
        Simulateur de prêt
      </a>
      <a class="item" href="?action=taux">
        Les taux actuels
      </a>
    </div>
  </div>

  <div style="display: flex; background-color: #eee; min-height: 100%">
    <div class="ui main container segment" style="margin: 5em 0 2em">
      <?= $content ?>
    </div>
  </div>
</body>

</html>