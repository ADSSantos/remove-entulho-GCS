import React, { useRef , useEffect} from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PatternFormat } from "react-number-format";
import Swal from "sweetalert2";
import { firebaseMiddleware } from "../../store/middleware/firebase";
import "./ClienteList.css";

function ListaDeClientes({ cliente }) {
  const dispatch = useDispatch();
  const clienteRef = useRef(null)

  // Quando o componente atualiza e está destacado, faz o scroll
  useEffect(() => {
    if (cliente.destacado && clienteRef.current) {
      clienteRef.current.scrollIntoView({ 
        behavior: 'smooth', // animação suave
        block: 'center', // centraliza o elemento
        inline: 'nearest'  // evita scroll horizontal desnecessário
      });
      clienteRef.current.classList.add('highlight');
      setTimeout(() => {
        clienteRef.current?.classList.remove('highlight');
      }, 1000);
    }
  }, [cliente.destacado]);

  const verificarAvisoDeRetirada = () => {
    const dataAtual = new Date();
    const dataInicio = new Date(cliente.data);
    const diferencaTempo = dataAtual - dataInicio;
    const diferencaDias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
    return diferencaDias >= 4;
  };

  const obterCorDeFundo = () => {
    if (cliente.destacado) {
      return "#808080"; // Cinza para cliente buscado
    } else if (cliente.concluido) {
      return "#008000"; // Verde para concluído
    } else if (verificarAvisoDeRetirada()) {
      return "#FF6347"; // Vermelho se passaram mais de 4 dias
    } else {
      return "#ffe4c4"; // Amarelo padrão
    }
  };

  const estilo = {
    backgroundColor: obterCorDeFundo(),
    color:
      cliente.destacado || cliente.concluido || verificarAvisoDeRetirada()
        ? "white"
        : "black",
  };

  const handleRemoveClient = async () => {
    try {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0b8a15',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, delete!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await dispatch(firebaseMiddleware.removeClient(cliente));
        Swal.fire(
          'Deletado!',
          'O cliente foi removido.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao remover cliente",
        text: error.message,
      });
    }
  };

  const handleStatusChange = async (estaMarcado) => {
    try {
      await dispatch(firebaseMiddleware.updateClientStatus(cliente, estaMarcado));
      Swal.fire({
        icon: "success",
        title: estaMarcado ? "Cliente marcado como concluído!" : "Cliente desmarcado",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao atualizar status",
        text: error.message,
      });
    }
  };

  return (
    <div className="list" ref={clienteRef} >
      <ul style={estilo}>
        <li style={estilo}>
          NIF: {""}
          <PatternFormat
            value={cliente.nif}
            displayType="text"
            format="###-###-###"
          />
        </li>
        <li style={estilo}>NOME: {cliente.nome || "Sem nome"}</li>
        <li style={estilo}>
          TELEMÓVEL:{" "}
          <PatternFormat
            value={cliente.contato}
            displayType="text"
            format="###-###-###"
          />
        </li>
        <li style={estilo}>LOCAL: {cliente.local || "Não especificado"}</li>
        <li style={estilo}>DATA: {cliente.data || "Não especificado"}</li>
        <li style={estilo}>HORA: {cliente.hora || "Não especificado"}</li>
        <li style={estilo}>TIPO: {cliente.tipo || "Não especificado"}</li>
        <li style={estilo}>
          VALOR: {cliente.valor ? `${cliente.valor} €` : "Não especificado"}
        </li>

        <div className="btn-list">
          <IconButton
            type="button"
            aria-label="delete"
            onClick={handleRemoveClient}
          >
            <DeleteIcon />
          </IconButton>
        </div>

        <input
          className="checkbox"
          type="checkbox"
          checked={cliente.concluido || false}
          onChange={(e) => handleStatusChange(e.target.checked)}
        />
      </ul>
    </div>
  );
}

export default ListaDeClientes;