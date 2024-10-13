const Thisproject = (() => {
  'use strict';
  
  let
  func,
  flag,
  active,
  poke_count,
  poke_pokeid,
  poke_autonum,
  poke_number,
  poke_namae,
  poke_name,
  poke_sugata,
  poke_form,
  poke_bunrui,
  poke_classification,
  poke_taipu1,
  poke_type1,
  poke_taipu2,
  poke_type2,
  poke_tokusei1,
  poke_ability1,
  poke_tokusei2,
  poke_ability2,
  poke_yume_tokusei,
  poke_hidden_ability,
  poke_tamago_group1,
  poke_egg_group1,
  poke_tamago_group2,
  poke_egg_group2,
  poke_gender,
  poke_chiho,
  poke_region,
  poke_sedai,
  poke_generation,
  poke_hp,
  poke_attack,
  poke_defense,
  poke_sp_atk,
  poke_sp_def,
  poke_speed,
  poke_sum,
  poke_path_normal_front,
  poke_path_shiny_front,
  poke_path_typechart_bright,
  poke_path_typechart_dark,
  pokemonListContainer,
  scroll_position,
  scrollPosition,

  move_autonum,
  move_moveid,
  move_waza,
  move_name,
  move_type_id,
  move_taipu,
  move_type,
  move_bunrui,
  move_category,
  move_pp,
  move_power,
  move_accuracy,
  move_sedai,
  move_generation,
  move_type_path,
  
  area_setting,
  decision_button,
  data_curosr,
  data0_profile,
  data1_table,
  data2_table,
  data3_table,
  data4_iframe,
  data_cursor,
  
  setting_button_html,
  decision_html,
  poke_data0_html,
  poke_data1_html,
  poke_data2_html,
  poke_data3_html,
  poke_data4_iframe,
  poke_move_edit,
  poke_move_data,
  poke_buttons_cursor,

  windowURL,
  optionURL,
  newURL,
  body_css,
  selected_languageButton,
  selected_windowButton,
  selected_imageButton,
  languageLabel,
  windowLabel,
  imageLabel,
  languageButton,
  windowButton,
  imageButton,
  jap_or_eng,
  bright_or_dark,
  normal_or_shiny;
  
  const conf = {
    poke_class_data0: `poke-class-data0`,
    poke_class_data1: `poke-class-data1`,
    poke_class_data2: `poke-class-data2`,
    poke_class_data3: `poke-class-data3`,
    poke_class_data4: `poke-class-data4`,
    poke_class_cursor: `poke-class-cursor`,
    poke_all_data: `poke-all-data`,
    poke_move_data: `poke-move-data`,
    poke_move_edit: `poke-move-edit`,
    setting_command: `setting-command`,
    decision_button: `decision-button`,

    scrollPositionKey: 'scrollPosition',
  };
  func = {
    init: function (){
      flag = true;
      windowURL = 'pokedex.html';

      poke_autonum = 1;

      if((localStorage.getItem('POKE_AUTONUM') != 'NaN') && (localStorage.getItem('POKE_AUTONUM') != 'null'))
      {
        poke_autonum = parseInt(localStorage.getItem('POKE_AUTONUM'));
      }
      

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
      }
      else
      {
        normal_or_shiny = localStorage.getItem('image');
      }
      
      body_css = document.body;


      return this;
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
    makeDecisionButton: function(){
      if(flag){
        decision_html =
        `
        <div class="decision-command">
        <button id="buttonWithImage">
        <a id="decisionButton" href="pokedex.html">
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
        
        decision_button = document.querySelector(`[${conf.decision_button}]`);
        document.getElementById('decisionButton').addEventListener('click', func.buttonReloadURL);
      }
      return this;
    },
    buttonReloadURL: function() {
      if (flag) {
        active = true;
    
        // ボタンの状態を取得
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
    
        jap_or_eng = languageButton.checked ? 'jap' : 'eng';
        bright_or_dark = windowButton.checked ? 'bright' : 'dark';
        normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
        // poke_autonumが未定義の場合は1に設定
        if (poke_autonum === undefined) {
          poke_autonum = 1;
        }
    
        // URLパラメータを生成
        optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        
        // ローカルストレージにlanguage, window, image, poke_autonumを保存
        localStorage.setItem('POKE_AUTONUM', poke_autonum);
        localStorage.setItem('MOVE_AUTONUM', null);
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);

        let currentScrollPosition = pokemonListContainer.scrollLeft;
        localStorage.setItem(conf.scrollPositionKey, currentScrollPosition);
    
        // ページをリロード
        location.reload();
      }
    },
    reflectMode: function() {
      if(flag){
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
        }
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
    makeProfile: function(){
      if(flag){
        data0_profile = document.querySelector(`[${conf.poke_class_data0}]`);
        
        switch(jap_or_eng){
          case 'jap':
            poke_data0_html =
            `
            <div class="profile">
            <img id="poke_path_img" height="280" width="280"></img>
            <br>
            <button id="normal" class-buttons-normal>通常</button>
            <button id="shiny" class-buttons-shiny>色違い</button>
            </div>
            `;
            break;
          case 'eng':
            poke_data0_html =
            `
            <div class="profile">
            <img id="poke_path_img" height="280" width="280"></img>
            <br>
            <button id="normal" class-buttons-normal>Normal</button>
            <button id="shiny" class-buttons-shiny>Shiny</button>
            </div>
            `;
            break;
          default:
            break;
        }
        
        data0_profile.insertAdjacentHTML('beforeend', poke_data0_html);
        
        let normal_button = document.getElementById('normal');
        let shiny_button = document.getElementById('shiny');
        
        if (normal_button && shiny_button)
        {
          normal_button.addEventListener('click', () => func.switchPokemon('normal'));
          shiny_button.addEventListener('click', () => func.switchPokemon('shiny'));
        }
      }
      return this;
    },
    switchPokemon: function(type){
      if(flag){
        if(type === 'normal')
        {
          document.getElementById('poke_path_img').src = poke_path_normal_front;
        }
        else if(type === 'shiny')
        {
          document.getElementById('poke_path_img').src = poke_path_shiny_front;
        }
      }
      return this;
    },
    makeTable1: function(){
      if(flag){
        data1_table = document.querySelector(`[${conf.poke_class_data1}]`);
        
        switch(jap_or_eng)
        {
          case 'jap':
            poke_data1_html =
            `
            <table class="data1" border="4">
            <tr><td width="30%">NO</td>    <td width="70%"><span id="poke_number">${poke_number}</span></td></tr>
            <tr><td width="30%">名前</td>   <td width="70%"><span id="poke_name">${poke_namae}</span></td></tr>
            <tr><td width="30%">フォルム</td><td width="70%"><span id="poke_form">${poke_sugata}</span></td></tr>
            </table>
            `;
            break;
          case 'eng':
            poke_data1_html =
            `
            <table class="data1" border="4">
            <tr><td width="30%">NO</td>    <td width="70%"><span id="poke_number">${poke_number}</span></td></tr>
            <tr><td width="30%">Name</td>   <td width="70%"><span id="poke_name">${poke_name}</span></td></tr>
            <tr><td width="30%">Form</td><td width="70%"><span id="poke_form">${poke_form}</span></td></tr>
            </table>
            `;
            break;
          default:
            break;
        }
        data1_table.insertAdjacentHTML('beforeend', poke_data1_html);
      }
      return this;
    },
    makeTable2: function(){
      if(flag){
        data2_table = document.querySelector(`[${conf.poke_class_data2}]`);
        switch(jap_or_eng)
        {
          case 'jap':
            poke_data2_html =
            `
            <table class="data2" border="4">
            <tr><td width="40%">分類</td>           <td width="60%" colspan="2"><span id="poke_classification">${poke_bunrui}</span></a></td></tr>
            <tr><td width="40%">タイプ</td>          <td width="30%"><span id="poke_type1">${poke_taipu1}</span></td><td width="30%"><span id="poke_type2">${poke_taipu2}</span></td></tr>
            <tr><td width="40%">特性1</td>          <td width="60%" colspan="2"><span id="poke_ability1">${poke_tokusei1}</span></td></tr>
            <tr><td width="40%">特性2</td>          <td width="60%" colspan="2"><span id="poke_ability2">${poke_tokusei2}</span></td></tr>
            <tr><td width="40%">隠れ特性(夢特性)</td> <td width="60%" colspan="2"><span id="poke_hidden_ability">${poke_yume_tokusei}</span></td></tr>
            <tr><td width="40%">性別</td>           <td width="60%" colspan="2"><span id="poke_gender">${poke_gender}</span></td></tr>
            <tr><td width="40%">タマゴグループ</td>  <td width="30%"><span id="poke_egg_group1">${poke_tamago_group1}</span></td><td width="30%"><span id="poke_egg_group2">${poke_tamago_group2}</span></td></tr>
            <tr><td width="40%">地方</td>           <td width="60%" colspan="2"><span id="poke_region">${poke_chiho}</span></td></tr>
            <tr><td width="40%">世代</td>           <td width="60%" colspan="2"><span id="poke_generation">${poke_sedai}</span></td></tr>
            </table>
            `;
            break;
          case 'eng':
            poke_data2_html =
            `
            <table class="data2" border="4">
            <tr><td width="40%">Classification</td> <td width="60%" colspan="2"><span id="poke_classification">${poke_bunrui}</span></a></td></tr>
            <tr><td width="40%">Type</td>           <td width="30%"><span id="poke_type1">${poke_taipu1}</span></td><td width="30%"><span id="poke_type2">${poke_taipu2}</span></td></tr>
            <tr><td width="40%">Ability1</td>       <td width="60%" colspan="2"><span id="poke_ability1">${poke_tokusei1}</span></td></tr>
            <tr><td width="40%">Ability2</td>       <td width="60%" colspan="2"><span id="poke_ability2">${poke_tokusei2}</span></td></tr>
            <tr><td width="40%">Hidden-Ability</td> <td width="60%" colspan="2"><span id="poke_hidden_ability">${poke_yume_tokusei}</span></td></tr>
            <tr><td width="40%">Gender</td>         <td width="60%" colspan="2"><span id="poke_gender">${poke_gender}</span></td></tr>
            <tr><td width="40%">Egg Group</td>      <td width="30%"><span id="poke_egg_group1">${poke_tamago_group1}</span></td><td width="30%"><span id="poke_egg_group2">${poke_tamago_group2}</span></td></tr>
            <tr><td width="40%">Region</td>         <td width="60%" colspan="2"><span id="poke_region">${poke_chiho}</span></td></tr>
            <tr><td width="40%">Generation</td>     <td width="60%" colspan="2"><span id="poke_generation">${poke_sedai}</span></td></tr>
            </table>
            `;
            break;
          default:
            break;
        }
        data2_table.insertAdjacentHTML('beforeend', poke_data2_html);
      }
      return this;
    },
    makeTable3: function(){
      if(flag){
        data3_table = document.querySelector(`[${conf.poke_class_data3}]`);
        
        switch(jap_or_eng)
        {
          case 'jap':
            poke_data3_html =
            `
            <table class="data3" border="4">
            <tr><td>HP</td>     <td><span id="poke_hp">${poke_hp}</span></td></tr>
            <tr><td>攻撃</td>    <td><span id="poke_attack">${poke_attack}</span></td></tr>
            <tr><td>防御</td>    <td><span id="poke_defense">${poke_defense}</span></td></tr>
            <tr><td>特攻</td>    <td><span id="poke_sp_atk">${poke_sp_atk}</span></td></tr>
            <tr><td>特防</td>    <td><span id="poke_sp_def">${poke_sp_def}</span></td></tr>
            <tr><td>スピード</td> <td><span id="poke_speed">${poke_speed}</span></td></tr>
            <tr><td>合計</td>    <td><span id="poke_sum">${poke_sum}</span></td></tr>
            </table>
            `;
            break;
          case 'eng':
            poke_data3_html =
            `
            <table class="data3" border="4">
            <tr><td>HP</td>      <td><span id="poke_hp">${poke_hp}</span></td></tr>
            <tr><td>Atack</td>   <td><span id="poke_attack">${poke_attack}</span></td></tr>
            <tr><td>Defense</td> <td><span id="poke_defense">${poke_defense}</span></td></tr>
            <tr><td>Sp.Atk</td>  <td><span id="poke_sp_atk">${poke_sp_atk}</span></td></tr>
            <tr><td>Sp.Def</td>  <td><span id="poke_sp_def">${poke_sp_def}</span></td></tr>
            <tr><td>Speed</td>   <td><span id="poke_speed">${poke_speed}</span></td></tr>
            <tr><td>Sum</td>     <td><span id="poke_sum">${poke_sum}</span></td></tr>
            </table>
            `;
            break;
          default:
            break;
        }
        data3_table.insertAdjacentHTML('beforeend', poke_data3_html);
      }
      return this;
    },
    makeIframe4: function(){
      if(flag){
        data4_iframe = document.querySelector(`[${conf.poke_class_data4}]`);
        
        poke_data4_iframe = `<iframe id="poke_path_typechart" width="58%" height="42%"></iframe>`;

        data4_iframe.insertAdjacentHTML('beforeend', poke_data4_iframe);
      }
      return this;
    },
    makeCursor: function(){
      if(flag){
        data_cursor = document.querySelector(`[${conf.poke_class_cursor}]`);
        poke_buttons_cursor =
        `
        <button id="prev" class-buttons-cursor>←</button>
        <button id="next" class-buttons-cursor>→</button>
        `;
        data_cursor.insertAdjacentHTML('beforeend', poke_buttons_cursor);
        
        let next_button = document.getElementById('next');
        if(next_button)
        {
          next_button.addEventListener('click', func.nextPokemon);
        }
        
        let prev_button = document.getElementById('prev');
        if(prev_button)
        {
          prev_button.addEventListener('click', func.prevPokemon);
        }
        return this;
      }
    },
    nextPokemon: function() {
      if(flag){
        // 現在のAUTONUMを数値に変換
        let currentAutonum = parseInt(poke_autonum);
        // +1したAUTONUMを計算
        let nextAutonum = currentAutonum + 1;
        // リクエストを送信して次のポケモンの情報を取得
        fetch(`http://127.0.0.1:3001/api/poke?AUTONUM=${nextAutonum}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Next POKEMON not found');
            }
            return response.json();
        })
        .then((data) => {
          // ポケモンの情報を更新
          poke_pokeid = data.POKEID;
          poke_autonum = data.AUTONUM;
          
          poke_autonum = nextAutonum;
          active = true;
          
          languageButton = document.getElementById('languageButton');
          windowButton = document.getElementById('windowButton');
          imageButton = document.getElementById('imageButton');
          
          jap_or_eng = languageButton.checked ? 'jap' : 'eng';
          bright_or_dark = windowButton.checked ? 'bright' : 'dark';
          normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
          
          // パラメータをURLに設定
          optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;

          // ローカルストレージにlanguage, window, imageを保存
          //localStorage.setItem('AUTONUM', nextAutonum);
          localStorage.setItem('POKE_AUTONUM', nextAutonum);
          localStorage.setItem('MOVE_AUTONUM', null);
          localStorage.setItem('language', jap_or_eng);
          localStorage.setItem('window', bright_or_dark);
          localStorage.setItem('image', normal_or_shiny);
          //localStorage.setItem(conf.scrollPositionKey, scroll_position);
        
          // URLを更新
          newURL = `${windowURL}?AUTONUM=${nextAutonum}${optionURL}`; // 新しいURLを作成し、次のポケモンのAUTONUMを追加
          // 新しいURLに遷移
          window.location.href = newURL;
        })
        .catch((error) => {
          console.error(error);
          switch(jap_or_eng)
          {
            case 'jap':
              alert('次のポケモンはいません。。');
              break;
            case 'eng':
              alert('Next POKÉMON Not Found');
            default:
              break;
          }
        });
      }
      return this;
    },
    prevPokemon: function() {
      if(flag){
        // 現在のAUTONUMを数値に変換
        let currentAutonum = parseInt(poke_autonum);
        // -1したAUTONUMを計算
        let prevAutonum = currentAutonum - 1;
        // リクエストを送信して次のポケモンの情報を取得
        fetch(`http://127.0.0.1:3001/api/poke?AUTONUM=${prevAutonum}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Next POKEMON not found');
            }
            return response.json();
        })
        .then((data) => {
          // ポケモンの情報を更新
          poke_pokeid = data.POKEID;
          poke_autonum = data.AUTONUM;
          
          poke_autonum = prevAutonum;
          active = true;
          
          languageButton = document.getElementById('languageButton');
          windowButton = document.getElementById('windowButton');
          imageButton = document.getElementById('imageButton');
          
          jap_or_eng = languageButton.checked ? 'jap' : 'eng';
          bright_or_dark = windowButton.checked ? 'bright' : 'dark';
          normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
          
          // パラメータをURLに設定
          optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;

          // ローカルストレージにlanguage, window, imageを保存
          localStorage.setItem('POKE_AUTONUM', prevAutonum);
          localStorage.setItem('MOVE_AUTONUM', null);
          localStorage.setItem('language', jap_or_eng);
          localStorage.setItem('window', bright_or_dark);
          localStorage.setItem('image', normal_or_shiny);
          //localStorage.setItem(conf.scrollPositionKey, scroll_position);
        
          // URLを更新
          newURL = `${windowURL}?AUTONUM=${prevAutonum}${optionURL}`; // 新しいURLを作成し、次のポケモンのAUTONUMを追加
          // 新しいURLに遷移
          window.location.href = newURL;
        })
        .catch((error) => {
          console.error(error);
          switch(jap_or_eng)
          {
            case 'jap':
              alert('前のポケモンはいません。。');
              break;
            case 'eng':
              alert('Previous POKÉMON Not Found');
            default:
              break;
          }
          alert('Previous POKÉMON Not Found');
        });
      }
      return this;
    },
    listOfPokemon: function() {
      if (flag) {
        this.getPokeCount();
        const defaultImagePath = null;
        
        // ポケモンをフェッチして表示する関数
        const fetchAndDisplayPokemon = async (each_autonum) => {
          if (each_autonum > poke_count) return;  // 終了条件
    
          try {
            const response = await fetch(`http://127.0.0.1:3001/api/poke?AUTONUM=${each_autonum}`);
            console.log('Response status:', response.status); // レスポンスステータスをログ
            if (!response.ok) {
              if (response.status === 404) {
                await fetchAndDisplayPokemon(each_autonum + 1);
              } else {
                throw new Error('POKEMON not found');
              }
            } else {
              const data = await response.json();
    
              const anchor = document.createElement('a');
              const img = document.createElement('img');
              img.className = 'pokemon-thumbnail';
              img.width = 80;
              img.height = 80;
    
              // 通常か色違いのパスを選択
              img.src = normal_or_shiny === 'shiny' ? data.PATH_SHINY_FRONT || defaultImagePath : data.PATH_NORMAL_FRONT || defaultImagePath;
              
              anchor.appendChild(img);
              const listItem = document.createElement('li');
              listItem.style.display = 'inline-block';
              listItem.appendChild(anchor);
    
              // ここで container ではなく pokemonListContainer に直接追加
              pokemonListContainer.appendChild(listItem);
    
              // クリックイベントの設定
              listItem.addEventListener('click', (event) => {
                event.preventDefault();
                active = true;
                const languageButton = document.getElementById('languageButton');
                const windowButton = document.getElementById('windowButton');
                const imageButton = document.getElementById('imageButton');
                
                jap_or_eng = languageButton.checked ? 'jap' : 'eng';
                bright_or_dark = windowButton.checked ? 'bright' : 'dark';
                normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
                // ローカルストレージにデータを保存
                localStorage.setItem('POKE_AUTONUM', each_autonum);
                localStorage.setItem('MOVE_AUTONUM', null);
                localStorage.setItem('language', jap_or_eng);
                localStorage.setItem('window', bright_or_dark);
                localStorage.setItem('image', normal_or_shiny);
                localStorage.setItem(conf.scrollPositionKey, pokemonListContainer.scrollLeft); // スクロール位置を保存
    
                const optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
                anchor.href = `${windowURL}?AUTONUM=${each_autonum}${optionURL}`;
                window.location.href = anchor.href;
              });
    
              // 次のポケモンをフェッチして表示
              await fetchAndDisplayPokemon(each_autonum + 1);
    
              // スクロールイベントの処理
              pokemonListContainer.addEventListener('scroll', function() {
                let sc_posi1 = pokemonListContainer.scrollLeft;
                console.log(sc_posi1);
                localStorage.setItem(conf.scrollPositionKey, pokemonListContainer.scrollLeft); // スクロール位置をパーセンテージで保存
              });
              // スクロール位置の復元
              const scroll_position = localStorage.getItem(conf.scrollPositionKey);
              if (scroll_position) {
                let loadedCount = 0;
                const poke_img = pokemonListContainer.getElementsByTagName('img');
                Array.from(poke_img).forEach(img => {
                  // 画像がすでにロード済みかどうかをチェック
                  if (img.complete) {
                    loadedCount++;
                  } else {
                    img.onload = function() {
                      loadedCount++;
                      if (loadedCount === poke_img.length) {
                        pokemonListContainer.scrollLeft = scroll_position; // スクロール位置を復元
                      }
                    };
                  }
                });
                
                // 全ての画像がロードされたらスクロール位置を復元
                if (loadedCount === poke_img.length) {
                  pokemonListContainer.scrollLeft = scroll_position;
                }
              }
            }
          } catch (error) {
            console.error('Error fetching pokemon:', error);
            await fetchAndDisplayPokemon(each_autonum + 1);
          }
        };
        pokemonListContainer = document.getElementById('pokemon-list-container');
        if (!pokemonListContainer) {
          console.error('pokemon-list-container element not found');
          return;  // コンテナが見つからない場合は処理を中断
        }
        // リストを表示
        fetchAndDisplayPokemon(1).then(() => {
          console.log('Finished displaying Pokemon'); // デバッグ用ログ
        });
      }
      return this;
    },
    
    getPokeCount: function () {
      return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:3001/api/poke_count`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (!response.ok)
          {
            throw new Error('Failed to get count');
          }
          return response.json();
        })
        .then((data) => {
          poke_count = data.count;
          resolve(); // Promiseを解決する
        })
        .catch((error) => {
          console.error(error);
          reject(error); // エラーの場合はPromiseを拒否する
        });
      });
    },
    getPokeData: function () {
      if (flag) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:3001/api/poke?AUTONUM=${poke_autonum}`, false); // false で同期リクエスト
        xhr.send();
    
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          // 以下は元のコードと同じ処理
          console.log('Data received:', data);
    
          poke_pokeid = data.POKEID;
          poke_autonum = data.AUTONUM;
          poke_number = data.NO;
          poke_hp = data.HP;
          poke_attack = data.ATTACK;
          poke_defense = data.DEFENSE;
          poke_sp_atk = data.SP_ATK;
          poke_sp_def = data.SP_DEF;
          poke_speed = data.SPEED;
          poke_sum = data.SUM;
          poke_path_normal_front = data.PATH_NORMAL_FRONT;
          poke_path_shiny_front = data.PATH_SHINY_FRONT;
          poke_path_typechart_bright = data.PATH_TYPECHART_BRIGHT;
          poke_path_typechart_dark = data.PATH_TYPECHART_DARK;
          poke_gender = data.GENDER;

          switch(jap_or_eng)
          {
            case 'jap':
              poke_namae = data.NAMAE;
              poke_sugata = data.SUGATA;
              poke_bunrui = data.BUNRUI;
              poke_taipu1 = data.TAIPU1;
              poke_taipu2 = data.TAIPU2;
              poke_tokusei1 = data.TOKUSEI1;
              poke_tokusei2 = data.TOKUSEI2;
              poke_yume_tokusei = data.YUME_TOKUSEI;
              poke_tamago_group1 = data.TAMAGO_GROUP1;
              poke_tamago_group2 = data.TAMAGO_GROUP2;
              poke_chiho = data.CHIHO;
              poke_sedai = data.SEDAI;
              break;
            case 'eng':
              poke_name = data.NAME;
              poke_form = data.FORM;
              poke_classification = data.CLASSIFICATION;
              poke_type1 = data.TYPE1;
              poke_type2 = data.TYPE2;
              poke_ability1 = data.ABILITY1;
              poke_ability2 = data.ABILITY2;
              poke_hidden_ability = data.HIDDEN_ABILITY;
              poke_egg_group1 = data.EGG_GROUP1;
              poke_egg_group2 = data.EGG_GROUP2;
              poke_region = data.REGION;
              poke_generation = data.GENERATION;
            default:
              break;
          }
          console.log('Data received:', data);
          // 変数にデータを格納し、DOM を更新する処理
          document.getElementById('poke_number').innerText = poke_number;
          document.getElementById('poke_gender').innerText = poke_gender;
          document.getElementById('poke_hp').innerText = poke_hp;
          document.getElementById('poke_attack').innerText = poke_attack;
          document.getElementById('poke_defense').innerText = poke_defense;
          document.getElementById('poke_sp_atk').innerText = poke_sp_atk;
          document.getElementById('poke_sp_def').innerText = poke_sp_def;
          document.getElementById('poke_speed').innerText = poke_speed;
          document.getElementById('poke_sum').innerText = poke_sum;
          
          document.getElementById('poke_path_img').src = normal_or_shiny === 'shiny' ? poke_path_shiny_front : poke_path_normal_front;

          switch(jap_or_eng){
            case 'jap':
              document.getElementById('poke_name').innerText = poke_namae;
              document.getElementById('poke_form').innerText = poke_sugata;
              document.getElementById('poke_classification').innerText = poke_bunrui;
              document.getElementById('poke_type1').innerText = poke_taipu1;
              document.getElementById('poke_type2').innerText = poke_taipu2;
              document.getElementById('poke_ability1').innerText = poke_tokusei1;
              document.getElementById('poke_ability2').innerText = poke_tokusei2;
              document.getElementById('poke_hidden_ability').innerText = poke_yume_tokusei;
              document.getElementById('poke_egg_group1').innerText = poke_tamago_group1;
              document.getElementById('poke_egg_group2').innerText = poke_tamago_group2;
              document.getElementById('poke_region').innerText = poke_chiho;
              document.getElementById('poke_generation').innerText = poke_sedai;
              break;
            case 'eng':
              document.getElementById('poke_name').innerText = poke_name;
              document.getElementById('poke_form').innerText = poke_form;
              document.getElementById('poke_classification').innerText = poke_classification;
              document.getElementById('poke_type1').innerText = poke_type1;
              document.getElementById('poke_type2').innerText = poke_type2;
              document.getElementById('poke_ability1').innerText = poke_ability1;
              document.getElementById('poke_ability2').innerText = poke_ability2;
              document.getElementById('poke_hidden_ability').innerText = poke_hidden_ability;
              document.getElementById('poke_egg_group1').innerText = poke_egg_group1;
              document.getElementById('poke_egg_group2').innerText = poke_egg_group2;
              document.getElementById('poke_region').innerText = poke_region;
              document.getElementById('poke_generation').innerText = poke_generation;
              break;
            default:
              break;
          }
          switch(bright_or_dark)
          {
            case 'bright':
              document.getElementById('poke_path_typechart').src = poke_path_typechart_bright;
              break;
            case 'dark':
              document.getElementById('poke_path_typechart').src = poke_path_typechart_dark;
              break;
            default:
              break;
          }
        } else {
          console.error('Error fetching data:', xhr.statusText);
        }
      }
      return this;
    },
    makePokeMoveField: function() {
      if (flag) {
        try {
          poke_move_edit = document.querySelector(`[${conf.poke_move_edit}]`);
          let poke_edit_link;
          switch (jap_or_eng) {
            case 'jap':
              poke_edit_link = `<button id="editButton_${poke_autonum}" class="editButtonClass" tag="${poke_autonum}">編集する</button>`;
              break;
            case 'eng':
              poke_edit_link = `<button id="editButton_${poke_autonum}" class="editButtonClass" tag="${poke_autonum}">Edit</button>`;
              break;
            default:
              break;
          }
          poke_move_edit.insertAdjacentHTML('beforeend', poke_edit_link);
    
          document.getElementById(`editButton_${poke_autonum}`).addEventListener('click', function() {
            active = true;
    
            languageButton = document.getElementById('languageButton');
            windowButton = document.getElementById('windowButton');
            imageButton = document.getElementById('imageButton');
    
            jap_or_eng = languageButton.checked ? 'jap' : 'eng';
            bright_or_dark = windowButton.checked ? 'bright' : 'dark';
            normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
            localStorage.setItem('POKE_AUTONUM', poke_autonum);
            localStorage.setItem('MOVE_AUTONUM', null);
            localStorage.setItem('language', jap_or_eng);
            localStorage.setItem('window', bright_or_dark);
            localStorage.setItem('image', normal_or_shiny);
    
            optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
            window.location.href = `pokeAddMoves.html?AUTONUM=${poke_autonum}${optionURL}`;
          });
    
          poke_move_data = document.querySelector(`[${conf.poke_move_data}]`);
    
          const xhr = new XMLHttpRequest();
          xhr.open('GET', `http://127.0.0.1:3001/api/poke_to_move?POKEID=${poke_pokeid}`, false); // false で同期リクエスト
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send();
    
          if (xhr.status !== 200) {
            switch (jap_or_eng) {
              case 'jap':
                poke_move_data.insertAdjacentHTML('beforeend', `<p>まだ登録されていません。。。</p>`);
                break;
              case 'eng':
                poke_move_data.insertAdjacentHTML('beforeend', `<p>This is not be enrolled...</p>`);
                break;
            }
          } else {
            const data = JSON.parse(xhr.responseText);
            data.forEach((item) => {
              move_type_id = item.TYPEID;
              move_moveid = item.MOVEID;
              move_type = item.TYPE;
              move_pp = item.PP;
              move_power = item.POWER;
              move_accuracy = item.ACCURACY;
              move_type_path = this.getTypeImagePath(move_type);
    
              switch (jap_or_eng) {
                case 'jap':
                  move_waza = item.WAZA;
                  move_taipu = item.TAIPU;
                  move_bunrui = item.BUNRUI;
                  move_sedai = item.SEDAI;
                  break;
                case 'eng':
                  move_name = item.MOVE;
                  move_type = item.TYPE;
                  move_category = item.CATEGORY;
                  move_generation = item.GENERATION;
                  break;
                default:
                  break;
              }
    
              move_autonum = item.MOVE_AUTONUM;
              move_moveid = item.MOVEID;
              let move_link = '';
              switch (jap_or_eng) {
                case 'jap':
                  move_link =
                    `
                    <br><br>
                    <div id="moveArea_${move_autonum}" tag="${move_autonum}" selected_type="${move_type_id}" move_moveid="${move_moveid}">
                    <button><a href="movedex.html?AUTONUM=${move_autonum}${optionURL}">
                    <table class="move" id="${move_autonum}" border="4">
                    <tr>
                    <td rowspan="2" width="25%" height="30%">${move_waza}</td>
                    <td colspan="2" width="20%">タイプ</td>
                    <td width="12%">分類</td>
                    <td width="11%">PP</td>
                    <td width="11%">威力</td>
                    <td width="11%">命中</td>
                    <td width="11%">世代</td>
                    </tr>
                    <tr>
                    <td width="10%">${move_type_path}</td>
                    <td width="10%">${move_taipu}</td>
                    <td width="12%">${move_bunrui}</td>
                    <td width="11%">${move_pp}</td>
                    <td width="11%">${move_power}</td>
                    <td width="11%">${move_accuracy}</td>
                    <td width="11%">${move_sedai}</td>
                    </tr>
                    </table>
                    </a></button>
                    </div>
                    `;
                  break;
                case 'eng':
                  move_link =
                    `
                    <br><br>
                    <div id="moveArea_${move_autonum}" tag="${move_autonum}" selected_type="${move_type_id}" move_moveid="${move_moveid}">
                    <button><a href="movedex.html?AUTONUM=${move_autonum}${optionURL}">
                    <table class="move" id="${move_autonum}" border="4">
                    <tr>
                    <td rowspan="2" width="25%" height="30%">${move_name}</td>
                    <td colspan="2" width="20%">Type</td>
                    <td width="12%">Category</td>
                    <td width="11%">PP</td>
                    <td width="11%">Power</td>
                    <td width="11%">Accuracy</td>
                    <td width="11%">Generation</td>
                    </tr>
                    <tr>
                    <td width="10%">${move_type_path}</td>
                    <td width="10%">${move_type}</td>
                    <td width="12%">${move_category}</td>
                    <td width="11%">${move_pp}</td>
                    <td width="11%">${move_power}</td>
                    <td width="11%">${move_accuracy}</td>
                    <td width="11%">${move_generation}</td>
                    </tr>
                    </table>
                    </a></button>
                    </div>
                    `;
                  break;
                default:
                  break;
              }
              poke_move_data.insertAdjacentHTML('beforeend', move_link);
    
              const moveArea = document.getElementById(`moveArea_${move_autonum}`);
              if (moveArea) {
                moveArea.addEventListener('click', function(event) {
                  event.preventDefault();
                  active = true;
                  const languageButton = document.getElementById('languageButton');
                  const windowButton = document.getElementById('windowButton');
                  const imageButton = document.getElementById('imageButton');
                  jap_or_eng = languageButton.checked ? 'jap' : 'eng';
                  bright_or_dark = windowButton.checked ? 'bright' : 'dark';
                  normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
                  const move_autonum = parseInt(moveArea.getAttribute('tag'));
                  const each_moveid = parseInt(moveArea.getAttribute('move_moveid'));
                  const selected_type = parseInt(moveArea.getAttribute('selected_type'));
    
                  localStorage.setItem('POKE_AUTONUM', null);
                  localStorage.setItem('MOVE_AUTONUM', move_autonum);
                  localStorage.setItem('language', jap_or_eng);
                  localStorage.setItem('window', bright_or_dark);
                  localStorage.setItem('image', normal_or_shiny);
    
                  localStorage.setItem('MOVEID', each_moveid);
                  localStorage.setItem('selected_type', selected_type);
    
                  optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
    
                  window.location.href = event.currentTarget.querySelector('a').getAttribute('href');
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return this;
},
    
    getTypeImagePath: function(move_type) {
      switch (move_type) {
        case "NORMAL":
          return '<img src="type/01.png" width="35px" height="35px">';
        case "FIRE":
          return '<img src="type/02.png" width="35px" height="35px">';
        case "WATER":
          return '<img src="type/03.png" width="35px" height="35px">';
        case "GRASS":
          return '<img src="type/04.png" width="35px" height="35px">';
        case "ELECTRIC":
          return '<img src="type/05.png" width="35px" height="35px">';
        case "ICE":
          return '<img src="type/06.png" width="35px" height="35px">';
        case "FIGHT":
          return '<img src="type/07.png" width="35px" height="35px">';
        case "POISON":
          return '<img src="type/08.png" width="35px" height="35px">';
        case "GROUND":
          return '<img src="type/09.png" width="35px" height="35px">';
        case "FLYING":
          return '<img src="type/10.png" width="35px" height="35px">';
        case "PSYCHIC":
          return '<img src="type/11.png" width="35px" height="35px">';
        case "BUG":
          return '<img src="type/12.png" width="35px" height="35px">';
        case "ROCK":
          return '<img src="type/13.png" width="35px" height="35px">';
        case "GHOST":
          return '<img src="type/14.png" width="35px" height="35px">';
        case "DRAGON":
          return '<img src="type/15.png" width="35px" height="35px">';
        case "DARK":
          return '<img src="type/16.png" width="35px" height="35px">';
        case "STEEL":
          return '<img src="type/17.png" width="35px" height="35px">';
        case "FAIRY":
          return '<img src="type/18.png" width="35px" height="35px">';
        default:
          return '';
      }
    },
  }
  active = async () => {
    func
      .init()
      .makeSettingCommand()
      .makeDecisionButton()
      .reflectMode()
      .makeCursor()
      .makeProfile()
      .makeTable1()
      .makeTable2()
      .makeTable3()
      .makeIframe4()
      .getPokeData()
      .makePokeMoveField()
      .listOfPokemon();
  
    return;
  };
  return { active };
})();

window.addEventListener('load', function (){
  Thisproject.active();
});

/**
 * container.addEventListener('scroll', function() {
            scroll_position = container.scrollLeft
          });
          if(localStorage.getItem('scrollPosition'))
          {
            pokemonListContainer = document.getElementById('pokemon-list-container');
            pokemonListContainer.appendChild(container);
            scroll_position = localStorage.getItem('scrollPosition');
            let loadedCount = 0;
            
            const poke_list = pokemonListContainer.getElementsByTagName('img');
            Array.from(poke_list).forEach(img => {
              img.onload = function() {
                loadedCount++;
                if (loadedCount === poke_list.length) {
                  pokemonListContainer.scrollLeft = scroll_position;
                }
              };
            });
          }
 */