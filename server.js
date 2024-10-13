const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

const port = 3001;

app.use(cors());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'POKEDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

/*PokeのAutonumから全Poke情報を返す*/
app.get('/api/poke', (req, res) => {
  const AUTONUM = req.query.AUTONUM;
  const query = 'SELECT * FROM POKEDB.pokédex0 WHERE AUTONUM = ?';
  connection.query(query, [AUTONUM], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'POKÉMON is not found' });
    } else {
      res.json(results[0]);
    }
  });
});

/*MoveのAutonumから全Move情報を返す*/
app.get('/api/move', (req, res) => {
  const AUTONUM = req.query.AUTONUM;
  const query = 'SELECT * FROM POKEDB.movedex0 WHERE AUTONUM = ?';
  connection.query(query, [AUTONUM], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'Move is not found' });
    } else {
      res.json(results[0]);
    }
  });
});

/*MoveのAutonumから全Move情報を返す*/
app.get('/api/ability', (req, res) => {
  const ABILITYID = req.query.ABILITYID;
  const query = 'SELECT ABILITYID, TOKUSEI, ABILITY FROM POKEDB.ABILITY WHERE ABILITYID = ?';
  connection.query(query, [ABILITYID], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'Move is not found' });
    } else {
      res.json(results[0]);
    }
  });
});

/*全Pokeの種族値の最大値を返す*/
app.get('/api/individual_max', (req, res) => {
  const query ='SELECT MAX(HP), MAX(ATTACK), MAX(DEFENSE),MAX(SP_ATK), MAX(SP_DEF), MAX(SPEED), MAX(SUM) FROM POKEDB.pokédex0;';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const value = results[0].value;
      res.json({ value });
    }
  });
});

/*全PokeのCountを返す*/
app.get('/api/poke_count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM POKEDB.pokédex0';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const count = results[0].count;
      res.json({ count });
    }
  });
});

/*全MoveのCountを返す*/
app.get('/api/move_count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM POKEDB.movedex';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const count = results[0].count;
      res.json({ count });
    }
  });
});

/*全Ability1のCountを返す*/
app.get('/api/ability_count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM POKEDB.ABILITY';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const count = results[0].count;
      res.json({ count });
    }
  });
});

/*TYPEよりMove(TYPE別)のCountを返す*/
app.get('/api/move_type_count', (req, res) => {
  const TYPE = req.query.TYPE;
  const query = 'SELECT COUNT(*) AS count FROM POKEDB.movedex WHERE TYPE = ?';
  connection.query(query, [TYPE], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const count = results[0].count;
      res.json({ count });
    }
  });
});

//AUTONUM(POKE)より画像だけを返す
app.get('/api/poke_image', (req, res) => {
  const AUTONUM = req.query.AUTONUM; // クエリパラメータからAUTONUMを取得

  // AUTONUMが存在しない場合や数値でない場合はエラーを返す
  if (!AUTONUM || isNaN(AUTONUM))
  {
    return res.status(400).json({ message: 'Invalid AUTONUM parameter' });
  }
  const query =
  `
  SELECT POKEID, AUTONUM,
  PATH_NORMAL_FRONT, PATH_SHINY_FRONT,
  TYPE1, TYPE2
  FROM POKEDB.pokédex0
  WHERE AUTONUM = ?
  `;
  connection.query(query, [AUTONUM], (err, results) =>
  { // AUTONUMをクエリにバインド
    if(err)
    {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ message: 'Internal server error', error: err });
    }
    if(results.length === 0)
    {
      return res.status(404).json({ message: 'POKÉMON not found', AUTONUM: AUTONUM });
    }
    res.json(results[0]);
  });
});

app.get('/api/move_type_start_autonum', (req, res) => {
  const TYPE = req.query.TYPE;
  const query = 'SELECT * FROM POKEDB.MOVEDEX WHERE CATEGORY = 1 AND NO = 1 AND TYPE = ?';
  connection.query(query, [TYPE], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const start_autonum = results[0].AUTONUM;
      res.json({ start_autonum });
    }
  });
});



app.get('/api/move_type', (req, res) => {
  const TYPE = req.query.TYPE;
  const query = 'SELECT * FROM MOVEDEX WHERE TYPE = ?';
  connection.query(query, [TYPE], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'Move is not found' });
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/api/show_relation', (req, res) => {
  const MOVEID = req.query.MOVEID;
  const query = 'SELECT * FROM POKEDB.RELATION WHERE MOVEID = ?';
  connection.query(query, [MOVEID], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'MOVE is not found' });
    } else {
      res.json(results); // 全ての行を返す
    }
  });
});

