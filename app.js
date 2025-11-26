function toNum(v){ return Number(v || 0); }

let lang = 'en';

document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('calcSel');
  sel.addEventListener('change', onCalcChange);
  document.getElementById('btnCalc').addEventListener('click', onCalc);
  document.getElementById('btnReset').addEventListener('click', onReset);
  document.getElementById('langBtn').addEventListener('click', toggleLang);
  document.getElementById('c_mat').addEventListener('change', updateMatLabel);

  onCalcChange(); // default first calculator
});

function onCalcChange(){
  const v = document.getElementById('calcSel').value;
  document.querySelectorAll('.calc').forEach(c => c.style.display='none');
  document.getElementById('sec-'+v).style.display='block';
  document.getElementById('result').textContent = '';
}

function updateMatLabel(){
  const matType = document.getElementById('c_mat').value;
  const lbl = document.getElementById('lblMatPct');
  if(lang === 'hi'){
    lbl.textContent = (matType === 'sponge')
      ? 'स्पंज आयरन में FeO %'
      : 'कास्ट / कार्बुराइज़र में C %';
  } else {
    lbl.textContent = (matType === 'sponge')
      ? 'FeO % in sponge iron'
      : 'C % in cast / carburizer';
  }
}

function toggleLang(){
  lang = (lang === 'en') ? 'hi' : 'en';

  if(lang === 'hi'){
    document.getElementById('langBtn').textContent = 'EN';
    document.getElementById('lblCalc').textContent = 'कैलकुलेटर चुनें';
    document.getElementById('hSimn').textContent = 'आवश्यक Si-Mn (रिकवरी सहित)';
    document.getElementById('lblHeat').textContent = 'हीट वज़न (किलो)';
    document.getElementById('lblCurMn').textContent = 'वर्तमान Mn %';
    document.getElementById('lblTargetMn').textContent = 'टार्गेट Mn %';
    document.getElementById('lblAlloyMn').textContent = 'एलॉय Mn % (Si-Mn)';
    document.getElementById('lblRecMn').textContent = 'अपेक्षित Mn रिकवरी %';

    document.getElementById('hMnrec').textContent = 'Mn रिकवरी (%)';
    document.getElementById('lblRecMetal').textContent = 'मेटल वज़न (किलो)';
    document.getElementById('lblRecMnMetal').textContent = 'मेटल में Mn %';
    document.getElementById('lblRecAlloyKg').textContent = 'एलॉय वज़न (किलो)';
    document.getElementById('lblRecMnAlloy').textContent = 'एलॉय में Mn % (Si-Mn)';

    document.getElementById('hFeo').textContent = 'Fe(M) से FeO';
    document.getElementById('lblFeTot').textContent = 'कुल Fe % (अनुमानित)';
    document.getElementById('lblFeM').textContent = 'Fe(M) %';
    document.getElementById('feoHint').textContent =
      'FeO% = (FeT − Fe(M)) / 0.777  (FeO में Fe ≈ 77.7%)';

    document.getElementById('hCarb').textContent = 'कार्बन समायोजन (बढ़ाएं / घटाएं)';
    document.getElementById('lblCMetal').textContent = 'मेटल वज़न (किलो)';
    document.getElementById('lblCurC').textContent = 'वर्तमान C %';
    document.getElementById('lblTargetC').textContent = 'टार्गेट C %';
    document.getElementById('lblMatType').textContent = 'मैटेरियल प्रकार';
    updateMatLabel();
    document.getElementById('cHint').textContent =
      'स्पंज आयरन (C डाउन): स्पंज (किलो) = ΔC% × मेटल(किलो) × 6 ÷ FeO%';
  } else {
    document.getElementById('langBtn').textContent = 'हिंदी';
    document.getElementById('lblCalc').textContent = 'Select calculator / कैलकुलेटर चुनें';
    document.getElementById('hSimn').textContent = 'Si-Mn required (with recovery)';
    document.getElementById('lblHeat').textContent = 'Heat mass (kg)';
    document.getElementById('lblCurMn').textContent = 'Current Mn %';
    document.getElementById('lblTargetMn').textContent = 'Target Mn %';
    document.getElementById('lblAlloyMn').textContent = 'Alloy Mn % (Si-Mn)';
    document.getElementById('lblRecMn').textContent = 'Expected Mn recovery %';

    document.getElementById('hMnrec').textContent = 'Mn recovery (%)';
    document.getElementById('lblRecMetal').textContent = 'Metal weight (kg)';
    document.getElementById('lblRecMnMetal').textContent = 'Mn in metal %';
    document.getElementById('lblRecAlloyKg').textContent = 'Alloy weight (kg)';
    document.getElementById('lblRecMnAlloy').textContent = 'Mn in alloy % (Si-Mn)';

    document.getElementById('hFeo').textContent = 'FeO from Fe(M)';
    document.getElementById('lblFeTot').textContent = 'Fe total % (assumed)';
    document.getElementById('lblFeM').textContent = 'Fe(M) %';
    document.getElementById('feoHint').textContent =
      'Uses relation FeO% = (FeT − Fe(M)) / 0.777  (FeO Fe ≈ 77.7%).';

    document.getElementById('hCarb').textContent = 'Carbon adjustment (up / down)';
    document.getElementById('lblCMetal').textContent = 'Metal weight (kg)';
    document.getElementById('lblCurC').textContent = 'Current C %';
    document.getElementById('lblTargetC').textContent = 'Target C %';
    document.getElementById('lblMatType').textContent = 'Material type';
    updateMatLabel();
    document.getElementById('cHint').textContent =
      'Sponge iron (C down): Sponge kg = ΔC% × Metal(kg) × 6 ÷ FeO%.';
  }
}

