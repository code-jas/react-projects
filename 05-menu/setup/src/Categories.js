import React from 'react';

const Categories = ({ filterItems, categories }) => {
  return (
    <div className="btn-container">
      {
        categories.map((cat, index) => {
          return <button
            key={index}
            type='button'
            className="filter-btn"
            onClick={() => filterItems(cat)}>
            {cat}
          </button>
        })
      }
    </div>
  );
};

export default Categories;
