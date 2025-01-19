// Fonction pour écrire des valeurs dans le localStorage
export function ecrireFichier(cle, valeurs) {
    if (!valeurs) {
        console.error('Les valeurs à sauvegarder sont indéfinies.');
        return;
    }

    try {
        const data = JSON.stringify(valeurs);
        localStorage.setItem(cle, data);
    } catch (error) {
        console.error('Erreur lors de la conversion en JSON:', error);
    }
}

// Fonction pour lire des valeurs depuis le localStorage
export function lireFichier(cle, callback) {
    const data = localStorage.getItem(cle);
    if (data) {
        try {
            const valeurs = JSON.parse(data);
            if (callback) callback(valeurs);
        } catch (error) {
            if (callback) callback(null);
        }
    } else {
        // Si les données n'existent pas dans le localStorage, on crée un jeu de valeurs par défaut
        const valeursParDefaut = {
            pH: 7.04,
            Conductivity: 2380,
            CA_Hardness: 632,
            M_Alkalinity: 20,
            Skin_Temperature: 80,
            Orthophosphate: 1,
            Temperature: [0, 0, 0, 0],
            ABS: [0, 0, 0, 0],
            mL: [0, 0, 0, 0],
            tare: [0, 0, 0, 0],
            poids: [0, 0, 0, 0]
        };
        ecrireFichier(cle, valeursParDefaut);
        if (callback) callback(valeursParDefaut);
    }
}