function onReset(){
  document.querySelectorAll('input').forEach(i => {
    if(i.id === 'alloyMn') i.value = 14;
    else if(i.id === 'recMn') i.value = 75;
    else if(i.id === 'fe_tot') i.value = 92;
    else if(i.id === 'fe_m') i.value = 82;
    else if(i.id === 'c_matPct') i.value = 12;
    else i.value='';
  });
  document.getElementById('result').textContent = '';
}

function onCalc(){
  const which = document.getElementById('calcSel').value;
  const out = document.getElementById('result');

  if(which === 'simn'){
    const heat   = toNum(heatKg.value);
    const cur    = toNum(curMn.value);
    const target = toNum(targetMn.value);
    const alloy  = toNum(alloyMn.value);
    const rec    = toNum(recMn.value);

    if(heat<=0 || alloy<=0 || rec<=0){
      out.textContent = 'Enter valid heat (kg), alloy% and recovery%.';
      return;
    }
    const dMn = target - cur;
    const requiredKg = (dMn * heat * 100.0) / (alloy * rec);
    out.textContent = 'Add about ' + requiredKg.toFixed(2) + ' kg Si-Mn.';
  }

  else if(which === 'mnrec'){
    const metal   = toNum(rec_metalKg.value);
    const mnMetal = toNum(rec_mnMetal.value);
    const alloyW  = toNum(rec_alloyKg.value);
    const mnAlloy = toNum(rec_mnAlloy.value);

    if(metal<=0 || alloyW<=0 || mnAlloy<=0){
      out.textContent = 'Enter valid metal (kg), alloy (kg) and Mn% in alloy.';
      return;
    }
    const mnInMetal  = metal * (mnMetal / 100.0);
    const mnCharged  = alloyW * (mnAlloy / 100.0);
    const recov      = (mnInMetal / mnCharged) * 100.0;
    out.textContent = 'Mn recovery ≈ ' + recov.toFixed(2) + ' %.';
  }

  else if(which === 'feo'){
    const ft = toNum(fe_tot.value);
    const fm = toNum(fe_m.value);
    if(ft <= fm){
      out.textContent = 'Fe total must be greater than Fe(M).';
      return;
    }
    // Correct FeO relation: FeO% = (FeT − Fe(M)) / 0.777
    const feo = (ft - fm) / 0.777;
    out.textContent = 'Estimated FeO ≈ ' + feo.toFixed(2) + ' %.';
  }

  else if(which === 'carb'){
    const metalKg = toNum(c_metalKg.value);
    const curC    = toNum(c_cur.value);
    const targetC = toNum(c_target.value);
    const matType = c_mat.value;
    const matPct  = toNum(c_matPct.value);

    if(metalKg<=0 || matPct<=0){
      out.textContent = 'Enter valid metal weight and material %.';
      return;
    }

    if(matType === 'sponge'){
      // CARBON DOWN using sponge iron (FeO%)
      const drop = curC - targetC;
      if(drop <= 0){
        out.textContent = 'For sponge iron, target C must be lower than current C.';
        return;
      }
      // Sponge (kg) = ΔC% × Metal(kg) × 6 ÷ FeO%
      const spongeKg = (drop * metalKg * 6.0) / matPct;
      out.textContent = 'Add about ' + spongeKg.toFixed(1) +
                        ' kg sponge iron to drop C by ' + drop.toFixed(3) + ' %.';
    } else {
      // CARBON UP using cast / carburizer
      const gain = targetC - curC;
      if(gain <= 0){
        out.textContent = 'For carburizer, target C must be higher than current C.';
        return;
      }
      // addKg = (metalKg * ΔC%) / C%(material)
      const addKg = (metalKg * gain) / matPct;
      out.textContent = 'Add about ' + addKg.toFixed(1) +
                        ' kg cast / carburizer to raise C by ' + gain.toFixed(3) + ' %.';
    }
  }
}
