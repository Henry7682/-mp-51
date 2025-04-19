import Urls from "./components/urls";
import { Box, Typography } from "@mui/material";

export default function Home() {
    return (
        <Box
            minHeight="100vh"
            bgcolor="#f0f4ff"
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
        >
            <Box width="100%" maxWidth="500px">
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                    textAlign="center"
                    mb={3}
                >
                    Simple URL Shortener
                </Typography>
                <Urls />
            </Box>
        </Box>
    );
}
