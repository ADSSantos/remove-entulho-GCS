// src/component/AddCliente/AddCliente.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PatternFormat } from "react-number-format";
import { firebaseMiddleware } from "../../store/middleware/firebase";
import "./AddCliente.css";
import Swal from 'sweetalert2';

function AddCliente() {
  const dispatch = useDispatch();
  const [nif, setNif] = useState("");
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const cliente = {
      nif,
      nome,
      contato,
      local,
      data,
      hora,
      tipo,
      valor,
    };

    try {
      // Espera a conclusão da operação antes de limpar o formulário
      dispatch(firebaseMiddleware.addClient(cliente));
      
      // Se chegou aqui, significa que o cliente foi adicionado com sucesso
      Swal.fire({
        icon: "success",
        title: "Cliente adicionado com sucesso!",
        confirmButtonColor: "#0b8a15",
      });

      // Só limpa os campos após confirmação de sucesso
      setNif("");
      setNome("");
      setContato("");
      setLocal("");
      setData("");
      setHora("");
      setTipo("");
      setValor("");
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao adicionar cliente",
        text: "Não foi possível adicionar o cliente. Tente novamente.",
        confirmButtonColor: "#0b8a15",
      });
    }
  };
  return (
    <div className="conteudo">
      <form className="form" onSubmit={onSubmitHandler}>
        <PatternFormat
          className="text-input"
          label="NIF"
          name="nif"
          value={nif}
          onValueChange={(values) => {
            setNif(values.value);
          }}
          format="###-###-###"
          placeholder="Digite o NIF"
          required
        />
        <input
          className="text-input"
          label="Nome"
          type="text"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          placeholder="Digite o nome"
        />

        <PatternFormat
          className="text-input"
          label="Telemóvel"
          name="contato"
          value={contato}
          onValueChange={(values) => {
            setContato(values.value);
          }}
          format="###-###-###"
          placeholder="Digite o número"
          required
        />

        <input
          className="text-input"
          label="Local"
          type="text"
          name="local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
          placeholder="Digite o local"
        />

        <input
          className="text-input"
          label="Data"
          type="date"
          name="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <input
          className="text-input"
          label="Hora"
          type="time"
          name="hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          placeholder="Hora"
          required
        />

        <input
          className="text-input"
          label="Tipo"
          type="text"
          name="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
          placeholder="Digite o tipo"
        />

        <input
          className="text-input"
          label="Valor"
          type="number"
          name="valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          placeholder="Digite o valor"
        />

        <button className="btn-add" type="submit">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default AddCliente;
