function cargarPreferencias() {
    const tema = localStorage.getItem('tema') || 'light';
    const idioma = localStorage.getItem('idioma') || 'es';
    const notificaciones = localStorage.getItem('notificaciones') === 'true';
    const emailNotificaciones = localStorage.getItem('emailNotificaciones') === 'true';
    const pushNotificaciones = localStorage.getItem('pushNotificaciones') === 'true';

    document.getElementById('theme').value = tema;
    document.getElementById('language').value = idioma;
    document.getElementById('notifications').checked = notificaciones;
    document.getElementById('email-notifications').checked = emailNotificaciones;
    document.getElementById('push-notifications').checked = pushNotificaciones;

    aplicarTema(tema);
}

function aplicarTema(tema) {
    if (tema === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarPreferencias();

    document.getElementById('theme').addEventListener('change', (e) => {
        const tema = e.target.value;
        localStorage.setItem('tema', tema);
        aplicarTema(tema);
    });

    document.getElementById('language').addEventListener('change', (e) => {
        localStorage.setItem('idioma', e.target.value);
    });

    document.getElementById('notifications').addEventListener('change', (e) => {
        localStorage.setItem('notificaciones', e.target.checked);
    });

    document.getElementById('email-notifications').addEventListener('change', (e) => {
        localStorage.setItem('emailNotificaciones', e.target.checked);
    });

    document.getElementById('push-notifications').addEventListener('change', (e) => {
        localStorage.setItem('pushNotificaciones', e.target.checked);
    });
}); 