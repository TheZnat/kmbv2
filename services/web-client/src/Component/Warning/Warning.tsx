import React from "react";
import styles from "./Warning.module.scss";
import ButtonLogin from "../ButtonLogin/ButtonLogin";
import { Link } from "react-router-dom";
import catItemWarning from "../../assets/cat/Property4cat.svg";
import { ButtonAppearence } from "../ButtonLogin/ButtonLogin.props";

const Warning: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <img
          src={catItemWarning}
          alt="cat img picture"
          className={styles.imgCat}
        />
      </div>

      <div className={styles.info}>
        <h1 className={styles.formText}>Room is full</h1>
        <Link to="/" style={{ width: "100%" }}>
          <ButtonLogin
            className={styles.formButton}
            appearence={ButtonAppearence.Back}
            type="submit"
          >
            Join the room
          </ButtonLogin>
        </Link>
      </div>
    </div>
  );
};

export default Warning;