app.get('/api/show_relation_pokeid', (req, res) => {
  const POKEID = req.query.POKEID;
  const query = 'SELECT * FROM POKEDB.RELATION WHERE POKEID = ?';
  connection.query(query, [POKEID], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'Pokeimon is not found' });
    } else {
      res.json(results); // 全ての行を返す
    }
  });
});

app.get('/api/move_to_poke', (req, res) => {
  const MOVEID = req.query.MOVEID;
  const query =
  `
    SELECT MOVEID, RELATION.POKEID, 
    POKÉDEX3.PATH_NORMAL_FRONT, POKÉDEX3.PATH_SHINY_FRONT,
    RELATION.POKE_AUTONUM
    FROM RELATION
    LEFT JOIN POKÉDEX3
    ON RELATION.POKEID = POKÉDEX3.POKEID
    WHERE MOVEID = ?;
  `;
  connection.query(query, [MOVEID], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'Pokemon is not found' });
    } else {
      res.json(results); // 全ての行を返す
    }
  });
});

app.get('/api/poke_to_move', (req, res) => {
  const POKEID = req.query.POKEID;
  const query =
  `
  SELECT POKEID, RELATION.MOVEID,
  MOVEDEX0.MOVE, MOVEDEX0.WAZA,
  TYPE.TYPEID, MOVEDEX0.TAIPU, MOVEDEX0.TYPE,
  MOVEDEX0.BUNRUI, MOVEDEX0.CATEGORY,
  MOVEDEX0.PP, MOVEDEX0.POWER, MOVEDEX0.ACCURACY,
  MOVEDEX0.GENERATION, MOVEDEX0.SEDAI,
  RELATION.MOVE_AUTONUM
  FROM RELATION
  LEFT JOIN MOVEDEX0
  ON RELATION.MOVEID = MOVEDEX0.MOVEID
  LEFT JOIN TYPE
  ON TYPE.TYPE = MOVEDEX0.TYPE
  WHERE POKEID = ?;
  `;
  connection.query(query, [POKEID], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'Move is not found' });
    } else {
      res.json(results); // 全ての行を返す
    }
  });
});



// POSTリクエストを処理するエンドポイント
app.post('/api/insert_relation', (req, res) => {
  const { POKEID, POKE_AUTONUM, MOVEID, MOVE_AUTONUM, RELATION } = req.body;

  if (!POKEID || !POKE_AUTONUM || !MOVEID || !MOVE_AUTONUM || RELATION === undefined) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  const query = `INSERT INTO RELATION (POKEID, POKE_AUTONUM, MOVEID, MOVE_AUTONUM, RELATION) VALUES (?, ?, ?, ?, ?)`;
  const values = [POKEID, POKE_AUTONUM, MOVEID, MOVE_AUTONUM, RELATION];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into RELATION table:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Data inserted into RELATION table successfully' });
  });
});


// RELATIONテーブルからデータを削除するエンドポイント
app.delete('/api/delete_relation', (req, res) => {
  const { POKEID, MOVEID } = req.body; // リクエストボディからデータを取得

  // 必要なデータが提供されていない場合はエラーを返す
  if (!POKEID || !MOVEID) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  // SQLクエリを作成
  const query = `DELETE FROM RELATION WHERE POKEID = ? AND MOVEID = ?`;
  const values = [POKEID, MOVEID];

  // クエリを実行してデータを削除
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error deleting data from RELATION table:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Data deleted from RELATION table successfully' });
  });
});

//検索エリア
app.get('/api/search/type/single', (req, res) => {
  let TYPE = (req.query.TYPE || '').trim();
  TYPE = TYPE.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除

  console.log('Received TYPE:', TYPE); // デバッグ用にログを出力

  const query =
  `
  SELECT * FROM POKEDB.pokédex0
  WHERE
  TYPE1 = ?
  AND
  TYPE2 IS NULL;
  `;
  connection.query(query, [TYPE], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // デバッグ用にエラーを出力
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Pokemon is not found' });
      } else {
        res.json(results); // 全ての行を返す
      }
    }
  });
});



app.get('/api/search/type/dual', (req, res) => {
  let TYPE1 = (req.query.TYPE1 || '').trim();
  TYPE1 = TYPE1.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除
  let TYPE2 = (req.query.TYPE2 || '').trim();
  TYPE2 = TYPE2.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除

  const query =
  `
  SELECT * FROM POKEDB.pokédex0
  WHERE
  TYPE1 = ?
  OR
  TYPE2 = ?;
  `;
  connection.query(query, [TYPE1, TYPE2], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // デバッグ用にエラーを出力
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Pokemon is not found' });
      } else {
        res.json(results); // 全ての行を返す
      }
    }
  });
});

