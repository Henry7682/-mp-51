"use client";
import { useState, FormEvent } from "react";
import {
    Box,
    Button,
    Paper,
    IconButton,
    Typography,
    TextField,
} from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckIcon from "@mui/icons-material/Check";

export default function Urls() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [short, setShort] = useState("");
    const [error, setError] = useState("");
    const [copy, setCopy] = useState(false);

    const copyHandler = () => {
        navigator.clipboard.writeText(short);
        setCopy(true);
    };

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        setError("");
        setShort("");

        if (url.startsWith(window.location.origin)) {
            setError("Invalid URL: Cycled URL is not allowed.");
            return;
        }

        try {
            const result = await fetch("/api/urlData", {
                method: "POST",
                body: JSON.stringify({ url, alias }),
            });

            const data = await result.json();

            if (!result.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            setShort(`${window.location.origin}/${alias}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    }

    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <form onSubmit={onSubmit}>
                <Box mb={2}>
                    <TextField
                        type="url"
                        label="Long URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        fullWidth
                        required
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        type="text"
                        label="Custom Alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        fullWidth
                        required
                    />
                </Box>

                {error && (
                    <Typography color="error" variant="body2" mb={2}>
                        {error}
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    Shorten URL
                </Button>
            </form>

            {short && (
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: "#e3f2fd",
                        p: 2,
                        textAlign: "center",
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="subtitle2" mb={1}>
                        Your shortened URL:
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="body1" color="primary">
                            <a href={short} target="_blank" rel="noopener noreferrer">
                                {short}
                            </a>
                        </Typography>
                        <IconButton onClick={copyHandler} color="primary" size="small">
                            {copy ? <CheckIcon /> : <ContentCopyRoundedIcon />}
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </Paper>
    );
}
