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
        document.querySelectorAll('.table-stp tr:nth-child(2) input.table-input').forEach((input, index) => input.value = valeursEntrees.Temperature[index]);
        document.querySelectorAll('.table-stp tr:nth-child(3) input.table-input').forEach((input, index) => input.value = valeursEntrees.ABS[index]);
        document.querySelectorAll('.table-mes tr:nth-child(2) input.table-input').forEach((input, index) => input.value = valeursEntrees.mL[index]);
        document.querySelectorAll('.table-mes tr:nth-child(3) input.table-input').forEach((input, index) => input.value = valeursEntrees.tare[index]);
        document.querySelectorAll('.table-mes tr:nth-child(4) input.table-input').forEach((input, index) => input.value = valeursEntrees.poids[index]);
        //console.log("Valeurs mises dans le DOM :", valeursEntrees);

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
        Temperature: Array.from(document.querySelectorAll('.table-stp tr:nth-child(2) input.table-input')).map(input => parseFloat(input.value)),
        ABS: Array.from(document.querySelectorAll('.table-stp tr:nth-child(3) input.table-input')).map(input => parseFloat(input.value)),
        mL: Array.from(document.querySelectorAll('.table-mes tr:nth-child(2) input.table-input')).map(input => parseFloat(input.value)),
        tare: Array.from(document.querySelectorAll('.table-mes tr:nth-child(3) input.table-input')).map(input => parseFloat(input.value)),
        poids: Array.from(document.querySelectorAll('.table-mes tr:nth-child(4) input.table-input')).map(input => parseFloat(input.value))
    };
    console.log("temp", valeursEntrees.Temperature);
    console.log("ABS", valeursEntrees.ABS);
    console.log("mL", valeursEntrees.mL);
    console.log("tare", valeursEntrees.tare);
    console.log("poids", valeursEntrees.poids);
}


