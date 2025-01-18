import { calculerLSI, calculerCPI, calculerRSI, calculerTAC, calculerSTP, calculerMES, round } from "./calculator.js";
import { ecrireFichier, lireFichier } from "./gFichierSauvegarde.js";

// Déclaration des valeurs d'entrée

let valeursEntrees = {};

// Lire les valeurs depuis le fichier

lireFichier('mesValeurs', (valeurs) => {
    if (valeurs) {
        valeursEntrees = valeurs;
        console.log(valeursEntrees);
    } else {
        console.error('Impossible de lire les valeurs depuis le fichier.');
    }
});

setTimeout(() => {

let LSI = calculerLSI(valeursEntrees.pH, valeursEntrees.Conductivity, valeursEntrees.CA_Hardness, valeursEntrees.M_Alkalinity, valeursEntrees.Skin_Temperature, valeursEntrees.Orthophosphate);
LSI = round(LSI, 2).toFixed(2);
console.log("L.S.I. : " + LSI);

let CPI = calculerCPI(valeursEntrees.pH, valeursEntrees.CA_Hardness, valeursEntrees.Orthophosphate, valeursEntrees.Skin_Temperature);
CPI = round(CPI, 2).toFixed(2);
console.log("C.P.I. : " + CPI);

let RSI = calculerRSI(valeursEntrees.pH, valeursEntrees.Conductivity, valeursEntrees.CA_Hardness, valeursEntrees.M_Alkalinity, valeursEntrees.Skin_Temperature, valeursEntrees.Orthophosphate);
RSI = round(RSI, 2).toFixed(2);
console.log("R.S.I. : " + RSI);

let TAC1 = calculerTAC(valeursEntrees.M_Alkalinity, true);
TAC1 = round(TAC1, 2).toFixed(2);
console.log("TAC < 100 : " + TAC1);

let TAC2 = calculerTAC(valeursEntrees.M_Alkalinity, false);
TAC2 = round(TAC2, 2).toFixed(2);
console.log("TAC > 100 : " + TAC2);


let STP = calculerSTP(valeursEntrees.Temperature, valeursEntrees.ABS);  // Attention au warning non géré ici !!!
console.log("STP : " + STP);


let MES = calculerMES(valeursEntrees.mL, valeursEntrees.tare, valeursEntrees.poids);
MES = round(MES, 2)
console.log("MES : " + MES);

}, 1000);
