//CONSTANTES
const MINUTOS_DESCANSO = 5;
const MINUTOS_SESSION = 25;
const SEGUNDOS = 0;
let AUDIO = $("#beep")[0];
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
      valor >= 60 ? valor : valor++;
      $("#break-length").text(valor);
   } else if (e.target.id === 'session-increment') {
      minutos >= 60 ? minutos : minutos++;
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
   textoTipoSesion = "Tiempo de sesión";
   $("#timer-label").text("Tiempo de sesión");
   detenido = true;
   actividad = true;
   AUDIO.pause();
   AUDIO.currentTime = 0;
}

function playStop() {
   detenido = !detenido;
   let miIntervalo = setInterval(() => {
      if (detenido) {
         clearInterval(miIntervalo);
      } else {
         segundos--;
      }
      if (segundos === -1) {
         segundos = 59;
         minutos--;
      }
      console.log(`${minutos}:${segundos}`)
      textoTipoSesion = detenido ? "Tiempo de sesión" : actividad ? 'Sesión activa' : 'Descanso!!!';
      $("#timer-label").text(textoTipoSesion);
      //logica del display
      if (minutos >= 0 && minutos < 10) {
         if (segundos >= 0 && segundos < 10) {
            $("#time-left").text(`0${minutos}:0${segundos}`);
         } else if (segundos === 60) {
            $("#time-left").text(`0${minutos}:00`);
         } else {
            $("#time-left").text(`0${minutos}:${segundos}`);
         }
      } else {
         if (segundos >= 0 && segundos < 10) {
            $("#time-left").text(`${minutos}:0${segundos}`);
         } else if (segundos === 60) {
            $("#time-left").text(`${minutos}:00`);
         } else {
            $("#time-left").text(`${minutos}:${segundos}`);
         }
      }
      if (minutos === 0 && segundos === 0) {
         AUDIO.play();
         if (AUDIO.currentTime === 1) {
            AUDIO.pause();
            AUDIO.currentTime = 0;
         }
         actividad = !actividad;
         minutos = actividad ? parseInt($("#session-length").text()) : parseInt($("#break-length").text());
         segundos=1;
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
