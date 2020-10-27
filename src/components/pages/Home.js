import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import BlogContext from "../../context/blog/BlogContext";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const Home = () => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const {
    listPosts,
    posts,
    deletePost,
    editingPost,
    closeEditing,
    editing,
    updatePost,
    addPost,
    current,
    newP,
    newPost
  } = blogContext;

  useEffect(() => {
    authContext.loadUser();
    listPosts();

    // eslint-disable-next-line
  }, [listPosts]);

  function handleEditorChange(content, editor) {
    setPost({
      titulo: post.titulo,
      cat: post.cat,
      texto: content,
      id: post.id,
      ativo: post.ativo,
      img: post.img
    });
  }

  const onChange = e => setPost({ ...post, [e.target.name]: e.target.value });

  const [post, setPost] = useState({
    titulo: "",
    cat: "",
    texto: "",
    ativo: null,
    img: ""
  });

  const [file, setFile] = useState([]);

  function onChangeHandler(event) {
    var files = event.target.files;
    setFile({ selectedFile: files, loaded: 0 });
    setPost({ ...post, [event.target.name]: event.target.value });
  }

  function onClickHandler() {
    const data = new FormData();
    for (var x = 0; x < file.selectedFile.length; x++) {
      data.append("file", file.selectedFile[x]);
    }
    axios
      .post("/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      })
      .catch(err => {
        console.log("Upload falhou!!!");
      });
  }

  function editarPost(id, titulo, texto, cat, ativo, img) {
    setPost({ id, titulo, texto, cat, ativo, img });
    editingPost({ id, titulo, texto, cat, ativo, img });
  }

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      onClickHandler();
      addPost(post);
      setPost({
        titulo: "",
        cat: "",
        texto: "",
        ativo: null,
        file: "",
        img: ""
      });
    } else {
      updatePost(post);
      setPost({
        titulo: "",
        cat: "",
        texto: "",
        ativo: null,
        img: ""
      });
    }
  };

  function fechar() {
    closeEditing();
    setPost({
      titulo: "",
      cat: "",
      texto: "",
      ativo: null,
      img: ""
    });
  }

  return (
    <React.Fragment>
      <div className="container">
        {editing === false && (
          <ul style={{ padding: 15 }}>
            <li>
              <button className="btn btn-dark" onClick={newPost}>
                Add Post
              </button>
            </li>
          </ul>
        )}

        {editing === true && (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="labels">Titulo</label>
              <br />
              <input
                value={post.titulo}
                name="titulo"
                onChange={onChange}
                className="p"
              ></input>
            </div>
            <div className="form-group">
              <label className="labels">Categoria</label>
              <br />
              <input
                value={post.cat}
                name="cat"
                onChange={onChange}
                className="p"
              ></input>
            </div>

            <div className="form-group">
              <label className="labels">Imagem</label>
              <br />
              <input
                value={post.img}
                name="img"
                onChange={onChange}
                className="p"
              ></input>
            </div>

            <div className="form-group" style={{ maxWidth: "190px" }}>
              <label className="labels">Status:</label>

              <select name="ativo" onChange={onChange} className="p">
                {post.ativo === true ? (
                  <option value="true">Ativo</option>
                ) : (
                  <option value="false">Inativo</option>
                )}

                {post.ativo === true ? (
                  <option value="false">Inativo</option>
                ) : (
                  <option value="true">Ativo</option>
                )}
              </select>
            </div>
            <Editor
              initialValue={post.texto}
              apiKey="491uxmxfbtq3itnrxvxsqpwptns8wkxt6eap45r524ltapio"
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "code",
                  "codesample"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help | code | codesample"
              }}
              onEditorChange={handleEditorChange}
            />
            <br />
            <button className="btn btn-success" type="submit">
              Salvar
            </button>
            <button className="btn btn-danger" onClick={fechar}>
              Fechar
            </button>
          </form>
        )}
        {newP === true && (
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="labels">Titulo</label>
              <br />
              <input
                value={post.titulo}
                name="titulo"
                onChange={onChange}
                className="p"
              ></input>
            </div>
            <div className="form-group">
              <label className="labels">Categoria</label>
              <br />
              <input
                value={post.cat}
                name="cat"
                onChange={onChange}
                className="p"
              ></input>
            </div>
            <div className="form-group">
              <label className="labels">Imagem Principal</label>
              <br />
              <input
                type="file"
                name="file"
                multiple
                className="p"
                onChange={onChangeHandler}
              ></input>
            </div>
            <div className="form-group" style={{ maxWidth: "190px" }}>
              <label className="labels">Status:</label>

              <select name="status" onChange={onChange} className="p">
                <option value="TRUE">Ativo</option>
                <option value="FALSE">Inativo</option>
              </select>
            </div>
            <Editor
              initialValue={post.texto}
              apiKey="491uxmxfbtq3itnrxvxsqpwptns8wkxt6eap45r524ltapio"
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "code",
                  "codesample"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help | code | codesample"
              }}
              onEditorChange={handleEditorChange}
            />
            <br />
            <button className="btn btn-success" type="submit">
              Salvar
            </button>
            <button className="btn btn-danger" onClick={closeEditing}>
              Fechar
            </button>
          </form>
        )}
      </div>
      <table className="highlight responsive-table">
        {editing === false && !newP && (
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Categoria</th>
              <th>Estado</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
        )}
        <tbody>
          {!editing &&
            !newP &&
            posts.map(i => (
              <tr key={i._id}>
                <td>{i.titulo}</td>
                <td>{i.cat}</td>
                <td className="text-center">
                  {(i.ativo === true && (
                    <i
                      className="fa fa-lightbulb fa-2x"
                      style={{ color: "green" }}
                    ></i>
                  )) ||
                    (i.ativo === false && (
                      <i
                        className="fa fa-lightbulb fa-2x"
                        style={{ color: "red" }}
                      ></i>
                    ))}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-primary p"
                    onClick={() =>
                      editarPost(
                        i._id,
                        i.titulo,
                        i.texto,
                        i.cat,
                        i.ativo,
                        i.img
                      )
                    }
                  >
                    <i className="fa fa-edit"></i>
                  </button>

                  <button
                    className="btn btn-danger p"
                    onClick={() => deletePost(i._id)}
                  >
                    <i className="fa fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Home;