// Calculs déclenchés au clic sur un bouton
document.addEventListener("DOMContentLoaded", () => {
    const calculerButton = document.getElementById("calculer");
    calculerButton.addEventListener("click", () => {
        collecterValeurs();
        console.log("Valeurs collectées :", valeursEntrees);
        ecrireFichier('mesValeurs', valeursEntrees);

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
        lsiCell.textContent = round(LSI, 2).toFixed(2); 
        

        let CPI = calculerCPI(
            valeursEntrees.pH,
            valeursEntrees.CA_Hardness,
            valeursEntrees.Orthophosphate,
            valeursEntrees.Skin_Temperature
        );

        const cpiCell = document.querySelector('.result-table tr:nth-child(3) td:nth-child(2)');
        cpiCell.textContent = round(CPI, 2).toFixed(2);


        let RSI = calculerRSI(
            valeursEntrees.pH,
            valeursEntrees.Conductivity,
            valeursEntrees.CA_Hardness,
            valeursEntrees.M_Alkalinity,
            valeursEntrees.Skin_Temperature,
            valeursEntrees.Orthophosphate
        );

        const rsiCell = document.querySelector('.result-table tr:nth-child(4) td:nth-child(2)');
        rsiCell.textContent = round(RSI, 2).toFixed(2);


        let TAC1 = calculerTAC(valeursEntrees.M_Alkalinity, true);

        const tacCell = document.querySelector('.result-table tr:nth-child(5) td:nth-child(2)');
        tacCell.textContent = round(TAC1, 2).toFixed(2);

        let TAC2 = calculerTAC(valeursEntrees.M_Alkalinity, false);

        const tac2Cell = document.querySelector('.result-table tr:nth-child(6) td:nth-child(2)');
        tac2Cell.textContent = round(TAC2, 2).toFixed(2);

        if(valeursEntrees.Temperature[0] < 15.6 || valeursEntrees.Temperature[0] > 26.6)
        {
            alert("La température doit être entre 15.6 et 26.6");
            document.querySelector('.table-stp tr:nth-child(2) td:nth-child(2)').style.backgroundColor = "red";
        }
        else
        {
            document.querySelector('.table-stp tr:nth-child(2) td:nth-child(2)').style.backgroundColor = "white";
        }

        if(valeursEntrees.ABS[0] > 851)
        {
            alert("L'ABS doit être inférieur à 851");
            document.querySelector('.table-stp tr:nth-child(3) td:nth-child(2)').style.backgroundColor = "red";
        }
        else
        {
            document.querySelector('.table-stp tr:nth-child(3) td:nth-child(2)').style.backgroundColor = "white";
        }
        

        let STP1 = calculerSTP(valeursEntrees.Temperature[0], valeursEntrees.ABS[0]);  
        const stpCell1 = document.querySelector('.table-stp tr:nth-child(4) td:nth-child(2)');
        stpCell1.textContent = round(STP1, 2).toFixed(2);

        if(valeursEntrees.Temperature[1] < 15.6 || valeursEntrees.Temperature[1] > 26.6)
        {
            alert("La température doit être entre 15.6 et 26.6");
            document.querySelector('.table-stp tr:nth-child(2) td:nth-child(3)').style.backgroundColor = "red";
        }
        else
        {
            document.querySelector('.table-stp tr:nth-child(2) td:nth-child(3)').style.backgroundColor = "white";
        }

        if(valeursEntrees.ABS[1] > 851)
        {
            alert("L'ABS doit être inférieur à 851");
            document.querySelector('.table-stp tr:nth-child(3) td:nth-child(3)').style.backgroundColor = "red";
        }
        else
        {
            document.querySelector('.table-stp tr:nth-child(3) td:nth-child(3)').style.backgroundColor = "white";
        }

        let STP2 = calculerSTP(valeursEntrees.Temperature[1], valeursEntrees.ABS[1]);
        const stpCell2 = document.querySelector('.table-stp tr:nth-child(4) td:nth-child(3)');
        stpCell2.textContent = round(STP2, 2).toFixed(2);

        if(valeursEntrees.Temperature[2] < 15.6 || valeursEntrees.Temperature[2] > 26.6)
        {
            alert("La température doit être entre 15.6 et 26.6");
            document.querySelector('.table-stp tr:nth-child(2) td:nth-child(4)').style.backgroundColor = "red";
        }
        else
        {
            document.querySelector('.table-stp tr:nth-child(2) td:nth-child(4)').style.backgroundColor = "white";
        }

        if(valeursEntrees.ABS[2] > 851)
        {
            alert("L'ABS doit être inférieur à 851");
            document.querySelector('.table-stp tr:nth-child(3) td:nth-child(4)').style.backgroundColor = "red";
        }
        else
        {
            document.querySelector('.table-stp tr:nth-child(3) td:nth-child(4)').style.backgroundColor = "white";
        }

        let STP3 = calculerSTP(valeursEntrees.Temperature[2], valeursEntrees.ABS[2]);
        const stpCell3 = document.querySelector('.table-stp tr:nth-child(4) td:nth-child(4)');
        stpCell3.textContent = round(STP3, 2).toFixed(2);

        if(valeursEntrees.Temperature[3] < 15.6 || valeursEntrees.Temperature[3] > 26.6)
        {
            alert("La température doit être entre 15.6 et 26.6");
            document.querySelector('.table-stp tr:nth-child(2) td:nth-child(5)').style.backgroundColor = "red";
        }
        else
        {
            document.querySelector('.table-stp tr:nth-child(2) td:nth-child(5)').style.backgroundColor = "white";
        }

        if(valeursEntrees.ABS[3] > 851)
        {
            alert("L'ABS doit être inférieur à 851");
            document.querySelector('.table-stp tr:nth-child(3) td:nth-child(5)').style.backgroundColor = "red";
        }
        else
        {
            document.querySelector('.table-stp tr:nth-child(3) td:nth-child(5)').style.backgroundColor = "white";
        }

        let STP4 = calculerSTP(valeursEntrees.Temperature[3], valeursEntrees.ABS[3]);
        const stpCell4 = document.querySelector('.table-stp tr:nth-child(4) td:nth-child(5)');
        stpCell4.textContent = round(STP4, 2).toFixed(2);


        let MES1 = calculerMES(valeursEntrees.mL[0], valeursEntrees.tare[0], valeursEntrees.poids[0]);
        const mesCell1 = document.querySelector('.table-mes tr:nth-child(5) td:nth-child(2)');
        mesCell1.textContent = round(MES1, 2).toFixed(2);

        let MES2 = calculerMES(valeursEntrees.mL[1], valeursEntrees.tare[1], valeursEntrees.poids[1]);
        const mesCell2 = document.querySelector('.table-mes tr:nth-child(5) td:nth-child(3)');
        mesCell2.textContent = round(MES2, 2).toFixed(2);

        let MES3 = calculerMES(valeursEntrees.mL[2], valeursEntrees.tare[2], valeursEntrees.poids[2]);
        const mesCell3 = document.querySelector('.table-mes tr:nth-child(5) td:nth-child(4)');
        mesCell3.textContent = round(MES3, 2).toFixed(2);

        let MES4 = calculerMES(valeursEntrees.mL[3], valeursEntrees.tare[3], valeursEntrees.poids[3]);
        const mesCell4 = document.querySelector('.table-mes tr:nth-child(5) td:nth-child(5)');
        mesCell4.textContent = round(MES4, 2).toFixed(2);
    });
});


