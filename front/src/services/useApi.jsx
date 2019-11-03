import { useCallback } from 'react';
import axios from 'axios';

import constants from '../constants/api.js';
import User from '../containers/User.Container';

function useApi() {
  let user = User.useContainer();

  const fetchData = useCallback(
    async (method, uri, data) => {
      try {
        if (!method) {
          return;
        }

        if (!uri) {
          return;
        }

        const url = constants.apiEndPoint + uri;

        return axios({
          method,
          url,
          data: data || null,
          headers: { token: user.token }
        });
      } catch (error) {
        if (error.status === 401) {
          user.setAuthentication(false);
          return;
        } else {
          return;
        }
      }
    },
    [user]
  );

  return fetchData;
}

export default useApi;
