const Thisproject = (() => {
  
  'use strict';
  let
  flag,
  func,
  setting_button_html,
  pokedex_html,
  movedex_html,
  pokeAddMoves_html,
  moveAddPokes_html,
  decision_html,
  decision_button,
  area_setting,
  area_pokedex,
  area_movedex,
  area_pokeAddMoves,
  area_moveAddPokes,
  windowURL,
  optionURL,
  reloadURL,
  queryString,
  url_params,
  body_css,
  selected_languageButton,
  selected_windowButton,
  selected_imageButton,
  trans_mode_language,
  trans_mode_window,
  trans_mode_image,
  languageLabel,
  windowLabel,
  imageLabel,
  jap_or_eng,
  bright_or_dark,
  normal_or_shiny,
  active;
  
  const conf = {
    setting_command: `setting-command`,
    decision_button: `decision-button`,
    button_command01: `button-command01`,
    button_command02: `button-command02`,
    button_command03: `button-command03`,
    button_command04: `button-command04`,
  };
  func = {
    init: function (){
      flag = true;
      if(localStorage.getItem('language') == undefined)
      {
        jap_or_eng = 'jap';
      }
      else
      {
        jap_or_eng = localStorage.getItem('language');
      }
      if(localStorage.getItem('window') == undefined)
      {
        bright_or_dark = 'bright';
      }
      else
      {
        bright_or_dark = localStorage.getItem('window');
      }
      if(localStorage.getItem('image') == undefined)
      {
        normal_or_shiny = 'normal';
        get_mode_image = null;
      }
      else
      {
        normal_or_shiny = localStorage.getItem('image');
      }
      body_css = document.body;
      return this;
    },
    getUrlParameters: function() {
      if(flag){
        windowURL = 'index.html';
        queryString = window.location.search;
        url_params = new URLSearchParams(queryString);
        
        if (url_params.get('language')) {
          jap_or_eng = url_params.get('language').replace('${', '').replace('}', '');
        }
        if (url_params.get('window')) {
          bright_or_dark = url_params.get('window').replace('${', '').replace('}', '');
        }
        if (url_params.get('image')) {
          normal_or_shiny = url_params.get('image').replace('${', '').replace('}', '');
        }
        return this;
      }
    },
    makeSettingCommand: function(){
      if(flag){
        setting_button_html =
        `
        <div class="setting-command">
          <div class="toggle_button">
            <input type="checkbox" id="languageButton" class="toggle_input">
            <label for="languageButton" class="toggle_label"></label>
          </div>
          <div class="toggle_button">
            <input type="checkbox" id="windowButton" class="toggle_input">
            <label for="windowButton" class="toggle_label"></label>
          </div>
          <div class="toggle_button">
            <input type="checkbox" id="imageButton" class="toggle_input">
            <label for="imageButton" class="toggle_label"></label>
          </div>
        </div>
        `;

        area_setting = document.querySelector(`[${conf.setting_command}]`);

        area_setting.insertAdjacentHTML('beforeend', setting_button_html);

        selected_languageButton = document.getElementById('languageButton');
        selected_windowButton = document.getElementById('windowButton');
        selected_imageButton = document.getElementById('imageButton');
    
        languageLabel = document.querySelector('.toggle_button:nth-child(1) .toggle_label');
        windowLabel = document.querySelector('.toggle_button:nth-child(2) .toggle_label');
        imageLabel = document.querySelector('.toggle_button:nth-child(3) .toggle_label');
        
        languageLabel.id = 'languageLabel';
        windowLabel.id = 'windowLabel';
        imageLabel.id = 'imageLabel';
        
        selected_languageButton.addEventListener('click', func.updateLabels);
        selected_windowButton.addEventListener('click', func.updateLabels);
        selected_imageButton.addEventListener('click', func.updateLabels);
      }
      return this;
    },
    reflectMode: function() {
      const languageButton = document.getElementById('languageButton');
      const windowButton = document.getElementById('windowButton');
      const imageButton = document.getElementById('imageButton');

      switch(jap_or_eng){
        case 'jap':
          languageButton.checked = true;
          break;
        case 'eng':
          languageButton.checked = false;
          break;
        default:
          break;
      }
      switch(bright_or_dark){
        case 'bright':
          windowButton.checked = true;
          body_css.classList.add('bright-mode');
          body_css.classList.remove('dark-mode');
          break;
        case 'dark':
          windowButton.checked = false;
          body_css.classList.add('dark-mode');
          body_css.classList.remove('bright-mode');
          break;
        default:
          break;
      }
      switch(normal_or_shiny){
        case 'normal':
          imageButton.checked = true;
          break;
        case 'shiny':
          imageButton.checked = false;
          break;
        default:
          break;
      }

      this.updateLabels();

      return this;
    },
    updateLabels: function() {
      const languageButton = document.getElementById('languageButton');
      const windowButton = document.getElementById('windowButton');
      const imageButton = document.getElementById('imageButton');
      const languageLabel = languageButton.nextElementSibling;
      const windowLabel = windowButton.nextElementSibling;
      const imageLabel = imageButton.nextElementSibling;

      switch(jap_or_eng)
      {
        case 'jap':
          languageLabel.textContent = '日本語';
          switch(bright_or_dark)
          {
            case 'bright':
              windowLabel.textContent = 'ブライト';
              break;
            case 'dark':
              windowLabel.textContent = 'ダーク';
              break;
            default:
              break;
          }
          switch(normal_or_shiny)
          {
            case 'normal':
              imageLabel.textContent = '通常';
              break;
            case 'shiny':
              imageLabel.textContent = '色違い';
              break;
            default:
              break;
          }
          break;
        case 'eng':
          languageLabel.textContent = 'English';
          switch(bright_or_dark)
          {
            case 'bright':
              windowLabel.textContent = 'Bright';
              break;
            case 'dark':
              windowLabel.textContent = 'Dark';
              break;
            default:
              break;
          }
          switch(normal_or_shiny)
          {
            case 'normal':
              imageLabel.textContent = 'Normal';
              break;
            case 'shiny':
              imageLabel.textContent = 'Shiny';
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      
      languageLabel.textContent = languageButton.checked ? '日本語' : 'English';
      windowLabel.textContent = windowButton.checked ? (languageButton.checked ? 'ブライト' : 'Bright') : (languageButton.checked ? 'ダーク' : 'Dark');
      imageLabel.textContent = imageButton.checked ? (languageButton.checked ? '通常' : 'Normal') : (languageButton.checked ? '色違い' : 'Shiny');
      
      switch(windowLabel.innerText)
      {
        case 'Bright':
        case 'ブライト':
          body_css.classList.add('bright-mode');
          body_css.classList.remove('dark-mode');
          break;
        case 'Dark':
        case 'ダーク':
          body_css.classList.add('dark-mode');
          body_css.classList.remove('bright-mode');
          break;
        default:
          break;
        }
    },
    makeDecisionButton: function() {
      if (flag) {
        decision_html = `
          <div class="decision-command">
            <button id="buttonWithImage">
              <a id="decisionButton" href="index.html">
                <img src="image/roll.jpeg" height="30px" width="30px">
              </a>
            </button>
          </div>
        `;
    
        area_setting = document.querySelector(`[${conf.decision_button}]`);
        area_setting.insertAdjacentHTML('beforeend', decision_html);
    
        selected_languageButton = document.getElementById('languageButton');
        selected_windowButton = document.getElementById('windowButton');
        selected_imageButton = document.getElementById('imageButton');
      
        languageLabel = document.querySelector('.toggle_button:nth-child(1) .toggle_label');
        windowLabel = document.querySelector('.toggle_button:nth-child(2) .toggle_label');
        imageLabel = document.querySelector('.toggle_button:nth-child(3) .toggle_label');
      
        languageLabel.id = 'languageLabel';
        windowLabel.id = 'windowLabel';
        imageLabel.id = 'imageLabel';
      
        selected_languageButton.addEventListener('click', func.updateLabels);
        selected_windowButton.addEventListener('click', func.updateLabels);
        selected_imageButton.addEventListener('click', func.updateLabels);
    
        decision_button = document.querySelector(`[${conf.decision_button}]`);
    
        document.getElementById('decisionButton').addEventListener('click', func.buttonReloadURL);
      }
      return this;
    },
    windowReloadURL: function() {
      if (flag) {
        active = true;
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
    
        jap_or_eng = languageButton.checked ? 'jap' : 'eng';
        bright_or_dark = windowButton.checked ? 'bright' : 'dark';
        normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
        // パラメータをURLに設定
        optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;
        reloadURL = windowURL + optionURL;
    
        // パラメータが同じでない場合のみリロード
        if (window.location.search !== optionURL) {
          window.location.href = reloadURL;
        }
      }
    },
    buttonReloadURL: function() {
      if (flag) {
        active = true;
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
    
        jap_or_eng = languageButton.checked ? 'jap' : 'eng';
        bright_or_dark = windowButton.checked ? 'bright' : 'dark';
        normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';

        // パラメータをURLに設定
        optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        reloadURL = windowURL + optionURL;
    
        // URLを更新し、ページのリロードを抑制
        history.pushState({}, '', reloadURL);
        trans_mode_language = jap_or_eng;
        trans_mode_window = bright_or_dark;
        trans_mode_image = normal_or_shiny;
        // ローカルストレージにlanguage, window, imageを保存
        localStorage.setItem('language', trans_mode_language);
        localStorage.setItem('window', trans_mode_window);
        localStorage.setItem('image', trans_mode_image);
        // ページをリロード
        location.reload();
      }
    },
    makePokedexButton: function(){
      if(flag){
        switch(jap_or_eng) {
          case 'jap':
            pokedex_html = `<button class="a" id="button1"><a href="pokedex.html?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}"><span>ポケモン図鑑</span></a></button>`;
            break;
          case 'eng':
            pokedex_html = `<button class="a" id="button1"><a href="pokedex.html?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}"><span>Pokédex</span></a></button>`;
            break;
          default:
            break;
        }
        
        area_pokedex = document.querySelector(`[${conf.button_command01}]`);
        area_pokedex.insertAdjacentHTML('beforeend', pokedex_html);
        return this;
      }
    },
    
    loadPokedex: function() {
      if (flag) {
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
    
        const jap_or_eng = languageButton.checked ? 'eng' : 'jap'; // Note: Adjusted to 'eng' for English link
        const bright_or_dark = windowButton.checked ? 'dark' : 'bright'; // Note: Adjusted to 'dark' for Dark mode link
        const normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
        // パラメータをURLに設定
        const optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        const reloadURL = 'pokedex.html' + optionURL;
    
        // URLを更新し、ページのリロードを抑制
        history.pushState({}, '', reloadURL);
        // ローカルストレージにlanguage, window, imageを保存
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);
        // ページをリロード
        location.reload();
      }
    },
    makeMovedexButton: function(){
      if(flag){
        switch(jap_or_eng) {
          case 'jap':
            movedex_html = `<button class="b" id="button2"><a href="movedex.html?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}"><span>わざ図鑑</span></a></button>`;
            break;
          case 'eng':
            movedex_html = `<button class="b" id="button2"><a href="movedex.html?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}"><span>Movedex</span></a></button>`;
            break;
          default:
            break;
        }
        
        area_movedex = document.querySelector(`[${conf.button_command02}]`);
        area_movedex.insertAdjacentHTML('beforeend', movedex_html);
        return this;
      }
    },
    loadMovedex: function() {
      if (flag) {
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
    
        const jap_or_eng = languageButton.checked ? 'eng' : 'jap'; // Note: Adjusted to 'eng' for English link
        const bright_or_dark = windowButton.checked ? 'dark' : 'bright'; // Note: Adjusted to 'dark' for Dark mode link
        const normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
        // パラメータをURLに設定
        const optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        const reloadURL = 'movedex.html' + optionURL;
    
        // URLを更新し、ページのリロードを抑制
        history.pushState({}, '', reloadURL);
        // ローカルストレージにlanguage, window, imageを保存
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);
        // ページをリロード
        location.reload();
      }
    },
    makePokeAddMovesButton: function(){
      if(flag){
        switch(jap_or_eng) {
          case 'jap':
            pokeAddMoves_html = `<button class="c" id="button3"><a href="pokeAddMoves.html?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}"><span>ポケわざ登録画面</span></a></button>`;
            break;
          case 'eng':
            pokeAddMoves_html = `<button class="c" id="button3"><a href="pokeAddMoves.html?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}"><span>PokeAddMoves</span></a></button>`;
            break;
          default:
            break;
        }
        
        area_pokeAddMoves = document.querySelector(`[${conf.button_command03}]`);
        area_pokeAddMoves.insertAdjacentHTML('beforeend', pokeAddMoves_html);
        return this;
      }
    },
    
    loadPokeAddMove: function() {
      if (flag) {
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
    
        const jap_or_eng = languageButton.checked ? 'eng' : 'jap'; // Note: Adjusted to 'eng' for English link
        const bright_or_dark = windowButton.checked ? 'dark' : 'bright'; // Note: Adjusted to 'dark' for Dark mode link
        const normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
        // パラメータをURLに設定
        const optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        const reloadURL = 'pokeAddMoves.html' + optionURL;
    
        // URLを更新し、ページのリロードを抑制
        history.pushState({}, '', reloadURL);
        // ローカルストレージにlanguage, window, imageを保存
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);
        // ページをリロード
        location.reload();
      }
    },
    makeMoveAddPokesButton: function(){
      if(flag){
        switch(jap_or_eng) {
          case 'jap':
            moveAddPokes_html = `<button class="d" id="button4"><a href="moveAddPokes.html?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}"><span>わざポケ登録画面</span></a></button>`;
            break;
          case 'eng':
            moveAddPokes_html = `<button class="d" id="button4"><a href="moveAddPokes.html?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}"><span>MoveAddPokés</span></a></button>`;
            break;
          default:
            break;
        }
        
        area_moveAddPokes = document.querySelector(`[${conf.button_command04}]`);
        area_moveAddPokes.insertAdjacentHTML('beforeend', moveAddPokes_html);
        return this;
      }
    },
    
    loadMoveAddPoke: function() {
      if (flag) {
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
    
        const jap_or_eng = languageButton.checked ? 'eng' : 'jap'; // Note: Adjusted to 'eng' for English link
        const bright_or_dark = windowButton.checked ? 'dark' : 'bright'; // Note: Adjusted to 'dark' for Dark mode link
        const normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
        // パラメータをURLに設定
        const optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        const reloadURL = 'moveAddPokes.html' + optionURL;
    
        // URLを更新し、ページのリロードを抑制
        history.pushState({}, '', reloadURL);
        // ローカルストレージにlanguage, window, imageを保存
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);
        // ページをリロード
        location.reload();
      }
    }
  };
  active = () => {
    func
      .init()
      .getUrlParameters()
      .makeSettingCommand()
      .makePokedexButton()
      .makeMovedexButton()
      .makePokeAddMovesButton()
      .makeMoveAddPokesButton()
      .reflectMode()
      .makeDecisionButton()
      .windowReloadURL();
    return;
  };
  return { active };
})();

window.addEventListener('load', function (){
  Thisproject.active();
});