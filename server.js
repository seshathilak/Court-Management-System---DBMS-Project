const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "Sesh",
  password: "test123",
  database: "court",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});
// DONE
app.post("/client/signup", (req, res) => {
  const c_name = req.body.c_name;
  const mno = req.body.mobile;
  const email = req.body.email;
  const pwd = req.body.pwd;

  db.query(
    "SELECT client_id FROM clients WHERE email = ?",
    [email],
    (err, result) => {
      if (err) throw err;
      if (result.length <= 0) {
        const sqlInsert =
          "INSERT INTO clients (client_name,mobile_no,email,password) VALUES (?,?,?,?)";
        db.query(sqlInsert, [c_name, mno, email, pwd], (err1, result1) => {
          if (err1) throw err1;
          // console.log(result1);
          db.query(
            "SELECT client_id FROM clients WHERE email = ? AND password = ?",
            [email, pwd],
            (err2, result2) => {
              if (err2) throw err2;
              // console.log(result2);
              res.json(result2);
            }
          );
        });
      } else {
        res.json(false);
      }
    }
  );
});
// DONE
app.post("/client/login", (req, res) => {
  const c_id = req.body.c_id;
  const pwd = req.body.pwd;

  const sql = "SELECT * FROM clients WHERE client_id = ? AND password = ?";
  db.query(sql, [c_id, pwd], (err, result) => {
    if (err) res.send({ err: err });
    if (result.length > 0) {
      res.send(true);
    } else res.send(false);
  });
});

// DONE
app.post("/client/clientInfo", (req, res) => {
  let client_id = req.body.client_id;
  const sql = `SELECT * FROM clients WHERE client_id = ${client_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//DONE
app.post("/client/clientEditInfo", (req, res) => {
  let client_id = req.body.client_id;
  const c_name = req.body.client_name;
  const mno = req.body.mobile_no;
  const email = req.body.email;
  const pwd = req.body.password;

  const sql = `UPDATE clients SET client_name='${c_name}', mobile_no='${mno}', email='${email}', password='${pwd}' WHERE client_id=${client_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("updated success");
    res.send(true);
    //res.send('Updated up successfully');
  });
});

