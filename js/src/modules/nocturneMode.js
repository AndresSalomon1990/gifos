const nocturneMode = (function() {

    function getCurrentTheme(nocturneModeMobile, nocturneModeDesktop) {
        let _currentTheme = localStorage.getItem('theme');

         // check what is current theme right now and activate it
        if (_currentTheme) {
            document.documentElement.setAttribute('data-theme', _currentTheme);
            if (_currentTheme === 'dark') {
                nocturneModeMobile.innerHTML = "Modo Diruno";
                nocturneModeDesktop.innerHTML = "MODO DIURNO";
            } else {
                nocturneModeMobile.innerHTML = "Modo Nocturno";
                nocturneModeDesktop.innerHTML = "MODO NOCTURNO";
            }
        }
    }

    function change(nocturneModeMobile, nocturneModeDesktop) {
        let _currentTheme = localStorage.getItem('theme');

         // check what is current theme right now and activate it
        if (_currentTheme) {
            document.documentElement.setAttribute('data-theme', _currentTheme);
            if (_currentTheme === 'dark') {
                nocturneModeMobile.innerHTML = "Modo Diruno";
                nocturneModeDesktop.innerHTML = "MODO DIURNO";
            } else {
                nocturneModeMobile.innerHTML = "Modo Nocturno";
                nocturneModeDesktop.innerHTML = "MODO NOCTURNO";
            }
        }

        if (_currentTheme === "dark") {
            document.documentElement.setAttribute('data-theme', 'light');
            nocturneModeMobile.innerHTML = "Modo Nocturno";
            nocturneModeDesktop.innerHTML = "MODO NOCTURNO";
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            nocturneModeMobile.innerHTML = "Modo Diruno";
            nocturneModeDesktop.innerHTML = "MODO DIURNO";
            localStorage.setItem('theme', 'dark');
        }
    }

    return {
        getCurrentTheme,
        change
    }
})();

export default nocturneMode;