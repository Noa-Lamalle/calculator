import fs from 'fs';

// Fonction pour écrire des valeurs dans un fichier
export function ecrireFichier(cle, valeurs) {
    if (!valeurs) {
        console.error('Les valeurs à sauvegarder sont indéfinies.');
        return;
    }

    try {
        const data = JSON.stringify(valeurs, null, 2);
        fs.writeFile(`${cle}.json`, data, (err) => {
            if (err) throw err;
        });
    } catch (error) {
        console.error('Erreur lors de la conversion en JSON:', error);
    }
}

// Fonction pour lire des valeurs depuis un fichier
export function lireFichier(cle, callback) {
    fs.readFile(`${cle}.json`, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                const valeursParDefaut = {
                    pH: 7.03,
                    Conductivity: 2380,
                    CA_Hardness: 632,
                    M_Alkalinity: 20,
                    Skin_Temperature: 80,
                    Orthophosphate: 1,
                    Temperature: 17.9,
                    ABS: 684,
                    mL: 200,
                    tare: 0.1067,
                    poids: 0.1082
                };
                ecrireFichier(cle, valeursParDefaut);
                if (callback) callback(valeursParDefaut);
            } else {
                if (callback) callback(null);
            }
        } else {
            try {
                const valeurs = JSON.parse(data);
                if (callback) callback(valeurs);
            } catch (error) {
                if (callback) callback(null);
            }
        }
    });
}
