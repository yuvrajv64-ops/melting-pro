// ===== METAL =====
function calcMetal(){
let r1=topDia.value/2;
let r2=bottomDia.value/2;
let h=taper.value;
let H=height.value;

let v1=(Math.PIh/3)(r1r1+r2r2+r1r2);
let v2=Math.PIr2r2(H-h);

let ton=(v1+v2)*7.2/1000000;
metalOut.innerHTML="🔥 "+ton.toFixed(2)+" Ton";
}

// ===== RAMMING =====
function calcRamming(){
let s=shellDia.value/2;
let v=Math.PIss100;
ramOut.innerHTML="🧱 "+(v2.6/1000000).toFixed(2)+" Ton";
}

// ===== MN =====
function calcMn(){
let m=mnMetal.value;
let need=(m*(tarMn.value-curMn.value)*10);
let alloy=need/(allMn.value/100)/(rec.value/100);

let msg="⚙ "+alloy.toFixed(1)+" kg<br>";

if(rec.value<60) msg+="🔴 Low recovery";
else msg+="🟢 Good recovery";

mnOut.innerHTML=msg;
}

// ===== CARBON =====
function toggleC(){
cd.style.display=(mode.value==="up")?"none":"block";
cu.style.display=(mode.value==="up")?"block":"none";
}

function calcCarbon(){
if(mode.value==="down"){
let kg=(cMetal.value*(cCur.value-cTar.value)6)/feo.value;
cOut.innerHTML="⬇ Sponge: "+kg.toFixed(1)+" kg";
}else{
let kg=(cMetalUp.value(cTarUp.value-cCurUp.value)/100)/(ciPct.value/100);
cOut.innerHTML="⬆ CI: "+kg.toFixed(1)+" kg";
}
}

// ===== FINAL AI =====
function runFinal(){

let t=ton.value;

let Mn0=Mn.value, Si0=Si.value, P0=P.value, S0=S.value;
let Cr0=Cr.value, Cu0=Cu.value, Ni0=Ni.value;

let FeO0=FeO.value, Temp0=Temp.value;
let basic=CaO.value/SiO2.value;

// TARGET
let tMn=0.6,tSi=0.2,tP=0.045;

if(grade.value==="E250BR"){ tMn=0.5; tSi=0.15; }
if(grade.value==="Fe500D"){ tP=0.040; }

// Mn
let siMn=((tMn-Mn0)t1000)/0.6;

// Si
let fSi=Si0+(siMn0.14)/(t1000);

// FeSi
let feSi=(fSi<tSi)?((tSi-fSi)t1000/0.7):0;

// Lime
let lime=(basic<2)?40:25;

// Remix
let remix=(FeO0>15 || P0>tP)?(5+t*0.5):0;

// Al
let al=(Al.value<0.005)?(1+t*0.5):0;

// Final
let fMn=Mn0+(siMn0.6)/(t1000);
let sum3=Cr0+Cu0+Ni0;

// OUTPUT
let msg="🔥 FINAL DECISION<br><br>";

msg+="SiMn: "+siMn.toFixed(0)+" kg<br>";
if(feSi>0) msg+="FeSi: "+feSi.toFixed(0)+" kg<br>";
msg+="Lime: "+lime+" kg<br>";
if(remix>0) msg+="Remix77: "+remix.toFixed(1)+" kg<br>";
if(al>0) msg+="Al: "+al.toFixed(1)+" kg<br>";

msg+="<br>Final:<br>";
msg+="Mn:"+fMn.toFixed(3)+"<br>";
msg+="Si:"+fSi.toFixed(3)+"<br>";
msg+="Cr+Cu+Ni:"+sum3.toFixed(3)+"<br>";

msg+="<br>Status:<br>";

if(P0>tP || S0>0.045 || FeO0>18 || sum3>0.7){
msg+="❌ NOT OK";
}else{
msg+="🟢 READY TO TAP";
}

tapOut.innerHTML=msg;
}
