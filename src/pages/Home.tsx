
import { Container, Typography, Box, Paper } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <UrlForm />
      </Paper>
      <Box>
        <UrlList />
      </Box>
    </Container>
  );
}
