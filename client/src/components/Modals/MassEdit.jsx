import React, { Component, useState, useContext } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { observer } from "mobx-react";
import { recordContext } from "../Store";

export const MassEdit = observer(() => {
  const store = useContext(recordContext);
  const [isOpen, setIsOpen] = useState(false);

  const onYes = async () => {
    await store.massEdit();
    window.location.reload(false);
    setIsOpen(false);
  };

  const onNo = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button disabled={store.areSelected()} onClick={() => setIsOpen(!isOpen)}>
        Mass Edit
      </Button>
      <Confirm
        open={isOpen}
        onCancel={() => onNo()}
        onConfirm={() => onYes()}
      />
    </div>
  );
});
