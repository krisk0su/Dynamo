import React, { useState, useContext } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { recordContext } from "./Store";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
export const Create = observer(() => {
  const store = useContext(recordContext);
  const history = useHistory();
  const [name, setName] = useState();
  const handleName = (e, { name, value }) => {
    setName(value);
  };
  const onSubmit = async () => {
    if (name.length < 3) {
      store.error = {
        msg: "Minimum required length is 3 letters",
      };
    } else {
      // store.error = {
      //   msg: "",
      // };
      await store.Create({ name });
      history.push("/");
    }
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
      {store.error && <p>{store.error.msg}</p>}
      <Button onClick={onSubmit} type="submit">
        Submit
      </Button>
    </Form>
  );
});
