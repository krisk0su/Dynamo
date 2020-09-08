import React, { Component, useState, useContext } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { observer } from "mobx-react";
import { recordContext } from "../Store";

export const MassDelete = observer(() => {
  const store = useContext(recordContext);
  const [isOpen, setIsOpen] = useState(false);

  const onYes = async () => {
    await store.massDelete();
    //window.location.reload(false);
    setIsOpen(false);
  };

  const onNo = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        disabled={store.selectedRecordsForDelete.length <= 1}
        onClick={() => setIsOpen(!isOpen)}
      >
        Mass Delete
      </Button>
      <Confirm
        open={isOpen}
        onCancel={() => onNo()}
        onConfirm={() => onYes()}
      />
    </div>
  );
});
