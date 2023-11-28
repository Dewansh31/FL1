import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useTranslation } from 'react-i18next';

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const { t } = useTranslation();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!values){
      toast.error('Enter something to search!');
      navigate("/search");
     
    }

    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );

      
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder={t('Search')} 
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{borderRadius:"25px"}}
        />
        <button style={{borderRadius:"25px"}} className="btn btn-outline-success" type="submit">
        {t('Search')} 
        </button>
      </form>
    </div>
  );
};

export default SearchInput;