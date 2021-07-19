import React, { useState } from "react";

const FormSearch = (props) => {
  const [value, setValue] = useState("");
  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <div  >
     
      <input
        
        type="text"
        className="form-control"
        onChange={valueChangeHandler}
        value={value}
      />
       <div >
        <button
          
          onClick={() => props.onSearch(value)}
        >
          Search
        </button>
      
      </div>
    </div>
  );
};

export default FormSearch