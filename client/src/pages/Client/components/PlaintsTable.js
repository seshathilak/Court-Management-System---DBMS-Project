import React, { useState } from "react";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function CustomizedTables({ value }) {
  console.log("HHHHHHHHHHHHHHHHH");

  const [open, setOpen] = useState(false);

  const PlaintModalHandler = () => {
    setOpen((state) => !state);
  };

  const classes = useStyles();
  const [findLawyerState, setfindLawyerState] = useState(false);

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

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Calories</StyledTableCell>

                  <StyledTableCell align="center">Calories</StyledTableCell>
                  <StyledTableCell align="center">Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="center">
                    Carbs&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Protein&nbsp;(g)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setfindLawyerState(true);
                        }}
                      >
                        Find Lawyer
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {findLawyerState && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Calories</StyledTableCell>

                    <StyledTableCell align="center">Calories</StyledTableCell>
                    <StyledTableCell align="center">
                      Fat&nbsp;(g)
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Carbs&nbsp;(g)
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Protein&nbsp;(g)
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.calories}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.fat}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setfindLawyerState(false);
                          }}
                        >
                          Accept Lawyer{" "}
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.protein}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
