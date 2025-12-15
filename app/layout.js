'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box, Container, CssBaseline } from '@mui/material';
import { Image } from '@mui/icons-material';
import theme from '@/styles/theme';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              {/* <Image sx={{ mr: 2 }} /> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: "#fff" }}>
                Image Size Reducer
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="xl">
            <Box sx={{ py: 4 }}>
              {children}
            </Box>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}