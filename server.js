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
  database: "finalcourt",
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
              console.log(result2);
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
      console.log(result);
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

//DONE
app.post("/client/fileCase", (req, res) => {
  let case_details = {
    client_id: req.body.client_id,
    court_id: req.body.court_id,
    case_title: req.body.case_title,
    case_desc: req.body.case_desc,
    case_type: req.body.case_type,
    def_client_name: req.body.def_client_name,
    def_client_email: req.body.def_client_email,
    case_status: "notVerified",
  };
  let sql = "INSERT INTO cases set ?";
  db.query(sql, case_details, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(true);
  });
});

//DONE
app.post("/client/plaintslist", (req, res) => {
  let sql = `select * from cases where fee_status='0' and client_id=${req.body.client_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});
// DONE
app.post("/client/findlawyer", (req, res) => {
  const type = req.body.type;
  const sql = "SELECT * FROM lawyers WHERE lawyer_type = ?";
  db.query(sql, [type], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
// DONE
app.post("/client/plaint_request_lawyer", (req, res) => {
  let sql = `update cases set lawyer_req_send=${req.body.lawyer_id},lawyer_req_accept=0 where client_id=${req.body.client_id} and case_id=${req.body.case_id} and lawyer_req_send is NULL`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(true);
  });
});

//DONE
app.post("/client/client_pay_fees", (req, res) => {
  let sql = `update cases set fees_paid=1 where case_id=${req.body.case_id} and client_id=${req.body.client_id} and verification=1`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("PAY FEE");
    console.log(result);
    res.json(true);
  });
});

// DONE
app.post("/client/hearing", (req, res) => {
  let sql = `select * from cases where case_status='hearing' and client_id=${req.body.client_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    console.log(result);
    res.json(result);
  });
});

