
import { Container, Typography, Box, Paper } from '@mui/material';
import StatsTable from '../components/StatsTable';

export default function Stats() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box>
          <StatsTable />
        </Box>
      </Paper>
    </Container>
  );
}
