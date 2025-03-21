const PINGUIN_IMAGE_ID = 'pinguin_image';
const PINGUIN_AUDIO_ID = 'pinguin_audio';
const OTHER_INFO_ID = 'other_info';
const LOG_INFO_ID = 'lod_info';
const PINGUINS = [
    { id: 'kawazaki', image_url: 'assets/images/Kawazaki_img.png', audio_url: 'assets/sounds/Kawazaki_sound.mp3' },
    { id: 'cago', image_url: 'assets/images/Cago_img.png', audio_url: 'assets/sounds/Cago_sound.mp3' },
    { id: 'krico', image_url: 'assets/images/Krico_img.png', audio_url: 'assets/sounds/Krico_sound.mp3' },
    { id: 'estriper', image_url: 'assets/images/Estriper_img.png', audio_url: 'assets/sounds/Estriper_sound.mp3' },
    { id: 'other', image_url: 'assets/images/Other_img.png', audio_url: '' }
];
const USERS_MAP = {
    545842454: 'kawazaki',
    1268100905: 'cago',
    974363807: 'krico',
    5618946317: 'estriper'
};

// Устанавливаем изображение и звук пингвина
function renderPinguin(pinguin) {
    const image_el = document.getElementById(PINGUIN_IMAGE_ID);
    const audio_el = document.getElementById(PINGUIN_AUDIO_ID);

    image_el.src = pinguin.image_url;
    image_el.name = pinguin.id;
    audio_el.src = pinguin.audio_url;
}

// Отображаем дополнительную информацию
function renderOtherInfo(info) {
    const other_info_el = document.getElementById(OTHER_INFO_ID);
    other_info_el.innerText = info;
}

// Логирование информации
function log(info) {
    const log_el = document.getElementById(LOG_INFO_ID);
    log_el.innerText += `\n\n${info}`;
}

// Воспроизведение звука и анимации пингвина при клике
let is_playing = false;
function onClickPinguin() {
    if (is_playing) return;

    is_playing = true;

    const image_el = document.getElementById(PINGUIN_IMAGE_ID);
    const audio_el = document.getElementById(PINGUIN_AUDIO_ID);

    if (image_el.name !== 'other') {
        image_el.className = 'wobble-hor-bottom';
        audio_el.play();

        setTimeout(() => {
            image_el.className = '';
            is_playing = false;
        }, 800);
    }
}

// Инициализация при загрузке страницы
function initializeWebApp() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe.user;
        const pinguin = getPinguinByUserId(user?.id);

        if (pinguin) {
            renderPinguin(pinguin);
        } else {
            renderOtherInfo('You can\'t move it move it anymore');
            renderPinguin(PINGUINS.find(pinguin => pinguin.id === 'other'));
            log(`UserId: ${user?.id}`);
        }
    } else {
        log('Telegram WebApp не найден');
    }
}

// Получаем пингвина по id пользователя
function getPinguinByUserId(userId) {
    const pinguinId = USERS_MAP[Number(userId)];
    return PINGUINS.find(pinguin => pinguin.id === pinguinId);
}

// Слушаем событие загрузки страницы
document.addEventListener("DOMContentLoaded", initializeWebApp);
