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
      <Link to='/edit_artist' style={{ margin: '8px' }}>
        add artist
      </Link>
      <Link to='/edit_product' style={{ margin: '8px' }}>
        add product
      </Link>
    </div>
  );
};

export default Dashboard;
