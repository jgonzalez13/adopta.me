import React from 'react';
import User from '../../../../containers/User.Container';
import { Icon } from '@mdi/react';
import { mdiAlert } from '@mdi/js';

const Profile = () => {
  let user = User.useContainer();
  return (
    <div className="profile">
      <Icon path={mdiAlert} size={3} color="#e5be01" />
      <div className="text">
        <p>Seccion no disponible</p>
        <p>en estos momentos</p>
      </div>

      <button className="profile-btn" onClick={() => user.onLogOut()}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Profile;
