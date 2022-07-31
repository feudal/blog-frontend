import { useState, useCallback, useRef, useEffect } from "react";
import { useMutation } from "react-query";
import SimpleMDE from "react-simplemde-editor";
import { Link, useNavigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import api from "../../api";

const options = {
  spellChecker: false,
  maxHeight: "400px",
  autofocus: true,
  placeholder: "Введите текст...",
  status: false,
  autosave: {
    enabled: true,
    delay: 1000,
  },
};

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const inputFileRef = useRef();

  const { mutate } = useMutation((img) => api.upload(img), {
    onSuccess: (data) => setImageUrl(data.url),
    onError: (err) => alert(err),
  });

  const handleChangeFile = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    mutate(formData);
  };

  const onClickRemoveImage = () => setImageUrl("");

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const { mutate: addPost } = useMutation(
    async (body) => (id ? api.posts.update(id, body) : api.posts.create(body)),
    {
      onSuccess: (post) => navigate(`/posts/${id ? id : post._id}`),
      onError: (err) => alert(err),
    }
  );

  const onSubmit = () => {
    const body = {
      title,
      text,
      tags: tags.trim().split(","),
      imageUrl,
    };
    addPost(body);
  };

  useEffect(() => {
    if (id) {
      api.posts.getById(id).then((post) => {
        setTitle(post.title);
        setText(post.text);
        setImageUrl(post.imageUrl);
        setTags(post.tags.join(","));
      });
    }
  }, []);

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
        style={{ marginRight: 10 }}
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {id ? "Обновить" : "Опубликовать"}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
