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
  poke_autonum,
  poke_path_front,
  type_field,
  save_field,
  type_data_html,
  save_data_html,
  move_autonum,
  reload_move_autonum,
  poke_count,
  move_count,
  get_moveid,
  setting_button_html,
  decision_html,
  data_cursor,
  move_buttons_cursor,
  move_moveid,
  move_type,
  move_name,
  

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
  trans_autonum,
  trans_reload_flag,
  trans_mode_language,
  trans_mode_window,
  trans_mode_image,
  languageLabel,
  windowLabel,
  imageLabel,
  jap_or_eng,
  bright_or_dark,
  normal_or_shiny,

  last_time_array = [],
  this_time_array = [],
  last_autonum_poke = [],
  this_autonum_poke = [],
  change_color_array = [],
  diff_array_insert = [],
  diff_autonum_insert = [],
  diff_array_delete = [],
  delete_pokeid_array = [],
  delete_autonum_array = [],
  AUTONUM_POKE,
  AUTONUM_MOVE,

  flag;
  const conf = {
    move_field_data: `move-field-data`,
    curosr_field_data: `curosor-field-data`,
    poke_field_data: `poke-field-data`,
    type_field_data: `type-field-data`,
    save_field_data: `save-field-data`,
    setting_command: `setting-command`,
    decision_button: `decision-button`,
  };
  func = {
    init: function (){
      flag = true;
      windowURL = 'moveAddPokes.html';
      move_autonum = 1;
      AUTONUM_POKE = 1;
      AUTONUM_MOVE = 1;

      if((localStorage.getItem('MOVE_AUTONUM') != 'NaN') && (localStorage.getItem('MOVE_AUTONUM') != 'null'))
      {
        move_autonum = parseInt(localStorage.getItem('MOVE_AUTONUM'));
        AUTONUM_MOVE = move_autonum;
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
        get_mode_image = null;
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
    makeTypeImage: function(){
      if(flag){
        type_field = document.querySelector(`[${conf.type_field_data}]`);
        type_data_html =
        `
        <div>
        <button><img src="type/01.png" height="25px" width="25px"></button>
        <button><img src="type/02.png" height="25px" width="25px"></button>
        <button><img src="type/03.png" height="25px" width="25px"></button>
        <button><img src="type/04.png" height="25px" width="25px"></button>
        <button><img src="type/05.png" height="25px" width="25px"></button>
        <button><img src="type/06.png" height="25px" width="25px"></button>
        <button><img src="type/07.png" height="25px" width="25px"></button>
        <button><img src="type/08.png" height="25px" width="25px"></button>
        <button><img src="type/09.png" height="25px" width="25px"></button>
        <br>
        <div>
        <button><img src="type/10.png" height="25px" width="25px"></button>
        <button><img src="type/11.png" height="25px" width="25px"></button>
        <button><img src="type/12.png" height="25px" width="25px"></button>
        <button><img src="type/13.png" height="25px" width="25px"></button>
        <button><img src="type/14.png" height="25px" width="25px"></button>
        <button><img src="type/15.png" height="25px" width="25px"></button>
        <button><img src="type/16.png" height="25px" width="25px"></button>
        <button><img src="type/17.png" height="25px" width="25px"></button>
        <button><img src="type/18.png" height="25px" width="25px"></button>
        </div>
        `;
        type_field.insertAdjacentHTML('beforeend', type_data_html);
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
        move_buttons_cursor =
        `
        <button id="prev" class-buttons-cursor>←</button>
        <button id="next" class-buttons-cursor>→</button>
        `;
        data_cursor.insertAdjacentHTML('beforeend', move_buttons_cursor);

        let next_button = document.getElementById('next');
        if (next_button) {
          next_button.addEventListener('click', func.nextMove);
        }
        let prev_button = document.getElementById('prev');
        if (prev_button) {
          prev_button.addEventListener('click', func.prevMove);
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
          })
          .catch((error) => {
            console.log(error);
            document.getElementById('poke_number').innerText = 'POKÉMON Not Found';
          });
      }
      return this;
    },
    fetchMoveData: function(){
      if(flag){
        fetch(`http://127.0.0.1:3001/api/move?AUTONUM=${AUTONUM_MOVE}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('POKEMON not found');
            }
            return response.json();
          })
          .then((data) => {
            move_autonum = AUTONUM_MOVE,
            move_moveid = data.MOVEID,
            move_type = data.TYPE,
            get_moveid = move_moveid;
            switch(jap_or_eng)
            {
              case 'jap':
                move_name = data.WAZA;
                break;
              case 'eng':
                move_name = data.MOVE;
                break;
              default:
                break;
            }
          })
          .catch((error) => {
            console.log(error);
            switch(jap_or_eng)
            {
              case 'jap':
                document.getElementById('poke_number').innerText = 'わざが見つかりませんでした...';
                break;
              case 'eng':
                document.getElementById('poke_number').innerText = 'Move Not Found...';
                break;
              default:
                break;
            }
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
          switch(normal_or_shiny)
          {
            case 'normal':
              poke_path_front = data.PATH_NORMAL_FRONT;
              break;
            case 'shiny':
              poke_path_front = data.PATH_SHINY_FRONT;
              break;
            default:
              break;
          }
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
        const move_field = document.querySelector(`[${conf.move_field_data}]`);
        
        let poke_field_autonum = 1;
        let move_field_autonum = 1;
        
        const move_select = document.createElement('select');
        move_select.id = 'move_select';
        
        // ページが読み込まれたときに選択状態を復元
        const savedValue = localStorage.getItem('currentSelection');
        
        if (savedValue) {
          move_select.value = savedValue;
        }

        active = true;
        const languageButton = document.getElementById('languageButton');
        const windowButton = document.getElementById('windowButton');
        const imageButton = document.getElementById('imageButton');
        jap_or_eng = languageButton.checked ? 'jap' : 'eng';
        bright_or_dark = windowButton.checked ? 'bright' : 'dark';
        normal_or_shiny = imageButton.checked ? 'normal' : 'shiny';
        
        // パラメータをURLに設定
        optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        
        move_select.addEventListener('change', async (event) => {
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
          
          
          localStorage.setItem('POKE_AUTONUM', null);
          localStorage.setItem('MOVE_AUTONUM', selectedAutonum);
          localStorage.setItem('language', jap_or_eng);
          localStorage.setItem('window', bright_or_dark);
          localStorage.setItem('image', normal_or_shiny);
          optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;

          localStorage.setItem('currentSelection', selectedAutonum);
          window.location.href = `moveAddPokes.html?AUTONUM=${selectedAutonum}${optionURL}`;
        });
        
        const moveNames = [];
        
        for (let i = 1; i <= move_count; i++) {
          const response = await fetch(`http://127.0.0.1:3001/api/move?AUTONUM=${i}`);
          if (!response.ok) {
            throw new Error('Failed to fetch move data');
          }
          
          const data = await response.json();
          let move_name;
          switch(jap_or_eng)
          {
            case 'jap':
              move_name = data.WAZA;
              break;
            case 'eng':
              move_name = data.MOVE;
              break;
            default:
              break;
          }
          moveNames.push(move_name);
        }
        moveNames.forEach((move_name, index) => {
          const moveOption = document.createElement('option');
          moveOption.value = index + 1;
          moveOption.text = move_name;
          move_select.appendChild(moveOption);
        });
        
        if (savedValue) {
          move_select.value = savedValue; // 選択状態を復元
        }

        const currentUrl = window.location.href;
        if (currentUrl.includes('moveAddPokes.html')) {
          move_select.value = 1;
          if (AUTONUM_MOVE) {
            move_select.value = AUTONUM_MOVE; // 選択状態を復元
          }
        }
        
        move_field.appendChild(move_select);
        
        const fetchDataAndUpdate = async (AUTONUM_POKE, isPokemon) => {
          try {
            let endpoint = '';
            let field = null;
            
            if (isPokemon) {
              endpoint = `http://127.0.0.1:3001/api/poke_image?AUTONUM=${AUTONUM_POKE}`;
              field = poke_field;
            } else {
              if (move_field_autonum > 1) return;
              endpoint = `http://127.0.0.1:3001/api/move?AUTONUM=${AUTONUM_MOVE}`;
              field = move_field;
            }
            
            const response = await fetch(endpoint);
            if (!response.ok) {
              throw new Error(isPokemon ? 'POKEMON not found' : 'Move not found');
            }
            
            const data = await response.json();
            if (isPokemon) {
              switch(normal_or_shiny)
              {
                case 'normal':
                  poke_path_front = data.PATH_NORMAL_FRONT;
                  break;
                case 'shiny':
                  poke_path_front = data.PATH_SHINY_FRONT;
                  break;
                default:
                  break;
              }
              if (!poke_path_front) {
                throw new Error('PATH_FRONT not found in response');
              }
              const button = document.createElement('button');
              const img = document.createElement('img');
              button.style = `
              border: none;
              box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
              transition: box-shadow 0.3s ease;
              `;
              
              button.appendChild(img);
              img.height = '280';
              img.width = '280';
              img.id = `poke_path_img_${AUTONUM_POKE}`;
              img.src = poke_path_front;
              move_moveid = data.MOVEID;
              button.addEventListener('click', () => this.changeBackgroundColor(AUTONUM_POKE));
              field.appendChild(button);
            }
            else
            {
              const moveOption = document.createElement('option');
              moveOption.value = data.AUTONUM;
              moveOption.text = data.WAZA;
              move_select.appendChild(moveOption);
            }
          }
          catch(error)
          {
            console.log('Error fetching data:', error);
          }
        };
        for (let i = 1; i <= Math.max(poke_count, move_count); i++) {
          if (i <= poke_count) {
            await fetchDataAndUpdate(i, true);
            poke_field_autonum++;
          }
          if (i <= move_count) {
            await fetchDataAndUpdate(i, false);
            move_field_autonum++;
          }
        }
      }
      catch(error)
      {
        console.log('Error:', error.message);
      }
      return this.judgeRelation();
    },
    nextMove: function(){
      if(flag){
        try {
          let currentAutonum = parseInt(move_autonum);
          let nextAutonum = currentAutonum + 1;

          if(nextAutonum > move_count)
          {
            switch(jap_or_eng)
            {
              case 'jap':
                alert('次のわざは見つかりませんでした、、、');
                break;
              case 'eng':
                alert('Next MOVE is not FOUND...');
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

            // ローカルストレージにlanguage, window, imageを保存
            localStorage.setItem('POKE_AUTONUM', null);
            localStorage.setItem('MOVE_AUTONUM', nextAutonum);
            localStorage.setItem('language', jap_or_eng);
            localStorage.setItem('window', bright_or_dark);
            localStorage.setItem('image', normal_or_shiny);
            
            let baseUrl = window.location.href.split('?')[0];
            let newUrl = `${baseUrl}?AUTONUM=${nextAutonum}${optionURL}`;
            window.location.href = newUrl;

          }
        } catch (error) {
          console.log(error);
        }
      }
      return this.judgeRelation();
    },
    prevMove: function(){
      if(flag){
        try {
          let currentAutonum = parseInt(move_autonum);
          let prevAutonum = currentAutonum - 1;

          if(prevAutonum < 1)
          {
            switch(jap_or_eng)
            {
              case 'jap':
                alert('前のわざは見つかりませんでした、、、');
                break;
              case 'eng':
                alert('Previous MOVE is not FOUND...');
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
              // ローカルストレージにlanguage, window, imageを保存
              localStorage.setItem('POKE_AUTONUM', null);
              localStorage.setItem('MOVE_AUTONUM', prevAutonum);
              localStorage.setItem('language', jap_or_eng);
              localStorage.setItem('window', bright_or_dark);
              localStorage.setItem('image', normal_or_shiny);
              localStorage.setItem('trans_reload_flag', trans_reload_flag);
              optionURL = `?language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
              
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
    judgeRelation: function(){
      if(flag){
        fetch(`http://127.0.0.1:3001/api/show_relation?MOVEID=${get_moveid}`,
        {
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
            last_time_array.push(item.POKEID);
            last_autonum_poke.push(item.POKE_AUTONUM);
            change_color_array.push(item.POKE_AUTONUM);
          });
          this_time_array = last_time_array.slice();
          this_autonum_poke = last_autonum_poke.slice();
          change_color_array.forEach(autonum => {
            const button = document.getElementById(`poke_path_img_${autonum}`).parentNode;
            button.classList.toggle('active');
            if (button.classList.contains('active'))
            {
              button.style.backgroundColor = '#808080';
            }
          });
        })
        .catch((error) => {
          console.log('Error fetching data:', error);
          return this; // エラーが発生した場合、thisを返す
        });
      }
      return this;
    },
    changeBackgroundColor: function(AUTONUM_POKE) {
      return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:3001/api/poke_image?AUTONUM=${AUTONUM_POKE}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if(!response.ok)
          {
            throw new Error('Failed to get count');
          }
          return response.json();
        })
        .then((data) => {
          const get_pokeid = data.POKEID;
          const get_autonum = data.AUTONUM;
          const button = document.getElementById(`poke_path_img_${AUTONUM_POKE}`).parentNode; // 親要素のボタンを取得
          button.classList.toggle('active'); // activeクラスの追加・削除を切り替える
          if(button.classList.contains('active'))
          {
            button.style.backgroundColor = '#808080'; // activeクラスが付与された場合、背景色を灰色に変更
            
            this_time_array.push(get_pokeid);
            this_autonum_poke.push(get_autonum);
          }
          else
          {
            button.style.backgroundColor = 'transparent'; // activeクラスが削除された場合、背景色を透明に戻す
            let index_pokeid = this_time_array.indexOf(get_pokeid); // 配列から該当のIDを探して削除する
            let index_autonum = this_autonum_poke.indexOf(get_autonum); // 配列から該当のIDを探して削除する

            delete_pokeid_array = delete_pokeid_array.concat(get_pokeid);
            delete_autonum_array = delete_autonum_array.concat(get_autonum);

            this_time_array = last_time_array.slice();
            this_autonum_poke = last_autonum_poke.slice();

            if(index_pokeid !== -1)
            {
              this_time_array.splice(index_pokeid, 1);
            }
            
            if(index_autonum !== -1)
            {
              this_autonum_poke.splice(index_autonum, 1);
            }
            
            this_time_array = last_time_array.filter(item => !delete_pokeid_array.includes(item));
            this_autonum_poke = last_autonum_poke.filter(item => !delete_autonum_array.includes(item));

            console.log(last_time_array);
            console.log(this_time_array);
            console.log(last_autonum_poke);
            console.log(this_autonum_poke);
          }
          resolve(); // Promiseを解決する
        })
        .catch((error) => {
          console.log(error);
          reject(error); // エラーの場合はPromiseを拒否する
        });
      });
    },
    getMoveAndPoke: function(){
      if(flag){
        console.log(last_time_array);
        console.log(this_time_array);
        console.log(last_autonum_poke);
        console.log(this_autonum_poke);
        console.log(get_moveid);
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
        let insert_pokeid;
        let insert_poke_autonum;
        let insert_moveid;
        let insert_move_autonum
        let delete_pokeid;
        let delete_moveid;

        // insert処理
        if (last_time_array === null)
        {
          diff_array_insert = this_time_array.slice(); // this_time_array の全要素を diff_array_insert にコピー
          diff_autonum_insert = this_autonum_poke.slice();
        }
        else
        {
          for (let j = 0; j < this_time_array.length; j++)
          {
            if(!last_time_array.includes(this_time_array[j]))
            {
              diff_array_insert.push(this_time_array[j]);
              diff_autonum_insert.push(this_autonum_poke[j]);
            }
          }
        };
    
        for (let counter = 0; counter < diff_array_insert.length; counter++)
        {
          insert_pokeid = diff_array_insert[counter];
          insert_poke_autonum = diff_autonum_insert[counter];
          insert_moveid = get_moveid;
          insert_move_autonum = AUTONUM_MOVE;
          
          try {
            const response = await fetch(`http://127.0.0.1:3001/api/insert_relation`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                POKEID: insert_pokeid,
                POKE_AUTONUM: insert_poke_autonum,
                MOVEID: insert_moveid,
                MOVE_AUTONUM: insert_move_autonum,
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
          delete_pokeid = diff_array_delete[counter];
          delete_moveid = get_moveid;
          try {
            const response = await fetch(`http://127.0.0.1:3001/api/delete_relation`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                POKEID: delete_pokeid,
                MOVEID: delete_moveid,
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
      last_autonum_poke = this_autonum_poke;
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
              <a id="decisionButton" href="moveAddPokes.html">
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
        if(move_autonum == undefined)
        {
          move_autonum = 1;
        }
        autonumURL = `?AUTONUM=${move_autonum}`;
        optionURL = `&language=${jap_or_eng}&window=${bright_or_dark}&image=${normal_or_shiny}`;
        reloadURL = windowURL + autonumURL + optionURL;
        
        // URLを更新し、ページのリロードを抑制
        
        // ローカルストレージにAUTONUM, language, window, image, trans_reload_flagを保存
        localStorage.setItem('POKE_AUTONUM', null);
        localStorage.setItem('MOVE_AUTONUM', move_autonum);
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
      .makeTypeImage()
      //.makeSaveButton()
      .makeCursor()
      .fetchMoveData()
      .getPokeId()
      .getMoveId()
      .makeCombinedField();
    return;
  };
  save = () => {
    func
      .getMoveAndPoke()
      .getPokeId()
      .renewData();
    return;
  };
  return { active };
})();

window.addEventListener('load', function () {
  Thisproject.active();
});
