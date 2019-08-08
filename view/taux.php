<?php $title = 'Les taux actuels'; ?>

<?php ob_start(); ?>
<h1 class="ui header">Les taux actuels</h1>

<p>Retrouvez tous les mois les taux moyens d'emprunt immobilier proposés par les organismes de crédits français au niveau national et régional. Les taux présentés ci-dessous sont donnés à titre indicatif et ne prennent pas en compte d'assurance crédit. Leur estimation se base sur l'analyse des demandes effectuées auprès de notre partenaire comparateur de prêt. </p>

<table class="ui celled table">
    <thead>
        <tr>
            <th>Durée (ans)</th>
            <th>Evolution</th>
            <th>Taux MAX</th>
            <th>Taux du marché</th>
            <th>Taux MINI</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>7</td>
            <td><i class="arrow circle right icon"></i></td>
            <td>1,55 %</td>
            <td>0,70 %</td>
            <td>0,15 %</td>
        </tr>
        <tr>
            <td>10</td>
            <td><i class="arrow circle right icon"></i></td>
            <td>1,70 %</td>
            <td>0,85 %</td>
            <td>0,50 %</td>
        </tr>
        <tr>
            <td>15</td>
            <td><i class="arrow circle right icon"></i></td>
            <td>1,85 %</td>
            <td>1,10 %</td>
            <td>0,72 %</td>
        </tr>
        <tr>
            <td>20</td>
            <td class="positive"><i class="arrow circle down icon"></i></td>
            <td>2,15 %</td>
            <td>1,25 %</td>
            <td>0,90 %</td>
        </tr>
        <tr>
            <td>25</td>
            <td class="positive"><i class="arrow circle down icon"></i></td>
            <td>2,55 %</td>
            <td>1,45 %</td>
            <td>1,00 %</td>
        </tr>
        <tr>
            <td>30</td>
            <td><i class="arrow circle right icon"></i></td>
            <td>3,00 %</td>
            <td>1,80 %</td>
            <td>1,37 %</td>
        </tr>
    </tbody>
</table>


<h5 class="ui top attached header">
    Etre alerter des évolutions de taux
</h5>
<div class="ui form">
    <div class="ui attached segment">
        <div class="field">
            <input id="mask-saisie-email" type="text" placeholder="email" name="email">
        </div>
        <button id="button-inscription" class="ui primary button">S'inscrire</button>
    </div>
</div>

<script type="application/javascript">
$('#mask-saisie-email').inputmask({alias: 'email'});
$('#mask-saisie-email').on('input', () => {
    console.log("Email is complete : ", $('#mask-saisie-email').inputmask("isComplete"));
    console.log("Email value : ", $('#mask-saisie-email').val());
});
</script>

<?php $content = ob_get_clean(); ?>

<?php require('template.php'); ?>