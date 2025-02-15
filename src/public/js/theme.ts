import { getThemeSwitch } from "./components.js";

const syncTheme = () => {
    let theme = localStorage.getItem('theme');
    let setDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', setDark);

    const themeSwitch = getThemeSwitch();
    themeSwitch.classList.toggle('light', theme === 'light');
    themeSwitch.classList.toggle('dark', theme === 'dark');
    themeSwitch.classList.toggle('auto', !theme);
}

const toggleTheme = () => {
    switch (localStorage.getItem('theme')) {
        case 'light':
            localStorage.setItem('theme', 'dark');
            break;
        
        case 'dark':
            localStorage.removeItem('theme');
            break;

        default:
            localStorage.setItem('theme', 'light');
            break;
    }

    syncTheme();
}

const addThemeSwitchListener = () => {
    const themeSwitch = document.querySelector<HTMLButtonElement>('#theme-switch');
    if (!themeSwitch)
        return;

    themeSwitch.addEventListener('click', toggleTheme);
}

export { syncTheme, addThemeSwitchListener };