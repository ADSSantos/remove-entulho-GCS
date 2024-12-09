import React, { useState, useEffect } from "react"; // Adicionado useEffect
import { useDispatch } from "react-redux"; // Adicionado useDispatch
import { PatternFormat } from "react-number-format";
import { firebaseMiddleware } from "../../store/middleware/firebase";
import Swal from 'sweetalert2';
import "./AddCliente.css";
function AddCliente({ clienteParaEditar = null, onClose = null, isEditing = false }) {
  const dispatch = useDispatch();
  const [nif, setNif] = useState(clienteParaEditar?.nif || "");
  const [nome, setNome] = useState(clienteParaEditar?.nome || "");
  const [contato, setContato] = useState(clienteParaEditar?.contato || "");
  const [local, setLocal] = useState(clienteParaEditar?.local || "");
  const [data, setData] = useState(clienteParaEditar?.data || "");
  const [hora, setHora] = useState(clienteParaEditar?.hora || "");
  const [tipo, setTipo] = useState(clienteParaEditar?.tipo || "");
  const [valor, setValor] = useState(clienteParaEditar?.valor || "");

  // Usar useEffect para atualizar os campos quando clienteParaEditar mudar
  useEffect(() => {
    if (clienteParaEditar) {
      setNif(clienteParaEditar.nif || "");
      setNome(clienteParaEditar.nome || "");
      setContato(clienteParaEditar.contato || "");
      setLocal(clienteParaEditar.local || "");
      setData(clienteParaEditar.data || "");
      setHora(clienteParaEditar.hora || "");
      setTipo(clienteParaEditar.tipo || "");
      setValor(clienteParaEditar.valor || "");
    }
  }, [clienteParaEditar]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

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
      if (isEditing) {
        // Se estiver editando, incluir o ID do cliente existente
        await dispatch(firebaseMiddleware.updateClient({
          ...cliente,
          id: clienteParaEditar.id
        }));
        Swal.fire({
          icon: "success",
          title: "Cliente atualizado com sucesso!",
          confirmButtonColor: "#0b8a15",
        });
        if (onClose) onClose();
      } else {
        // Lógica existente para adicionar novo cliente
        await dispatch(firebaseMiddleware.addClient(cliente));
        Swal.fire({
          icon: "success",
          title: "Cliente adicionado com sucesso!",
          confirmButtonColor: "#0b8a15",
        });
      }

      // Limpar campos
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
        title: isEditing ? "Erro ao atualizar cliente" : "Erro ao adicionar cliente",
        text: "Por favor, tente novamente.",
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
          {isEditing ? "Atualizar" : "Adicionar"}
        </button>
        
        {isEditing && (
          <button 
            className="btn-cancel" 
            type="button" 
            onClick={onClose}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
} 

export default AddCliente;
