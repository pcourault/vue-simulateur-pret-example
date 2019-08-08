
async function exempleUtilisationSimulation() {
    let Simulateur = await import('./Simulateur.js');
    
    console.log('Simulation result : ', Simulateur.executeSimulation([
        {
            dureeAnnee: 10,
            tauxPret: 0.0105,
            montant: 85000
        },
        {
            dureeAnnee: 15,
            tauxPret: 0.0120,
            montant: 70889
        }
    ]));
}

exempleUtilisationSimulation();