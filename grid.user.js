// ==UserScript==
// @name         Google Meet Grid View
// @namespace    https://fugi.tech/
// @version      1.28
// @description  Adds a toggle to use a grid layout in Google Meets
// @author       Chris Gamble
// @include      https://meet.google.com/*
// @grant        none
// @run-at       document-idle
// @inject-into  content
// ==/UserScript==

;(function () {
  // If included by our extension's icon page, export translation factory
  if (document.currentScript && document.currentScript.src === window.location.href.replace('popup.html', 'grid.user.js')) {
    // If imported, export the translation factory
    window.TranslationFactory = TranslationFactory
  } else if (typeof unsafeWindow !== 'undefined') {
    // If running in a sandbox, break out of the sandbox
    const scriptData = `(function(){
      Main();
      ${TranslationFactory.toString()};
      ${Main.toString()};
    })()`

    const s = document.createElement('script')
    s.setAttribute('data-version', GM.info.script.version)
    s.src = URL.createObjectURL(new Blob([scriptData], { type: 'text/javascript' }))
    document.body.appendChild(s)
  } else {
    // Otherwise we're running as an unsandboxed user script
    // and we should just do the thing
    Main()
  }

  function TranslationFactory() {
    const translations = {
      ca: {
        showOnlyVideo: 'Mostra només els participants amb video',
        highlightSpeaker: 'Ressalta els que parlen',
        includeOwnVideo: 'Inclou el meu video a la graella',
        autoEnable: 'Habilita la vista en graella de manera predeterminada',
        notRunning: "La vista en graella no s'està executant en aquesta pàgina",
        noMeeting: "La vista en graella no s'executarà fins que no et connectis a una trucada",
        enabled: 'Activar vista en graella',
        sourceCode: 'Codi font disponible a Github',
        screenCaptureMode: 'Activar mode de captura',
        screenCaptureModeDescription: 'Força 16:9, desactiva els noms, bloqueja vídeos al seu lloc',
        unauthorizedWarning: "ATENCIÓ: es tracta d'una extensió no autoritzada. Instal·leu l'extensió oficial fent clic aquí.",
      },
      da: {
        showOnlyVideo: 'Vis kun deltagere med video',
        highlightSpeaker: 'Fokuser på talene personer',
        includeOwnVideo: 'Vis mig selv i Grid',
        autoEnable: 'Tænd for Grid automatisk',
        notRunning: 'Grid View kører ikke på denne side',
        noMeeting: 'Grid View kører ikke indtil du deltager i et møde',
        enabled: 'Aktiver Grid View',
        sourceCode: 'Kildekoden er tilgængelig på GitHub',
        screenCaptureMode: 'Aktiver skærmoptager',
        screenCaptureModeDescription: 'Gennemtvinger 16:9, Deaktiverer navne, Låser video-positioner',
        unauthorizedWarning: 'Advarsel: Dette er ikke en autoriseret tilføjelse. Installer venligst den officielle, ved at klikke her.',
      },
      de: {
        showOnlyVideo: 'Nur Teilnehmer mit Video anzeigen',
        highlightSpeaker: 'Sprecher hervorheben',
        includeOwnVideo: 'Mich im Raster anzeigen',
        autoEnable: 'Rasteransicht automatisch aktivieren',
        notRunning: 'Rasteransicht ist für diese Seite nicht aktiv',
        noMeeting: 'Rasteransicht ist solange nicht aktiv, bis Sie dem Meeting beitreten',
        enabled: 'Rasteransicht anschalten',
        sourceCode: 'Der Quellcode ist auf Github zugänglich',
        screenCaptureMode: 'Aktiviere Bildschirmaufnahme Modus',
        screenCaptureModeDescription: 'Erwingt 16:9, entfernt Namen, fixiert Video Position',
        unauthorizedWarning: 'WARNUNG: Dieses ist eine nicht autorisiert Erweiterung. Bitte installieren Sie die offizielle Version, klicken Sie dafür hier.',
      },
      en: {
        showOnlyVideo: 'Only show participants with video',
        highlightSpeaker: 'Highlight speakers',
        includeOwnVideo: 'Include yourself in the grid',
        autoEnable: 'Enable grid view by default',
        notRunning: 'Grid View is not running on this page',
        noMeeting: 'Grid View does not run until you join the meeting',
        enabled: 'Enable Grid View',
        sourceCode: 'Source Code available on Github',
        screenCaptureMode: 'Enable Screen Capture Mode',
        screenCaptureModeDescription: 'Forces 16:9, Disables names, Locks videos in place',
        unauthorizedWarning: 'WARNING: This is an unauthorized extension. Please install the official release by clicking here.',
        hideParticipant: 'Hide Participant',
        showParticipant: 'Show Participant',
      },
      es: {
        showOnlyVideo: 'Mostrar solo participantes con vídeo',
        highlightSpeaker: 'Resaltar los que hablan',
        includeOwnVideo: 'Incluir mi vídeo en la cuadrícula',
        autoEnable: 'Habilitar vista en cuadrícula por defecto',
        notRunning: 'La vista en cuadrícula no funciona en esta página',
        noMeeting: 'La vista en cuadrícula no funciona hasta que no estés en una llamada',
        enabled: 'Habilitar vista en cuadrícula',
        sourceCode: 'Código fuente disponible en Github',
        screenCaptureMode: 'Habilitar modo captura de pantalla',
        screenCaptureModeDescription: 'Forzar 16:9, deshabilita nombres, fija el vídeo en su lugar',
        unauthorizedWarning: 'ATENCIÓN: Esta es una extensión no autorizada. Por favor, instale la versión oficial haciendo clic aquí.',
      },
      fr: {
        showOnlyVideo: 'Ne montrer que les participants avec caméra',
        highlightSpeaker: 'Surligner ceux qui parlent',
        includeOwnVideo: 'Vous inclure dans la grille',
        autoEnable: 'Activer la vue grille par défaut',
        notRunning: 'La vue grille ne fonctionne pas sur cette page',
        noMeeting: 'La vue grille ne fonctionne pas tant que vous ne rejoignez pas de réunion',
        enabled: 'Activer la vue grille',
        sourceCode: 'Code source disponible sur Github',
        screenCaptureMode: "Activer le mode capture d'écran",
        screenCaptureModeDescription: "Force l'affichage 16:9, désactive les noms, vérrouille les positions des vidéos",
        unauthorizedWarning: "ATTENTION : Il s'agit d'une extension non autorisée. Installez la version officielle en cliquant ici.",
      },
      hr: {
        showOnlyVideo: 'Prikaži samo sudionike sa kamerom',
        highlightSpeaker: 'Naglasi govornike',
        includeOwnVideo: 'Uključi sebe u mrežnom prikazu',
      },
      it: {
        showOnlyVideo: 'Mostra solo i partecipanti con la fotocamera attiva',
        highlightSpeaker: 'Illumina chi sta parlando',
        includeOwnVideo: 'Includi te stesso nella griglia',
        autoEnable: 'Attiva sempre la griglia',
        notRunning: 'Grid View non funziona in questa pagina',
        noMeeting: 'Grid View non funziona se non sei connesso',
        enabled: 'Attiva Grid View',
        sourceCode: 'Il codice sorgente è disponibile su Github',
        screenCaptureMode: 'Attiva la modalià registrazione della schermata',
        screenCaptureModeDescription: 'Forza 16:9, Disattiva i nomi, Blocca i video nella posizione',
        unauthorizedWarning: 'ATTENZIONE: Questa estensione non è autorizzata. Installa la versione ufficiale cliccando qua.',
      },
      ja: {
        showOnlyVideo: 'カメラをオンにしている参加者のみ',
        highlightSpeaker: '発言者をハイライト',
        includeOwnVideo: '自分を含める',
        autoEnable: '初期状態でグリッド表示を有効化',
        screenCaptureMode: '画面キャプチャモードを有効化',
        screenCaptureModeDescription: '画面比率を16:9, 名前を非表示, ビデオの位置を固定にします。',
      },
      nl: {
        showOnlyVideo: 'Toon alleen deelnemers met video',
        highlightSpeaker: 'Highlight sprekers',
        includeOwnVideo: 'Toon jezelf in het raster',
        autoEnable: 'Raster automatisch inschakelen',
        notRunning: 'Het raster staat niet aan op deze pagina',
        noMeeting: 'Het raster is pas zichtbaar als er aan een meeting wordt deelgenomen',
        enabled: 'Zet het raster aan',
        sourceCode: 'Broncode is beschikbaar op Github',
        screenCaptureMode: 'Zet Screen Capture Mode aan',
        screenCaptureModeDescription: "Forceer 16:9, Schakel namen uit, Zet video's vast op hun plek",
      },
      pl: {
        showOnlyVideo: 'Pokaż tylko uczestników z wideo',
        highlightSpeaker: 'Wyróżnij osobę prezentującą',
        includeOwnVideo: 'Uwzględnij siebie',
      },
      pt: {
        showOnlyVideo: 'Mostrar apenas participantes com vídeo',
        highlightSpeaker: 'Realçar quem está a falar',
        includeOwnVideo: 'Incluir o meu vídeo na grelha',
        autoEnable: 'Ativar visualização em grelha por defeito',
        notRunning: 'Visualização em grelha não está activada nesta página',
        noMeeting: 'Visualização em grelha não funciona até que entre numa conferência',
        enabled: 'Ativar visualização em grelha',
        sourceCode: 'Código fonte disponível no Github',
        screenCaptureMode: 'Ativar captura de ecrã',
        screenCaptureModeDescription: 'Forçar aspeto 16:9, Remover nomes, Parar posição dos vídeos',
        unauthorizedWarning: 'ATENÇÃO: Esta é uma extensão não autorizada. Por favor, clique aqui para instalar a versão oficial.',
      },
      'pt-BR': {
        showOnlyVideo: 'Mostrar somente participantes com vídeo',
        highlightSpeaker: 'Destacar quem está falando',
        includeOwnVideo: 'Incluir meu vídeo no grid',
        autoEnable: 'Habilitar visualização em grid por padrão',
        notRunning: 'Visualização em grid não está habilitado nesta página',
        noMeeting: 'Visualização em grid não funciona até que vocie entre em uma conferência',
        enabled: 'Habilitar visualização em grid',
        sourceCode: 'Código fonte disponível no Github',
        screenCaptureMode: 'Habilitar captura de tela',
        screenCaptureModeDescription: 'Forçar aspecto 16:9, Desabilitar nomes, Travar posição dos vídeos',
        unauthorizedWarning: 'ATENÇÃO: Esta é uma extensão não autorizada. Por favor, instale a versão oficial clicando aqui.',
      },
      ru: {
        showOnlyVideo: 'Показывать участников только с видео',
        highlightSpeaker: 'Подсвечивать участника со звуком',
        includeOwnVideo: 'Включить себя в сетку',
        autoEnable: 'Разрешить вид сетки по умолчанию',
        notRunning: 'Сетка не работает на этой странице',
        noMeeting: 'Сетка не будет работать пока вы не подключитесь к конференции',
        enabled: 'Включить вид сетки',
        sourceCode: 'Исходный код доступен на Github',
        unauthorizedWarning: 'ВНИМАНИЕ: Это не авторизированное расширение. Пожалуйста, установите оффициальную версию тут.',
        hideParticipant: 'Скрыть участника',
        showParticipant: 'Показать участника',
      },
      sv: {
        showOnlyVideo: 'Visa endast deltagare med video',
        highlightSpeaker: 'Markera/följ talare',
        includeOwnVideo: 'Inkludera mig i rutnätet',
        autoEnable: 'Använd rutnätet som standard',
        notRunning: 'Rutnätet körs inte på denna sidan',
        noMeeting: 'Grid View körs inte till dess att du har gått med i mötet',
        enabled: 'Slå på rutnätet',
        sourceCode: 'Källkod tillgänglig på Github',
        screenCaptureMode: 'Slå på skärminspelnings läge',
        screenCaptureModeDescription: 'Tvingar 16:9, Inaktiverar namn, Låser videor på plats',
        unauthorizedWarning: 'VARNING: Detta är inte ett auktoriserat tillägg. Installera det officiella tillägget genom att klicka här.',
      },
      uk: {
        showOnlyVideo: 'Показати лише учасників з відео',
        highlightSpeaker: 'Виділити ведучого',
        includeOwnVideo: 'Включити себе',
      },
      zh: {
        showOnlyVideo: '仅显示有视讯的与会者',
        highlightSpeaker: '强调发言者',
        includeOwnVideo: '将自己的视讯显示于网格中',
      },
      'zh-TW': {
        showOnlyVideo: '僅顯示有視訊的與會者',
        highlightSpeaker: '強調發言者',
        includeOwnVideo: '將自己的視訊顯示於網格中',
      },
    }

    const T = key =>
      navigator.languages
        .concat(['en'])
        .map(l => (translations[l] && translations[l][key]) || (translations[l.split('-')[0]] && translations[l.split('-')[0]][key]))
        .find(t => t)

    return T
  }

  function Main() {
    const T = TranslationFactory()

    // SVGs
    const gridOff =
      '<path fill="currentColor" d="M0,2.77L1.28,1.5L22.5,22.72L21.23,24L19.23,22H4C2.92,22 2,21.1 2,20V4.77L0,2.77M10,4V7.68L8,5.68V4H6.32L4.32,2H20A2,2 0 0,1 22,4V19.7L20,17.7V16H18.32L16.32,14H20V10H16V13.68L14,11.68V10H12.32L10.32,8H14V4H10M16,4V8H20V4H16M16,20H17.23L16,18.77V20M4,8H5.23L4,6.77V8M10,14H11.23L10,12.77V14M14,20V16.77L13.23,16H10V20H14M8,20V16H4V20H8M8,14V10.77L7.23,10H4V14H8Z" />'
    const gridOn =
      '<path fill="currentColor" d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />'
    const visibilityOff =
      '<path fill="currentColor" d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />'
    const visibilityOn =
      '<path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />'

    // Create the styles we need
    const s = document.createElement('style')
    s.innerHTML = `
    .__gmgv-vid-container {
      display: grid;
      grid-auto-rows: 1fr;
      top: 50px !important;
      right: 2px !important;
      left: 2px !important;
      bottom: 2px !important;
    }
    .__gmgv-vid-container.__gmgv-chat-enabled {
      right: 325px !important;
    }
    .__gmgv-vid-container.__gmgv-bottombar-enabled {
      bottom: 90px !important;
    }
    .__gmgv-vid-container.__gmgv-captions-enabled {
      bottom: 202px !important;
    }
    .__gmgv-vid-container.__gmgv-screen-capture-mode {
      right: 325px !important;
      bottom: 90px !important;
      z-index: 10;
      background: #111;
    }
    .__gmgv-vid-container.__gmgv-screen-capture-mode [data-self-name] {
      display: none;
    }
    .__gmgv-vid-container > div {
      position: relative !important;
      margin-top: 0 !important;
      top: 0 !important;
      left: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background: 0 0 !important;
    }
    .__gmgv-vid-container > div:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 0.4em solid #64ffda;
      box-sizing: border-box;

      transition: opacity 300ms linear 500ms;
      opacity: 0;
      z-index: -1;
    }
    .__gmgv-vid-container > div > div:first-child {
      z-index: -2;
    }
    .__gmgv-vid-container:not(.__gmgv-screen-capture-mode) > div.__gmgv-speaking:after {
      transition: opacity 60ms linear;
      opacity: 1;
      z-index: 1;
    }

    .__gmgv-button {
      display: flex;
      overflow: visible !important;
    }
    .__gmgv-button > svg {
      height: 24px;
      width: 24px;
    }
    .__gmgv-button > div {
      box-sizing: border-box;
      display: none;
      position: absolute;
      top: 40px;
      left: 0;
      width: 300px;
      padding: 12px;
      background: white;
      border-radius: 0 0 0 8px;
      text-align: left;
      cursor: auto;
      line-height: 0;
    }
    .__gmgv-button:hover > div {
      display: block;
    }
    .__gmgv-button > div label {
      display: flex;
      align-items: center;
      color: #999999;
      margin: 4px 0;
      line-height: 18px;
    }
    .__gmgv-button > div label:not(.disabled) {
      cursor: pointer;
      color: #000000;
    }
    .__gmgv-button input {
      margin-right: 8px;
    }
    .__gmgv-button > div small {
      line-height: 12px;
      font-weight: 400;
    }
    .__gmgv-button > div hr {
      border: 0;
      height: 1px;
      background: #f1f3f4;
    }
    .__gmgv-button .__gmgv-source-code {
      line-height: 16px;
    }
    .__gmgv-button .__gmgv-source-code small {
      border-right: 0.5px solid #f1f3f4;
      padding-right: 5px;
      margin-right: 2px;
    }
    .__gmgv-button .__gmgv-source-code a {
      font-size: 12px;
    }
    .__gmgv-button > div > a {
      display: inline-block;
      line-height: 20px;
    }

    .__gmgv-hide svg,
    .__gmgv-show-hide svg {
      height: 24px;
      width: 24px;
    }
    .__gmgv-hide > div {
      margin: 0 0 0 3px;
      color: #e8eaed;
      display: none;
    }
    .__gmgv-vid-container .__gmgv-hide > div,
    .__gmgv-show-hide > div {
      display: flex;
    }
    .__gmgv-hide > div,
    .__gmgv-show-hide > div {
      position: relative;
      overflow: visible;
      justify-content: center;
    }
    .__gmgv-hide > div > div,
    .__gmgv-show-hide > div > div {
      position: absolute;
      border-radius: 2px;
      background-color: rgba(95,99,104,0.9);
      color: #ffffff;
      pointer-events: none;
      font-size: 10px;
      font-weight: 500;
      padding: 5px 8px 6px;
      white-space: nowrap;
      transition: all 0.3s ease-in-out 0.3s;
      top: 31px;
      opacity: 0;
    }
    .__gmgv-hide:hover > div > div,
    .__gmgv-show-hide:hover > div > div {
      top: 46px;
      opacity: 1;
    }
  `
    document.body.append(s)

    // Variables
    let container = null
    let forceReflow = () => {}
    let lastStyles = []
    let screenCaptureModeAllocations = new Map() // participantID -> order index
    let screenCaptureModeLookup = new Map() // `${name}|${presentation}|${dedupeID}` -> {id,active,order}
    let hiddenIDs = new Set()
    let ownID = null
    let toggleButton = null
    let settings = {
      enabled: false,
      'show-only-video': localStorage.getItem('gmgv-show-only-video') === 'true',
      'highlight-speaker': localStorage.getItem('gmgv-highlight-speaker') === 'true',
      'include-own-video': localStorage.getItem('gmgv-include-own-video') === 'true',
      'auto-enable': localStorage.getItem('gmgv-auto-enable') === 'true',
      'screen-capture-mode': localStorage.getItem('gmgv-screen-capture-mode') === 'true',
    }

    // Make the button to perform the toggle
    // This runs on a loop since you can join/leave the meeting repeatedly without changing the page
    const authorized =
      (document.currentScript && document.currentScript.src === 'chrome-extension://kklailfgofogmmdlhgmjgenehkjoioip/grid.user.js') || // Chrome
      (document.currentScript && document.currentScript.src === 'chrome-extension://ogbbehbkcmdciebilbkpjgopohnpfolj/grid.user.js') || // Microsoft
      (document.currentScript && document.currentScript.src.startsWith('moz-extension://')) || // Firefox regenerates the URL for each browser, so we can't detect if it's valid :(
      (typeof GM !== 'undefined' && GM && GM.info && GM.info.script && GM.info.script.namespace === 'https://fugi.tech/') || // user script
      (document.currentScript && document.currentScript.src.startsWith('blob:')) // recursive user script
    const version =
      (document.currentScript && document.currentScript.dataset.version) || (typeof GM !== 'undefined' && GM && GM.info && GM.info.script && GM.info.script.version) || '?.?.?'
    let firstRun = true
    setInterval(() => {
      // Find the UI elements we need to modify. If they don't exist we haven't entered the meeting yet and will try again later
      const participantVideo = document.querySelector('[data-allocation-index]')
      const _container = participantVideo && participantVideo.parentElement
      if (_container && _container !== container) {
        container = _container
        updateSetting('enabled', settings['enabled']) // When someone starts a presentation `container` will change under us, so we need to restart the grid
      }

      const ownVideoPreview = document.querySelector('[data-fps-request-screencast-cap]')
      const buttons = ownVideoPreview && ownVideoPreview.parentElement.parentElement.parentElement
      if (buttons && !buttons.__grid_ran) {
        buttons.__grid_ran = true
        buttons.parentElement.parentElement.parentElement.style.zIndex = 10 // Prevent options getting cut off by pin/mute overlay or speaker overlay

        // Find the button container element and copy the divider
        buttons.prepend(buttons.children[1].cloneNode())

        // Add our button to to enable/disable the grid
        toggleButton = document.createElement('div')
        toggleButton.classList = buttons.children[1].classList
        toggleButton.classList.add('__gmgv-button')
        toggleButton.onclick = () => {
          updateSetting('enabled', !settings['enabled'])
        }
        buttons.prepend(toggleButton)

        toggleButton.innerHTML = `
          <svg viewBox="0 0 24 24">${gridOff}</svg>
          <div>
            <label><input data-gmgv-setting="show-only-video" type="checkbox" /> ${T('showOnlyVideo')}</label>
            <label><input data-gmgv-setting="highlight-speaker" type="checkbox" /> ${T('highlightSpeaker')}</label>
            <label><input data-gmgv-setting="include-own-video" type="checkbox" /> ${T('includeOwnVideo')}</label>
            <label><input data-gmgv-setting="auto-enable" type="checkbox" /> ${T('autoEnable')}</label>
            <hr>
            <label><input data-gmgv-setting="screen-capture-mode" type="checkbox" /> ${T('screenCaptureMode')}</label>
            <small>${T('screenCaptureModeDescription')}</small>
            <hr>
            <div class="__gmgv-source-code">
              <small>v${version}</small>
              <a href="https://github.com/Fugiman/google-meet-grid-view" target="_blank">${T('sourceCode')}</a>
            </div>
            ${
              authorized
                ? ''
                : `
            <hr>
            <a href="https://github.com/Fugiman/google-meet-grid-view#official-releases" target="_blank">${T('unauthorizedWarning')}</a>
            `
            }
          </div>
        `

        toggleButton.querySelector('div').onclick = e => e.stopPropagation()
        toggleButton.querySelectorAll('input').forEach(el => {
          const settingName = el.dataset.gmgvSetting
          el.checked = !!settings[settingName]
          el.onchange = e => updateSetting(settingName, e.target.checked)
        })

        updateSetting('screen-capture-mode', settings['screen-capture-mode'])
      }

      // Find the functions inside google meets code that we need to override for our functionality
      // Notably we're looking for the function that handles video layout, and the function that detects volume
      // This code is fairly hairy but basically just iterates through all the exposed functions until we find the
      // ones that roughly match the code we're looking for by running regexs on the function source code.
      // We can then parse that code to get variable names out and use javascript Proxys to override them.
      if (window.default_MeetingsUi) {
        let m
        for (let [_k, v] of Object.entries(window.default_MeetingsUi)) {
          if (v && v.prototype) {
            for (let k of Object.keys(v.prototype)) {
              const p = Object.getOwnPropertyDescriptor(v.prototype, k)
              if (p && p.value && !v.prototype[k].__grid_ran) {
                // this.XX.get(_).YY(this._)
                m = /this\.([A-Za-z]+)\.get\([A-Za-z]+\)\.([A-Za-z]+)\(this\.[A-Za-z]+\)/.exec(p.value.toString())
                if (m) {
                  console.log('[google-meet-grid-view] Successfully hooked into rendering pipeline', v.prototype[k])
                  const p = new Proxy(v.prototype[k], RefreshVideoProxyHandler(m[1], m[2]))
                  p.__grid_ran = true
                  v.prototype[k] = p
                }

                // this.XX.getVolume()
                m = /this\.([A-Za-z]+)\.getVolume\(\)/.exec(p.value.toString())
                if (m) {
                  console.log('[google-meet-grid-view] Successfully hooked into volume detection', v.prototype[k])
                  const p = new Proxy(v.prototype[k], VolumeDetectionProxyHandler(m[1]))
                  p.__grid_ran = true
                  v.prototype[k] = p
                }

                // reflow(unknown, force)
                m = /function\(a,b\){if\(this\.([A-Za-z]+)!==a\|\|\(void 0===b\?0:b\)\)this\.([A-Za-z]+)=a,this\.([A-Za-z]+)\(_\.([A-Za-z]+)\)}/.exec(p.value.toString())
                if (m) {
                  console.log('[google-meet-grid-view] Successfully hooked into reflow trigger', v.prototype[k])
                  const p = new Proxy(v.prototype[k], ReflowProxyHandler())
                  p.__grid_ran = true
                  v.prototype[k] = p
                }

                m = /function\(a\){return .*\.appendChild\(/.exec(p.value.toString())
                if (m) {
                  console.log('[google-meet-grid-view] Successfully hooked into append handler', v.prototype[k])
                  const p = new Proxy(v.prototype[k], AppendProxyHandler())
                  p.__grid_ran = true
                  v.prototype[k] = p
                }
              }
            }
          }
          if (v && typeof v === 'function' && !v.__grid_ran) {
            m = /function\(a,b,c\){return!0===c\?/.exec(v.toString())
            if (m) {
              console.log('[google-meet-grid-view] Successfully hooked into chat/bottom-bar toggle', v)
              const p = new Proxy(v, ToggleProxyHandler())
              p.__grid_ran = true
              window.default_MeetingsUi[_k] = p
            }

            m = /function\(a,b\){a\.style\.display=b\?/.exec(v.toString())
            if (m) {
              console.log('[google-meet-grid-view] Successfully hooked into caption toggle', v)
              const p = new Proxy(v, CaptionProxyHandler())
              p.__grid_ran = true
              window.default_MeetingsUi[_k] = p
            }

            m = /\.([A-Za-z]+)\.get\(.*window\.innerWidth,window\.innerHeight\)\);[A-Za-z]+=[A-Za-z]+\.([A-Za-z]+)\(/.exec(v.toString())
            if (m) {
              console.log('[google-meet-grid-view] Successfully hooked into rendering pipeline v2', v)
              const p = new Proxy(v, RefreshVideoProxyHandlerV2(m[1], m[2]))
              p.__grid_ran = true
              window.default_MeetingsUi[_k] = p
            }
          }
        }
      }

      // Auto-enable
      if (firstRun && container && buttons) {
        firstRun = false
        if (settings['auto-enable']) updateSetting('enabled', true)
      }
    }, 1000)

    // This overrides the function that handles laying out video.
    // All we do here is install another proxy on the Map that returns which layout to use
    function RefreshVideoProxyHandler(objKey, funcKey) {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (!thisArg[objKey].__grid_ran) {
            const p = new Proxy(thisArg[objKey], LayoutVideoProxyHandler(thisArg, funcKey))
            p.__grid_ran = true
            thisArg[objKey] = p
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }
    function RefreshVideoProxyHandlerV2(objKey, funcKey) {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (!argumentsList[0][objKey].__grid_ran) {
            const p = new Proxy(argumentsList[0][objKey], LayoutVideoProxyHandler(argumentsList[0], funcKey))
            p.__grid_ran = true
            argumentsList[0][objKey] = p
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    // This overrides the Map that returns which layout to use, as called by the above Proxy
    // If grid view is enabled we always try to call our custom layout function.
    // If our layout function errors, or grid view is disabled, we return the actual function.
    function LayoutVideoProxyHandler(parent, funcKey) {
      return {
        get: function (target, name) {
          let ret = Reflect.get(target, name)
          if (typeof ret === 'function') {
            ret = ret.bind(target)
          }

          if (settings['enabled'] && name == 'get') {
            return idx => ({
              [funcKey]: (videoOrdering, windowData) => {
                try {
                  return GridLayout.call(parent, videoOrdering, windowData)
                } catch (e) {
                  console.error(e)
                  return ret(idx)[funcKey](videoOrdering, windowData)
                }
              },
            })
          }

          return ret
        },
      }
    }

    // This overrides the volume detection code that powers the wiggly bars next to each participant's name
    // We still call the underlying function, but if grid view is enabled we also add or remove a class to the
    // video container depending on volume level. This allows us to add visual effects like a border.
    function VolumeDetectionProxyHandler(objKey) {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (!thisArg.isDisposed()) {
            if (!thisArg.__grid_videoElem) {
              for (let v of Object.values(thisArg)) {
                if (v instanceof HTMLElement) {
                  thisArg.__grid_videoElem = v.parentElement.parentElement.parentElement
                }
              }
            }
            if (thisArg.__grid_videoElem.dataset.allocationIndex) {
              if (thisArg[objKey].getVolume() > 0 && settings['enabled'] && settings['highlight-speaker']) {
                thisArg.__grid_videoElem.classList.add('__gmgv-speaking')
              } else {
                thisArg.__grid_videoElem.classList.remove('__gmgv-speaking')
              }
            }
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    function ToggleProxyHandler() {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (argumentsList.length === 3 && container) {
            const elems = Object.values(argumentsList[0])
              .filter(v => Array.isArray(v))
              .flat()
              .filter(v => v instanceof HTMLElement)
            const v = argumentsList[2]
            if (elems.length === 1) {
              const el = elems[0]
              if (el.parentElement === container.parentElement.parentElement && el.clientWidth === 320) {
                container.classList.toggle('__gmgv-chat-enabled', v)
              }
              if (el.parentElement === container.parentElement.parentElement && el.clientHeight === 88) {
                container.classList.toggle('__gmgv-bottombar-enabled', v)
              }
            }
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    function CaptionProxyHandler() {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (argumentsList.length === 2 && container) {
            const el = argumentsList[0]
            const v = argumentsList[1]
            if (el.parentElement === container.parentElement.parentElement) {
              container.classList.toggle('__gmgv-captions-enabled', v)
            }
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    function ReflowProxyHandler() {
      return {
        apply: function (target, thisArg, argumentsList) {
          forceReflow = () => {
            // reflow.call(this, unknown, force)
            target.call(thisArg, true, true)
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    function AppendProxyHandler() {
      return {
        apply: function (target, thisArg, argumentsList) {
          // Detect when a participant video is added
          if (argumentsList.length === 1 && argumentsList[0] && argumentsList[0].dataset && argumentsList[0].dataset.allocationIndex) {
            const v = argumentsList[0]
            injectHideButton(v)
            if (settings['enabled']) {
              const i = +v.dataset.allocationIndex
              lastStyles[i].el = v
              applyStyles(lastStyles[i])
            }
          }
          // Detect when participant options are expanded
          const participantOptions = Object.values(thisArg)
            .map(Object.values)
            .flat()
            .filter(v => v && v instanceof HTMLElement && v.dataset.sortKey)
          if (participantOptions.length === 1) {
            const v = Object.values(argumentsList[0]).map(Object.values).flat()[0]
            injectShowHideButton(v, participantOptions[0])
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    // This is a custom layout function to power grid view.
    // Notably it forces every participant to load (or just those with video in only-video mode)
    // and consistently sorts by participant name (rather than who has talked last)
    function GridLayout(orderingInput) {
      // Extract constructors from the Meets code
      const VideoList = orderingInput.constructor
      const VideoElem = Object.values(window.default_MeetingsUi)
        .filter(i => typeof i === 'function')
        .filter(i => i.toString().includes('.attribution'))[0]

      // Figure out what field of VideoElem is used to store the participant data
      const magicKey = Object.entries(new VideoElem(999)).find(e => e[1] === 999)[0]

      // Convert participant data to a VideoElem and add to the list
      // but only if it hasn't already been added. Also run a callback if provided.
      const addUniqueVideoElem = (a, b) => {
        if (b && !a.some(e => e[magicKey] === b)) {
          a.push(new VideoElem(b, { attribution: !settings['screen-capture-mode'] }))
        }
      }

      // Convience function
      const isSpacesStr = i => typeof i === 'string' && i.startsWith('spaces/')

      // This allows us to set values without knowing the property key
      // Important because the keys keep changing but the types don't.
      // magicSet(true) enables the "You're presenting to everyone" screen
      // magicSet(1 || 2) ensures multiple screens can be shown. Unsure the difference between 1 and 2
      const magicSet = val => {
        return elem => {
          for (const [k, v] of Object.entries(elem)) {
            if (typeof v === typeof val && k !== 'attribution') {
              elem[k] = val
            }
          }
        }
      }

      // Finds the listing of map keys, and the object that contains it
      let videoKeys, importantObject
      for (let v of Object.values(this)) {
        if (v && typeof v === 'object') {
          for (let vv of Object.values(v)) {
            if (Array.isArray(vv) && vv.length && vv.every(isSpacesStr)) {
              if (videoKeys && vv != videoKeys) {
                console.log('Invalid videoKeys search!', videoKeys, vv)
                throw new Error('Failed')
              } else {
                videoKeys = vv
                importantObject = v
              }
            }
          }
        }
      }
      if (!importantObject) {
        throw new Error('No other participants, using default layout')
      }

      // Reusing the object we found earlier, find the map of participant data
      let videoMap
      for (let v of Object.values(importantObject)) {
        if (v instanceof Map && v.size && Array.from(v.keys()).every(isSpacesStr)) {
          videoMap = v
        }
      }

      // Find our own participant data
      let ownVideo = null
      for (let v of Object.values(importantObject)) {
        if (v && typeof v === 'object' && v.$goog_Thenable) {
          for (let vv of Object.values(v)) {
            if (isSpacesStr(vv)) {
              ownVideo = videoMap.get(vv) || null
            }
          }
        }
      }
      ownID = ownVideo.id

      // Use the map & map keys we found earlier to add every participant
      let ret = []
      for (const v of videoKeys) {
        addUniqueVideoElem(ret, videoMap.get(v))
      }
      if (settings['include-own-video']) {
        addUniqueVideoElem(ret, ownVideo)
      }

      // If in only-video mode, remove any without video
      if (settings['show-only-video'] && !settings['screen-capture-mode']) {
        // ret[idx][magicKey].wr.Aa.Aa.Ca.Ea.Ws.Ea.state // mu (no) li (yes)
        const tests = [/\.call\(this\)/, /\.call\(this,.*,"a"\)/, /new Set;this\.\w+=new _/, /new Map.*new Set/, /"un".*"li"/, /new Map/, /Object/]
        ret = ret.filter(e => {
          let values = [e[magicKey]]
          for (let t of tests) {
            let newValues = []
            for (let v of values) {
              newValues = newValues.concat(Object.values(v).filter(vv => vv && vv.constructor && t.test(vv.constructor.toString())))
            }
            values = newValues
          }
          return values.some(v => v && v.state && v.state === 'li')
        })
      }

      // Remove all those explicitly hidden
      const activeIDs = new Set(ret.map(v => v[magicKey].getId()))
      ret = ret.filter(e => !hiddenIDs.has(e[magicKey].id))

      // Allocate slots for screen capture mode
      const hiddenSize = Array.from(screenCaptureModeLookup.values()).filter(v => hiddenIDs.has(v.id)).length
      if (settings['screen-capture-mode']) {
        // Remove gaps caused by hidden elements
        let fullOrdering = []
        screenCaptureModeLookup.forEach(v => {
          v.active = activeIDs.has(v.id)
          v.hidden = hiddenIDs.has(v.id)
          if (!v.hidden) fullOrdering[v.order] = v
        })
        let hiddenOffset = 0
        for (let i = 0; i < fullOrdering.length; i++) {
          if (fullOrdering[i]) {
            fullOrdering[i].order -= hiddenOffset
            screenCaptureModeAllocations.set(fullOrdering[i].id, fullOrdering[i].order)
          } else {
            hiddenOffset++
          }
        }

        ret = ret.filter(v => {
          const participant = v[magicKey]
          const id = participant.getId()
          const name = participant.getName()
          const presenting = !!participant.parent

          if (screenCaptureModeAllocations.has(id)) return true

          for (let dedupeID = 0; dedupeID <= screenCaptureModeLookup.size; dedupeID++) {
            const key = `${name}|${presenting}|${dedupeID}`
            let l = screenCaptureModeLookup.get(key)
            if (l && l.active && l.id !== id) continue
            if (!l) l = { order: screenCaptureModeLookup.size - hiddenSize }
            l.active = true
            l.id = id
            screenCaptureModeLookup.set(key, l)
            if (l.hidden) {
              hiddenIDs.add(id)
              return false
            }
            screenCaptureModeAllocations.set(id, l.order)
            return true
          }
        })

        for (let id of screenCaptureModeAllocations.keys()) {
          if (!activeIDs.has(id)) screenCaptureModeAllocations.delete(id)
        }
      }

      // If there are no participants, add ourselves
      if (!ret.length) {
        addUniqueVideoElem(ret, ownVideo)
      }

      // sort by participant name, or video id if the name is the same (when someone is presenting)
      ret.sort((a, b) => a[magicKey].name.localeCompare(b[magicKey].name) || a[magicKey].id.localeCompare(b[magicKey].id))

      // Set Pinned Index for use in CSS loop. If there is no pin, use the presenter if available
      let pinnedIndex = ret.findIndex(v => v[magicKey].isPinned())
      if (pinnedIndex < 0) {
        pinnedIndex = ret.findIndex(v => !!v[magicKey].parent)
      }

      // Set video quality based on estimated video height
      // 0=highest 1=low 2=high
      const size = calculateVideoSize(ret.length, pinnedIndex >= 0)
      const setVideoQuality = magicSet(settings['screen-capture-mode'] ? 0 : size.height >= 200 ? 2 : 1)
      ret.forEach(setVideoQuality)

      // Build CSS changes
      let { cols, rows } = size
      if (settings['screen-capture-mode']) {
        cols = rows = Math.ceil(Math.sqrt(screenCaptureModeLookup.size - hiddenSize))
        const mul = Math.floor(Math.min((innerWidth - 327) / (cols * 16), (innerHeight - 140) / (cols * 9)))
        container.style.marginLeft = `${innerWidth - 325 - mul * cols * 16}px`
        container.style.marginTop = `${innerHeight - 140 - mul * cols * 9}px`
      } else {
        container.style.marginLeft = ''
        container.style.marginTop = ''
      }
      container.classList.toggle('__gmgv-screen-capture-mode', settings['screen-capture-mode'])
      container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
      container.style.gridTemplateRows = settings['screen-capture-mode'] ? `repeat(${rows}, 1fr)` : ''

      const divTests = [/this\.src=/, /Object/, /Array/, /this\.listener=/, /\.model.*\(this\)/, /HTMLDivElement/]
      const children = ret.map(e => {
        let values = [e[magicKey]]
        for (let t of divTests) {
          let newValues = []
          for (let v of values) {
            newValues = newValues.concat(Object.values(v).filter(vv => vv && vv.constructor && t.test(vv.constructor.toString())))
          }
          values = newValues
        }
        return values.filter(v => v.parentElement === container)[0]
      })

      lastStyles = []
      for (let i = 0; i < ret.length; i++) {
        const v = (lastStyles[i] = { el: children[i] })
        if (settings['screen-capture-mode']) {
          const idx = screenCaptureModeAllocations.get(ret[i][magicKey].getId())
          v.order = ''
          v.gridArea = `${1 + Math.floor(idx / cols)} / ${1 + (idx % cols)}` // row / column
        } else if (i === pinnedIndex) {
          const spanCols = Math.ceil(cols / 2)
          const spanRows = Math.floor((cols * rows - (ret.length - 1)) / spanCols)
          v.order = -1
          v.gridArea = `span ${spanRows} / span ${spanCols}`
        } else {
          v.order = i
          v.gridArea = ''
        }
      }

      lastStyles.forEach(applyStyles)

      // Build a video list from the ordered output
      return new VideoList(ret)
    }

    function calculateVideoSize(n, hasPin) {
      let sizes = []
      const w = (innerWidth - 4) / 14
      const h = (innerHeight - 52) / 9
      for (let cols = 1; cols <= 30; cols++) {
        const rows = !hasPin ? Math.ceil(n / cols) : Math.ceil((Math.ceil(cols / 2) ** 2 + n - 1) / cols)
        // If hasPin, calculate the actual minimum area of the pin (1/4th screen) and see if it fits
        const canFit = Math.ceil(rows / 2) * Math.ceil(cols / 2) + n - 1 <= rows * cols
        if (hasPin && !canFit) continue
        const size = Math.min(w / cols, h / rows)
        sizes.push({
          cols,
          rows,
          size,
          height: (innerHeight - 52) / rows,
        })
      }
      return sizes.reduce((a,b) => a.size >= b.size ? a : b, {})
    }

    function applyStyles({ el, order, gridArea }) {
      if (!el) return
      el.style.order = order
      el.style.gridArea = gridArea
    }

    function injectHideButton(el) {
      const buttons = el.children[el.children.length - 1].children[0]
      const firstButton = buttons.children[0].children[0]
      const b = document.createElement('div')
      b.classList = '__gmgv-hide'
      b.innerHTML = `
        <div class="${firstButton.classList}">
          <span class="${firstButton.children[1].classList}">
            <svg viewBox="0 0 24 24">${visibilityOn}</svg>
          </span>
          <div>${T('hideParticipant')}</div>
        </div>
      `
      b.onclick = e => {
        e.preventDefault()
        const id = el.dataset.requestedParticipantId
        if (id === ownID) {
          updateSetting('include-own-video', false)
        } else {
          hiddenIDs.add(id)
          forceReflow()
        }
      }
      buttons.appendChild(b)
    }

    function injectShowHideButton(el, parent) {
      const id = parent.dataset.participantId
      const hidden = hiddenIDs.has(id)
      const refButton = el.lastChild.children[0]
      parent.parentElement.parentElement.style.overflow = 'visible'
      el.style.overflow = 'visible'
      const b = document.createElement('div')
      b.classList = '__gmgv-show-hide'
      b.style.display = settings['enabled'] ? '' : 'none'
      b.innerHTML = `
      <div class="${refButton.classList}">
        <span class="${refButton.children[1].classList}">
          <svg viewBox="0 0 24 24">${hidden ? visibilityOff : visibilityOn}</svg>
        </span>
        <div>${hidden ? T('showParticipant') : T('hideParticipant')}</div>
      </div>
      `
      b.onclick = e => {
        e.preventDefault()
        if (hiddenIDs.has(id)) {
          hiddenIDs.delete(id)
        } else {
          hiddenIDs.add(id)
        }
        b._refresh()
        forceReflow()
      }
      b._refresh = () => {
        const hidden = hiddenIDs.has(id)
        b.querySelector('.__gmgv-show-hide > div > div').innerHTML = hidden ? T('showParticipant') : T('hideParticipant')
        b.querySelector('svg').innerHTML = hidden ? visibilityOff : visibilityOn
      }
      el.insertBefore(b, el.lastChild)
    }

    function updateSetting(name, value) {
      settings[name] = value
      localStorage.setItem('gmgv-' + name, value)

      // Update the menu CSS
      if (toggleButton) {
        toggleButton.querySelector('svg').innerHTML = settings['enabled'] ? gridOn : gridOff
        if (name !== 'enabled') toggleButton.querySelector(`input[data-gmgv-setting="${name}"]`).checked = value

        const showOnlyVideo = toggleButton.querySelector('input[data-gmgv-setting="show-only-video"]')
        showOnlyVideo.checked = settings['show-only-video'] && !settings['screen-capture-mode']
        showOnlyVideo.disabled = settings['screen-capture-mode']
        showOnlyVideo.parentElement.classList.toggle('disabled', settings['screen-capture-mode'])

        const highlightSpeaker = toggleButton.querySelector('input[data-gmgv-setting="highlight-speaker"]')
        highlightSpeaker.checked = settings['highlight-speaker'] && !settings['screen-capture-mode']
        highlightSpeaker.disabled = settings['screen-capture-mode']
        highlightSpeaker.parentElement.classList.toggle('disabled', settings['screen-capture-mode'])
      }

      // Update container CSS
      if (container) {
        container.classList.toggle('__gmgv-vid-container', settings['enabled'])
        if (!settings['enabled']) {
          container.style.marginLeft = ''
          container.style.marginTop = ''
        }
      }

      // Update participant menu CSS
      document.querySelectorAll('.__gmgv-show-hide').forEach(el => {
        el.style.display = settings['enabled'] ? '' : 'none'
        el._refresh()
      })

      // Reset the screen capture mappings to reduce clutter on toggle
      if (!settings['screen-capture-mode']) {
        screenCaptureModeAllocations = new Map()
        screenCaptureModeLookup = new Map()
      }
      if (!settings['enabled']) {
        hiddenIDs = new Set()
      }

      // Force a reflow to pick up the new settings
      forceReflow()
    }

    // Extension communication
    window.addEventListener('message', event => {
      if (event.source !== window) return // Only accept messages from ourselves
      if (event.data.sender !== 'gmgv_content') return
      try {
        switch (event.data.type) {
          case 'getState':
            window.postMessage({
              id: event.data.id,
              sender: 'gmgv_user',
              inMeeting: !!container,
              settings,
            })
            break
          case 'updateSetting':
            updateSetting(event.data.name, event.data.value)
            window.postMessage({
              id: event.data.id,
              sender: 'gmgv_user',
              success: true,
            })
            break
          default:
            window.postMessage({
              id: event.data.id,
              sender: 'gmgv_user',
              error: 'unknown message',
            })
            break
        }
      } catch (error) {
        window.postMessage({
          id: event.data.id,
          sender: 'gmgv_user',
          error,
        })
      }
    })
  }
})()
