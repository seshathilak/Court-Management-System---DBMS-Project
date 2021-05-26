import Modal from "@material-ui/core/Modal";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
export default function SimpleModal({ Handler, casemodal, caseid }) {
  console.log(caseid);
  const classes = useStyles();
  const [caseData, setcaseData] = useState(false);

  useEffect(() => {
    console.log("FUNCTION");
    const clientProfile = () => {
      axios.post("/caseDetails", { case_id: caseid }).then((response) => {
        console.log(response.data[0]);
        setcaseData(response.data[0]);
      });
    };
    clientProfile();
    return () => console.log("INFO UNMOUNTED");
  }, []);
  return (
    <div>
      <Modal
        open={casemodal}
        // onClose={Handler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src="https://indialawyers.files.wordpress.com/2012/09/legal-profession.jpg"
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <div>
                      <h1>
                        <p> CASE DETAILS </p>
                      </h1>
                      <h1>
                        <p> {caseid}</p>
                      </h1>
                    </div>
                  </Grid>

                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Button color="secondary" onClick={() => Handler()}>
                        CLOSE <br />
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1"></Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Modal>
    </div>
  );
}
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  paper: {
    marginTop: 200,
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
  image: {
    width: 500,
    height: 500,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
