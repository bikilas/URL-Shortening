import React, { useState } from "react";

function App() {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ longUrl }),
            });
            const data = await response.json();
            setShortUrl(data.shortUrl);
        } catch (error) {
            console.error("Error creating short URL:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Enter a long URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        marginLeft: "10px",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Shorten
                </button>
            </form>
            {shortUrl && (
                <div style={{ marginTop: "20px" }}>
                    <p>Short URL:</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

export default App;
