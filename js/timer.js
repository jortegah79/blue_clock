//CONSTANTES
const MINUTOS_DESCANSO = 5;
const MINUTOS_SESSION = 25;
const SEGUNDOS = 0;
const AUDIO = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
//VARIABLES GLOBALES
let detenido = true;
let actividad = true;
let textoTipoSesion;
let minutos;
let segundos;


//FUNCIONES------------------------------------------_>
function incrementa(e) {
   if (e.target.id === 'break-increment') {
      let valor = parseInt($("#break-length").text());
      valor < 59 ? valor++ : valor;
      $("#break-length").text(valor);
   } else if (e.target.id === 'session-increment') {
      minutos < 59 ? minutos++ : minutos;
      $("#session-length").text(minutos);
      minutos >= 0 && minutos < 10 ? $("#time-left").text(`0${minutos}:0${SEGUNDOS}`) : $("#time-left").text(`${minutos}:0${SEGUNDOS}`);
   };
}
function decrementa(e) {
   if (e.target.id === 'break-decrement') {
      let valor = parseInt($("#break-length").text());
      valor > 1 ? valor-- : valor;
      $("#break-length").text(valor);
   } else if (e.target.id === 'session-decrement') {
      minutos > 1 ? minutos-- : minutos;
      $("#session-length").text(minutos);
      minutos >= 0 && minutos < 10 ? $("#time-left").text(`0${minutos}:0${SEGUNDOS}`) : $("#time-left").text(`${minutos}:0${SEGUNDOS}`);
   };
}
function reiniciar() {
   $("#break-length").text(MINUTOS_DESCANSO);
   $("#session-length").text(MINUTOS_SESSION);
   $("#time-left").text(`${MINUTOS_SESSION}:0${SEGUNDOS}`);
   minutos = MINUTOS_SESSION;
   segundos = SEGUNDOS;
   playStop();
   textoTipoSesion = "Tiempo de sesión";
   $("#timer-label").text("Tiempo de sesión");
   detenido = true;
   actividad = true;
}

function playStop() {
   detenido = !detenido;
   let miIntervalo = setInterval(() => {
      textoTipoSesion = detenido ? "Tiempo de sesión" : actividad ? 'Sesión activa' : 'Descanso!!!';
      $("#timer-label").text(textoTipoSesion);
      $("#time-left").text(`${minutos}:${segundos}`);
      minutos >= 0 && minutos < 10 ? segundos >= 0 && segundos < 10 ? $("#time-left").text(`0${minutos}:0${segundos}`) : $("#time-left").text(`0${minutos}:${segundos}`) : segundos >= 0 && segundos < 10 ? $("#time-left").text(`${minutos}:0${segundos}`) : $("#time-left").text(`${minutos}:${segundos}`);
      if (minutos === 0 && segundos === 0) {
         if (actividad === true) {
            AUDIO.play();
            actividad = false;
            minutos = parseInt($("#break-length").text());
            segundos = 0;
            $("#time-left").text(`${minutos}:${segundos}`);
         } else {
            AUDIO.play();
            actividad = true;
            minutos = parseInt($("#session-length").text());
            segundos = 0;
            $("#time-left").text(`${minutos}:${segundos}`);
         }
      }
      if (segundos === 0) {
         if (detenido) {
            clearInterval(miIntervalo);
         } else {
            minutos--;
            segundos = 59;
         }
      } else {
         if (detenido) {
            clearInterval(miIntervalo);
         } else {
            segundos--;
         }
      }
   }, 1000);

}
$("#session-increment").on("click", incrementa);
$("#break-increment").on("click", incrementa);
$("#session-decrement").on("click", decrementa);
$("#break-decrement").on("click", decrementa);
$("#reset").on("click", reiniciar);
$("#start_stop").on("click", playStop);

$(document).ready(() => {
   reiniciar();
});
