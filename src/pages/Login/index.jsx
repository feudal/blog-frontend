import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useAuth } from "../../hooks";
import styles from "./Login.module.scss";

export const Login = () => {
  const { login, user } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const [message, setMessage] = useState({
    open: false,
    severity: "",
    text: "",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage({ open: false });
  };

  const { mutate } = useMutation((body) => login(body), {
    onSuccess: () =>
      setMessage({ open: true, severity: "success", text: "Вы успешно вошли" }),
    onError: (err) =>
      setMessage({ open: true, severity: "error", text: err.message }),
  });

  if (user) return <Navigate to="/" />;

  return (
    <>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(mutate)}>
          <TextField
            className={styles.field}
            label="E-Mail"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            fullWidth
            type="email"
            {...register("email", { required: "Укажите почту" })}
          />
          <TextField
            className={styles.field}
            label="Пароль"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            fullWidth
            type="password"
            {...register("password", { required: "Укажите пароль" })}
          />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Войти
          </Button>
        </form>
      </Paper>

      {message.open && (
        <Snackbar
          open={message.open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
