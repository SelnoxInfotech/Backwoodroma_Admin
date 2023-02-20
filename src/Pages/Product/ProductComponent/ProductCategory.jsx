import React from 'react'
// import { Select, MenuItem } from '@mui/material';
import axios from "axios"
import Cookies from 'universal-cookie';
// import { CheckBox } from '@mui/icons-material';

export default function ProductCategory({ Product, SetProduct }) {

    const [Category, SetCategory] = React.useState([])
    const [selectedValue, setSelectedValue] = React.useState(0);
    const handleCheckboxChange = (event) => {
        setSelectedValue(parseInt(event.target.value));
    };



    const cookies = new Cookies();
    const token_data = cookies.get('Token_access')
    React.useEffect(() => {
        axios("http://34.201.114.126:8000/AdminPanel/ActiveCategory/", {

            headers: {
                'Authorization': `Bearer ${token_data}`
            }

        }).then(response => {
            SetCategory(response.data.data)
            // console.log(response.data.data[0].name)

            // if (Product.Sub_Category_id === "")
            // SetProduct(Product => ({ ...Product, Sub_Category_id: response.data[0].id }))
        })
    }, [SetProduct, token_data, Product.Sub_Category_id])





    // const handleChange = (event) => {
    //     const value = event.target.value;
    //     SetProduct({
    //         ...Product, [event.target.name]: value
    //     });
    // };

    return (
        <div>
            <div className='col background'>
                <div className='col-10  center '>
                    <label className=' '>
                        Category
                    </label>
                    <div className='col justify  Add_Category center'>
                        <div className='col' >
                            <div className="Product_category">

                                {
                                    Category.map((data, index) => {
                                        return (
                                            <div key={index}>

                                                <div className='form-group-checkboxdev' key={index.id} >

                                                    <input
                                                        type="checkbox"
                                                        value={data.id}
                                                        checked={selectedValue === parseInt(data.id)}
                                                        onChange={handleCheckboxChange}
                                                    />

                                                    <span> {data.name} </span>

                                                </div>
                                                {
                                                    selectedValue === data.id ? "ghh" : null
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