app.get('/api/search/type/combination', (req, res) => {
  let TYPE1 = (req.query.TYPE1 || '').trim();
  TYPE1 = TYPE1.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除
  let TYPE2 = (req.query.TYPE2 || '').trim();
  TYPE2 = TYPE2.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除

  const query =
  `
  SELECT * FROM POKEDB.pokédex0
  WHERE
  TYPE1 = ?
  AND
  TYPE2 = ?;
  `;
  connection.query(query, [TYPE1, TYPE2], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // デバッグ用にエラーを出力
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Pokemon is not found' });
      } else {
        res.json(results); // 全ての行を返す
      }
    }
  });
});


app.get('/api/search/ability', (req, res) => {
  let ABILITY1 = (req.query.ABILITY1 || '').trim();
  ABILITY1 = ABILITY1.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除
  let ABILITY2 = (req.query.ABILITY2 || '').trim();
  ABILITY2 = ABILITY2.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除
  let HIDDEN_ABILITY = (req.query.HIDDEN_ABILITY || '').trim();
  HIDDEN_ABILITY = HIDDEN_ABILITY.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除
  
  const query =
  `
  SELECT * FROM POKEDB.pokédex0
  WHERE
  ABILITY1 = ?
  OR
  ABILITY2 = ?
  OR
  HIDDEN_ABILITY = ?
  `;
  connection.query(query, [ABILITY1, ABILITY2, HIDDEN_ABILITY], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // デバッグ用にエラーを出力
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Pokemon is not found' });
      } else {
        res.json(results); // 全ての行を返す
      }
    }
  });
});


app.get('/api/search/gender', (req, res) => {
  let GENDER = (req.query.GENDER || '').trim();
  GENDER = GENDER.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除

  console.log('Received GENDER:', GENDER); // デバッグ用にログを出力

  const query =
  `
  SELECT * FROM POKEDB.pokédex0
  WHERE GENDER = ?
  `;
  connection.query(query, [GENDER], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // デバッグ用にエラーを出力
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Pokemon is not found' });
      } else {
        res.json(results); // 全ての行を返す
      }
    }
  });
});


app.get('/api/search/egg_group', (req, res) => {
  let EGG_GROUP = (req.query.EGG_GROUP || '').trim();
  EGG_GROUP = EGG_GROUP.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除

  console.log('Received EGG_GROUP:', EGG_GROUP); // デバッグ用にログを出力

  const query =
  `
  SELECT * FROM POKEDB.pokédex0
  WHERE
  EGG_GROUP1 = ?
  OR
  EGG_GROUP2 = ?
  `;
  connection.query(query, [EGG_GROUP, EGG_GROUP], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // デバッグ用にエラーを出力
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Pokemon is not found' });
      } else {
        res.json(results); // 全ての行を返す
      }
    }
  });
});


app.get('/api/search/region', (req, res) => {
  let REGION = (req.query.REGION || '').trim();
  REGION = REGION.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除

  console.log('Received REGION:', REGION); // デバッグ用にログを出力

  const query =
  `
  SELECT * FROM POKEDB.pokédex0
  WHERE REGION = ?
  `;
  connection.query(query, [REGION], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // デバッグ用にエラーを出力
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Pokemon is not found' });
      } else {
        res.json(results); // 全ての行を返す
      }
    }
  });
});


app.get('/api/search/generation', (req, res) => {
  let GENERATION = (req.query.GENERATION || '').trim();
  GENERATION = GENERATION.replace(/^"|"$/g, ''); // 先頭と末尾のダブルクォーテーションを削除

  console.log('Received GENERATION:', GENERATION); // デバッグ用にログを出力

  const query =
  `
  SELECT * FROM POKEDB.pokédex0
  WHERE GENERATION = ?
  `;
  connection.query(query, [GENERATION], (err, results) => {
    if (err) {
      console.error('Database query error:', err); // デバッグ用にエラーを出力
      res.status(500).json({ message: 'Database query error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Pokemon is not found' });
      } else {
        res.json(results); // 全ての行を返す
      }
    }
  });
});

app.get('/api/search/individual', (req, res) => {
  const MOVEID = req.query.MOVEID;
  const query =
  `
    SELECT MOVEID, RELATION.POKEID, 
    POKÉDEX3.PATH_NORMAL_FRONT, POKÉDEX3.PATH_SHINY_FRONT,
    RELATION.POKE_AUTONUM
    FROM RELATION
    LEFT JOIN POKÉDEX3
    ON RELATION.POKEID = POKÉDEX3.POKEID
    WHERE MOVEID = ?;
  `;
  connection.query(query, [MOVEID], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'Pokemon is not found' });
    } else {
      res.json(results); // 全ての行を返す
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
