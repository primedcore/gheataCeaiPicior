var runde = 1;
var rundaCurenta = 0;
var scorJucator = 0;
var scorRobot = 0;
var decizie = 0;
var posibile = ["Gheață", "Ceai", "Picior"];
rundaRaport = document.getElementById("runda");
scorRaport = document.getElementById("scor");
rez = document.getElementById("rezultat");
alegeri = document.getElementById("alegeri");
var anteriorJucator = 0;
var anteriorRobot = 0;
var anteriorScoruriJucator = [0, 0];
var anteriorScorRobot = 0;

function rps() { // pornim jocul și setăm informațiile de început
  var joc = document.getElementById("joc");
  if (joc.style.visibility == "hidden" || joc.style.visibility == "") {
    runde = prompt("Câte runde vrei să joci? (Minim una)");
    if (runde < 1) runde = 1;
    joc.style.visibility = "visible";
    document.getElementsByTagName("h1")[0].innerHTML = "Oprește jocul";
    rundaRaport.innerHTML = "Runda 1 din " + runde;
    scorRaport.innerHTML = "Tu 0 - 0 Robotul";
  }
  else { // ascundem jocul dacă e deja vizibil la apel și îl resetăm
    joc.style.visibility = "hidden";
    document.getElementsByTagName("h1")[0].innerHTML = "Joacă din nou";
    runde = 1;
    rundaCurenta = 0;
    scorJucator = 0;
    scorRobot = 0;
    rez.style.color = "#000";
    rez.innerHTML = "Tu alegi primul!";
    alegeri.innerHTML = "";
  }
}
function rpsRound(jucator) {
  rundaCurenta++;
  if (rundaCurenta > runde) {
    rez.style.color = "#000";
    rez.innerHTML = "Jocul s-a terminat! Joacă din nou dacă vrei.";
    alegeri.innerHTML = "";
    return;
  } else if (rundaCurenta == runde - 1 && runde > 1) {
    rundaRaport.innerHTML = "Runda finală";
  } else {
  rundaRaport.innerHTML = "Runda " + rundaCurenta + " din " + runde;
  }
  // decizia metodei robotului de a alege
  decizie = Math.floor(Math.random()*10);
  if (decizie <= 5 && rundaCurenta > 1) // robotul alege algoritmic
  {
    if (scorJucator > anteriorScoruriJucator[1] && anteriorScoruriJucator[1] > anteriorScoruriJucator[0]) // batut de doua ori la rand
    { // alege aleatoriu
      decizie = Math.floor(Math.random()*3);
      if (decizie == 3) decizie = 2;
    } else if (scorRobot == anteriorScorRobot && scorJucator == anteriorScoruriJucator[1]) // remiza: alege aleatoriu
    {
      decizie = Math.floor(Math.random()*3);
      if (decizie == 3) decizie = 2;
    } else if (scorJucator > anteriorScoruriJucator[1]) // pierdere: alege ce ar fi batut oponentul
    {
      if (anteriorJucator === 0) decizie = 1;
      else if (anteriorJucator == 1) decizie = 2;
      else decizie = 0;
    }
    else // castig: alege ce ar fi batut propria alegere
    {
      if (anteriorRobot === 0) decizie = 1;
      else if (anteriorRobot == 1) decizie = 2;
      else decizie = 0;
    }
  } else // robotul alege aleatoriu
  {
    decizie = Math.floor(Math.random()*3);
    if (decizie == 3) decizie = 2;
  }
  anteriorRobot = decizie;
  anteriorScoruriJucator[0] = anteriorScoruriJucator[1];
  anteriorScoruriJucator[1] = scorJucator;
  anteriorScorRobot = scorRobot;
  // alegere jucator
  if (jucator == posibile[0]) jucator = 0;
  else if (jucator == posibile[1]) jucator = 1;
  else jucator = 2;
  anteriorJucator = jucator;
  // raportare alegere jucator si robot
  alegeri.innerHTML = "Tu ai ales " + posibile[jucator].toLowerCase() + ", iar robotul " + posibile[decizie].toLowerCase() + ".";
  // testare alegeri
  if (decizie == jucator) // remiză
  {
    rez.style.color = "#b9a700";
    rez.innerHTML = "Remiză!";
  } else if (decizie == jucator - 1 || (decizie == 2 && jucator == 0)) // câștig
  {
    rez.style.color = "#68b800";
    rez.innerHTML = "Ai câștigat runda asta!";
    scorJucator++;
  } else // pierdere
  {
    rez.style.color = "#d44a00";
    rez.innerHTML = "Ai pierdut runda asta.";
    scorRobot++;
  }
  scorRaport.innerHTML = "Tu " + scorJucator + " - " + scorRobot + " Robotul";
  if (rundaCurenta>=runde) {
    if (scorRobot > scorJucator) {
      rez.style.color = "#d44a00";
      rez.innerHTML = "Ai pierdut acest joc. GG";
      rundaRaport.innerHTML = "Final";
    }
    else if (scorRobot < scorJucator) {
      rez.style.color = "#68b800";
      rez.innerHTML = "GG, ai câștigat jocul acesta!";
    } else {
      rez.style.color = "#d9d511";
      rez.innerHTML = "Egalitate! GG, ai jucat la fel de bine ca robotul.";
      rundaRaport.innerHTML = "Final";
    }
  }
}
