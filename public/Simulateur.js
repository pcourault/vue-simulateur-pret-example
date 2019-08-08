
export class Pret {
    constructor(dureeAnnee, tauxPret, montant) {
        this.dureeAnnee = dureeAnnee;
        this.tauxPret = tauxPret;
        this.montant = montant;
    }
}

export class ResultatSimulation {
    constructor(montantARembourse, cout, ratio, resultatSimulationParPretList, mensualite) {
        this.montantARembourse = montantARembourse;
        this.cout = cout;
        this.ratio = ratio; // pour un euro emprunté vous devrez remboursé "ratio" euro
        this.resultatSimulationParPretList = resultatSimulationParPretList; // une liste de ResultatSimulationParPret
        this.mensualite = mensualite;
    }
}

export class ResultatSimulationParPret {
    constructor(montantARembourse, cout, ratio, pret, mensualite) {
        this.montantARembourse = montantARembourse;
        this.cout = cout;
        this.ratio = ratio; // pour un euro emprunté vous devrez remboursé "ratio" euro
        this.pret = pret;  // l'objet pret qui a été utilisé pour la simulation
        this.mensualite = mensualite; // si null c'est que l'on a une mensualitée variable => càd que le pret en question est le pret lisseur
    }
}

/**
 * Calcul un simulation de coût d'un pret global composé de plusieurs lignes de prêt
 * @param {Pret[]} prets : liste de lignes de prêts participant au prêt composé, voir structure class
 *  Pret. Les objets fournis ne doivent pas obligatoirement provenir de la classe Pret mais doivent
 *  posséder les mêmes attributs.
 * @returns {ResultatSimulation} : resultat de simulation, voir class ResultatSimulation pour la structure
 */
export function executeSimulation(prets) {
    if(prets == null || prets.length === 0) { throw "Raté : executeSimulation appelé avec null ou un tableau vide"; }

    prets.forEach(pret => {
        if(!Number.isFinite(pret.dureeAnnee) || !Number.isFinite(pret.tauxPret) || !Number.isFinite(pret.montant)) {
            throw "Raté : un objet pret ne contient pas un chiffre pour dureeAnnee, tauxPret ou montant ";
        }
        if(pret.dureeAnnee <= 0 || pret.tauxPret <= 0 || pret.montant <= 0) {
            throw "Raté : un objet pret à une valeur négative ou 0 pour dureeAnnee, tauxPret ou montant";
        }
    })

    let pretLisseur = prets.reduce((accumulator, currentValue) => currentValue.dureeAnnee > accumulator.dureeAnnee ? currentValue : accumulator);
    let autresPrets = prets.filter(pret => pret !== pretLisseur);

    // calcul des ResultatSimulationParPret pour chacun des prêts hors prêts lisseurs
    let resultatSimulationParPretlist = autresPrets.map(pret => {
        let resultatSimulationParPret = new ResultatSimulationParPret();
        resultatSimulationParPret.pret = pret;
        resultatSimulationParPret.mensualite = (pret.montant*pret.tauxPret/12) / (1-Math.pow((1+(pret.tauxPret/12)), -12*pret.dureeAnnee));
        resultatSimulationParPret.montantARembourse = resultatSimulationParPret.mensualite * 12 * pret.dureeAnnee;
        resultatSimulationParPret.cout = resultatSimulationParPret.montantARembourse - pret.montant;
        resultatSimulationParPret.ratio = resultatSimulationParPret.montantARembourse / pret.montant;
        return resultatSimulationParPret;
    });

    // calcul du ResultatSimulation global
    let resultatSimulation  = new ResultatSimulation();
    let deductionSousPret = resultatSimulationParPretlist.reduce((accumulator, currentValue) => accumulator + (currentValue.mensualite * (1-Math.pow(1+pretLisseur.tauxPret/12, currentValue.pret.dureeAnnee*-12))), 0);
    resultatSimulation.mensualite = (pretLisseur.montant*pretLisseur.tauxPret/12 + deductionSousPret) / (1-Math.pow(1+pretLisseur.tauxPret/12, -12*pretLisseur.dureeAnnee));
    resultatSimulation.montantARembourse = resultatSimulation.mensualite * 12 * pretLisseur.dureeAnnee;
    resultatSimulation.cout = resultatSimulation.montantARembourse - prets.reduce((accumulator, currentValue) => accumulator + currentValue.montant, 0);
    resultatSimulation.ratio = resultatSimulation.montantARembourse / (resultatSimulation.montantARembourse - resultatSimulation.cout);
    resultatSimulation.resultatSimulationParPretList = resultatSimulationParPretlist;

    // ajoute données du pret lisseur
    let resultatSimulationPretLisseur = new ResultatSimulationParPret();
    resultatSimulationPretLisseur.pret = pretLisseur;
    resultatSimulationPretLisseur.mensualite = null;
    resultatSimulationPretLisseur.montantARembourse = resultatSimulation.montantARembourse - resultatSimulationParPretlist.reduce((accumulator, currentValue) => accumulator + currentValue.montantARembourse, 0);
    resultatSimulationPretLisseur.cout = resultatSimulationPretLisseur.montantARembourse - pretLisseur.montant;
    resultatSimulationPretLisseur.ratio = resultatSimulationPretLisseur.montantARembourse / pretLisseur.montant;
    resultatSimulationParPretlist.push(resultatSimulationPretLisseur);
    
    return resultatSimulation;
}

