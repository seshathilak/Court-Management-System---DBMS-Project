import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import FilePlaintModal from "./FilePlaintModal";
import axios from "axios";
import { useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
export default function CustomizedTables({ value }) {
  console.log("HHHHHHHHHHHHHHHHH");
  const C_id = useSelector((state) => state.Reducer.clientId);
  const [rows, setrows] = useState([]);
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [caseIdforFindlawyer, setFindlawyerForCase] = useState(false);
  const [lawyerRows, setlawyerRows] = useState([]);

  const sendLawyerRequest = (id) => {
    axios
      .post("/client/sendlawyerReq", {
        case_id: caseIdforFindlawyer,
        lawyer_id: id,
      })
      .then((res) => console.log(res.data));
  };

  const findlawyerbasedonTYPE = (t) => {
    setType(t);
    axios
      .post("/client/findlawyer", { type: t })
      .then((res) => setlawyerRows(res.data));
  };

  const PlaintModalHandler = () => {
    setOpen((state) => !state);
  };

  useEffect(() => {
    console.log("FUNCTION");
    const plaintList = () => {
      axios
        .post("/client/plaintslist", { client_id: C_id })
        .then((response) => {
          console.log(response.data);
          setrows(response.data);
        });
    };
    plaintList();
    return () => console.log("INFO UNMOUNTED");
  }, [open, caseIdforFindlawyer]);

  const classes = useStyles();

  return (
    <Box>
      {open ? (
        <FilePlaintModal Handler={PlaintModalHandler} open />
      ) : (
        <Box>
          <Paper className={classes.paper}>
            <Box align="center">
              <h1>PLAINTS</h1>
            </Box>
          </Paper>
          <Box align="right">
            <Button
              onClick={PlaintModalHandler}
              variant="contained"
              color="secondary"
            >
              File Plaint{"  "}
            </Button>
          </Box>
          <br></br>
          <br></br>

          {rows.length != 0 && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">CASE ID</StyledTableCell>

                    <StyledTableCell align="center">CASE TITLE</StyledTableCell>
                    <StyledTableCell align="center">
                      CASE DETAILS{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      VERIFICATION STATUS{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      DEFENDENT CLIENT NAME{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.case_id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.case_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.case_title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.case_desc}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.verification == 1 ? (
                          <p>Verified</p>
                        ) : (
                          <Button variant="outlined" color="secondary" disabled>
                            Not Verified
                          </Button>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.def_client_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.case_status == "lawyerAcc" ? (
                          <Button variant="outlined" color="secondary">
                            PAY FEE{" "}
                          </Button>
                        ) : (
                          <div>
                            {" "}
                            {row.case_status == "lawyerReq" ? (
                              <Button
                                variant="outlined"
                                color="secondary"
                                disabled
                              >
                                Request Pending{" "}
                              </Button>
                            ) : (
                              <div>
                                {row.verification == 1 ? (
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => {
                                      setFindlawyerForCase(row.case_id);
                                    }}
                                  >
                                    Find Lawyer
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    disabled
                                  >
                                    Find Lawyer
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {caseIdforFindlawyer && (
            <div>
              <br></br>
              <br></br>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Lawyer Type{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={(e) => findlawyerbasedonTYPE(e.target.value)}
                >
                  <MenuItem value={"civil"}>civil</MenuItem>
                  <MenuItem value={"criminal"}>criminal</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              <br></br>

              {lawyerRows.length != 0 && (
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          LAWYER ID
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          LAWYER NAME
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          MOBILE NO.{" "}
                        </StyledTableCell>
                        <StyledTableCell align="center">EMAIL </StyledTableCell>
                        <StyledTableCell align="center">
                          CASES WON{" "}
                        </StyledTableCell>
                        <StyledTableCell align="center">TYPE</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lawyerRows.map((lawyerRows) => (
                        <StyledTableRow key={lawyerRows.lawyer_id}>
                          <StyledTableCell component="th" scope="row">
                            {lawyerRows.lawyer_id}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {lawyerRows.mobile_no}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {lawyerRows.email}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {lawyerRows.cases_won}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {lawyerRows.lawyer_type}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                setFindlawyerForCase(false);
                                sendLawyerRequest(lawyerRows.lawyer_id);
                              }}
                            >
                              Accept Lawyer{" "}
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
        </Box>
      )}
    </Box>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  paper: {
    margin: "auto",
    // maxWidth: 1000,
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {},
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
