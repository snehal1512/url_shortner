import React from 'react'
import API from "../api/axios"
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";

function UrlShortner () {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!longUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError("");
    setShortCode("");

    try {
      const res = await API.post("/url/create", { longUrl });
      setShortCode(res.data.shortCode);
    } catch (err) {
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt:6 }}>
        <Card sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                    URL Shortener
                </Typography>

                <TextField
                    label="Enter long URL"
                    variant="outlined"
                    fullWidth
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{ py: 1.5 }}
                >
                    {loading ? (
                    <CircularProgress size={24} color="inherit" />
                    ) : (
                    "Shorten URL"
                    )}
                </Button>

                {/* Error message */}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                    </Alert>
                )}

                {shortCode && (
                    <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography variant="body1">Short URL:</Typography>
                    <a
                        href={`http://localhost:5000/${shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                        display: "block",
                        marginTop: "8px",
                        fontSize: "1.1rem",
                        color: "#1976d2",
                        }}
                    >
                        http://localhost:5000/{shortCode}
                    </a>
                    </Box>
                )}
            </CardContent>
        </Card>
    </Container>
  )
}

export default UrlShortner
