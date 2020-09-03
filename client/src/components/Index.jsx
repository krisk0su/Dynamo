import React, { useEffect, useContext, useCallback, useState } from "react";
import { Record } from "./record/record";
import { recordContext } from "./Store";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { MassDelete } from "./Modals/MassDelete";
import { MassEdit } from "./Modals/MassEdit";

export const Index = observer(() => {
  const store = useContext(recordContext);
  const history = useHistory();
  const requestData = async () => {
    await store.getAll();
  };
  useEffect(() => {
    requestData();
  }, []);
  const onCreate = () => {
    history.push("/create");
  };

  const recs = useCallback(() => {
    return store.records.map((record) => (
      <Record key={record.id} record={record} />
    ));
  }, [store.records]);

  return (
    <div className="wrapper">
      <div className="mass-buttons">
        <MassEdit />
        <MassDelete />
      </div>
      {recs()}
    </div>
  );
});
