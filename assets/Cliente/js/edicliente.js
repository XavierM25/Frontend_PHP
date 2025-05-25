let cerrar = document.querySelectorAll(".close")[0];
let abrir = document.querySelectorAll(".cta")[0]; //BOTONES
let modal = document.querySelectorAll(".modal")[0];
let modalCon = document.getElementById("modalEditImage");

abrir.addEventListener("click", function(e){
    e.preventDefault();
    modalCon.style.opacity = "1";
    modalCon.style.visibility = "visible";
    modal.classList.toggle("modal-close");
});

cerrar.addEventListener("click", function(e){
    modal.classList.toggle("modal-close");
    setTimeout(function(){
        modalCon.style.opacity = "0";
        modalCon.style.visibility = "hidden";
    }, 850);
});

window.addEventListener("click", function(e){
    if (e.target == modalCon) {
        modal.classList.toggle("modal-close");
        setTimeout(function(){
            modalCon.style.opacity = "0";
            modalCon.style.visibility = "hidden";
        }, 850);
    }
});

const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('href').substring(1);
            tabContents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active-tab-content');
                } else {
                    content.classList.remove('active-tab-content');
                }
            });
        });
    });