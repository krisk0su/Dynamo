import React, { useState, useContext, useCallback } from "react";
import { recordContext } from "../Store";
import { observer } from "mobx-react";
import { DeleteModal } from "../Modals/DeleteModal";
import { PostModal } from "../Modals/PostModal";
import "./record.css";

export const Record = observer((props) => {
  const store = useContext(recordContext);
  const { record } = props;
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState(record.name);

  const onChange = (val) => {
    setValue(val.target.value);
    if (val.target.value.length < 3) {
      store.error = {
        msg: "Minimum required length is 3 letters",
        id: record.id,
      };
      setIsDisabled(true);
    } else {
      store.error.msg = "";
      setIsDisabled(false);
    }
  };

  const onEditSelect = useCallback(
    (event) => {
      setIsActive(event.target.checked);
      if (event.target.checked) {
        //add the element
        store.selectedRecords.push({ ...record, name: value });
      } else {
        //remove from selected elements
        const item = store.selectedRecords.find((rc) => rc.id === record.id);
        const index = store.selectedRecords.indexOf(item);
        store.selectedRecords.splice(index, 1);
      }
    },
    [value]
  );

  const onDeleteSelect = (event) => {
    if (event.target.checked) {
      //add the element
      store.selectedRecordsForDelete.push(record.id);
    } else {
      //remove from selected elements
      const item = store.selectedRecordsForDelete.find(
        (rc) => rc === record.id
      );
      const index = store.selectedRecordsForDelete.indexOf(item);
      store.selectedRecordsForDelete.splice(index, 1);
    }
  };
  return (
    <div className="record">
      <div className="buttons">
        <PostModal record={{ ...record, name: value }} />
        <DeleteModal record={record} />
      </div>
      <input type="text" value={value} onChange={onChange} />
      {store.error && store.error.id === record.id && <p>{store.error.msg}</p>}
      <label for="selected-record-edit">
        edit
        <input
          type="checkbox"
          name="selected-record-edit"
          className="select-checkbox"
          disabled={isDisabled}
          onClick={onEditSelect}
        />
      </label>
      <label for="selected-record-delete">
        delete
        <input
          type="checkbox"
          name="selected-record-delete"
          className="select-checkbox"
          disabled={false}
          onClick={onDeleteSelect}
        />
      </label>
    </div>
  );
});
