import React from 'react'
import './Spinner.css';

const Spinner2 = () => {
  return (
    // <div > <span class="loader"></span> </div>
    <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
  <span class="sr-only">Loading...</span>
</div>
  )
}

export default Spinner2