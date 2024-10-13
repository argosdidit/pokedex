const Thisproject = (() => {

  // urlParamsを定義
  //const urlParams = new URLSearchParams(window.location.search);

  // AUTONUMを定義し、デフォルトの値を1に設定
  //let AUTONUM_POKE = urlParams.get('AUTONUM') || '1';
  //let AUTONUM_MOVE = urlParams.get('AUTONUM') || '1';

  'use strict';
  let
  func,
  active,
  save,
  save_field,
  save_data_html,
  poke_normal_img,
  poke_shiny_img,
  move_autonum,
  poke_pokeid,
  poke_type1,
  poke_type2,
  poke_path_normal_front,
  poke_autonum,
  reload_poke_autonum,
  poke_count,
  move_count,
  get_pokeid,
  setting_button_html,
  data_cursor,
  poke_buttons_cursor,
  waza_html,

  decision_html,
  decision_button,
  area_setting,
  autonumURL,
  windowURL,
  optionURL,
  reloadURL,
  queryString,
  url_params,
  body_css,
  selected_languageButton,
  selected_windowButton,
  selected_imageButton,
  languageLabel,
  windowLabel,
  imageLabel,
  jap_or_eng,
  bright_or_dark,
  normal_or_shiny,

  last_time_array = [],
  this_time_array = [],
  last_autonum_move = [],
  this_autonum_move = [],
  change_color_array = [],
  diff_array_insert = [],
  diff_autonum_insert = [],
  diff_array_delete = [],
  delete_moveid_array = [],
  delete_autonum_array = [],
  AUTONUM_POKE,
  AUTONUM_MOVE,

  flag;
  const conf = {
    move_field_data: `move-field-data`,
    curosr_field_data: `curosor-field-data`,
    poke_field_data: `poke-field-data`,
    save_field_data: `save-field-data`,
    setting_command: `setting-command`,
    decision_button: `decision-button`,
  };
  func = {
    init: function (){
      flag = true;
      windowURL = 'pokeAddMoves.html';
      poke_autonum = 1;
      AUTONUM_POKE = 1;
      AUTONUM_MOVE = 1;

      if((localStorage.getItem('POKE_AUTONUM') != 'NaN') && (localStorage.getItem('POKE_AUTONUM') != 'null'))
      {
        poke_autonum = parseInt(localStorage.getItem('POKE_AUTONUM'));
        AUTONUM_POKE = poke_autonum;
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
    makeSaveButton: function(){
      if(flag){
        save_field = document.querySelector(`[${conf.save_field_data}]`);
        save_data_html =
        `<button>SAVE</button>`;
        save_field.insertAdjacentHTML('beforeend', save_data_html);

        let save_button = document.getElementById('save');
        if(save_button)
        {
          save_button.addEventListener('click', save);
        }
      }
      return this;
    },
    makeCursor: function () {
      if (flag) {
        data_cursor = document.querySelector(`[${conf.curosr_field_data}]`);
        poke_buttons_cursor =
        `
        <button id="prev" class-buttons-cursor>←</button>
        <button id="next" class-buttons-cursor>→</button>
        `;
        data_cursor.insertAdjacentHTML('beforeend', poke_buttons_cursor);

        let next_button = document.getElementById('next');
        if (next_button) {
          next_button.addEventListener('click', func.nextPoke);
        }
        let prev_button = document.getElementById('prev');
        if (prev_button) {
          prev_button.addEventListener('click', func.prevPoke);
        }
      }
      return this;
    },
    fetchPokeData: function(){
      if(flag){
        fetch(`http://127.0.0.1:3001/api/poke_image?AUTONUM=${AUTONUM_POKE}`)
          .then((response) => {
            if (!response.ok)
            {
              throw new Error('POKEMON not found');
            }
            return response.json();
          })
          .then((data) => {
            poke_autonum = AUTONUM_POKE,
            poke_pokeid = data.POKEID,
            poke_normal_img = data.PATH_NORMAL_FRONT,
            poke_shiny_img = data.PATH_SHINY_FRONT,
            poke_type1 = data.TYPE1,
            poke_type2 = data.TYPE2;
            get_pokeid = poke_pokeid;
          })
          .catch((error) => {
            console.log(error);
            document.getElementById('poke_number').innerText = 'POKÉMON Not Found';
          });
      }
      return this;
    },
    
    getPokeId: function(){
      if(flag){
        poke_autonum = AUTONUM_POKE;
      }
      return this;
    },
    getMoveId: function(){
      if(flag){
        move_autonum = AUTONUM_MOVE;
      }
      return this;
    },
    getPokeCount: function(){
      return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:3001/api/poke_count?AUTONUM=${AUTONUM_POKE}`, {
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
          poke_autonum = AUTONUM_POKE;
          poke_count = data.count;
          poke_path_normal_front = data.PATH_NORMAL_FRONT;
          resolve(); // Promiseを解決する
        })
        .catch((error) => {
          console.log(error);
          reject(error); // エラーの場合はPromiseを拒否する
        });
      });
    },
    getMoveCount: function(){
      return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:3001/api/move_count?AUTONUM=${AUTONUM_MOVE}`, {
          headers:
          {
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
          move_autonum = AUTONUM_MOVE;
          move_count = data.count;
          resolve(); // Promiseを解決する
        })
        .catch((error) => {
          console.log(error);
          reject(error); // エラーの場合はPromiseを拒否する
        });
      });
    },
    makeCombinedField: async function () {
      try {
        await this.getPokeCount();
        await this.getMoveCount();
        
        console.log('Number of rows (Pokémon):', poke_count);
        console.log('Number of rows (Moves):', move_count);
        
        const poke_field = document.querySelector(`[${conf.poke_field_data}]`);
        
        let poke_field_autonum = 1;
        let move_field_autonum = 1;
        
        const poke_select = document.createElement('select');
        poke_select.id = 'poke_select';
        
        const savedValue = localStorage.getItem('currentSelection');
        
        if (savedValue) {
          poke_select.value = savedValue;
        }
        // パラメータをURLに設定
        optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        
        poke_select.addEventListener('change', async (event) => {
          const selectedAutonum = event.target.value;
          if (!selectedAutonum) return;
          active = true;
          const languageButton = document.getElementById('languageButton');
          const windowButton = document.getElementById('windowButton');
          const imageButton = document.getElementById('imageButton');
          jap_or_eng = languageButton.checked ? 'jap' : 'eng';
          bright_or_dark = windowButton.checked ? 'bright' : 'dark';
          normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
          autonumURL = selectedAutonum;
          optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;
          reloadURL = windowURL + autonumURL + optionURL;
          localStorage.setItem('POKE_AUTONUM', selectedAutonum);
          localStorage.setItem('MOVE_AUTONUM', null);
          localStorage.setItem('language', jap_or_eng);
          localStorage.setItem('window', bright_or_dark);
          localStorage.setItem('image', normal_or_shiny);
          optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;

          localStorage.setItem('currentSelection', selectedAutonum);
          window.location.href = `pokeAddMoves.html?AUTONUM=${selectedAutonum}${optionURL}`;
        });
    
        const pokeNames = [];
        
        for (let i = 1; i <= poke_count; i++) {
          const response = await fetch(`http://127.0.0.1:3001/api/poke?AUTONUM=${i}`);
          if (!response.ok) {
            throw new Error('Failed to fetch pokemon data');
          }

          const data = await response.json();

          let poke_name;
          let poke_form;

          switch(jap_or_eng)
          {
            case 'jap':
              poke_name = data.NAMAE;
              poke_form = data.SUGATA;
              break;
            case 'eng':
              poke_name = data.NAME;
              poke_form = data.FORM;
              break;
            default:
              break;
          }
          if (poke_form != undefined) {
            pokeNames.push(poke_name + "(" + poke_form + ")");
          } else {
            pokeNames.push(poke_name);
          }
        }
    
        pokeNames.forEach((poke_name, index) => {
          const pokeOption = document.createElement('option');
          pokeOption.value = index + 1;
          pokeOption.text = poke_name;
          poke_select.appendChild(pokeOption);
        });
    
        if (savedValue) {
          poke_select.value = savedValue; // 選択状態を復元
        }
    
        const currentUrl = window.location.href;
        if (currentUrl.includes('pokeAddMoves.html')) {
          poke_select.value = 1;
          if (AUTONUM_POKE) {
            poke_select.value = AUTONUM_POKE; // 選択状態を復元
            active = true;
            const languageButton = document.getElementById('languageButton');
            const windowButton = document.getElementById('windowButton');
            const imageButton = document.getElementById('imageButton');
            jap_or_eng = languageButton.checked ? 'jap' : 'eng';
            bright_or_dark = windowButton.checked ? 'bright' : 'dark';
            normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
            // パラメータをURLに設定
            optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
          }
        }
        poke_field.appendChild(poke_select);
    
        const fetchDataAndUpdate = async (AUTONUM_MOVE, isMove) => {
          try {
            let endpoint = '';
            
            if (isMove) {
              endpoint = `http://127.0.0.1:3001/api/move?AUTONUM=${AUTONUM_MOVE}`;
            } else {
              if (poke_field_autonum > 1) return;
              endpoint = `http://127.0.0.1:3001/api/poke?AUTONUM=${AUTONUM_POKE}`;
            }
            
            const response = await fetch(endpoint);
            if (!response.ok) {
              throw new Error(isMove ? 'Move not found' : 'POKEMON not found');
            }
            
            const data = await response.json();
            if (isMove) {
              const move_moveid = data.MOVEID;
              const move_waza = data.WAZA;
              const move_move = data.MOVE;
              const move_taipu = data.TAIPU;
              const move_type = data.TYPE;
              const move_bunrui = data.BUNRUI;
              const move_category = data.CATEGORY;
              const move_pp = data.PP;
              const move_power = data.POWER;
              const move_accuracy = data.ACCURACY;
              const move_sedai = data.SEDAI;
              const move_generation = data.GENERATION;
              
              if (!move_moveid) {
                throw new Error('MOVEID not found in response');
              }
              if (!move_waza) {
                throw new Error('WAZA not found in response');
              }
              if (!move_move) {
                throw new Error('MOVE not found in response');
              }
              if (!move_taipu) {
                throw new Error('TAIPU not found in response');
              }
              if (!move_type) {
                throw new Error('TYPE not found in response');
              }
              if (!move_bunrui) {
                throw new Error('BUNRUI not found in response');
              }
              if (!move_category) {
                throw new Error('CATEGORY not found in response');
              }
              if (!move_pp) {
                throw new Error('PP not found in response');
              }
    
              let move_field = document.querySelector(`[${conf.move_field_data}]`);
              let type_path;
              switch(move_type)
              {
                case "NORMAL":
                  type_path = '"type/01.png" height="35px" width="35px"';
                  break;
                case "FIRE":
                  type_path = '"type/02.png" height="35px" width="35px"';
                  break;
                case "WATER":
                  type_path = '"type/03.png" height="35px" width="35px"';
                  break;
                case "GRASS":
                  type_path = '"type/04.png" height="35px" width="35px"';
                  break;
                case "ELECTRIC":
                  type_path = '"type/05.png" height="35px" width="35px"';
                  break;
                case "ICE":
                  type_path = '"type/06.png" height="35px" width="35px"';
                  break;
                case "FIGHT":
                  type_path = '"type/07.png" height="35px" width="35px"';
                  break;
                case "POISON":
                  type_path = '"type/08.png" height="35px" width="35px"';
                  break;
                case "GROUND":
                  type_path = '"type/09.png" height="35px" width="35px"';
                  break;
                case "FLYING":
                  type_path = '"type/10.png" height="35px" width="35px"';
                  break;
                case "PSYCHIC":
                  type_path = '"type/11.png" height="35px" width="35px"';
                  break;
                case "BUG":
                  type_path = '"type/12.png" height="35px" width="35px"';
                  break;
                case "ROCK":
                  type_path = '"type/13.png" height="35px" width="35px"';
                  break;
                case "GHOST":
                  type_path = '"type/14.png" height="35px" width="35px"';
                  break;
                case "DRAGON":
                  type_path = '"type/15.png" height="35px" width="35px"';
                  break;
                case "DARK":
                  type_path = '"type/16.png" height="35px" width="35px"';
                  break;
                case "STEEL":
                  type_path = '"type/17.png" height="35px" width="35px"';
                  break;
                case "FAIRY":
                  type_path = '"type/18.png" height="35px" width="35px"';
                  break;
                case Default:
                  break;
              }
              
    
              switch(jap_or_eng){
                case 'jap':
                  waza_html =
                  `
                  <br><br>
                  <button id="button_${AUTONUM_MOVE}">
                  <table id="${AUTONUM_MOVE}" border="4">
                  <tr><td rowspan="2" width="25%"  height="30%">${move_waza}</td><td colspan="2" width="20%">タイプ</td><td width="12%">分類</td><td width="11%">PP</td><td width="11%">威力</td><td width="11%">命中</td><td width="11%">世代</td></tr>
                  <tr><td width="10%"><img src=${type_path}></td><td width="10%">${move_taipu}</td><td width="12%">${move_bunrui}</td><td width="11%">${move_pp}</td><td width="11%">${move_power}</td><td width="11%">${move_accuracy}</td><td width="11%">${move_sedai}</td></tr>
                  </table>
                  </button>
                  `;
                  break;
                case 'eng':
                  waza_html =
                  `
                  <br><br>
                  <button id="button_${AUTONUM_MOVE}">
                  <table id="${AUTONUM_MOVE}" border="4">
                  <tr><td rowspan="2" width="25%"  height="30%">${move_move}</td><td colspan="2" width="20%">Type</td><td width="12%">Category</td><td width="11%">PP</td><td width="11%">Power</td><td width="11%">Accuracy</td><td width="11%">Generation</td></tr>
                  <tr><td width="10%"><img src=${type_path}></td><td width="10%">${move_type}</td><td width="12%">${move_category}</td><td width="11%">${move_pp}</td><td width="11%">${move_power}</td><td width="11%">${move_accuracy}</td><td width="11%">${move_generation}</td></tr>
                  </table>
                  </button>
                  `;
                  break;
                default:
                  break;
              }
    
              move_field.insertAdjacentHTML('beforeend', waza_html);
              
              const move_button = document.getElementById(`button_${AUTONUM_MOVE}`);
              move_button.addEventListener('click', () => this.changeBackgroundColor(AUTONUM_MOVE));
            } else {
              const pokeOption = document.createElement('option');
              pokeOption.value = data.AUTONUM;
              switch(jap_or_eng)
              {
                case 'jap':
                  pokeOption.text = data.NAMAE;
                  break;
                case 'eng':
                  pokeOption.text = data.NAME;
                  break;
                default:
                  break;
              }
              poke_select.appendChild(pokeOption);
            }
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        };
    
        for (let i = 1; i <= Math.max(move_count, poke_count); i++) {
          if (i <= move_count) {
            await fetchDataAndUpdate(i, true);
            move_field_autonum++;
          }
          if (i <= poke_count) {
            await fetchDataAndUpdate(i, false);
            poke_field_autonum++;
          }
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
      return this.judgeRelation();
    },
    nextPoke: function(){
      if(flag){
        try {
          let currentAutonum = parseInt(poke_autonum);
          let nextAutonum = currentAutonum + 1;
          if(nextAutonum > poke_count)
          {
            switch(jap_or_eng)
            {
              case 'jap':
                alert('次のポケモンは見つかりませんでした、、、');
                break;
              case 'eng':
                alert('Next POKE is not FOUND...');
                break;
              default:
                break;
            }
          }
          else
          {
            active = true;
            const languageButton = document.getElementById('languageButton');
            const windowButton = document.getElementById('windowButton');
            const imageButton = document.getElementById('imageButton');
            jap_or_eng = languageButton.checked ? 'jap' : 'eng';
            bright_or_dark = windowButton.checked ? 'bright' : 'dark';
            normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';

            // パラメータをURLに設定
            autonumURL = `?AUTONUM=${nextAutonum}`;
            optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;
            reloadURL = windowURL + autonumURL + optionURL;

            localStorage.setItem('POKE_AUTONUM', nextAutonum);
            localStorage.setItem('MOVE_AUTONUM', null);
            localStorage.setItem('language', jap_or_eng);
            localStorage.setItem('window', bright_or_dark);
            localStorage.setItem('image', normal_or_shiny);
            
            let baseUrl = window.location.href.split('?')[0];
            let newUrl = `${baseUrl}?AUTONUM=${nextAutonum}${optionURL}`;
            window.location.href = newUrl;
          }
        }
        catch (error) {
          console.log(error);
        }
      }
      return this.judgeRelation();
    },
    prevPoke: function(){
      if(flag){
        try {
          let currentAutonum = parseInt(poke_autonum);
          let prevAutonum = currentAutonum - 1;
          if(prevAutonum < 1)
          {
            switch(jap_or_eng)
            {
              case 'jap':
                alert('前のポケモンは見つかりませんでした、、、');
                break;
              case 'eng':
                alert('Previous POKE is not FOUND...');
                break;
              default:
                break;
              }
            }
            else
            {
              active = true;
              const languageButton = document.getElementById('languageButton');
              const windowButton = document.getElementById('windowButton');
              const imageButton = document.getElementById('imageButton');
              jap_or_eng = languageButton.checked ? 'jap' : 'eng';
              bright_or_dark = windowButton.checked ? 'bright' : 'dark';
              normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
              // パラメータをURLに設定
              autonumURL = `?AUTONUM=${prevAutonum}`;
              optionURL = `?language=\${${jap_or_eng}}&window=\${${bright_or_dark}}&image=\${${normal_or_shiny}}`;
              reloadURL = windowURL + autonumURL + optionURL;

              localStorage.setItem('POKE_AUTONUM', prevAutonum);
              localStorage.setItem('MOVE_AUTONUM', null);
              localStorage.setItem('language', jap_or_eng);
              localStorage.setItem('window', bright_or_dark);
              localStorage.setItem('image', normal_or_shiny);
              let baseUrl = window.location.href.split('?')[0];
              let newUrl = `${baseUrl}?AUTONUM=${prevAutonum}${optionURL}`;
              window.location.href = newUrl;
            }
          } catch (error) {
          console.log(error);
        }
      }
      return this.judgeRelation();
    },
    judgeRelation: function() {
      if (flag) {
        fetch(`http://127.0.0.1:3001/api/show_relation_pokeid?POKEID=${get_pokeid}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('RELATION IS NOT FOUND');
          }
          return response.json();
        })
        .then((data) => {
          data.forEach(item => {
            last_time_array.push(item.MOVEID);
            last_autonum_move.push(item.MOVE_AUTONUM);
            change_color_array.push(item.MOVE_AUTONUM);
          });
          this_time_array = last_time_array.slice();
          this_autonum_move = last_autonum_move.slice();
          change_color_array.forEach(autonum => {
            const table = document.getElementById(`${autonum}`);
            table.style.borderColor = 'red';
            table.style.color = 'black';
          });
        })
        .catch((error) => {
          console.log('Error fetching data:', error);
          return this; // エラーが発生した場合、thisを返す
        });
      }
      return this;
    },
    changeBackgroundColor: function(AUTONUM_MOVE) {
      return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:3001/api/move?AUTONUM=${AUTONUM_MOVE}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to get move data');
          }
          return response.json();
        })
        .then((data) => {
          const get_moveid = data.MOVEID;
          const get_autonum = data.AUTONUM;
          const button = document.getElementById(`button_${AUTONUM_MOVE}`); // ボタン要素を取得
          const table = button.querySelector('table'); // ボタン内のテーブル要素を取得
    
          button.classList.toggle('active'); // activeクラスの切り替え
    
          if (button.classList.contains('active')) {
            table.style.borderColor = 'red';
            table.style.color = 'black';
            
            this_time_array.push(get_moveid);
            this_autonum_move.push(get_autonum);
          } else {
            table.style.borderColor = 'transparent';
            table.style.color = 'black';
            
            const index_moveid = this_time_array.indexOf(get_moveid); // 配列から該当のIDを探して削除する
            const index_autonum = this_autonum_move.indexOf(get_autonum); // 配列から該当のIDを探して削除する
    
            delete_moveid_array = delete_moveid_array.concat(get_moveid);
            delete_autonum_array = delete_autonum_array.concat(get_autonum);
    
            if (index_moveid !== -1) {
              this_time_array.splice(index_moveid, 1);
            }
            
            if (index_autonum !== -1) {
              this_autonum_move.splice(index_autonum, 1);
            }
    
            this_time_array = last_time_array.filter(item => !delete_moveid_array.includes(item));
            this_autonum_move = last_autonum_move.filter(item => !delete_autonum_array.includes(item));
          }
    
          console.log(last_time_array);
          console.log(this_time_array);
          console.log(last_autonum_move);
          console.log(this_autonum_move);
    
          resolve(); // Promiseを解決する
        })
        .catch((error) => {
          console.log(error);
          reject(error); // エラーの場合はPromiseを拒否する
        });
      });
    },
    getPokeAndMove: function(){
      if(flag){
        console.log(last_time_array);
        console.log(this_time_array);
        console.log(last_autonum_move);
        console.log(this_autonum_move);
        console.log(get_pokeid);
        console.log(last_time_array.length);
        console.log(this_time_array.length);
        console.log(diff_array_delete);
        console.log(diff_array_insert);
      }
      return this;
    },
    renewData: async function() {
      if (flag) {
        let insert_bool = true;
        let insert_moveid;
        let insert_move_autonum;
        let insert_pokeid;
        let insert_poke_autonum;
        let delete_moveid;
        let delete_pokeid;
        
        // insert処理
        if (last_time_array === null)
        {
          diff_array_insert = this_time_array.slice(); // this_time_array の全要素を diff_array_insert にコピー
          diff_autonum_insert = this_autonum_move.slice();
        }
        else
        {
          for (let j = 0; j < this_time_array.length; j++)
          {
            if(!last_time_array.includes(this_time_array[j]))
            {
              diff_array_insert.push(this_time_array[j]);
              diff_autonum_insert.push(this_autonum_move[j]);
            }
          }
        };
    
        for (let counter = 0; counter < diff_array_insert.length; counter++)
        {
          insert_moveid = diff_array_insert[counter];
          insert_move_autonum = diff_autonum_insert[counter];
          insert_pokeid = get_pokeid;
          insert_poke_autonum = AUTONUM_POKE;
          
          try {
            const response = await fetch(`http://127.0.0.1:3001/api/insert_relation`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                MOVEID: insert_moveid,
                MOVE_AUTONUM: insert_move_autonum,
                POKEID: insert_pokeid,
                POKE_AUTONUM: insert_poke_autonum,
                RELATION: insert_bool,
              }),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
          }
          catch(error)
          {
            console.log('There was a problem with your fetch operation:', error);
          }
        };

        //delete処理
        for (let i = 0; i < last_time_array.length; i++) {
          if (!this_time_array.includes(last_time_array[i])) {
            diff_array_delete.push(last_time_array[i]);
          }
        }
        for (let counter = 0; counter < diff_array_delete.length; counter++) {
          delete_moveid = diff_array_delete[counter];
          delete_pokeid = get_pokeid;
          try {
            const response = await fetch(`http://127.0.0.1:3001/api/delete_relation`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                MOVEID: delete_moveid,
                POKEID: delete_pokeid,
              }),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
          }
          catch(error)
          {
            console.log('There was a problem with your fetch operation:', error);
          }
        };
      }
      last_time_array = this_time_array;
      last_autonum_move = this_autonum_move;
      alert('SAVE WAS SUCCEEDED');
      return this;
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
    makeDecisionButton: function() {
      if (flag) {
        decision_html = `
          <div class="decision-command">
            <button id="buttonWithImage">
              <a id="decisionButton" href="pokeAddMoves.html">
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
        // 既存のURLの設定
        // パラメータをURLに設定
        if(poke_autonum == undefined)
        {
          poke_autonum = 1;
        }
        autonumURL = `?AUTONUM=${poke_autonum}`;
        optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        reloadURL = windowURL + autonumURL + optionURL;
    
        // ローカルストレージにAUTONUM, language, window, image, trans_reload_flagを保存
        localStorage.setItem('POKE_AUTONUM', poke_autonum);
        localStorage.setItem('MOVE_AUTONUM', null);
        localStorage.setItem('language', jap_or_eng);
        localStorage.setItem('window', bright_or_dark);
        localStorage.setItem('image', normal_or_shiny);
        // ページをリロード
        window.location.reload(reloadURL);
      }
    },
  };
  active = () => {
    func
      .init()
      .makeSettingCommand()
      .makeDecisionButton()
      .reflectMode()
      .makeSaveButton()
      .makeCursor()
      .fetchPokeData()
      .getPokeId()
      .getMoveId()
      .makeCombinedField();
    return;
  };
  save = () => {
    func
      .getPokeAndMove()
      .getMoveId()
      .renewData();
    return;
  };
  return { active };
})();

window.addEventListener('load', function () {
  Thisproject.active();
});