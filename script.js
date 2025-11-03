
/* Melting Pro - script.js */
(function(){
  const langTexts = { en: { calcBtn:"Calculate", resetBtn:"Reset", addHome:"Add to Home Screen" },
                      hi: { calcBtn:"गणना करो", resetBtn:"रीसेट", addHome:"होम स्क्रीन पर जोड़ें" } };
  let lang='en';
  const el=id=>document.getElementById(id);
  function calcAll(){
    const mass=parseFloat(el('mass').value)||0;
    const initialTemp=parseFloat(el('initialTemp').value)||0;
    const meltTemp=parseFloat(el('meltTemp').value)||0;
    const cp=parseFloat(el('cp').value)||0;
    const latent=parseFloat(el('latent').value)||0;
    const timeHours=parseFloat(el('timeHours').value)||0;
    const dT=Math.max(0,meltTemp-initialTemp);
    const sensible=mass*cp*dT;
    const latentHeat=mass*latent;
    const totalKJ=sensible+latentHeat;
    const totalKWh=totalKJ/3600;
    el('sensibleVal').textContent=sensible.toFixed(2);
    el('latentVal').textContent=latentHeat.toFixed(2);
    el('totalKWhVal').textContent=totalKWh.toFixed(3);
    const phases=parseInt(el('phases').value)||3;
    const voltage=parseFloat(el('voltage').value)||0;
    const current=parseFloat(el('current').value)||0;
    const pf=parseFloat(el('pf').value)||1;
    const P_W = phases===3?Math.sqrt(3)*voltage*current*pf:voltage*current*pf;
    const P_kW=P_W/1000;
    const energyConsumed=P_kW*timeHours;
    const eff=Math.min(100,(totalKWh/Math.max(1e-9,energyConsumed))*100);
    el('powerVal').textContent=P_kW.toFixed(2);
    el('energyConsumedVal').textContent=energyConsumed.toFixed(2);
    el('effVal').textContent=eff.toFixed(2);
    const productMass=parseFloat(el('productMass').value)||0;
    const elementPctProduct=parseFloat(el('elementPctProduct').value)||0;
    const alloyChargedMass=parseFloat(el('alloyChargedMass').value)||0;
    const elementPctAlloy=parseFloat(el('elementPctAlloy').value)||0;
    const oxideFractionLossPct=parseFloat(el('oxideFractionLossPct').value)||0;
    const massElementProduct=(elementPctProduct/100)*productMass;
    const massElementCharged=(elementPctAlloy/100)*alloyChargedMass;
    const oxideLoss=(oxideFractionLossPct/100)*massElementCharged;
    const recoveredMass=Math.max(0,massElementCharged-oxideLoss);
    const finalInMeltPct=(recoveredMass/Math.max(1e-9,productMass))*100;
    el('massElemProdVal').textContent=massElementProduct.toFixed(3);
    el('massElemChargedVal').textContent=massElementCharged.toFixed(3);
    el('oxideLossKgVal').textContent=oxideLoss.toFixed(3);
    el('finalPctVal').textContent=finalInMeltPct.toFixed(3);
    const spongeMass=parseFloat(el('spongeMass')?.value)||0;
    const fe2PlusPct=parseFloat(el('fe2PlusPct')?.value)||0;
    const massFe2=spongeMass*(fe2PlusPct/100);
    const massFeO=massFe2*(71.844/55.845);
    const feoPctOfSponge=(massFeO/Math.max(1e-9,spongeMass))*100;
    if(el('massFe2Val')) el('massFe2Val').textContent=massFe2.toFixed(3);
    if(el('massFeOVal')) el('massFeOVal').textContent=massFeO.toFixed(3);
    if(el('feoPctVal')) el('feoPctVal').textContent=feoPctOfSponge.toFixed(3);
  }
  function resetAll(){ document.querySelectorAll('input').forEach(i=>{ if(i.id==='mass') i.value=1000; if(i.id==='initialTemp') i.value=25; if(i.id==='meltTemp') i.value=1538; if(i.id==='cp') i.value=0.46; if(i.id==='latent') i.value=270; if(i.id==='timeHours') i.value=1; if(i.id==='phases') i.value=3; if(i.id==='voltage') i.value=400; if(i.id==='current') i.value=5000; if(i.id==='pf') i.value=0.95; if(i.id==='productMass') i.value=1000; if(i.id==='elementPctProduct') i.value=0.6; if(i.id==='alloyChargedMass') i.value=100; if(i.id==='elementPctAlloy') i.value=58.5; if(i.id==='oxideFractionLossPct') i.value=5; if(i.id==='chargeSizeMm') i.value=25; if(i.id==='spongeMass') i.value=500; if(i.id==='fe2PlusPct') i.value=2.5; if(i.id==='moisturePct') i.value=1.0; }); calcAll(); }
  document.addEventListener('DOMContentLoaded', ()=>{ el('calcBtn').addEventListener('click',calcAll); el('resetBtn').addEventListener('click',resetAll); el('langToggle').addEventListener('click',()=>{lang=lang==='en'?'hi':'en'; el('langToggle').textContent=lang==='en'?'हिंदी':'EN'; }); el('addHome').addEventListener('click',()=>{ alert(lang==='en'?'Open Chrome menu → Add to Home screen':'Chrome मेन्यू खोलकर → Add to Home screen'); }); calcAll(); if('serviceWorker' in navigator){ navigator.serviceWorker.register('service-worker.js').catch(()=>{}); } });
})();