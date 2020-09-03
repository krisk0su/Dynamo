import React, { Component, useState, useContext } from "react";
import { recordContext } from "../Store";
import { Button, Confirm } from "semantic-ui-react";

export const DeleteModal = (props) => {
  const store = useContext(recordContext);
  const { record } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onYes = async () => {
    await store.delete(record.id);
    setIsOpen(false);
  };

  const onNo = async () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Delete</Button>
      <Confirm
        open={isOpen}
        onCancel={() => onNo()}
        onConfirm={() => onYes()}
      />
    </div>
  );
};
