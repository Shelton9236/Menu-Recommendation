import React from "react";
import { makeStyles, Card, Fab, Typography, Link } from "@material-ui/core";
import { Container } from "react-bootstrap";

import AddIcon from "@material-ui/icons/Add";
import TimerIcon from "@material-ui/icons/Timer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(32),
      height: theme.spacing(48),
    },
  },

  actionCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  actionCardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },

  card: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",

    flexDirection: "column",
    textAlign: "center",
    padding: "40px 15px 15px 15px",
    alignContent: "space-between",
  },

  buttonText: {
    marginTop: 20,
  },
}));

function CardList(props) {
  const classes = useStyles();
  const { dataList, hasAction, user } = props;

  return (
    <Container>
      <div className={classes.root}>
        {hasAction ? (
          <Card className={classes.actionCard}>
            <div className={classes.actionCardContent}>
              <div>
                <a href={"Create?user=" + user}>
                  <Fab color="primary" aria-label="add">
                    <AddIcon />
                  </Fab>
                </a>
              </div>

              <div className={classes.buttonText}>
                <Typography variant="button">Add a new recipe</Typography>
              </div>
            </div>
          </Card>
        ) : (
          ""
        )}

        {dataList.map((recipe) => (
          <Card key={recipe.reci_id} className={classes.card}>
            {hasAction ? (
              <Link
                href={"Recipe_new?reci_id=" + recipe.reci_id}
                variant="h5"
                style={{ textTransform: "capitalize" }}
              >
                {recipe.name}
              </Link>
            ) : (
              <Link
                href={"Recipe?reci_id=" + recipe.reci_id}
                variant="h5"
                style={{ textTransform: "capitalize" }}
              >
                {recipe.name}
              </Link>
            )}

            <br />
            <Typography variant="subtitle1">{recipe.description}</Typography>
            <div>
              <TimerIcon fontSize="small" />
              <Typography variant="overline">
                {recipe.minutes} minutes
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default CardList;
