import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import axios from "axios";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AboutCase from "../../AboutCase";


export default function CustomizedTables() {
  //const classes = useStyles();
  const L_id = useSelector((state) => state.Reducer.lawyerId);
  const [rows, setrows] = useState([]);
  const [drows, setdrows] = useState([]);
  const [caseid, setcaseid] = useState("");
  const [casemodal, setcasemodal] = useState(false);


  const useStyles = makeStyles({
    table: {
      minWidth:700,
    },
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

  useEffect(() => {
    //console.log(L_id);
      axios.post("/lawyer/LOngngCases", {lawyer_id: L_id}).then((response) => {
        console.log(response.data);
        setrows(response.data);
      });
      axios.post("/lawyer/LOngngCasesAsDefLawyer", {lawyer_id: L_id}).then((response) => {
        console.log(response.data);
        setdrows(response.data);
      });
  },[]);

  const casemodalHandler = () => {
    setcasemodal((state) => !state);
  };

  const meritStatus = (status) => {
    if(status == 1)
      return(<p>Merited</p>)
    else if(status == 0)
      return(<p>Demerited</p>)
    else
      return(<p>Yet to be given</p>)
  }

  const classes = useStyles();
  return (
      <Box>
        <Paper className={classes.paper}>
          <Box align="center">
            <h1>ONGOING CASES AS CLIENT SIDE LAWYER</h1>
          </Box>
        </Paper>
       {rows.length == 0 && (
          <Paper className={classes.paper}>
          <Box align="center">
            <h2>No ongoing cases</h2>
          </Box>
        </Paper>
       )}
    {rows.length != 0 && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">CASE ID</StyledTableCell>
            <StyledTableCell align="center">CASE TITLE</StyledTableCell>
            <StyledTableCell align="center">COURT ID</StyledTableCell>
            <StyledTableCell align="center">CLIENT ID</StyledTableCell>
            <StyledTableCell align="center">JUDGE ID</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.case_id}>
             {/* <StyledTableCell component="th" scope="row">
                {row.case_id}
              </StyledTableCell>  */}
              <StyledTableCell align="center">{row.case_id}</StyledTableCell>
              <StyledTableCell align="center">{row.case_title}</StyledTableCell>
              <StyledTableCell align="center">{row.court_id}</StyledTableCell>
              <StyledTableCell align="center">{row.client_id}</StyledTableCell>
              <StyledTableCell align="center">{row.judge_id}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    casemodalHandler();
                    setcaseid(row.case_id);
                }}
              >
                Case details
              </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    {casemodal && (
    <AboutCase
      Handler={() => casemodalHandler()}
      caseid={caseid}
      casemodal={casemodal}
    />
  )}
              <br></br>
    <Paper className={classes.paper}>
          <Box align="center">
            <h1>ONGOING CASES AS DEFENDANT CLIENT LAWYER</h1>
          </Box>
        </Paper>
        {drows.length == 0 && (
          <Paper className={classes.paper}>
          <Box align="center">
            <h2>No ongoing cases</h2>
          </Box>
        </Paper>
       )}
    {drows.length != 0 && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">CASE ID</StyledTableCell>
            <StyledTableCell align="center">CASE TITLE</StyledTableCell>
            <StyledTableCell align="center">COURT ID</StyledTableCell>
            <StyledTableCell align="center">CLIENT ID</StyledTableCell>
            <StyledTableCell align="center">JUDGE ID</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drows.map((row) => (
            <StyledTableRow key={row.case_id}>
             {/* <StyledTableCell component="th" scope="row">
                {row.case_id}
              </StyledTableCell>  */}
              <StyledTableCell align="center">{row.case_id}</StyledTableCell>
              <StyledTableCell align="center">{row.case_title}</StyledTableCell>
              <StyledTableCell align="center">{row.court_id}</StyledTableCell>
              <StyledTableCell align="center">{row.def_client_id}</StyledTableCell>
              <StyledTableCell align="center">{row.judge_id}</StyledTableCell>
              <StyledTableCell align="center">
              <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    casemodalHandler();
                    setcaseid(row.case_id);
                  }}
              >
                Case details
              </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)}
    </Box>

    
  )
}