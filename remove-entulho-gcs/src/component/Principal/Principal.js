import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCliente from "../AddCliente/AddCliente.js";
import ListaDeClientes from "../ClienteList/ClienteList.js";
import BuscarCliente from "../BuscarCliente/BuscarCliente.js";
import { Creators as ClientActions } from "../../store/ducks/clients";
import { firebaseMiddleware } from "../../store/middleware/firebase";
import Swal from "sweetalert2";

const Principal = () => {
  const dispatch = useDispatch();
  const { clientList, filteredList, searchTerm } = useSelector((state) => ({
    clientList: state.clients.clientList,
    filteredList: state.clients.filteredList,
    searchTerm: state.clients.searchTerm,
  }));

  useEffect(() => {
    dispatch(firebaseMiddleware.fetchClients());
  }, [dispatch]);

  const handleSearch = () => {
    const clientesFiltrados = clientList.map((cliente) => ({
      ...cliente,
      destacado: cliente.contato
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    }));

    dispatch(
      ClientActions.setFilteredList(
        clientesFiltrados.filter((cliente) => cliente.destacado)
      )
    );
    dispatch(ClientActions.setClients(clientesFiltrados));
  };

  const handleSearchChange = (value) => {
    dispatch(ClientActions.setSearchTerm(value));
    if (!value) {
      dispatch(ClientActions.setFilteredList(clientList));
      dispatch(
        ClientActions.setClients(
          clientList.map((cliente) => ({
            ...cliente,
            destacado: false,
          }))
        )
      );
    }
  };

  const handleAddClient = async (novoCliente) => {
    const existeCliente = clientList.some(
      (cliente) =>
        cliente.nome === novoCliente.nome &&
        cliente.data === novoCliente.data &&
        cliente.hora === novoCliente.hora
    );

    if (existeCliente) {
      await Swal.fire({
        icon: "warning",
        title: "Cliente já existe",
        text: "Já existe um cliente agendado com mesmo nome, data e hora!",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    dispatch(firebaseMiddleware.addClient(novoCliente));
  };

  const handleRemoveClient = (cliente) => {
    dispatch(firebaseMiddleware.removeClient(cliente));
  };

  const handleStatusChange = (cliente, estaMarcado) => {
    dispatch(firebaseMiddleware.updateClientStatus(cliente, estaMarcado));
  };

  return (
    <div className="container">
      <h1>Gestão de Clientes e Serviços</h1>

      <BuscarCliente
        value={searchTerm}
        onChange={handleSearchChange}
        onSearch={handleSearch}
      />

      <AddCliente
        adicionarCliente={handleAddClient}
      />

      {(searchTerm ? filteredList : clientList).length > 0 && (
        <div className="clients-list">
          {(searchTerm ? filteredList : clientList).map((cliente) => (
            <ListaDeClientes
              key={cliente.id}
              cliente={cliente}
              removerCliente={() => handleRemoveClient(cliente)}
              estaMarcado={cliente.concluido || false}
              aoMudarCheckbox={(estaMarcado) => {
                handleStatusChange(cliente, estaMarcado);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Principal;