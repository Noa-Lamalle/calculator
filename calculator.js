// Implémentations des fonctions de calculs

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * calculer le L.S.I.
 * 
 * @param {number} pH
 * @param {number} Conductivity
 * @param {number} CA_Hardness
 * @param {number} M_Alkalinity
 * @param {number} Skin_Temperature
 * @param {number} Orthophosphate
 * 
 * @returns {number} LSI
 */

export function calculerLSI(pH, Conductivity, CA_Hardness, M_Alkalinity, Skin_Temperature, Orthophosphate) {
    
    let temperatureFactor = Math.exp(-(((Skin_Temperature * 1.8) + 32) / 191));
    let conductivityFactor = (Math.log10(Conductivity * 0.7)) / 10.7;           
    let alkalinityFactor = Math.log10(M_Alkalinity) * 0.94;
    let hardnessFactor = Math.log10(CA_Hardness);
    return 1.05 * (pH + (-3.24 * temperatureFactor) + (-conductivityFactor) + alkalinityFactor + hardnessFactor - 9.4);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * calculer le C.P.I.
 * 
 * @param {number} pH
 * @param {number} CA_Hardness
 * @param {number} Orthophosphate
 * @param {number} Skin_Temperature
 * 
 * @returns {number} CPI
 */

export function calculerCPI(pH, CA_Hardness, Orthophosphate, Skin_Temperature) {

    const calculeCaHardness = 15 - (3 * Math.log10(CA_Hardness));
    const calculeOrthophosphate = 10 - (2.018 * Math.log10(Orthophosphate));
    const F2 = calculeCaHardness + calculeOrthophosphate - ((Skin_Temperature - 40) / 40);
    const F1 = Math.pow(10, ((F2 + 23.026) / 48.246)); 

    return pH - F1;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * calculer le R.S.I
 * 
 * @param {number} pH
 * 
 * @returns {number} RSI
 */

export function calculerRSI(pH, Conductivity, CA_Hardness, M_Alkalinity, Skin_Temperature, Orthophosphate) {
    return 2 * (pH - calculerLSI(pH, Conductivity, CA_Hardness, M_Alkalinity, Skin_Temperature, Orthophosphate)) - pH;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * calculer le TAC
 * 
 * @param {number} M_Alkalinity
 * @param {boolean} isUnder100
 * 
 * @returns {number} TAC
 */

export function calculerTAC(M_Alkalinity, isUnder100) {
    if (isUnder100) {
        return 1.75 * Math.log10(M_Alkalinity) + 4.5;
    } else {
        return 1.28 * Math.log10(M_Alkalinity) + 5.35;
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * calculer le STP
 * 
 * @param {number} Temperature
 * @param {number} ABS
 * 
 * @returns {number} STP
*/

export function calculerSTP(Temperature, ABS) {
    return round((3.4533 - 0.0913 * (Temperature * 1.8 + 32)) + ((-19.4327 + 0.2068 * (Temperature * 1.8 + 32)) * ABS / 1000) + ((6.1718 + 0.3516 * (Temperature * 1.8 + 32)) * (ABS / 1000) * (ABS / 1000)), 1);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * calculer le MES
 * 
 * @param {number} mL
 * @param {number} tare
 * @param {number} poids
 * 
 * @returns {number} MES
*/

export function calculerMES(mL, tare, poids) {
    return (poids - tare) * 1000000 / mL;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * fonction round pour l'affichage des résultats
 * 
 * @param {number} value
 * @param {number} decimals
 * 
 * @returns {number} value
 */

export function round(value, decimals) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals).toFixed(2);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------