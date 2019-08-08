<?php $title = 'Simulateur de prêt'; ?>

<?php ob_start(); ?>

<h1 class="ui header">Simulateur de prêt</h1>

<div id="js-form-simu-pret">
    <script type="text/x-template" id="js-form-simu-pret-tpl">
        <div>
            <div class="ui form">
                <!-- bloc d'introduction -->
                <h5 class="ui top attached header">
                    Introduction
                </h5>
                <div class="ui attached segment">
                    Ce simulateur permet de calculer les mensualités de prêt composé d'un prêt lisseur et de sous-prêt
                </div>

                <!-- pour chacun des prêts, champs de saisie -->
                <template v-for="(pret, index) in prets">
                    <h5 class="ui top attached header" :key="'pret-header-'+index">
                        Prêt n°{{index+1}}
                    </h5>
                    <div class="ui attached segment" :key="'pret-body-'+index">
                        <div class="two fields">
                            <div class="field">
                                <mon-input v-model.number="pret.dureeAnnee"
                                           placeholder="Durée"
                                           right-label="ans"
                                           mask="entier" />
                            </div>
                            <div class="field">
                                <mon-input @input="pret.tauxPret = $event != null ? $event/100 : null"
                                           placeholder="Taux prêt"
                                           right-label="%"
                                           mask="decimal" />
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                <mon-input v-model.number="pret.montant"
                                           placeholder="Montant"
                                           right-label="€"
                                           mask="entier" />
                            </div>
                        </div>
                    </div>
                </template>

                <button class="ui button" @click="addPret" style="margin-top: .5em;">
                    Ajouter un prêt
                </button>

                <!-- Saisie email et lancement de la simulation -->
                <h5 class="ui top attached header">
                    Votre adresse email svp
                </h5>
                <div class="ui attached segment">
                    <div class="two fields">
                        <div class="field">
                            <mon-input v-model="email"
                                       placeholder="Email"
                                       mask="email" />
                        </div>
                    </div>
                    <button class="ui primary button" @click="simulate">
                        Simuler
                    </button>
                </div>

                <!-- Résultat simulation -->
                <template v-if="resultat != null">
                    <h5 class="ui top attached header">
                        Résultats
                    </h5>
                    <div class="ui attached segment">
                        <p>
                            Mensualité : {{resultat.mensualite.toFixed(2)}} €
                        </p>
                        <p>
                            Cout du prêt : {{resultat.cout.toFixed(2)}} €
                        </p>
                        <p>
                            Ratio : pour 1 € emprunté vous devez rembourser {{resultat.ratio.toFixed(4)}} €
                        </p>
                    </div>
                </template>
            </div>
            </div>
        </div>
    </script>
</div>

<div class="ui divider"></div>
<h3>Méthode de calcul</h3>
<p>
    Sachant que <strong>C</strong> est le prêt principal, <strong>t</strong> son taux mensuel proportionnel, et <strong>z</strong> sa durée.
</p>
<p>
    Si, avec ce prêt principal lisseur, on emboite <strong>n</strong> prêts secondaires remboursables sur
    <math>
        <msub>
            <mi>m</mi>
            <mi>i</mi>
        </msub>
    </math>
    mois, dont certains peuvent être différés d'une durée de <strong>d</strong> mois, et ayant une mensualité
    <math>
        <msub>
            <mi>M</mi>
            <mi>i</mi>
        </msub>
    </math>.
</p>
<p>
    En sachant aussi que si le différé est nul, il suffit d'affecter l'exposant <strong>-d</strong> de la valeur 0, le polynôme
    <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mo stretchy="false">(</mo>
        <mn>1</mn>
        <mo>+</mo>
        <mi>t</mi>
        <msup>
            <mo stretchy="false">)</mo>
            <mn>0</mn>
        </msup>
        <mo>=</mo>
        <mn>1</mn>
    </math>
</p>
<br>
<p>
    On obtient :
    <math xmlns="http://www.w3.org/1998/Math/MathML">
        <msub>
            <mi>M</mi>
            <mrow class="MJX-TeXAtom-ORD">
                <mi>l</mi>
                <mi>i</mi>
                <mi>s</mi>
                <mi>s</mi>
                <mi>e</mi>
            </mrow>
        </msub>
        <mo>=</mo>
        <mfrac>
            <mrow>
                <mi>C</mi>
                <mo>.</mo>
                <mi>t</mi>
                <mo>+</mo>
                <munderover>
                    <mo>∑</mo>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mi>i</mi>
                        <mo>=</mo>
                        <mn>1</mn>
                    </mrow>
                    <mi>n</mi>
                </munderover>
                <mrow class="MJX-TeXAtom-ORD">
                    <msub>
                        <mi>M</mi>
                        <mi>i</mi>
                    </msub>
                    <mo>×</mo>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">(</mo>
                        <mn>1</mn>
                        <mo>+</mo>
                        <mi>t</mi>
                        <msup>
                            <mo stretchy="false">)</mo>
                            <mrow class="MJX-TeXAtom-ORD">
                                <mo>−</mo>
                                <msub>
                                    <mi>d</mi>
                                    <mi>i</mi>
                                </msub>
                            </mrow>
                        </msup>
                    </mrow>
                    <mo>×</mo>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mrow>
                            <mo>[</mo>
                            <mrow>
                                <mn>1</mn>
                                <mo>−</mo>
                                <mo stretchy="false">(</mo>
                                <mn>1</mn>
                                <mo>+</mo>
                                <mi>t</mi>
                                <msup>
                                    <mo stretchy="false">)</mo>
                                    <mrow class="MJX-TeXAtom-ORD">
                                        <mo>−</mo>
                                        <msub>
                                            <mi>m</mi>
                                            <mi>i</mi>
                                        </msub>
                                    </mrow>
                                </msup>
                            </mrow>
                            <mo>]</mo>
                        </mrow>
                    </mrow>
                </mrow>
            </mrow>
            <mrow>
                <mn>1</mn>
                <mo>−</mo>
                <mo stretchy="false">(</mo>
                <mn>1</mn>
                <mo>+</mo>
                <mi>t</mi>
                <msup>
                    <mo stretchy="false">)</mo>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo>−</mo>
                        <mi>z</mi>
                    </mrow>
                </msup>
            </mrow>
        </mfrac>
    </math>
</p>

<script src="public/simu-pret.js"></script>

<?php $content = ob_get_clean(); ?>

<?php require('template.php'); ?>