// DONE
app.post("/client/COngngCasesAsClient", (req, res) => {
  let client_id = req.body.client_id;
  const sql = `SELECT * FROM cases WHERE client_id = ${client_id} AND case_status="ongoing"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);

    res.json(result);
  });
});
// DONE
app.post("/client/COngngCasesAsDef", (req, res) => {
  let client_id = req.body.client_id;
  const sql1 = `SELECT * FROM cases WHERE def_id = ${client_id} AND case_status="ongoing"`;
  db.query(sql1, (err1, result1) => {
    if (err1) throw err1;
    console.log(result1);
    res.json(result1);
  });
});

// DONE
app.post("/client/CExpiredCasesAsClient", (req, res) => {
  let client_id = req.body.client_id;
  const sql = `SELECT * FROM cases WHERE client_id = ${client_id} AND case_status="expired"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
// DONE
app.post("/client/CexpiredCasesAsDef", (req, res) => {
  let client_id = req.body.client_id;
  const sql1 = `SELECT * FROM cases WHERE def_id = ${client_id} AND case_status="expired"`;
  db.query(sql1, (err1, result1) => {
    if (err1) throw err1;
    res.json(result1);
  });
});

// DONE
app.post("/client/cases_against", (req, res) => {
  let sql = `select * from cases where merit_status=1 and def_fees_status = 0 and def_id=${req.body.client_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

// DONE

app.post("/client/def_request_lawyer", (req, res) => {
  let sql = `update cases set def_lawyer_req_send=${req.body.lawyer_id},def_lawyer_req_accept=0 where def_id=${req.body.client_id} and case_id=${req.body.case_id} and def_lawyer_req_send is NULL`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(true);
  });
});

//DONE
app.post("/client/def_pay_fees", (req, res) => {
  let sql = `update cases set def_fees_paid=1 , def_fees_status = 1 ,case_status = 'ongoing' where case_id=${req.body.case_id} and def_id=${req.body.client_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(true);
  });
});

//DONE
app.post("/client/def_get_lawyers", (req, res) => {
  let sql = `select * from lawyers where lawyer_id not in (select lawyer_id from cases where case_id=${req.body.case_id})`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

// DONE
app.post("/client/findCourt", (req, res) => {
  const type = req.body.type;
  console.log(type);
  console.log("FIND COURTTTT");
  const sql = "SELECT * FROM courts WHERE court_type = ?";
  db.query(sql, [type], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//DONE 
app.post("/caseDetails", (req, res) => {
  let case_id = req.body.case_id;
  const sql = `SELECT * FROM cases WHERE case_id = ${case_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("CASE DETAILS");
    console.log(result);
    res.send(result);
  });
});

// DONE

app.post("/courtDetails", (req, res) => {
  let court_id = req.body.court_id;
  const sql = `SELECT * FROM courts WHERE court_id = ${court_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("COURT DETAILS");

    console.log(result);
    res.send(result);
  });
});
// DONE

app.post("/lawyerDetails", (req, res) => {
  let lawyer_id = req.body.lawyer_id;
  // console.log(lawyer_id)
  const sql = `SELECT * FROM lawyers WHERE lawyer_id = ${lawyer_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("lawyer DETAILS");

    console.log(result);
    res.send(result);
  });
});
// DONE
app.post("/judgeDetails", (req, res) => {
  let judge_id = req.body.judge_id;
  const sql = `SELECT * FROM judges WHERE judge_id = ${judge_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("judge DETAILS");

    console.log(result);
    res.send(result);
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

//changes the merit status and adds the def client in clients table if not present already
app.post("/admin/merit", (req, res) => {
  let case_id = req.body.case_id;
  let court_id = req.body.court_id;
  let def_client_email = req.body.def_client_email;
  const sql = `UPDATE cases SET merit_status='1' WHERE case_id = ${case_id} AND court_id = ${court_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  const sql1 = `SELECT * FROM clients WHERE email='${def_client_email}'`;
  db.query(sql1, (err1, result1) => {
    if (err1) throw err1;
    if (result1.length <= 0) {
      var generator = require("generate-password");
      var password = generator.generate({
        length: 7,
        numbers: true,
      });
      const sql2 = "INSERT INTO clients (email,password) VALUES(?,?)";
      db.query(sql2, [def_client_email, password], (err2, result2) => {
        if (err2) throw err2;
        console.log(result2);
        const sql3 = `SELECT * FROM clients WHERE email='${def_client_email}'`;
        db.query(sql3, (err3, result3) => {
          if (err3) throw err3;
          res.json(result3);
          //res.send("A mail shud be sent to the client with login details and shud be asked to pay the fee");
        });
      });
    } else {
      console.log(result1);
      res.json(result1);
      //res.send("A mail must be sent to the defendant to pay fee.");
    }
  });
});

app.post("/lawyer/LOngngCases", (req, res) => {
  let lawyer_id = req.body.lawyer_id;
  const sql = `SELECT case_id,case_title FROM cases WHERE lawyer_id = ${lawyer_id} AND case_status="ongoing"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/lawyer/LOngngCasesAsDefLawyer", (req, res) => {
  let lawyer_id = req.body.lawyer_id;
  const sql1 = `SELECT case_id,case_title FROM cases WHERE def_lawyer_id = ${lawyer_id} AND case_status="ongoing"`;
  db.query(sql1, (err1, result1) => {
    if (err1) throw err1;
    res.json(result1);
  });
});

app.post("/lawyer/LExpiredCases", (req, res) => {
  let lawyer_id = req.body.lawyer_id;
  const sql = `SELECT case_id,case_title FROM cases WHERE client_id = ${lawyer_id} AND case_status="expired"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/LExpiredCasesAsDefLawyer", (req, res) => {
  let lawyer_id = req.body.lawyer_id;
  const sql1 = `SELECT case_id,case_title FROM cases WHERE def_id = ${lawyer_id} AND case_status="expired"`;
  db.query(sql1, (err1, result1) => {
    if (err1) throw err1;
    res.json(result1);
  });
});

app.post("/lawyer/lawyerEditInfo", (req, res) => {
  let lawyer_id = req.body.lawyer_id;
  const name = req.body.name;
  const mno = req.body.mno;
  const email = req.body.email;
  const pwd = req.body.pwd;

  const sql = `UPDATE lawyers SET lawyer_name='${name}', mobile_no='${mno}', email='${email}', password='${pwd}' WHERE client_id=${lawyer_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    //console.log('Updated up successfully');
  });
});

//card display of lawyer details when a particular lawyer is clicked
app.post("/client/lawyerProfile", (req, res) => {
  let lawyer_id = req.body.lawyer_id;
  const sql = `SELECT lawyer_name,lawyer_id,email,mobile_no,cases_won,lawyer_type FROM lawyers WHERE lawyer_id = ${laywer_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/admin/verify", (req, res) => {
  let case_id = req.body.case_id;
  const sql = `UPDATE cases SET verification='1' WHERE case_id = ${case_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(
      "Case verified. Client is requested to pay fees. Fee payment button shud be active"
    );
  });
});

//c
app.post("/admin/notVerify", (req, res) => {
  let case_id = req.body.case_id;
  const sql = `UPDATE cases SET case_status='not verified' WHERE case_id = ${case_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Case is not verified. Case is dropped.");
  });
});

app.post("/admin/demerit", (req, res) => {
  let case_id = req.body.case_id;
  const sql = `UPDATE cases SET case_status='demerited' WHERE case_id = ${case_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Case is demerited. Case is dropped.");
  });
});

//c
app.post("/admin/addToExpired", (req, res) => {
  let case_id = req.body.case_id;
  const sql = `SELECT case_id,client_id,lawyer_id,def_id,def_lawyer_id,judge_id,court_id FROM cases WHERE case_id = ${case_id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const sql1 =
      "INSERT INTO expired_cases (case_id,client_id,lawyer_id,def_client_id,def_lawyer_id,judge_id,court_id) VALUES(?,?,?,?,?,?,?)";
    db.query(
      sql1,
      [
        result[0].case_id,
        result[0].client_id,
        result[0].lawyer_id,
        result[0].def_id,
        result[0].def_lawyer_id,
        result[0].judge_id,
        result[0].court_id,
      ],
      (err1, result1) => {
        if (err1) throw err1;
        console.log(result1);
        //res.send();
      }
    );
    res.send(result);
  });
});

//adds verdict and increment the cases won by a lawyer
app.post("/admin/updateJudgement", (req, res) => {
  const case_id = req.body.case_id;
  const judgement = req.body.judgement;
  const wonLID = req.body.wonLID;

  const sql = "INSERT INTO expired_cases (judgement,winner) VALUES (?,?)";
  db.query(sql, [judgement, wonLID], (err, result) => {
    if (err) throw err;
    console.log(result);
    //res.send();
  });

  const sql1 = `UPDATE cases SET case_status="expired" WHERE case_id=${case_id}`;
  db.query(sql1, (err1, result1) => {
    if (err1) throw err1;
    console.log(result1);
    //res.send();
  });

  const sql2 = `UPDATE lawyers SET cases_won=cases_won+1 WHERE lawyer_id=${wonLID}`;
  db.query(sql2, (err2, result2) => {
    if (err2) throw err2;
    console.log(result2);
    //res.send();
  });
});

app.post("/admin/changeStatusToOngoing", (req, res) => {
  let sql = `update cases set case_status='ongoing' where case_id=${req.body_case_id} where def_fees_status=1`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

//in the front end, once this is called, a form must be open to enter the hearing details like the judge id and call
//  '/admin/changeStatusToHearing
app.post("/admin/update_client_fees_status", (req, res) => {
  let sql = `update cases set fees_status=1 where case_id=${req.body.case_id} and court_id=${req.body.court_id} and client_id=${req.body.client_id} and fees_paid=1`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});
//after calling this in the front end make a call to the following url too:
// /admin/changeStatusToOngoing
app.post("/admin/update_def_fees_status", (req, res) => {
  let sql = `update cases set def_fees_status=1 where case_id=${req.body.case_id} and court_id=${req.body.court_id} and def_id=${req.body.def_id} and def_fees_paid=1`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.post("/lawyer/get_plaint_requests", (req, res) => {
  let sql = `select * from cases where lawyer_req_sent=${req.body.lawyer_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});
app.post("/lawyer/get_def_requests", (req, res) => {
  let sql = `select * from cases where def_lawyer_req_sent=${req.body.lawyer_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.post("/lawyer/accept_plaint_request", (req, res) => {
  let sql = `update cases set lawyer_id=${req.body.lawyer_id},lawyer_req_accept=1 where case_id=${req.body.case_id} and client_id= ${req.body.client_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.post("/lawyer/reject_plaint_request", (req, res) => {
  let sql = `update cases set lawyer_req_accept=0,lawyer_req_send=NULL where case_id=${req.body.case_id} and client_id=${req.body.client_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.post("/lawyer/accept_def_request", (req, res) => {
  let sql = `update cases set def_lawyer_id=${req.body.lawyer_id},lawyer_req_accept=1 where case_id=${req.body.case_id} and def_id= ${req.body.def_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

app.post("/lawyer/reject_def_request", (req, res) => {
  let sql = `update cases set def_lawyer_req_accept=0,lawyer_req_send=NULL where case_id=${req.body.case_id} and def_id=${req.body.def_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
