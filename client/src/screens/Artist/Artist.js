import React from 'react';

const Artist = (props) => {
  return (
    <div style={{ border: '1px solid red', margin: '100px auto', maxWidth: '1400px' }}>{props.match.params.name}</div>
  );
};

export default Artist;
