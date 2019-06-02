import React from "react";
import { Card } from "react-bootstrap";

export const Lyric = ({ title, lyrics }) => (
  <div>
    <b>{title}</b>
    {lyrics !== "" && (
      <Card className="lyrics-card">
        <Card.Body>{lyrics}</Card.Body>
      </Card>
    )}
  </div>
);
