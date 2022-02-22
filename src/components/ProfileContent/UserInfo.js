import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const UserInfo = ({ user }) => {
  return (
    <div className="container d-flex justify-content-center">
      <div className="card text-white bg-secondary mb-3" style={{ minWidth: '18rem' }}>
        <div className="card-body">
          {
            <div className="d-flex align-items-baseline">
              <h6 className="card-title">Username :</h6>
              <p className="card-text ml-1">{user.username}</p>
            </div>
          }
          {
            <div className="d-flex align-items-baseline">
              <h6 className="card-title">First Name :</h6>
              <p className="card-text ml-1">{user.firstName ? user.firstName : ''}</p>
            </div>
          }
          {
            <div className="d-flex align-items-baseline">
              <h6 className="card-title">Last Name :</h6>
              <p className="card-text ml-1">{user.lastName ? user.lastName : ''}</p>
            </div>
          }
          <div className="d-flex align-items-baseline">
            <h6 className="card-title">Email :</h6>
            <p className="card-text ml-1">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
