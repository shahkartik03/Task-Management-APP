import React from "react";
import Button from "@material-ui/core/Button";
import "./index.scss";
import { useDispatch } from "react-redux";
import InputRef from "@/components/Input";

function AddItem({
  dispatchAction, placeHolder, label, id = "",
}) {
  const [addingList, setAddingList] = React.useState(false);
  const listInputRef = React.useRef(null);
  const dispatch = useDispatch();
  const onAddListName = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setAddingList(false);
      dispatch(dispatchAction(event.target.value, id));
    }
  };
  if (addingList) {
    return (
      <div className="AddItem">
        <InputRef
          type="text"
          ref={listInputRef}
          onChange={onAddListName}
          placeholder={placeHolder}
        />
      </div>
    );
  }
  return (
    <div className="AddItem">
      <Button onClick={() => setAddingList(true)} variant="contained" color="default">
        {label}
      </Button>
    </div>
  );
}

export default AddItem;
