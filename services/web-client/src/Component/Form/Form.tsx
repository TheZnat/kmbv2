import React, { useState, useRef } from "react";
import catItem from "../../assets/cat/Property 1=cat.svg";
import styles from "./Form.module.scss";
import ButtonLogin from "../ButtonLogin/ButtonLogin";
import { ButtonAppearence } from "../ButtonLogin/ButtonLogin.props";

interface FormValues {
  name: string;
}

interface FormProps {
  onSubmit: (name: string) => void;
  disabled: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmit, disabled }) => {
  const [values, setValues] = useState<FormValues>({ name: "" });
  const [error, setError] = useState<string | null>(null); // Управляем ошибкой внутри компонента
  const inputRef = useRef<HTMLInputElement>(null);

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues({ name: value });

    // Сбрасываем ошибку и меняем обводку на синий, если пользователь начал вводить текст
    setError(null);
    if (inputRef.current) {
      inputRef.current.style.border = "1px solid #2C68FA"; // Синяя обводка
    }
  };

  const handlerClick = () => {
    if (!values.name.trim()) {
      setError("*Please enter your name"); // Устанавливаем ошибку
      if (inputRef.current) {
        inputRef.current.style.border = "1px solid #FF4D4F"; // Красная обводка
      }
      return; // Прерываем выполнение, если имя пустое
    } else {
      onSubmit(values.name); // Если имя не пустое, вызываем onSubmit
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <img src={catItem} alt="cat img" className={styles.imgCat} />
      </div>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={styles.formText}>Enter your name</h1>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handlerChange}
          autoComplete="off"
          ref={inputRef}
        />
        {error && <label className={styles.errorText}>{error}</label>}
        <ButtonLogin
          className={styles.formButton}
          appearence={ButtonAppearence.Join}
          type="button"
          onClick={handlerClick}
          disabled={disabled}
        >
          Join the room
        </ButtonLogin>
      </form>
    </div>
  );
};

export default Form;
