const Thisproject = (() => {
  'use strict';

  let first_type = 1; //初回のタイプIDをセット

  let
    func,
    active,
    flag,

    move_moveid,
    move_taipu,
    move_type,
    move_bunrui,
    move_category,
    move_waza,
    move_name,
    move_pp,
    move_power,
    move_accuracy,
    move_sedai,
    move_generation,
    move_setsumei,
    move_explanation,
    move_autonum,

    poke_container_pics = [],
    poke_container_autonum = [],

    type_field,
    move_field,
    setting_button_html,
    decision_html,
    decision_button,
    type_data_html,
    move_data_html,
    reload_type,
    selected_type,
    target_tableid,
    targetElement,
    start_autonum,
    move_type_count,
    area_setting,
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
    jap_or_eng,
    bright_or_dark,
    normal_or_shiny;

  const conf = {
    type_field_data: `type-field-data`,
    move_field_data: `move-field-data`,
    setting_command: `setting-command`,
    decision_button: `decision-button`,
  };

  func = {
    init: function () {
      flag = true;
      windowURL = 'movedex.html';
      let storedTypeValue = localStorage.getItem('type_value');
      selected_type = storedTypeValue ? storedTypeValue : first_type;
      

      if((localStorage.getItem('MOVEID') != 'NaN') && (localStorage.getItem('MOVEID') != 'null'))
      {
        target_tableid = parseInt(localStorage.getItem('MOVEID'));
      }

      if((localStorage.getItem('selected_type') != 'NaN') && (localStorage.getItem('selected_type') != 'null'))
      {
        selected_type = parseInt(localStorage.getItem('selected_type'));
      }
      else
      {
        selected_type = '1'; // デフォルトの selected_type を設定する（例えば1など）
      }
      if((localStorage.getItem('MOVE_AUTONUM') != 'NaN') && (localStorage.getItem('MOVE_AUTONUM') != 'null'))
      {
        move_autonum = parseInt(localStorage.getItem('MOVE_AUTONUM'));
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
    getMoveTypeCount: function () {
      if (flag) {
        return new Promise((resolve, reject) => {
          fetch(`http://127.0.0.1:3001/api/move_type_count?TYPE=${selected_type}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to get count');
              }
              return response.json();
            })
            .then((data) => {
              move_type_count = data.count;
              resolve(); // Promiseを解決する
            })
            .catch((error) => {
              console.log(error);
              reject(error); // エラーの場合はPromiseを拒否する
            });
        });
      }
      return Promise.resolve(); // flagがfalseの場合は即座に解決するPromiseを返す
    },
    getStartAutonum: function () {
      if (flag) {
        return new Promise((resolve, reject) => {
          fetch(`http://127.0.0.1:3001/api/move_type_start_autonum?TYPE=${selected_type}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to get start autonum');
              }
              return response.json();
            })
            .then((data) => {
              start_autonum = data.start_autonum;
              console.log(start_autonum);
              resolve(); // Promiseを解決する
            })
            .catch((error) => {
              console.log(error);
              reject(error); // エラーの場合はPromiseを拒否する
            });
        });
      }
      return Promise.resolve(); // flagがfalseの場合は即座に解決するPromiseを返す
    },
    makeTypeImage: function () {
      if (flag) {
        
        type_field = document.querySelector(`[${conf.type_field_data}]`);
        type_data_html =
          `
          <div>
            <button class="type" value="1"><img src="type/01.png" height="25px" width="25px"></button>
            <button class="type" value="2"><img src="type/02.png" height="25px" width="25px"></button>
            <button class="type" value="3"><img src="type/03.png" height="25px" width="25px"></button>
            <button class="type" value="4"><img src="type/04.png" height="25px" width="25px"></button>
            <button class="type" value="5"><img src="type/05.png" height="25px" width="25px"></button>
            <button class="type" value="6"><img src="type/06.png" height="25px" width="25px"></button>
            <button class="type" value="7"><img src="type/07.png" height="25px" width="25px"></button>
            <button class="type" value="8"><img src="type/08.png" height="25px" width="25px"></button>
            <button class="type" value="9"><img src="type/09.png" height="25px" width="25px"></button>
            <br>
          <div>
            <button class="type" value="10"><img src="type/10.png" height="25px" width="25px"></button>
            <button class="type" value="11"><img src="type/11.png" height="25px" width="25px"></button>
            <button class="type" value="12"><img src="type/12.png" height="25px" width="25px"></button>
            <button class="type" value="13"><img src="type/13.png" height="25px" width="25px"></button>
            <button class="type" value="14"><img src="type/14.png" height="25px" width="25px"></button>
            <button class="type" value="15"><img src="type/15.png" height="25px" width="25px"></button>
            <button class="type" value="16"><img src="type/16.png" height="25px" width="25px"></button>
            <button class="type" value="17"><img src="type/17.png" height="25px" width="25px"></button>
            <button class="type" value="18"><img src="type/18.png" height="25px" width="25px"></button>
          </div>
          `;
        type_field.insertAdjacentHTML('beforeend', type_data_html);

        let buttons = document.querySelectorAll('.type');
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            let type_value = button.value;
            this.display(type_value);
          });
        });
      }
      return this;
    },
    display: function(type_value){
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

        newURL = `${windowURL}?selected_type=${type_value}${optionURL}`;

        // URLを更新し、ページのリロードを抑制
        // ローカルストレージにtype_valueを保存
        localStorage.setItem('selected_type', type_value);
        localStorage.setItem('POKE_AUTONUM', null);
        localStorage.setItem('MOVE_AUTONUM', null);
        //localStorage.setItem('RELOAD_AUTONUM', null);
        //localStorage.setItem('CALLED_AUTONUM', null);
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);
        // ページをリロード
        window.location.href = newURL;
      }
      return this;
    },
    makeMoveField: async function (type_value) {
      if (flag) {
        if (type_value) {
          selected_type = type_value;
        }
        if (reload_type) {
          selected_type = reload_type;
          reload_type = null;
        }
        try {
          await this.getMoveTypeCount(selected_type);
          await this.getStartAutonum(selected_type);
    
          console.log(move_type_count);
          console.log(start_autonum);
    
          for (let counter = start_autonum; counter < start_autonum + move_type_count; counter++) {
            try {
              const response1 = await fetch(`http://127.0.0.1:3001/api/move?AUTONUM=${counter}`);
              if (!response1.ok) {
                throw new Error('MOVE not found');
              }
              const data1 = await response1.json();
    
              move_moveid = data1.MOVEID;
              move_autonum = data1.NO;
              move_waza = data1.WAZA;
              move_name = data1.MOVE;
              move_taipu = data1.TAIPU;
              move_type = data1.TYPE;
              move_bunrui = data1.BUNRUI;
              move_category = data1.CATEGORY;
              move_pp = data1.PP;
              move_power = data1.POWER;
              move_accuracy = data1.ACCURACY;
              move_sedai = data1.SEDAI;
              move_generation = data1.GENERATION;
              move_setsumei = data1.SETSUMEI;
              move_explanation = data1.EXPLANATION;
              move_autonum = data1.AUTONUM;
    
              active = true;
              const languageButton = document.getElementById('languageButton');
              const windowButton = document.getElementById('windowButton');
              const imageButton = document.getElementById('imageButton');
              jap_or_eng = languageButton.checked ? 'jap' : 'eng';
              bright_or_dark = windowButton.checked ? 'bright' : 'dark';
              normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
    
              // パラメータをURLに設定
              optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
    
              let move_edit_link;
              switch (jap_or_eng) {
                case 'jap':
                  move_edit_link = `<button id="editButton_${move_autonum}" class="editButtonClass" tag="${move_autonum}">編集する</button>`;
                  break;
                case 'eng':
                  move_edit_link = `<button id="editButton_${move_autonum}" class="editButtonClass" tag="${move_autonum}">Edit</button>`;
                  break;
                default:
                  break;
              }
              let poke_link = '';
              const response2 = await fetch(`http://127.0.0.1:3001/api/move_to_poke?MOVEID=${move_moveid}`, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (!response2.ok) {
                switch (jap_or_eng) {
                  case 'jap':
                    poke_link = `<p>まだ登録されていません。。。</p>`;
                    break;
                  case 'eng':
                    poke_link = `<p>This is not be enrolled...</p>`;
                    break;
                  default:
                    break;
                }
                if(move_category == 'Z-Moves')
                {
                  switch (jap_or_eng) {
                    case 'jap':
                      poke_link = `<p>Zわざです。</p>`;
                      break;
                    case 'eng':
                      poke_link = `<p>This is Z-Move</p>`;
                      break;
                    default:
                      break;
                  }
                }
                if(move_category == 'G-Max Moves')
                {
                  switch (jap_or_eng) {
                    case 'jap':
                      poke_link = `<p>ダイマックスわざです。</p>`;
                      break;
                    case 'eng':
                      poke_link = `<p>This is Dynamax-Move</p>`;
                      break;
                    default:
                      break;
                  }
                }
              }
              else
              {
                poke_container_pics = [];
                poke_container_autonum = [];
                const data2 = await response2.json();
                data2.forEach((item, index) => {
                  // ループ内で配列の再初期化を行わない
                  switch (normal_or_shiny) {
                    case 'normal':
                      poke_container_pics.push(item.PATH_NORMAL_FRONT);
                      break;
                    case 'shiny':
                      poke_container_pics.push(item.PATH_SHINY_FRONT);
                      break;
                    default:
                      break;
                  }
                  poke_container_autonum.push(item.POKE_AUTONUM);
                  // リンク付き画像のHTML生成
                  poke_link +=
                  `
                  <div class="image-container" id="pokeImage_${item.POKE_AUTONUM}" tag="${item.POKE_AUTONUM}">
                  <a href="pokedex.html?AUTONUM=${item.POKE_AUTONUM}${optionURL}">
                  <img width="80" height="80" src="${poke_container_pics[index]}" alt="Pokémon Image">
                  </a>
                  </div>
                  `;
                });
                
                // HTML挿入後にイベントリスナーを設定する
                document.querySelectorAll('.image-container').forEach((container) => {
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
                    const each_autonum = parseInt(container.getAttribute('tag'));
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
              move_field = document.querySelector(`[${conf.move_field_data}]`);
              let move_data_html = '';
              switch (jap_or_eng) {
                case 'jap':
                  move_data_html =
                  `
                  <div id="move" class="data-field" move-field-data>
                  <table id="${move_moveid}" border="4">
                  <tr><td width="20%">わざ</td><td width="10%">タイプ</td><td width="10%">分類</td><td width="5%">PP</td><td width="5%">威力</td><td width="5%">命中</td><td width="10%">世代</td></tr>
                  <tr><td width="20%"><span id="waza">${move_waza}</span></td><td width="10%"><span id="taipu">${move_taipu}</span></td><td width="10%"><span id="bunrui">${move_bunrui}</span></td><td width="5%"><span id="pp">${move_pp}</span></td><td width="5%"><span id="power">${move_power}</span></td><td width="5%"><span id="accuracy">${move_accuracy}</span></td><td width="10%"><span id="sedai">${move_sedai}</span></td></tr>
                  <tr><td width="20%">説明</td><td colspan="9" class="explain"><span id="setsumei">${move_setsumei}</span></td></tr>
                  <tr><td colspan="6">覚えるポケモン</td><td width ="10%">${move_edit_link}</td></tr>
                  <tr><td class="explain" colspan="9">${poke_link}</td></tr>
                  </table>
                  </div>
                  `;
                  break;
                case 'eng':
                  move_data_html =
                  `
                  <div id="move" class="data-field" move-field-data>
                  <table id="${move_moveid}" border="4">
                  <tr><td width="20%">Move</td><td width="10%">Type</td><td width="10%">Category</td><td width="5%">PP</td><td width="5%">Power</td><td width="5%">Accuracy</td><td width="10%">Generation</td></tr>
                  <tr><td width="20%"><span id="waza">${move_name}</span></td><td width="10%"><span id="taipu">${move_type}</span></td><td width="10%"><span id="bunrui">${move_category}</span></td><td width="5%"><span id="pp">${move_pp}</span></td><td width="5%"><span id="power">${move_power}</span></td><td width="5%"><span id="accuracy">${move_accuracy}</span></td><td width="10%"><span id="sedai">${move_generation}</span></td></tr>
                  <tr><td width="20%">Explanation</td><td colspan="9" class="explain"><span id="setsumei">${move_explanation}</span></td></tr>
                  <tr><td colspan="6">Pokémon List</td><td width ="10%">${move_edit_link}</td></tr>
                  <tr><td class="explain" colspan="9">${poke_link}</td></tr>
                  </table>
                  </div>
                  `;
                  break;
                default:
                  break;
                }
                move_field.insertAdjacentHTML('beforeend', move_data_html);
              
    
              // ボタンに対するイベントリスナーを設定
              const editButton = document.querySelector(`#editButton_${move_autonum}`);
              if (editButton) {
                editButton.addEventListener('click', function () {
                  const selectedMoveAutonum = parseInt(editButton.getAttribute('tag'));
                  active = true;
                  const languageButton = document.getElementById('languageButton');
                  const windowButton = document.getElementById('windowButton');
                  const imageButton = document.getElementById('imageButton');
                  jap_or_eng = languageButton.checked ? 'jap' : 'eng';
                  bright_or_dark = windowButton.checked ? 'bright' : 'dark';
                  normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
                  move_autonum = selectedMoveAutonum;
                  
                  optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;
                  
                  localStorage.setItem('POKE_AUTONUM', null);
                  localStorage.setItem('MOVE_AUTONUM', move_autonum);
                  localStorage.setItem('language', jap_or_eng);
                  localStorage.setItem('window', bright_or_dark);
                  localStorage.setItem('image', normal_or_shiny);
                  
                  window.location.href = `moveAddPokes.html?AUTONUM=${move_autonum}${optionURL}`;
                });
              }
              
    
            } catch (error) {
              console.error(error);
              document.getElementById('poke_number').innerText = 'POKÉMON Not Found';
            }
          }
    
          if (target_tableid) {
            targetElement = document.getElementById(target_tableid);
            if (targetElement) {
              // 対象のtable要素が存在する場合、スクロールする
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          return this;
        } catch (error) {
          console.error(error);
        }
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
      languageLabel = languageButton.nextElementSibling;
      windowLabel = windowButton.nextElementSibling;
      imageLabel = imageButton.nextElementSibling;

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
              <a id="decisionButton" href="movedex.html">
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
        if(selected_type == undefined)
        {
          selected_type = 1;
        }
        selected_type = `?selected_type=${selected_type}`;

        optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;
        newURL = windowURL + selected_type + optionURL;
    
        // ローカルストレージにlanguage, window, image, trans_reload_flagを保存
        localStorage.setItem('type', selected_type);
        localStorage.setItem('POKE_AUTONUM', null);
        localStorage.setItem('MOVE_AUTONUM', null);
        localStorage.setItem('RELOAD_AUTONUM', null);
        localStorage.setItem('CALLED_AUTONUM', null);
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);
        // ページをリロード
        window.location.href = newURL;
      }
    },
  };

  active = () => {
    func
      .init()
      .makeSettingCommand()
      .reflectMode()
      .makeDecisionButton()
      .makeTypeImage()
      .makeMoveField(selected_type);
    return;
  };

  return { active };
})();

window.addEventListener('load', function () {
  Thisproject.active();
});
