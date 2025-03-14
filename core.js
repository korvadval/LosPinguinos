const PINGUIN_IMAGE_ID = 'pinguin_image'
const PINGUIN_AUDIO_ID = 'pinguin_audio'
const LOG_INFO_ID = 'lod_info'
const PINGUINS = [
    {id: 'kawazaki', image_url: 'assets/images/Kawazaki_img.png', audio_url: 'assets/sounds/Kawazaki_sound.mp3'},
    {id: 'cago', image_url: 'assets/images/Cago_img.png', audio_url: 'assets/sounds/Cago_sound.mp3'},
    {id: 'krico', image_url: 'assets/images/Krico_img.png', audio_url: 'assets/sounds/Krico_sound.mp3'},
    {id: 'estriper', image_url: 'assets/images/Estriper_img.png', audio_url: 'assets/sounds/Estriper_sound.mp3'}
]

function render(pinguin) {
    const image_el = document.getElementById(PINGUIN_IMAGE_ID)
    const audio_el = document.getElementById(PINGUIN_AUDIO_ID)

    image_el.src = pinguin.image_url
    audio_el.src = pinguin.audio_url
}

function log(info) {
    const log_el = document.getElementById(LOG_INFO_ID)
    log_el.innerText = info
}

// render(PINGUINS.find(pinguin => pinguin.id === 'estriper'))
document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    tg.ready(); // Подтверждаем готовность WebApp
    tg.expand(); // Разворачиваем WebApp на весь экран

    const user = tg.initDataUnsafe.user;
    if (user) {
        // Отправляем информацию о пользователе через запрос к серверу
        fetch("https://your-server.com/tg-user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        });
    } else {
        // Логируем, если не получилось получить данные пользователя
        fetch("https://your-server.com/tg-user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({error: "Не удалось получить данные пользователя"})
        });
    }
});