// 
app.post("/client/fileCase", (req, res) => {
  let case_details = {
    client_id: 1,
    court_id: req.body.courtid,
    case_title: req.body.case_title,
    case_desc: req.body.casedesc,
    case_type: req.body.casetype,
    def_client_name: req.body.defname,
    def_client_email: req.body.defemail,
  };
  let sql = "INSERT INTO cases set ?";
  db.query(sql, case_details, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});
app.post("/client/hearing:client_id", (req, res) => {
  let sql = `select * from cases where case_status='hearing' and client_id=${req.params.client_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No hearing cases");
      res.send("No hearing cases");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});
app.post("/admin/changeStatusToHearing", (req, res) => {
  let sql = `update cases set case_status='hearing' where verification=1 and fees_status=1 and client_id=${req.body.client_id} and case_id=${req.body.case_id} and lawyer_id not NULL`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("Case updated to hearing");
      //Update judge_id of the case
      sql = `update cases set judge_id=${req.body.judge_id} where case_status='hearing' and client_id=${req.body.client_id} and case_id=${req.body.case_id}`;
      db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
      });
    }
  });
});
app.post("/admin/hearing", (req, res) => {
  let sql = `select * from cases where case_status='hearing' and court_id=${req.body.court_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No hearing cases");
      res.send("No hearing cases");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});
app.post("/lawyer/hearing", (req, res) => {
  let sql = `select * from cases where case_status='hearing' and lawyer_id=${req.body.lawyer_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No hearing cases");
      res.send("No hearing cases");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});
app.post("/judge/hearing", (req, res) => {
  let sql = `select * from cases where case_status='hearing' and judge_id=${req.body.judge_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No hearing cases");
      res.send("No hearing cases");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});

app.post("/client/cases_against", (req, res) => {
  let sql = `select * from cases where merit_status=1 and def_lawyer_id is NULL and def_id=${req.body.client_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No cases against you");
      res.send("No cases against you");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});

app.post("/judge/ongoing", (req, res) => {
  let sql = `select * from cases where case_status='ongoing' and judge_id=${req.body.judge_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No ongoing cases for you");
      res.send("No ongoing cases for you");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});
app.post("/judge/expired", (req, res) => {
  let sql = `select * from cases where case_status='expired' and judge_id=${req.body.judge_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No expired cases for you");
      res.send("No ongoing cases for you");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});

app.post("/court/ongoing", (req, res) => {
  let sql = `select * from cases where case_status='ongoing' and court_id=${req.body.court_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No ongoing cases for you");
      res.send("No ongoing cases for you");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});
app.post("/court/expired", (req, res) => {
  let sql = `select * from cases where case_status='expired' and court_id=${req.body.court_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length <= 0) {
      console.log("No expired cases for you");
      res.send("No ongoing cases for you");
    } else {
      console.log(result[0]);
      res.json(result);
    }
  });
});

app.post("/lawyer/login", (req, res) => {
  const l_id = req.body.lawyer_id;
  const pwd = req.body.l_pwd;

  const sql = "SELECT * FROM lawyers WHERE lawyer_id = ? AND password = ?";
  db.query(sql, [l_id, pwd], (err, result) => {
    if (err) res.send({ err: err });
    if (result.length > 0) {
      res.send(result);
    } else res.send({ message: "Incorrect username/password" });
  });
});

app.post("/court/login", (req, res) => {
  const c_id = req.body.court_id;
  const pwd = req.body.c_pwd;

  const sql = "SELECT * FROM courts WHERE court_id = ? AND court_pwd = ?";
  db.query(sql, [c_id, pwd], (err, result) => {
    if (err) res.send({ err: err });
    if (result.length > 0) {
      res.send(result);
    } else res.send({ message: "Incorrect username/password" });
  });
});

app.get("/admin/updateMerit", (req, res) => {
  let sql = `update cases set merit_status=1 where case_id=${req.body.case_id} and court_id=${req.body.court_id}`;
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});
app.post("/client/COngngCases:client_id", (req, res) => {
  let client_id = req.params.client_id;
  const sql = `SELECT case_id,case_title FROM cases WHERE client_id = ${client_id} AND case_status="ongoing"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length <= 0) {
      const sql1 = `SELECT case_id,case_title FROM cases WHERE def_id = ${client_id} AND case_status="ongoing"`;
      db.query(sql1, (err1, result1) => {
        if (err1) throw err1;
        if (result1.length <= 0) {
          console.log("No ongoing cases for you");
          res.send("No ongoing cases for you");
        } else {
          console.log(result1);
          res.json(result1);
        }
      });
    } else {
      res.json(result);
    }
  });
});

//c
app.post("/client/CExpiredCases:client_id", (req, res) => {
  let client_id = req.params.client_id;
  const sql = `SELECT case_id,case_title FROM cases WHERE client_id = ${client_id} AND case_status="expired"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length <= 0) {
      const sql1 = `SELECT case_id,case_title FROM cases WHERE def_id = ${client_id} AND case_status="expired"`;
      db.query(sql1, (err1, result1) => {
        if (err1) throw err1;
        if (result1.length <= 0) {
          console.log("No expired cases for you");
          res.send("No expired cases for you");
        } else {
          console.log(result1);
          res.json(result1);
        }
      });
    } else {
      res.json(result);
    }
  });
});

//c
app.post("/lawyer/LOngngCases:lawyer_id", (req, res) => {
  let lawyer_id = req.params.lawyer_id;
  const sql = `SELECT case_id,case_title FROM cases WHERE client_id = ${lawyer_id} AND case_status="ongoing"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length <= 0) {
      const sql1 = `SELECT case_id,case_title FROM cases WHERE def_id = ${lawyer_id} AND case_status="ongoing"`;
      db.query(sql1, (err1, result1) => {
        if (err1) throw err1;
        if (result1.length <= 0) {
          console.log("No ongoing cases for you");
          res.send("No ongoing cases for you");
        } else {
          console.log(result1);
          res.json(result1);
        }
      });
    } else {
      res.json(result);
    }
  });
});

//c
app.post("/lawyer/LExpiredCases:lawyer_id", (req, res) => {
  let lawyer_id = req.params.lawyer_id;
  const sql = `SELECT case_id,case_title FROM cases WHERE client_id = ${lawyer_id} AND case_status="expired"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length <= 0) {
      const sql1 = `SELECT case_id,case_title FROM cases WHERE def_id = ${lawyer_id} AND case_status="expired"`;
      db.query(sql1, (err1, result1) => {
        if (err1) throw err1;
        if (result1.length <= 0) {
          console.log("No expired cases for you");
          res.send("No expired cases for you");
        } else {
          console.log(result1);
          res.json(result1);
        }
      });
    } else {
      res.json(result);
    }
  });
});

app.post("/client/chooseCivilLawyers", (req, res) => {
  const sql =
    'SELECT lawyer_name,lawyer_id FROM lawyers WHERE lawyer_type = "Civil"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//ce
app.post("/client/chooseCriminalLawyers", (req, res) => {
  const sql =
    'SELECT lawyer_name,lawyer_id FROM lawyers WHERE lawyer_type = "Criminal"';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//ce
//card display of lawyer details when a particular lawyer is clicked
app.post("/client/lawyerProfile:lawyer_id", (req, res) => {
  let lawyer_id = req.params.lawyer_id;
  const sql = `SELECT lawyer_name,lawyer_id,email,mobile_no,cases_won,lawyer_type FROM lawyers WHERE lawyer_id = ${laywer_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
//card display of case details when a particular case is clicked
app.post("/caseDetails:case_id", (req, res) => {
  let case_id = req.params.case_id;
  const sql = `SELECT case_id,case_title,case_desc,case_status,court_id,judge_id,client_id,lawyer_id,def_id,def_lawyer_id FROM cases WHERE case_id = ${case_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
