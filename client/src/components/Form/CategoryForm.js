import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue, value2, setValue2 }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            style={{marginTop:"20px"}}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          
          <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter sub category"
            style={{marginTop:"20px"}}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;