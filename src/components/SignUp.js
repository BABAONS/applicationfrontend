import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/'); // Redirige vers la page d'accueil si l'utilisateur est déjà connecté
        }
    }, [navigate]);

    const collectData = async () => {
        try {
            console.warn(name, email, password);
            const response = await fetch("http://localhost:5000/register", {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json(); // Récupère la réponse en JSON
            console.log("API Response:", result); // Log la réponse de l'API

            if (!response.ok) {
                // Affiche un message d'erreur si la réponse n'est pas OK
                alert(result.message || 'Registration failed. Please try again.');
                return;
            }

            if (result.name) { // Vérifie si le nom est présent dans la réponse
                localStorage.setItem("user", JSON.stringify(result)); // Stocke l'utilisateur dans localStorage
                navigate('/'); // Redirige vers la page d'accueil
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert("An error occurred: " + error.message); // Affiche un message d'erreur
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Met à jour le nom
            />
            <input
                className="inputBox"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Met à jour l'email
            />
            <input
                className="inputBox"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Met à jour le mot de passe
            />
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    );
};

export default SignUp;
