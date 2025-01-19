import {
    calculerLSI,
    calculerCPI,
    calculerRSI,
    calculerTAC,
    calculerSTP,
    calculerMES,
    round
} from "./calculator.js";
import { ecrireFichier, lireFichier } from "./gFichierSauvegarde.js";

// Déclaration des valeurs d'entrée
let valeursEntrees = {};

// Lire les valeurs depuis le fichier et les appliquer
lireFichier('mesValeurs', (valeurs) => {
    if (valeurs) {
        valeursEntrees = valeurs;
        console.log("Valeurs lues depuis le fichier :", valeursEntrees);

        //mettre les valeurs dans le DOM
        document.getElementById("ph").value = valeursEntrees.pH;
        document.getElementById("conductivity").value = valeursEntrees.Conductivity;
        document.getElementById("hardness").value = valeursEntrees.CA_Hardness;
        document.getElementById("alkalinity").value = valeursEntrees.M_Alkalinity;
        document.getElementById("temperature").value = valeursEntrees.Skin_Temperature;
        document.getElementById("phosphate").value = valeursEntrees.Orthophosphate;
        document.getElementById("temperature1").valeurs = valeursEntrees.Temperature[0];
        document.getElementById("temperature2").valeurs = valeursEntrees.Temperature[1];
        document.getElementById("temperature3").valeurs = valeursEntrees.Temperature[2];
        document.getElementById("temperature4").valeurs = valeursEntrees.Temperature[3];
        document.getElementById("abs1").valeurs = valeursEntrees.ABS[0];
        document.getElementById("abs2").valeurs = valeursEntrees.ABS[1];
        document.getElementById("abs3").valeurs = valeursEntrees.ABS[2];
        document.getElementById("abs4").valeurs = valeursEntrees.ABS[3];
    } else {
        console.error("Impossible de lire les valeurs depuis le fichier.");
    }
});

// Fonction pour récupérer les valeurs depuis le DOM
function collecterValeurs() {
    valeursEntrees = {
        pH: parseFloat(document.getElementById("ph").value) || 0,
        Conductivity: parseFloat(document.getElementById("conductivity").value) || 0,
        CA_Hardness: parseFloat(document.getElementById("hardness").value) || 0,
        M_Alkalinity: parseFloat(document.getElementById("alkalinity").value) || 0,
        Skin_Temperature: parseFloat(document.getElementById("temperature").value) || 0,
        Orthophosphate: parseFloat(document.getElementById("phosphate").value) || 0,
        Temperature: Array.from(document.querySelectorAll("td:nth-child(2) input.table-input"))
            .map(input => parseFloat(input.value) || 0),
        ABS: Array.from(document.querySelectorAll("td:nth-child(3) input.table-input"))
            .map(input => parseFloat(input.value) || 0),
        mL: Array.from(document.querySelectorAll("td:nth-child(2) input.table-input"))
            .map(input => parseFloat(input.value) || 0),
        tare: Array.from(document.querySelectorAll("td:nth-child(3) input.table-input"))
            .map(input => parseFloat(input.value) || 0),
        poids: Array.from(document.querySelectorAll("td:nth-child(4) input.table-input"))
            .map(input => parseFloat(input.value) || 0)
    };
}




// Calculs déclenchés au clic sur un bouton
document.addEventListener("DOMContentLoaded", () => {
    const calculerButton = document.getElementById("calculer");
    calculerButton.addEventListener("click", () => {
        collecterValeurs();

        // Effectuer les calculs
        let LSI = calculerLSI(
            valeursEntrees.pH,
            valeursEntrees.Conductivity,
            valeursEntrees.CA_Hardness,
            valeursEntrees.M_Alkalinity,
            valeursEntrees.Skin_Temperature,
            valeursEntrees.Orthophosphate
        );
        
        const lsiCell = document.querySelector('.result-table tr:nth-child(2) td:nth-child(2)');
        lsiCell.textContent = LSI = round(LSI, 2).toFixed(2); 
        

        let CPI = calculerCPI(
            valeursEntrees.pH,
            valeursEntrees.CA_Hardness,
            valeursEntrees.Orthophosphate,
            valeursEntrees.Skin_Temperature
        );

        const cpiCell = document.querySelector('.result-table tr:nth-child(3) td:nth-child(2)');
        cpiCell.textContent = CPI = round(CPI, 2).toFixed(2);


        let RSI = calculerRSI(
            valeursEntrees.pH,
            valeursEntrees.Conductivity,
            valeursEntrees.CA_Hardness,
            valeursEntrees.M_Alkalinity,
            valeursEntrees.Skin_Temperature,
            valeursEntrees.Orthophosphate
        );

        const rsiCell = document.querySelector('.result-table tr:nth-child(4) td:nth-child(2)');
        rsiCell.textContent = RSI = round(RSI, 2).toFixed(2);


        let TAC1 = calculerTAC(valeursEntrees.M_Alkalinity, true);

        const tacCell = document.querySelector('.result-table tr:nth-child(5) td:nth-child(2)');
        tacCell.textContent = TAC1 = round(TAC1, 2).toFixed(2);

        let TAC2 = calculerTAC(valeursEntrees.M_Alkalinity, false);

        const tac2Cell = document.querySelector('.result-table tr:nth-child(6) td:nth-child(2)');
        tac2Cell.textContent = TAC2 = round(TAC2, 2).toFixed(2);

        
        let STP1 = calculerSTP(valeursEntrees.Temperature[1], valeursEntrees.ABS[1]);
        console.log(round(STP1, 2).toFixed(2));


        const stpCell = document.querySelector('.result-table tr:nth-child(7) td:nth-child(2)');
        //stpCell.textContent = round(STP1, 2).toFixed(2);


        let MES = calculerMES(valeursEntrees.mL, valeursEntrees.tare, valeursEntrees.poids);

        const mesCell = document.querySelector('.result-table tr:nth-child(8) td:nth-child(2)');
        //mesCell.textContent = round(MES, 2).toFixed(2);

        // Écrire les valeurs mises à jour dans un fichier
        ecrireFichier('mesValeurs', valeursEntrees);
    });
});
