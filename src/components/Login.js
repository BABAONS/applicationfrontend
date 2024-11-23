import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/"); // Redirect if user is already logged in
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            console.log("Email:", email, "Password:", password); // Log credentials

            const response = await fetch("http://localhost:5000/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json(); // Get the API response
            console.log("API Response:", result); // Log response

            if (!response.ok) {
                // Show an error if the response is not OK
                alert(result.result || "Login failed. Please check your credentials.");
                return;
            }

            // Check if the user is authenticated in the response
            if (result.user) {
                localStorage.setItem('user', JSON.stringify(result.result)); // Store user in localStorage
                localStorage.setItem('token', JSON.stringify(result.auth)); // Store token in localStorage
                navigate("/"); // Redirect to home page
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert("An error occurred: " + error.message); // Show error
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <input
                type="text"
                className="inputBox"
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} // Update email
                value={email}
            />
            <input
                type="password"
                className="inputBox"
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} // Update password
                value={password}
            />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    );
};

export default Login;
