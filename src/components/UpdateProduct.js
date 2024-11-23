import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams(); // Get URL parameters and extract the product ID
    const navigate = useNavigate(); // For redirection after update
    const [name, setName] = useState(""); 
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch product details
    const getProductDetails = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/product/${id}`);
            if (!response.ok) {
                throw new Error('Product not found');
            }
            const product = await response.json();
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setCompany(product.company);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getProductDetails(); // Fetch product details on component mount
    }, [getProductDetails]);

    // Function to update the product
    const updateProduct = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const updatedProduct = { name, price, category, company };
        try {
            const response = await fetch(`http://localhost:5000/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error('Error updating product');
            }
            console.log('Product updated successfully');
            navigate(`/product/${id}`); // Redirect to the product detail page
        } catch (error) {
            setError(error.message);
            console.error('Error updating product:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            {error && <p className="error">{error}</p>} {/* Show errors */}
            <form onSubmit={updateProduct}>
                <input
                    type='text'
                    placeholder='Product Name'
                    className='inputBox'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type='number'
                    placeholder='Product Price'
                    className='inputBox'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Product Category'
                    className='inputBox'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Product Company'
                    className='inputBox'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                />
                <button type="submit" className='appButton'>Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
