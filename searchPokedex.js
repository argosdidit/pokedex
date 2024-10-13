const Thisproject = (() => {
  'use strict';
  let
  flag,
  func,
  active,
  search,
  poke_lists,
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
  poke_type1,
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
  poke_image,

  area_setting,
  decision_button,
  name_or_form_area,
  type_area,
  ability_area,
  gender_area,
  egg_group_area,
  region_area,
  generation_area,
  status_area,
  elements_area,
  search_area,
  poke_area,

  setting_button_html,
  decision_html,
  name_or_form_html,
  type_html,
  ability_html,
  gender_html,
  egg_group_html,
  region_html,
  generation_html,
  status_html,
  elements_html,
  search_html,

  get_poke_type = [],
  combination_type = [],
  get_poke_ability = [],
  get_poke_region = [],
  get_poke_generation = [],
  get_poke_gender = [],
  get_poke_egg_group = [],
  get_poke_name = [],

  result_poke_type = [],
  result_poke_ability = [],
  result_poke_region = [],
  result_poke_generation = [],
  result_poke_gender = [],
  result_poke_egg_group = [],
  result_poke_name = [],

  result_included_condition = [],
  result_independent_condition = [],
  finally_result = [],
  
  included_condition = [],
  independent_condition = [],
  
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
    setting_command: `setting-command`,
    decision_button: `decision-button`,
    normal_or_form_field: `normal-or-form-field`,
    type_field: `type-field`,
    ability_field: `ability-field`,
    gender_field: `gender-field`,
    egg_group_field: `egg-group-field`,
    region_field: `region-field`,
    generation_field: `generation-field`,
    status_field: `status-field`,
    elements_field: `elements-field`,
    search_field: `search-field`,
    poke_field: `poke-field`,
  };
  func = {
    init: function (){
      flag = true;
      windowURL = 'searchPokedex.html';

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
      result_poke_type = [];
      result_poke_ability = [];
      result_poke_gender = [];
      result_poke_egg_group = [];
      result_poke_region = [];
      result_poke_generation = [];
      result_included_condition = [];
      result_independent_condition = [];
      finally_result = [];
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
        <a id="decisionButton" href="searchPokedex.html">
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
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
    
        jap_or_eng = languageButton.checked ? 'jap' : 'eng';
        bright_or_dark = windowButton.checked ? 'bright' : 'dark';
        normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';

        if(poke_autonum == undefined)
        {
          poke_autonum = 1;
        }
        optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;
    
        // ローカルストレージにlanguage, window, image, trans_reload_flagを保存
        localStorage.setItem('POKE_AUTONUM', poke_autonum);
        localStorage.setItem('MOVE_AUTONUM', null);
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);
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
    makeNameOrFormField: function(){
      if(flag){
        name_or_form_area = document.querySelector(`[${conf.normal_or_form_field}]`);

      }
      return this;
    },
    makeTypeField: function(){
      if(flag){
        type_area = document.querySelector(`[${conf.type_field}]`);
        switch(jap_or_eng)
        {
          case 'jap':
            type_html =
            `
            <div class="name_or_form_field"></div>
            <div class="type_field">
            <div class="title">タイプ</div>
            <br>
            <button class="type" value="NORMAL"><img src="type/01.png" height="25px" width="25px"></button>
            <button class="type" value="FIRE"><img src="type/02.png" height="25px" width="25px"></button>
            <button class="type" value="WATER"><img src="type/03.png" height="25px" width="25px"></button>
            <button class="type" value="GRASS"><img src="type/04.png" height="25px" width="25px"></button>
            <button class="type" value="ELECTRIC"><img src="type/05.png" height="25px" width="25px"></button>
            <button class="type" value="ICE"><img src="type/06.png" height="25px" width="25px"></button>
            <button class="type" value="FIGHT"><img src="type/07.png" height="25px" width="25px"></button>
            <button class="type" value="POISON"><img src="type/08.png" height="25px" width="25px"></button>
            <button class="type" value="GROUND"><img src="type/09.png" height="25px" width="25px"></button>
            <br>
            <button class="type" value="FLYING"><img src="type/10.png" height="25px" width="25px"></button>
            <button class="type" value="PSYCHIC"><img src="type/11.png" height="25px" width="25px"></button>
            <button class="type" value="BUG"><img src="type/12.png" height="25px" width="25px"></button>
            <button class="type" value="ROCK"><img src="type/13.png" height="25px" width="25px"></button>
            <button class="type" value="GHOST"><img src="type/14.png" height="25px" width="25px"></button>
            <button class="type" value="DRAGON"><img src="type/15.png" height="25px" width="25px"></button>
            <button class="type" value="DARK"><img src="type/16.png" height="25px" width="25px"></button>
            <button class="type" value="STEEL"><img src="type/17.png" height="25px" width="25px"></button>
            <button class="type" value="FAIRY"><img src="type/18.png" height="25px" width="25px"></button>
            <br><br>
            <div class="type_option">
            <input type="radio" id="single" name="type_selection" value="単タイプ"><label for="single">単タイプ</label>
            <input type="radio" id="dual" name="type_selection" value="複合タイプ"><label for="dual">複合タイプ</label>
            <input type="radio" id="combination" name="type_selection" value="組み合わせ"><label for="combination">組み合わせ</label>
            </div>
            </div>
            `;
            break;
          case 'eng':
            type_html =
            `
            <div class="name_or_form_field"></div>
            <div class="type_field">
            <div class="title">TYPE</div>
            <br>
            <button class="type" value="NORMAL"><img src="type/01.png" height="25px" width="25px"></button>
            <button class="type" value="FIRE"><img src="type/02.png" height="25px" width="25px"></button>
            <button class="type" value="WATER"><img src="type/03.png" height="25px" width="25px"></button>
            <button class="type" value="GRASS"><img src="type/04.png" height="25px" width="25px"></button>
            <button class="type" value="ELECTRIC"><img src="type/05.png" height="25px" width="25px"></button>
            <button class="type" value="ICE"><img src="type/06.png" height="25px" width="25px"></button>
            <button class="type" value="FIGHT"><img src="type/07.png" height="25px" width="25px"></button>
            <button class="type" value="POISON"><img src="type/08.png" height="25px" width="25px"></button>
            <button class="type" value="GROUND"><img src="type/09.png" height="25px" width="25px"></button>
            <br>
            <button class="type" value="FLYING"><img src="type/10.png" height="25px" width="25px"></button>
            <button class="type" value="PSYCHIC"><img src="type/11.png" height="25px" width="25px"></button>
            <button class="type" value="BUG"><img src="type/12.png" height="25px" width="25px"></button>
            <button class="type" value="ROCK"><img src="type/13.png" height="25px" width="25px"></button>
            <button class="type" value="GHOST"><img src="type/14.png" height="25px" width="25px"></button>
            <button class="type" value="DRAGON"><img src="type/15.png" height="25px" width="25px"></button>
            <button class="type" value="DARK"><img src="type/16.png" height="25px" width="25px"></button>
            <button class="type" value="STEEL"><img src="type/17.png" height="25px" width="25px"></button>
            <button class="type" value="FAIRY"><img src="type/18.png" height="25px" width="25px"></button>
            <br><br>
            <div class="type_option">
            <input type="radio" id="single" name="type_selection" value="Single Type"><label for="single">Single Type</label>
            <input type="radio" id="dual" name="type_selection" value="Dual Type"><label for="dual">Dual Type</label>
            <input type="radio" id="combination" name="type_selection" value="Combination"><label for="combination">Combination</label>
            </div>
            </div>
            `;
            break;
          default:
            break;
        }
        type_area.insertAdjacentHTML('beforeend', type_html);

        // 初期位置をsingleに設定
        document.getElementById('single').checked = true;
        
        let type_buttons = document.querySelectorAll('.type');
        type_buttons.forEach(type_button => {
          type_button.addEventListener('click', () => {
            let value = type_button.value;
            if(get_poke_type.includes(value))
            {
              // 既に配列に含まれている場合は削除する
              get_poke_type = get_poke_type.filter(type => type !== value);
              type_button.style.backgroundColor = ''; // 背景色を元に戻す
            }
            else
            {
              // 配列に含まれていない場合は追加する
              get_poke_type.push(value);
              type_button.style.backgroundColor = 'lightblue'; // 背景色を変更する
            }
          });
        });
      }
      return this;
    },
    makeAbilityField: function() {
      if (flag) {
        let ability_count;
        let ability_data = [];
        
        // Ability count を取得
        fetch('http://127.0.0.1:3001/api/ability_count')
        .then(response => response.json())
        .then(data => {
          ability_count = data.count;
          console.log('Ability Count:', ability_count);
          
          // ability_countを使ってループを回す
          const fetchAbilities = [];
          for (let i = 1; i < ability_count; i++) {
            fetchAbilities.push(
              fetch(`http://127.0.0.1:3001/api/ability?ABILITYID=${i}`)
              .then(response => response.json())
            );
          }
          
          Promise.all(fetchAbilities)
          .then(abilities => {
            ability_data = abilities.map(ability => ({
              id: ability.ABILITYID,
              tokusei: ability.TOKUSEI,
              ability: ability.ABILITY
            }));
            
            // IDの順番でソート
            ability_data.sort((a, b) => a.id - b.id);
            console.log('All abilities fetched:', ability_data);
            
            // ability_area を取得
            let ability_area = document.querySelector(`[${conf.ability_field}]`);
            
            switch(jap_or_eng)
            {
              case 'jap':
                ability_html =
                `
                <div class="ability_field">
                <div class="title">特性</div>
                <br>
                <div class="select-box-container">
                <div class="list-box">
                <select id="selectedAbility" multiple size="10">
                <!-- 初期状態では空です -->
                </select>
                </div>
                <div class="button-container">
                <button id="moveAllLeft">&lt;&lt;</button>
                <button id="moveLeft">&lt;</button>
                <button id="moveRight">&gt;</button>
                <button id="moveAllRight">&gt;&gt;</button>
                </div>
                <div class="list-box">
                <select id="unselectedAbility" multiple size="10">
                ${ability_data.map(({ id, tokusei, ability }) =>
                  `<option value="${id}" tag="${ability}"><span class="number">${id.toString().padStart(3, '0')}</span> | <span class="ability">${tokusei}</span></option>`
                ).join('')}
                </select>
                </div>
                </div>
                </div>
                `;
                break;
              case 'eng':
                ability_html =
                `
                <div class="ability_field">
                <div class="title">ABILITY</div>
                <br>
                <div class="select-box-container">
                <div class="list-box">
                <select id="selectedAbility" multiple size="10">
                <!-- 初期状態では空です -->
                </select>
                </div>
                <div class="button-container">
                <button id="moveAllLeft">&lt;&lt;</button>
                <button id="moveLeft">&lt;</button>
                <button id="moveRight">&gt;</button>
                <button id="moveAllRight">&gt;&gt;</button>
                </div>
                <div class="list-box">
                <select id="unselectedAbility" multiple size="10">
                ${ability_data.map(({ id, ability }) =>
                  `<option value="${id}" tag="${ability}"><span class="number">${id.toString().padStart(3, '0')}</span> | <span class="ability">${ability}</span></option>`
                ).join('')}
                </select>
                </div>
                </div>
                </div>
                `;
                break;
              default:
                break;
            }
            ability_area.insertAdjacentHTML('beforeend', ability_html);
            // ボタンのクリックイベントを設定
            this.setupAbilityFieldEvents();
          })
          .catch(error => {
            console.error('Error fetching abilities:', error);
          });
        })
        .catch(error => {
          console.error('Error fetching ability count:', error);
        });
      }
      return this;
    },
    setupAbilityFieldEvents: function() {
      const moveRightButton = document.getElementById('moveRight');
      const moveAllRightButton = document.getElementById('moveAllRight');
      const moveLeftButton = document.getElementById('moveLeft');
      const moveAllLeftButton = document.getElementById('moveAllLeft');
      const selectedAbility = document.getElementById('selectedAbility');
      const unselectedAbility = document.getElementById('unselectedAbility');
      
      // 右側のセレクトボックスにアイテムを移動
      moveRightButton.addEventListener('click', () => {
        moveSelectedOption(selectedAbility, unselectedAbility);
      });
      
      // 右側のセレクトボックスにすべてのアイテムを移動
      moveAllRightButton.addEventListener('click', () => {
        moveAllOptions(selectedAbility, unselectedAbility);
      });
      
      // 左側のセレクトボックスにアイテムを移動
      moveLeftButton.addEventListener('click', () => {
        moveSelectedOption(unselectedAbility, selectedAbility);
      });
      
      // 左側のセレクトボックスにすべてのアイテムを移動
      moveAllLeftButton.addEventListener('click', () => {
        moveAllOptions(unselectedAbility, selectedAbility);
      });
      
      // アイテムを移動する関数
      function moveSelectedOption(source, destination) {
        Array.from(source.selectedOptions).forEach(option => {
          destination.add(option);
          
          if (destination.id === 'selectedAbility')
          {
            // 左側に移動する(タグを追加)
            get_poke_ability.push(option.getAttribute('tag'));
          }
          else if (destination.id === 'unselectedAbility')
          {
            // 右側に移動する(タグを削除)
            get_poke_ability = get_poke_ability.filter(tag => tag !== option.getAttribute('tag'));
          }
        });
        sortOptions(destination);
        sortOptions(source); // 移動元もソート
      }
      
      function moveAllOptions(source, destination) {
        Array.from(source.options).forEach(option => {
          destination.add(option);
          if (destination.id === 'selectedAbility')
          {
            // 右側に移動する(タグを削除)
            get_poke_ability = get_poke_ability.filter(tag => tag !== option.getAttribute('tag'));
          }
          else if (destination.id === 'unselectedAbility')
          {
            // 左側に移動する(タグを追加)
            get_poke_ability.push(option.getAttribute('tag'));
          }
        });
        sortOptions(destination);
        sortOptions(source); // 移動元もソート
      }
      
      // オプションをID順にソートする関数
      function sortOptions(select){
        const options = Array.from(select.options);
        options.sort((a, b) => a.value - b.value);
        select.innerHTML = ''; // 現在の内容をクリア
        options.forEach(option => {
          select.add(option);
        });
      }
    },
    makeGenderField: function(){
      if(flag){
        gender_area = document.querySelector(`[${conf.gender_field}]`);

        switch(jap_or_eng)
        {
          case 'jap':
            gender_html =
            `
            <div class="gender_field">
            <div class="title">性別</div>
            <br>
            <button class="gender" value="♂:50% ♀:50%"><p>♂:50% ♀:50%</p></button>
            <button class="gender" value="♂:? ♀:?"><p>♂:? ♀:?</p></button>
            <button class="gender" value="♂:87.5% ♀:12.5%"><p>♂:87.5% ♀:12.5%</p></button>
            <button class="gender" value="♂:12.5% ♀:87.5%"><p>♂:12.5% ♀:87.5%</p></button>
            <button class="gender" value="♂:75% ♀:25%"><p>♂:75% ♀:25%</p></button>
            <button class="gender" value="♂:25% ♀:75%"><p>♂:25% ♀:75%</p></button>
            <br>
            <button class="gender" value="♂:100% ♀:0%"><p>♂:100% ♀:0%</p></button>
            <button class="gender" value="♂:87.5% ♀:0%"><p>♂:87.5% ♀:0%</p></button>
            <button class="gender" value="♂:75% ♀:0%"><p>♂:75% ♀:0%</p></button>
            <button class="gender" value="♂:50% ♀:0%"><p>♂:50% ♀:0%</p></button>
            <button class="gender" value="♂:25% ♀:0%"><p>♂:25% ♀:0%</p></button>
            <button class="gender" value="♂:12.5% ♀:0%"><p>♂:12.5% ♀:0%</p></button>
            <br>
            <button class="gender" value="♂:0% ♀:100%"><p>♂:0% ♀:100%</p></button>
            <button class="gender" value="♂:0% ♀:87.5%"><p>♂:0% ♀:87.5%</p></button>
            <button class="gender" value="♂:0% ♀:75%"><p>♂:0% ♀:75%</p></button>
            <button class="gender" value="♂:0% ♀:50%"><p>♂:0% ♀:50%</p></button>
            <button class="gender" value="♂:0% ♀:25%"><p>♂:0% ♀:25%</p></button>
            <button class="gender" value="♂:0% ♀:12.5%"><p>♂:0% ♀:12.5%</p></button>
            </div>
            `;
            break;
          case 'eng':
            gender_html =
            `
            <div class="gender_field">
            <div class="title">GENDER</div>
            <br>
            <button class="gender" value="♂:50% ♀:50%"><p>♂:50% ♀:50%</p></button>
            <button class="gender" value="♂:? ♀:?"><p>♂:? ♀:?</p></button>
            <button class="gender" value="♂:87.5% ♀:12.5%"><p>♂:87.5% ♀:12.5%</p></button>
            <button class="gender" value="♂:12.5% ♀:87.5%"><p>♂:12.5% ♀:87.5%</p></button>
            <button class="gender" value="♂:75% ♀:25%"><p>♂:75% ♀:25%</p></button>
            <button class="gender" value="♂:25% ♀:75%"><p>♂:25% ♀:75%</p></button>
            <br>
            <button class="gender" value="♂:100% ♀:0%"><p>♂:100% ♀:0%</p></button>
            <button class="gender" value="♂:87.5% ♀:0%"><p>♂:87.5% ♀:0%</p></button>
            <button class="gender" value="♂:75% ♀:0%"><p>♂:75% ♀:0%</p></button>
            <button class="gender" value="♂:50% ♀:0%"><p>♂:50% ♀:0%</p></button>
            <button class="gender" value="♂:25% ♀:0%"><p>♂:25% ♀:0%</p></button>
            <button class="gender" value="♂:12.5% ♀:0%"><p>♂:12.5% ♀:0%</p></button>
            <br>
            <button class="gender" value="♂:0% ♀:100%"><p>♂:0% ♀:100%</p></button>
            <button class="gender" value="♂:0% ♀:87.5%"><p>♂:0% ♀:87.5%</p></button>
            <button class="gender" value="♂:0% ♀:75%"><p>♂:0% ♀:75%</p></button>
            <button class="gender" value="♂:0% ♀:50%"><p>♂:0% ♀:50%</p></button>
            <button class="gender" value="♂:0% ♀:25%"><p>♂:0% ♀:25%</p></button>
            <button class="gender" value="♂:0% ♀:12.5%"><p>♂:0% ♀:12.5%</p></button>
            </div>
            `;
            break;
          default:
            break;
        }
        
        gender_area.insertAdjacentHTML('beforeend', gender_html);

        let gender_buttons = document.querySelectorAll('.gender');
        gender_buttons.forEach(gender_button => {
          gender_button.addEventListener('click', () => {
            let value = gender_button.value;
            if(get_poke_gender.includes(value))
            {
              // 既に配列に含まれている場合は削除する
              get_poke_gender = get_poke_gender.filter(gender => gender !== value);
              gender_button.style.backgroundColor = ''; // 背景色を元に戻す
            }
            else
            {
              // 配列に含まれていない場合は追加する
              get_poke_gender.push(value);
              gender_button.style.backgroundColor = 'lightblue'; // 背景色を変更する
            }
          });
        });
      }
      return this;
    },
    makeEggGroupField: function(){
      if(flag){
        egg_group_area = document.querySelector(`[${conf.egg_group_field}]`);

        switch(jap_or_eng)
        {
          case 'jap':
            egg_group_html =
            `
            <div class="egg_group_field">
            <div class="title">タマゴグループ</div>
            <br>
            <button class="egg_group" value="Grass"><p>植物</p></button>
            <button class="egg_group" value="Bug"><p>虫</p></button>
            <button class="egg_group" value="Flying"><p>飛行</p></button>
            <button class="egg_group" value="Human-Like"><p>人形</p></button>
            <button class="egg_group" value="Monster"><p>怪獣</p></button>
            <br>
            <button class="egg_group" value="Fairy"><p>妖精</p></button>
            <button class="egg_group" value="Dragon"><p>ドラゴン</p></button>
            <button class="egg_group" value="Mineral"><p>鉱物</p></button>
            <button class="egg_group" value="Field"><p>陸上</p></button>
            <button class="egg_group" value="Amorphous"><p>不定形</p></button>
            <br>
            <button class="egg_group" value="Water1"><p>水中1</p></button>
            <button class="egg_group" value="Water2"><p>水中2</p></button>
            <button class="egg_group" value="Water3"><p>水中3</p></button>
            <button class="egg_group" value="Ditto"><p>メタモン</p></button>
            <button class="egg_group" value="Undiscovered"><p>未発見</p></button>
            </div>
            `;
            break;
          case 'eng':
            egg_group_html =
            `
            <div class="egg_group_field">
            <div class="title">EGG GROUP</div>
            <br>
            <button class="egg_group" value="Grass"><p>Grass</p></button>
            <button class="egg_group" value="Bug"><p>Bug</p></button>
            <button class="egg_group" value="Flying"><p>Flying</p></button>
            <button class="egg_group" value="Human-Like"><p>Human-Like</p></button>
            <button class="egg_group" value="Monster"><p>Monster</p></button>
            <br>
            <button class="egg_group" value="Fairy"><p>Fairy</p></button>
            <button class="egg_group" value="Dragon"><p>Dragon</p></button>
            <button class="egg_group" value="Mineral"><p>Mineral</p></button>
            <button class="egg_group" value="Field"><p>Field</p></button>
            <button class="egg_group" value="Amorphous"><p>Amorphous</p></button>
            <br>
            <button class="egg_group" value="Water1"><p>Water1</p></button>
            <button class="egg_group" value="Water2"><p>Water2</p></button>
            <button class="egg_group" value="Water3"><p>Water3</p></button>
            <button class="egg_group" value="Ditto"><p>Ditto</p></button>
            <button class="egg_group" value="Undiscovered"><p>Undiscovered</p></button>
            </div>
            `;
            break;
          default:
            break;
        }
        egg_group_area.insertAdjacentHTML('beforeend', egg_group_html);

        let egg_group_buttons = document.querySelectorAll('.egg_group');
        egg_group_buttons.forEach(egg_group_button => {
          egg_group_button.addEventListener('click', () => {
            let value = egg_group_button.value;
            if(get_poke_egg_group.includes(value))
            {
              // 既に配列に含まれている場合は削除する
              get_poke_egg_group = get_poke_egg_group.filter(egg_group => egg_group !== value);
              egg_group_button.style.backgroundColor = ''; // 背景色を元に戻す
            }
            else
            {
              // 配列に含まれていない場合は追加する
              get_poke_egg_group.push(value);
              egg_group_button.style.backgroundColor = 'lightblue'; // 背景色を変更する
            }
          });
        });
      }
      return this;
    },
    makeRegionField: function(){
      if(flag){
        region_area = document.querySelector(`[${conf.region_field}]`);

        switch(jap_or_eng)
        {
          case 'jap':
            region_html =
            `
            <div class="region_field">
            <div class="title">地方</div>
            <br>
            <button class="region" value="Kanto"><p>カントー地方</p></button>
            <button class="region" value="Johto"><p>ジョウト地方</p></button>
            <button class="region" value="Hoenn"><p>ホウエン地方</p></button>
            <button class="region" value="Sinnoh"><p>シンオウ地方</p></button>
            <button class="region" value="Unova"><p>イッシュ地方</p></button>
            <br>
            <button class="region" value="Kalos"><p>カロス地方</p></button>
            <button class="region" value="Alola"><p>アローラ地方</p></button>
            <button class="region" value="Galar"><p>ガラル地方</p></button>
            <button class="region" value="Hisui"><p>ヒスイ地方</p></button>
            <button class="region" value="Paldea"><p>パルデア地方</p></button>
            </div>
            `;
            break;
          case 'eng':
            region_html =
            `
            <div class="region_field">
            <div class="title">REGION</div>
            <br>
            <button class="region" value="Kanto"><p>Kanto</p></button>
            <button class="region" value="Johto"><p>Johto</p></button>
            <button class="region" value="Hoenn"><p>Hoenn</p></button>
            <button class="region" value="Sinnoh"><p>Sinnoh</p></button>
            <button class="region" value="Unova"><p>Unova</p></button>
            <br>
            <button class="region" value="Kalos"><p>Kalos</p></button>
            <button class="region" value="Alola"><p>Alola</p></button>
            <button class="region" value="Galar"><p>Galar</p></button>
            <button class="region" value="Hisui"><p>Hisui</p></button>
            <button class="region" value="Paldea"><p>Paldea</p></button>
            </div>
            `;
            break;
          default:
            break;
        }
        
        region_area.insertAdjacentHTML('beforeend', region_html);

        let region_buttons = document.querySelectorAll('.region');
        region_buttons.forEach(region_button => {
          region_button.addEventListener('click', () => {
            let value = region_button.value;
            if(get_poke_region.includes(value))
            {
              // 既に配列に含まれている場合は削除する
              get_poke_region = get_poke_region.filter(region => region !== value);
              region_button.style.backgroundColor = ''; // 背景色を元に戻す
            }
            else
            {
              // 配列に含まれていない場合は追加する
              get_poke_region.push(value);
              region_button.style.backgroundColor = 'lightblue'; // 背景色を変更する
            }
          });
        });
      }
      return this;
    },
    makeGenerationField: function(){
      if(flag){
        generation_area = document.querySelector(`[${conf.generation_field}]`);

        switch(jap_or_eng)
        {
          case 'jap':
            generation_html =
            `
            <div class="generation_field">
            <div class="title">世代</div>
            <br>
            <button class="generation" value="Generation01"><p>第01世代</p></button>
            <button class="generation" value="Generation02"><p>第02世代</p></button>
            <button class="generation" value="Generation03"><p>第03世代</p></button>
            <button class="generation" value="Generation04"><p>第04世代</p></button>
            <button class="generation" value="Generation05"><p>第05世代</p></button>
            <br>
            <button class="generation" value="Generation06"><p>第06世代</p></button>
            <button class="generation" value="Generation07"><p>第07世代</p></button>
            <button class="generation" value="Generation08"><p>第08世代</p></button>
            <button class="generation" value="Generation09"><p>第09世代</p></button>
            <button class="generation" value="Generation10"><p>第10世代</p></button>
            </div>
            `;
            break;
          case 'eng':
            generation_html =
            `
            <div class="generation_field">
            <div class="title">GENERATION</div>
            <br>
            <button class="generation" value="Generation01"><p>Gen01</p></button>
            <button class="generation" value="Generation02"><p>Gen02</p></button>
            <button class="generation" value="Generation03"><p>Gen03</p></button>
            <button class="generation" value="Generation04"><p>Gen04</p></button>
            <button class="generation" value="Generation05"><p>Gen05</p></button>
            <br>
            <button class="generation" value="Generation06"><p>Gen06</p></button>
            <button class="generation" value="Generation07"><p>Gen07</p></button>
            <button class="generation" value="Generation08"><p>Gen08</p></button>
            <button class="generation" value="Generation09"><p>Gen09</p></button>
            <button class="generation" value="Generation10"><p>Gen10</p></button>
            </div>
            `;
            break;
          default:
            break;
        }
        
        generation_area.insertAdjacentHTML('beforeend', generation_html);

        let generation_buttons = document.querySelectorAll('.generation');
        generation_buttons.forEach(generation_button => {
          generation_button.addEventListener('click', () => {
            let value = generation_button.value;
            if(get_poke_generation.includes(value))
            {
              // 既に配列に含まれている場合は削除する
              get_poke_generation = get_poke_generation.filter(generation => generation !== value);
              generation_button.style.backgroundColor = ''; // 背景色を元に戻す
            }
            else
            {
              // 配列に含まれていない場合は追加する
              get_poke_generation.push(value);
              generation_button.style.backgroundColor = 'lightblue'; // 背景色を変更する
            }
          });
        });
      }
      return this;
    },
    makeStatusField: function(){
      if(flag){
        status_area = document.querySelector(`[${conf.status_field}]`);
        status_html =
        `
        <div class="status_field">
        <div class="title">種族値</div>
        <div class="status_container">
        <div class="range-group">
        <span class="label">HP:</span>
        <input type="text" id="hpMinValue" class="textbox" value="0">
        <div class="line" id="hpLine">
        <div class="pointer" id="hpMinPointer"></div>
        <div class="pointer" id="hpMaxPointer"></div>
        </div>
        <input type="text" id="hpMaxValue" class="textbox" value="200">
        </div>
        <div class="range-group">
        <span class="label">攻撃:</span>
        <input type="text" id="attackMinValue" class="textbox" value="0">
        <div class="line" id="attackLine">
        <div class="pointer" id="attackMinPointer"></div>
        <div class="pointer" id="attackMaxPointer"></div>
        </div>
        <input type="text" id="attackMaxValue" class="textbox" value="200">
        </div>
        <div class="range-group">
        <span class="label">防御:</span>
        <input type="text" id="defenseMinValue" class="textbox" value="0">
        <div class="line" id="defenseLine">
        <div class="pointer" id="defenseMinPointer"></div>
        <div class="pointer" id="defenseMaxPointer"></div>
        </div>
        <input type="text" id="defenseMaxValue" class="textbox" value="200">
        </div>
        <div class="range-group">
        <span class="label">特攻:</span>
        <input type="text" id="specialAttackMinValue" class="textbox" value="0">
        <div class="line" id="specialAttackLine">
        <div class="pointer" id="specialAttackMinPointer"></div>
        <div class="pointer" id="specialAttackMaxPointer"></div>
        </div>
        <input type="text" id="specialAttackMaxValue" class="textbox" value="200">
        </div>
        <div class="range-group">
        <span class="label">特防:</span>
        <input type="text" id="specialDefenseMinValue" class="textbox" value="0">
        <div class="line" id="specialDefenseLine">
        <div class="pointer" id="specialDefenseMinPointer"></div>
        <div class="pointer" id="specialDefenseMaxPointer"></div>
        </div>
        <input type="text" id="specialDefenseMaxValue" class="textbox" value="200">
        </div>
        <div class="range-group">
        <span class="label">素早さ:</span>
        <input type="text" id="speedMinValue" class="textbox" value="0">
        <div class="line" id="speedLine">
        <div class="pointer" id="speedMinPointer"></div>
        <div class="pointer" id="speedMaxPointer"></div>
        </div>
        <input type="text" id="speedMaxValue" class="textbox" value="200">
        </div>
        </div>
        </div>
        `;
        status_area.insertAdjacentHTML('beforeend', status_html);

        document.addEventListener('DOMContentLoaded', function() {
          const rangeGroups = [
            { minInput: 'hpMinValue', maxInput: 'hpMaxValue', minPointer: 'hpMinPointer', maxPointer: 'hpMaxPointer', line: 'hpLine' },
            { minInput: 'attackMinValue', maxInput: 'attackMaxValue', minPointer: 'attackMinPointer', maxPointer: 'attackMaxPointer', line: 'attackLine' },
            { minInput: 'defenseMinValue', maxInput: 'defenseMaxValue', minPointer: 'defenseMinPointer', maxPointer: 'defenseMaxPointer', line: 'defenseLine' },
            { minInput: 'specialAttackMinValue', maxInput: 'specialAttackMaxValue', minPointer: 'specialAttackMinPointer', maxPointer: 'specialAttackMaxPointer', line: 'specialAttackLine' },
            { minInput: 'specialDefenseMinValue', maxInput: 'specialDefenseMaxValue', minPointer: 'specialDefenseMinPointer', maxPointer: 'specialDefenseMaxPointer', line: 'specialDefenseLine' },
            { minInput: 'speedMinValue', maxInput: 'speedMaxValue', minPointer: 'speedMinPointer', maxPointer: 'speedMaxPointer', line: 'speedLine' },
          ];
      
          rangeGroups.forEach(group => {
            const minInput = document.getElementById(group.minInput);
            const maxInput = document.getElementById(group.maxInput);
            const minPointer = document.getElementById(group.minPointer);
            const maxPointer = document.getElementById(group.maxPointer);
            const line = document.getElementById(group.line);
            
            let minValue = parseInt(minInput.value, 10);
            let maxValue = parseInt(maxInput.value, 10);
            
            function updatePointerPosition() {
              minPointer.style.left = `${(minValue / 200) * line.offsetWidth}px`;
              maxPointer.style.left = `${(maxValue / 200) * line.offsetWidth}px`;
            }
            function updateValues() {
              minInput.value = minValue;
              maxInput.value = maxValue;
              updatePointerPosition();
            }
            function validateAndApply(input, isMin) {
              const newValue = Math.floor(parseInt(input.value, 10));
              if (isMin) {
                if (newValue >= 0 && newValue <= maxValue) {
                  minValue = newValue;
                } else {
                  input.value = minValue;
                }
              } else {
                if (newValue >= minValue && newValue <= 200) {
                  maxValue = newValue;
                } else {
                  input.value = maxValue;
                }
              }
              updateValues();
            }
      
              // 最小値入力ボックスのフォーカスが外れた時の処理
              minInput.addEventListener('blur', function() {
                  validateAndApply(minInput, true);
              });
      
              // 最大値入力ボックスのフォーカスが外れた時の処理
              maxInput.addEventListener('blur', function() {
                  validateAndApply(maxInput, false);
              });
      
              // 最小ポインタのドラッグ処理
              minPointer.addEventListener('mousedown', function() {
                  document.onmousemove = function(e) {
                      const rect = line.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      minValue = Math.floor(Math.min(Math.max(0, (x / line.offsetWidth) * 200), maxValue));
                      updateValues();
                  };
      
                  document.onmouseup = function() {
                      document.onmousemove = document.onmouseup = null;
                  };
              });
      
              // 最大ポインタのドラッグ処理
              maxPointer.addEventListener('mousedown', function() {
                  document.onmousemove = function(e) {
                      const rect = line.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      maxValue = Math.floor(Math.max(Math.min(200, (x / line.offsetWidth) * 200), minValue));
                      updateValues();
                  };
      
                  document.onmouseup = function() {
                      document.onmousemove = document.onmouseup = null;
                  };
              });
      
              updatePointerPosition();
          });
      });

      }
      return this;
    },
    makeElementsField: function() {
    if (flag) {
        elements_area = document.querySelector(`[${conf.elements_field}]`);
        switch(jap_or_eng) {
          case 'jap':
            elements_html =
            `
            <div class="elements_field">
            <div class="title">要素</div>
            <br>
            <div class="element_container">
            <div id="included_elements" class="list-box"></div>
            <div class="buttons">
            <button id="moveToIndependent">↓</button>
            <button id="moveToIncluded">↑</button>
            </div>
            <div id="independent_elements" class="list-box"></div>
            </div>
            </div>
            `;
            break;
          case 'eng':
            elements_html =
            `
            <div class="elements_field">
            <div class="title">Elements</div>
            <br>
            <div class="element_container">
            <div id="included_elements" class="list-box"></div>
            <div class="buttons">
            <button id="moveToIndependent">↓</button>
            <button id="moveToIncluded">↑</button>
            </div>
            <div id="independent_elements" class="list-box"></div>
            </div>
            </div>
            `;
            break;
          default:
            break;
        }
        elements_area.insertAdjacentHTML('beforeend', elements_html);
        
        let element_array = [];
        let element_tags = ["name", "type", "ability", "gender", "egg_group", "region", "generation", "status"];
        switch(jap_or_eng) {
          case 'jap':
            element_array = ["名前", "タイプ", "特性", "性別", "タマゴグループ", "地方", "世代", "種族値"];
            break;
          case 'eng':
            element_array = ["NAME", "TYPE", "ABILITY", "GENDER", "EGG GROUP", "REGION", "GENERATION", "STATUS"];
            break;
          default:
            break;
        }

        let includedElements = document.getElementById('included_elements');
        let independentElements = document.getElementById('independent_elements');

        // 初期データをincluded_elementsに追加
        element_array.forEach((element, index) => {
          addListItem(includedElements, element, element_tags[index]);
          included_condition.push(element_tags[index]);  // 初期状態でincluded_conditionにタグを追加
        });

        // アイテムを追加する関数
        function addListItem(listBox, element, tag) {
          let item = document.createElement('div');
          item.className = 'list-item';
          item.textContent = element;
          item.setAttribute('tag', tag); // タグをデータ属性として追加
          item.onclick = () => {
            clearAllSelections();  // 他のすべての選択を解除
            item.classList.add('included');
          };
          listBox.appendChild(item);
        }

        // 他のすべての選択を解除する関数
        function clearAllSelections() {
          let allItems = document.querySelectorAll('.list-item');
          allItems.forEach(i => i.classList.remove('included'));
        }

        // ボタンにイベントリスナーを追加
        document.getElementById('moveToIndependent').addEventListener('click', moveToIndependent);
        document.getElementById('moveToIncluded').addEventListener('click', moveToIncluded);

        // 上のリストボックスから下のリストボックスへ移動
        function moveToIndependent() {
          moveIncludedItem(includedElements, independentElements, included_condition, independent_condition);
        }

        // 下のリストボックスから上のリストボックスへ移動
        function moveToIncluded() {
          moveIncludedItem(independentElements, includedElements, independent_condition, included_condition);
        }

        // 選択されたアイテムを移動する関数
        function moveIncludedItem(fromBox, toBox, fromCondition, toCondition) {
          let includedItem = fromBox.querySelector('.included');
          if (includedItem) {
            let tag = includedItem.getAttribute('tag');
            includedItem.classList.remove('included');
            fromCondition.splice(fromCondition.indexOf(tag), 1);  // 元の条件からタグを削除
            toCondition.push(tag);  // 新しい条件にタグを追加
            insertItemInOrder(toBox, includedItem);
          }
        }

        // アイテムを順序通りに挿入する関数
        function insertItemInOrder(listBox, item) {
          let currentItems = Array.from(listBox.children);
          let index = element_array.indexOf(item.textContent);
          let inserted = false;
          for (let i = 0; i < currentItems.length; i++) {
            if (element_array.indexOf(currentItems[i].textContent) > index) {
              listBox.insertBefore(item, currentItems[i]);
              inserted = true;
              break;
            }
          }
          if (!inserted) {
            listBox.appendChild(item);
          }
        }
      }
      return this;
    },
    makeSearchButton: function(){
      if(flag){
        search_area = document.querySelector(`[${conf.search_field}]`);
        switch(jap_or_eng)
        {
          case 'jap':
            search_html =
            `
            <div class="search_button">
            <button><p class="serach_button">検索</p></button>
            </div>
            `;
            break;
          case 'eng':
            search_html =
            `
            <div class="search_button">
            <button><p class="serach_button">Search</p></button>
            </div>
            `;
            break;
          default:
            break;
        }
        search_area.insertAdjacentHTML('beforeend', search_html);
        let search_button = document.getElementById('search');
        if(search_button)
        {
          search_button.addEventListener('click', search);
        }
      }
      return this;
    },
    searchNameOrForm: function(){
      if(flag){
        
      }
      return this;
    },
    searchType: function() {
      if (flag) {
        const type_option = document.querySelector('input[name="type_selection"]:checked').id;
        
        switch(type_option)
        {
          case 'single':
            const processSingleType = async () => {
              for (let type of get_poke_type) {
                try {
                  const encodedType = encodeURIComponent(type);
                  const response = await fetch(`http://127.0.0.1:3001/api/search/type/single?TYPE=${encodedType}`);
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
        
                  if (Array.isArray(data)) {
                    result_poke_type = result_poke_type.concat(data);
                  } else {
                    result_poke_type.push(data);
                  }
                } catch (error) {
                  console.error(`Error fetching data for type ${type}:`, error);
                }
              }
            };
            processSingleType();
            break;
          
          case 'dual':
            const processDualType = async () => {
              for (let type of get_poke_type) {
                try {
                  const encodedType1 = encodeURIComponent(type);
                  const encodedType2 = encodeURIComponent(type);
                  const response = await fetch(`http://127.0.0.1:3001/api/search/type/dual?TYPE1=${encodedType1}&TYPE2=${encodedType2}`);
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
        
                  if (Array.isArray(data)) {
                    result_poke_type = result_poke_type.concat(data);
                  } else {
                    result_poke_type.push(data);
                  }
                } catch (error) {
                  console.error(`Error fetching data for type ${type}:`, error);
                }
              }
            };
            processDualType();
            break;
            
          case 'combination':
            for(let i = 0; i < get_poke_type.length; i++){
              for(let j = 0; j < get_poke_type.length; j++){
                if(i !== j){
                  combination_type.push([get_poke_type[i], get_poke_type[j]])
                }
              }
            }

            const processCombinationType = async () => {
              for (let type of combination_type) {
                try {
                  const encodedType1 = encodeURIComponent(type[0]); // ペアの最初の要素をエンコード
                  const encodedType2 = encodeURIComponent(type[1]); // ペアの二番目の要素をエンコード
                  const response = await fetch(`http://127.0.0.1:3001/api/search/type/combination?TYPE1=${encodedType1}&TYPE2=${encodedType2}`);
                  
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  
                  const data = await response.json();
            
                  if (Array.isArray(data)) {
                    result_poke_type = result_poke_type.concat(data);
                  } else {
                    result_poke_type.push(data);
                  }
                } catch (error) {
                  console.error(`Error fetching data for type combination [${type[0]}, ${type[1]}]:`, error);
                }
              }
            };
            processCombinationType();
            break;
          default:
            break;
        }
      }
      return this;
    },
    searchAbility: function(){
      if (flag) {
        const processAbility = async () => {
          for (let ability of get_poke_ability) {
            try {
              const encodedAbility1 = encodeURIComponent(ability);
              const encodedAbility2 = encodeURIComponent(ability);
              const encodedHidden_Ability = encodeURIComponent(ability);
              const response = await fetch(`http://127.0.0.1:3001/api/search/ability?ABILITY1=${encodedAbility1}&ABILITY2=${encodedAbility2}&HIDDEN_ABILITY=${encodedHidden_Ability}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
    
              if (Array.isArray(data)) {
                result_poke_ability = result_poke_ability.concat(data);
              } else {
                result_poke_ability.push(data);
              }
            } catch (error) {
              console.error(`Error fetching data for ability ${ability}:`, error);
            }
          }
        };
        processAbility();
      }
      return this;
    },
    searchGender: function() {
      if (flag) {
        const processGender = async () => {
          for (let gender of get_poke_gender) {
            try {
              const encodedGender = encodeURIComponent(gender);
              const response = await fetch(`http://127.0.0.1:3001/api/search/gender?GENDER=${encodedGender}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
    
              if (Array.isArray(data)) {
                result_poke_gender = result_poke_gender.concat(data);
              } else {
                result_poke_gender.push(data);
              }
            } catch (error) {
              console.error(`Error fetching data for gender ${gender}:`, error);
            }
          }
        };
        processGender();
      }
      return this;
    },
    searchEggGroup: function(){
      if (flag) {
        const processEggGroup = async () => {
          for (let egg_group of get_poke_egg_group) {
            try {
              const encodedEggGroup = encodeURIComponent(egg_group);
              const response = await fetch(`http://127.0.0.1:3001/api/search/egg_group?EGG_GROUP=${encodedEggGroup}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
    
              if (Array.isArray(data)) {
                result_poke_egg_group = result_poke_egg_group.concat(data);
              } else {
                result_poke_egg_group.push(data);
              }
            } catch (error) {
              console.error(`Error fetching data for egg_group ${egg_group}:`, error);
            }
          }
        };
        processEggGroup();
      }
      return this;
    },
    searchRegion: function(){
      if (flag) {
        const processRegion = async () => {
          for (let region of get_poke_region) {
            try {
              const encodedRegion = encodeURIComponent(region);
              const response = await fetch(`http://127.0.0.1:3001/api/search/region?REGION=${encodedRegion}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
    
              if (Array.isArray(data)) {
                result_poke_region = result_poke_region.concat(data);
              } else {
                result_poke_region.push(data);
              }
            } catch (error) {
              console.error(`Error fetching data for region ${region}:`, error);
            }
          }
        };
        processRegion();
      }
      return this;
    },
    searchGeneration: function(){
      if (flag) {
        const processGeneration = async () => {
          for (let generation of get_poke_generation) {
            try {
              const encodedGeneration = encodeURIComponent(generation);
              const response = await fetch(`http://127.0.0.1:3001/api/search/generation?GENERATION=${encodedGeneration}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
    
              if (Array.isArray(data)) {
                result_poke_generation = result_poke_generation.concat(data);
              } else {
                result_poke_generation.push(data);
              }
            } catch (error) {
              console.error(`Error fetching data for generation ${generation}:`, error);
            }
          }
        };
        processGeneration();
      }
      return this;
    },
    searchStatus: function(){
      if(flag){

      }
      return this;
    },
    makeIncludedConditionResult: function() {
      if (flag) {
          // デバッグ用
          console.log(included_condition);
          console.log(result_poke_type);
          console.log(result_poke_ability);
          console.log(result_poke_gender);
          console.log(result_poke_egg_group);
          console.log(result_poke_region);
          console.log(result_poke_generation);
  
          let times_insert_check = false;
  
          const processCondition = (result_array) => {
            result_included_condition = [...result_included_condition, ...result_array];
            if (times_insert_check) {
              // 各要素全体をキーとして出現回数をカウント
              const elementCount = result_included_condition.reduce((acc, element) => {
                let key = JSON.stringify(element); // 全体をキーとして扱う
                acc[key] = (acc[key] || 0) + 1;
                return acc;
              }, {});
              
              // 出現回数が2回以上の要素のみをフィルタリング
              result_included_condition = result_included_condition.filter(element => {
                let key = JSON.stringify(element); // 全体をキーとして扱う
                return elementCount[key] > 1;
              });
              // さらに重複を排除する(Set を使用して一意の要素を取得)
              result_included_condition = Array.from(new Set(result_included_condition.map(JSON.stringify))).map(JSON.parse);
            }
            times_insert_check = true;
          };
  
          // 各条件に対して処理を行う
          //if (included_condition.includes("name")) {
          //  processCondition(result_poke_name);
          //}
          if (included_condition.includes("type")) {
            processCondition(result_poke_type);
          }
          if (included_condition.includes("ability")) {
            processCondition(result_poke_ability);
          }
          if (included_condition.includes("gender")) {
            processCondition(result_poke_gender);
          }
          if (included_condition.includes("egg_group")) {
            processCondition(result_poke_egg_group);
          }
          if (included_condition.includes("region")) {
            processCondition(result_poke_region);
          }
          if (included_condition.includes("generation")) {
            processCondition(result_poke_generation);
          }
          //if (included_condition.includes("status")) {
          //  processCondition(result_poke_status);
          //}
  
          // デバッグ用に最終結果を表示
          console.log(result_included_condition);
      }
      return this;
  },
    makeIndependentConditionResult: function() {
      if (flag) {
        result_independent_condition = new Set();
        //if (independent_condition.includes("name")) {
        //  result_independent_condition = new Set([...result_independent_condition, ...result_poke_name]);
        //}
        if (independent_condition.includes("type")) {
          result_independent_condition = new Set([...result_independent_condition, ...result_poke_type]);
        }
        if (independent_condition.includes("ability")) {
          result_independent_condition = new Set([...result_independent_condition, ...result_poke_ability]);
        }
        if (independent_condition.includes("gender")) {
          result_independent_condition = new Set([...result_independent_condition, ...result_poke_gender]);
        }
        if (independent_condition.includes("egg_group")) {
          result_independent_condition = new Set([...result_independent_condition, ...result_poke_egg_group]);
        }
        if (independent_condition.includes("region")) {
          result_independent_condition = new Set([...result_independent_condition, ...result_poke_region]);
        }
        if (independent_condition.includes("generation")) {
          result_independent_condition = new Set([...result_independent_condition, ...result_poke_generation]);
        }
        //if (independent_condition.includes("status")) {
        //  result_independent_condition = new Set([...result_independent_condition, ...result_poke_status]);
        //}
        console.log(independent_condition);
        console.log(result_independent_condition); // デバッグ用に現在のセットの状態を表示
      }
      return this;
    },
    makeResult: function(){
      if(flag){
        finally_result = new Set([...result_included_condition, ...result_independent_condition]);
        // Set から配列に変換して、POKEID 順にソート
        finally_result = Array.from(finally_result).sort((a, b) => {
          // POKEID の昇順にソート
          return a.POKEID - b.POKEID;
        });
        console.log(finally_result); // デバッグ用に現在の配列の状態を表示
        //result_included_condition = null;
        //result_independent_condition = null;
      }
      return this;
    },
    makePokeLists: function(){
      if(flag){
        poke_lists = '';

        poke_area = document.querySelector(`[${conf.poke_field}]`);
        poke_area.innerHTML = ''; // ここでpoke_areaの中身を空にする


        finally_result.forEach((item) => {
          poke_autonum = item.AUTONUM;
          poke_pokeid = item.POKEID;
          poke_number = item.NO;
          poke_namae = item.NAMAE;
          poke_name = item.NAME;
          if(item.SUGATA != undefined)
          {
            poke_sugata = item.SUGATA;
          }
          else
          {
            poke_sugata = '';
          }
          if(item.FORM != undefined)
          {
            poke_form = item.FORM;
          }
          else
          {
            poke_form = '';
          }
          poke_bunrui = item.BUNRUI;
          poke_classification = item.CLASSIFICATION;
          poke_type1 = item.TYPE1;
          poke_type2 = item.TYPE2;
          poke_hp = item.HP;
          poke_attack = item.ATTACK;
          poke_defense = item.DEFENSE;
          poke_sp_atk = item.SP_ATK;
          poke_sp_def = item.SP_DEF;
          poke_speed = item.SPEED;
          poke_path_normal_front = item.PATH_NORMAL_FRONT;
          poke_path_shiny_front = item.PATH_SHINY_FRONT;
          
          switch(normal_or_shiny)
          {
            case 'normal':
              poke_image = poke_path_normal_front;
              break;
            case 'shiny':
              poke_image = poke_path_shiny_front;
              break;
            default:
              break;
          }

          switch(jap_or_eng)
          {
            case 'jap':
              poke_lists +=
              `
              <div class="poke-lists" data-tag="${poke_autonum}">
              <table id="${poke_autonum}" border="4">
              <tr>
              <td rowspan="2" width="10%" height="50%"><img src="${poke_image}" height="120px" width="120px"></td>
              <td rowspan="2" width="5%">No</td>
              <td rowspan="2" width="5%">${poke_number}</td>
              <td colspan="2" width="10%" height="50%">名前</td>
              <td colspan="2" width="18%" height="50%">${poke_namae}</td>
              <td colspan="2" width="10%" height="50%">フォルム</td>
              <td colspan="2" width="32%" height="50%">${poke_sugata}</td>
              </tr>
              <td colspan="2" width="18%">分類</td>
              <td colspan="2" width="10%">${poke_bunrui}</td>
              <td colspan="4" width="42%">HP: ${poke_hp} 攻撃: ${poke_attack} 防御: ${poke_defense} 特攻: ${poke_sp_atk} 特防: ${poke_sp_def} スピード: ${poke_speed}</td>
              </table>
              </div>
              `;
              break;
            case 'eng':
              poke_lists +=
              `
              <div class="poke-lists" data-tag="${poke_autonum}">
              <table id="${poke_autonum}" border="4">
              <tr>
              <td rowspan="2" width="10%" height="50%"><img src="${poke_image}" height="120px" width="120px"></td>
              <td rowspan="2" width="5%">No</td>
              <td rowspan="2" width="5%">${poke_number}</td>
              <td colspan="2" width="10%" height="50%">Name</td>
              <td colspan="2" width="18%" height="50%">${poke_name}</td>
              <td colspan="2" width="10%" height="50%">Form</td>
              <td colspan="2" width="32%" height="50%">${poke_form}</td>
              </tr>
              <td colspan="2" width="18%">Classification</td>
              <td colspan="2" width="10%">${poke_classification}</td>
              <td colspan="4" width="42%">HP: ${poke_hp} Attack: ${poke_attack} Defense: ${poke_defense} Sp.Atk: ${poke_sp_atk} Sp.Def: ${poke_sp_def} Speed: ${poke_speed}</td>
              </table>
              </div>
              `;
              break;
            default:
              break;
          }
        });
        poke_area.insertAdjacentHTML('beforeend', poke_lists);

        // HTML挿入後にイベントリスナーを設定する
        document.querySelectorAll('.poke-lists').forEach((container) => {
          container.addEventListener('click', function(event) {
            event.preventDefault(); // リンクのデフォルトの挙動をキャンセルする
            active = true;
            const languageButton = document.getElementById('languageButton');
            const windowButton = document.getElementById('windowButton');
            const imageButton = document.getElementById('imageButton');
            
            jap_or_eng = languageButton.checked ? 'jap' : 'eng';
            bright_or_dark = windowButton.checked ? 'bright' : 'dark';
            normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
            
            // URLパラメータの設定
            optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
            const each_autonum = parseInt(container.getAttribute('data-tag'));
            // ローカルストレージに保存
            localStorage.setItem('POKE_AUTONUM', each_autonum);
            localStorage.setItem('MOVE_AUTONUM', null);
            localStorage.setItem('language', jap_or_eng);
            localStorage.setItem('window', bright_or_dark);
            localStorage.setItem('image', normal_or_shiny);
            const newURL = `pokedex.html?AUTONUM=${each_autonum}${optionURL}`;
            console.log('Redirecting to:', newURL);
            window.location.href = newURL;
          });
        });
      }
      return this;
    },
    initSearch: function(){
      if(flag){
        result_poke_type = [];
        result_poke_ability = [];
        result_poke_gender = [];
        result_poke_egg_group = [];
        result_poke_region = [];
        result_poke_generation = [];
        result_included_condition = [];
        result_independent_condition = [];
        finally_result = [];
      }
      return this;
    }
  };
  
  active = () => {
    func
      .init()
      .makeSettingCommand()
      .makeDecisionButton()
      .reflectMode()
      .makeNameOrFormField()
      .makeTypeField()
      .makeAbilityField()
      .makeGenderField()
      .makeEggGroupField()
      .makeRegionField()
      .makeGenerationField()
      //.makeStatusField()
      .makeElementsField()
      .makeSearchButton()
    return;
  };
  search = async () => {
    func
      //.searchNameOrForm()
      .searchType()
      .searchAbility()
      .searchGender()
      .searchEggGroup()
      .searchRegion()
      .searchGeneration()
      .searchStatus()
      .makeIncludedConditionResult()
      .makeIndependentConditionResult()
      .makeResult()
      .makePokeLists()
      .initSearch();
    return;
  };
  return { active };
})();

window.addEventListener('load', function (){
  Thisproject.active();
});