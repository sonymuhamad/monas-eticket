import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Grid } from '@mui/material';

function Copyright() {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
        >
            {'Copyright © '} monas.com
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '20vh',
            }}
        >
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Grid>

                        <Typography variant="body1">
                            Monumen Nasional Indonesia
                        </Typography>
                    </Grid>
                    <Copyright />
                </Container>
            </Box>
        </Box>
    );
}