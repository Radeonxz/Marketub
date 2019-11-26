import React, { useState } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Button from "@material-ui/core/Button";

const LangSelectView = props => {
  console.log("langSelect props is", props);
  const { languages, firstLang } = props.data;
  const { state, setState } = useState({});

  const selectedLang = _.find(languages, { id: firstLang });
  const autoCompleteProps = {
    options: languages,
    getOptionLabel: option => option.name,
    value: selectedLang,
    renderInput: params => (
      <TextField
        {...params}
        variant="standard"
        label="Language"
        margin="normal"
        fullWidth
      />
    )
  };

  const onChange = event => {
    const value = event.target.value || event.target.contextValue;
    setState({ ...state, firstLang: value });
  };

  return (
    <div style={{ width: 500 }}>
      {languages.length > 0 && (
        <div>
          <Autocomplete {...autoCompleteProps} />
          <Button
            variant="outlined"
            color="primary"
            onClick={props.data.onChangeLocale.bind()}
          >
            Change
          </Button>
        </div>
      )}
    </div>
  );
};

export default LangSelectView;
