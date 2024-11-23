import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState("false");

    const addProduct = async () => {

        if(!name || !price || !company || !category)
        {
            setError(true);
            return false
        }
        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);
        
        try {
            let response = await fetch("http://localhost:5000/add-product", {
                method: "POST",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let result = await response.json();
            console.warn(result);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type='text' placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => setName(e.target.value)} 
            />
           {error && !name && <span className='invalid-input' >Enter valid name</span>}


            <input type='text' placeholder='Enter product price' className='inputBox' 
                value={price} onChange={(e) => setPrice(e.target.value)} 
            />
            {error && !price && <span className='invalid-input' >Enter valid price</span>}

            <input type='text' placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => setCategory(e.target.value)} 
            />
            {error && !category && <span className='invalid-input' >Enter valid category</span>}

            <input type='text' placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => setCompany(e.target.value)} 
            />
            {error && !company && <span className='invalid-input' >Enter valid company</span>}

            <button onClick={addProduct} className='appButton'>Add Product</button>        
        </div>
    );
};

export default AddProduct;
