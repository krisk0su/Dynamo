import React, { Component, useState, useContext } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { recordContext } from "../Store";

export const PostModal = (props) => {
  const store = useContext(recordContext);
  const { record } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onYes = async () => {
    await store.patch(record);
    setIsOpen(false);
  };

  const onNo = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        disabled={store.error.msg && store.error?.id == record.id}
        onClick={() => setIsOpen(!isOpen)}
      >
        Edit
      </Button>
      <Confirm
        open={isOpen}
        onCancel={() => onNo()}
        onConfirm={() => onYes()}
      />
    </div>
  );
};
