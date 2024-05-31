import React from 'react';
import { BsSearch } from 'react-icons/bs';

export default function Search() {

  const [searchVal, setSearchVal] = React.useState('');

  const handleInput = (e) => {
    setSearchVal(e.target.value);
  }

  const handleClearBtn = () => {
    setSearchVal('');
  }

  // const filteredProducts = props.products.filter((product) => {
  //   return product.includes(searchVal);
  // });

  return (

    <div className='searchBarMainDiv'>
      <div className='search input-wrap'>
        <i className=''> <BsSearch></BsSearch> </i>
        <label

          id="input-label"
        >
          Product Search
        </label>
        <input
          id="product-search"
          // onChange={handleInput}
          value={searchVal}
          type="text"
          name="product-search"
          // id="product-search"
          placeholder="Search Products"
        />
        <i
          onClick={handleClearBtn}
          className="fas fa-times"
        ></i>
      </div>
      <div className="results-wrap">
        <ul>
          {/* {filteredProducts.map((product) => {
              return <li key={product} classNa='list-item'><a href='/'></a></li>
            })} */}
        </ul>
      </div>
    </div>
  );

}
