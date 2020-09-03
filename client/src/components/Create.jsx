import React, { useState, useContext } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { recordContext } from "./Store";
import { useHistory } from "react-router-dom";
export const Create = () => {
  const store = useContext(recordContext);
  const history = useHistory();
  const [name, setName] = useState();
  const handleName = (e, { name, value }) => {
    setName(value);
  };
  const onSubmit = async () => {
    await store.Create({ name });
    history.push("/");
  };
  return (
    <Form>
      <Form.Input
        width="6"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleName}
        label="Movie Name"
      />
      <Button onClick={onSubmit} type="submit">
        Submit
      </Button>
    </Form>
  );
};
