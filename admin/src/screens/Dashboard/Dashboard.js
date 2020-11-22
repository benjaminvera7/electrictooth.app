import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link to='/edit_album' style={{ margin: '8px' }}>
        add album
      </Link>
      <Link to='/edit_track' style={{ margin: '8px' }}>
        add track
      </Link>
    </div>
  );
};

export default Dashboard;
