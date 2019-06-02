import React from "react";
import { ListGroup } from "react-bootstrap";

export const History = ({ history }) => (
  <ListGroup variant='flush' className='lyrics-card'>
    {history.length > 0 ? <h3>Historia de búsqueda</h3> : null}
    {history.map((search, i) => (
      <ListGroup.Item key={i}>{search.artist + " - " + search.song}</ListGroup.Item>
    ))}
  </ListGroup>
);
