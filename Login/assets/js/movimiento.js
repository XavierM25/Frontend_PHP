const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");

nextBtnFirst.addEventListener("click", function(event){
    event.preventDefault();
    if (validateStep1()) {
        slidePage.style.marginLeft = "-25%";
    }
});

nextBtnSec.addEventListener("click", function(event){
    event.preventDefault();
    if (validateStep2()) {
        slidePage.style.marginLeft = "-50%";
    }
});

nextBtnThird.addEventListener("click", function(event){
    event.preventDefault();
    if (validateStep3()) {
        slidePage.style.marginLeft = "-75%";
    }
});

submitBtn.addEventListener("click", function(event){
    event.preventDefault(); // Previene el comportamiento por defecto del botón de envío
    if (validateStep4()) {
        console.log('Formulario válido en la fase 4, enviando...');
        document.querySelector('.sign-up form').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true})); // Enviamos el formulario manualmente
    } else {
        console.log('Validaciones fallidas en la fase 4');
    }
});

prevBtnSec.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "0%";
});

prevBtnThird.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
});

prevBtnFourth.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
});