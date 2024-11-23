import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setLoading(true);
            const token = JSON.parse(localStorage.getItem('token')); // Get token from localStorage
            const response = await fetch('http://localhost:5000/products', {
                headers: {
                    authorization: token // Set authorization header
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            setError("Error fetching products: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem('token')); // Get token from localStorage
            const response = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: token // Set authorization header
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            if (result) {
                getProducts(); // Refresh the product list after deletion
            }
        } catch (error) {
            setError("Error deleting product: " + error.message);
        }
    };

    const searchHandle = async (event) => {
        const key = event.target.value;
        if (key) {
            try {
                const token = JSON.parse(localStorage.getItem('token')); // Get token from localStorage
                const response = await fetch(`http://localhost:5000/search/${key}`, {
                    headers: {
                        authorization: token // Set authorization header
                    }
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                setProducts(result);
            } catch (error) {
                setError("Error searching products: " + error.message);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className="product-list">
            <h3>Product List</h3>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <input
                type='text'
                className='search-product-box'
                placeholder='Search Product'
                onChange={searchHandle}
            />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {products.length > 0 ? (
                products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                ))
            ) : (
                !loading && <h1>No Result Found</h1>
            )}
        </div>
    );
};

export default ProductList;
