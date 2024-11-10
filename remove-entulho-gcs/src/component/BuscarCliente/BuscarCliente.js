// src/component/BuscarCliente/BuscarCliente.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import { PatternFormat } from "react-number-format";
import Swal from "sweetalert2";
import { Creators as ClientActions } from "../../store/ducks/clients";
import "./BuscarCliente.css";

const BuscarCliente = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.clients.searchTerm);
  const clientList = useSelector((state) => state.clients.clientList);

  const handleValueChange = (values) => {
    const newValue = values.value;
    dispatch(ClientActions.setSearchTerm(newValue));

    // Se o campo estiver vazio
    if (!newValue) {
      dispatch(ClientActions.setFilteredList([]));
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

  const handleSearch = () => {
    const numeroLimpo = searchTerm.replace(/\D/g, "");

    if (!numeroLimpo) {
      Swal.fire({
        icon: "warning",  
        title: "Campo vazio",
        text: "Por favor, digite um número de telefone para buscar",
        confirmButtonColor: "#0b8a15",
      });
      return;
    }

    if (numeroLimpo.length !== 9) {
      Swal.fire({
        icon: "warning",
        title: "Número incompleto",
        text: "O número de telefone deve ter 9 dígitos",
        confirmButtonColor: "#0b8a15",
      });
      return;
    }

    const clientesFiltrados = clientList.map((cliente) => ({
      ...cliente,
      destacado: cliente.contato.replace(/\D/g, "").includes(numeroLimpo),
    }));

    dispatch(
      ClientActions.setFilteredList(
        clientesFiltrados.filter((cliente) => cliente.destacado)
      )
    );
    dispatch(ClientActions.setClients(clientesFiltrados));
  };

  return (
    <div className="search-container">
      <PatternFormat
        className="search-input"
        value={searchTerm}
        onValueChange={handleValueChange}
        format="###-###-###"
        placeholder="Busca Cliente por numero de Telefone..."
        allowEmptyFormatting={false}
        mask="_"
        title="Busca Cliente por numero de Telefone..."
      />
      <button onClick={handleSearch} className="search-button">
        <Search size={18} />
      </button>
    </div>
  );
};

export default BuscarCliente;
