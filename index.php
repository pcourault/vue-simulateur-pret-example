<?php
require('controller/controller.php');

if (isset($_GET['action'])) {
    if ($_GET['action'] == 'guide') {
        guide();
    } elseif ($_GET['action'] == 'simu-pret') {
        simuPret();
    } elseif ($_GET['action'] == 'taux') {
        taux();
    }
} else {
    guide();
}