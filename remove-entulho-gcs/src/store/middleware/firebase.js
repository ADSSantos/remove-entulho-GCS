import { ref, get, push, remove, update, child } from 'firebase/database';
import { database } from '../../firebase-config';
import { Creators as ClientActions } from '../ducks/clients';

export const firebaseMiddleware = {
  fetchClients: () => async (dispatch) => {
    try {
      const clientsRef = ref(database, 'clients');
      const snapshot = await get(clientsRef);
      if (snapshot.exists()) {
        const clients = [];
        snapshot.forEach((childSnapshot) => {
          clients.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(ClientActions.setClients(clients));
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },

  addClient: (client) => async (dispatch) => {
    try {
      const clientsRef = ref(database, 'clients');
      const newClientRef = push(clientsRef);
      const newClient = {
        ...client,
        id: newClientRef.key
      };
      await update(newClientRef, newClient);
      dispatch(ClientActions.addClient(newClient));
      return newClient;
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      throw error;
    }
  },

  removeClient: (client) => async (dispatch) => {
    try {
      const clientRef = ref(database, `clients/${client.id}`);
      await remove(clientRef);
      dispatch(ClientActions.removeClient(client.id));
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
      throw error;
    }
  },

  updateClientStatus: (client, status) => async (dispatch) => {
    try {
      const clientRef = ref(database, `clients/${client.id}`);
      await update(clientRef, { concluido: status });
      dispatch(ClientActions.updateClient({ ...client, concluido: status }));
    } catch (error) {
      console.error('Erro ao atualizar status do cliente:', error);
      throw error;
    }
  }
};