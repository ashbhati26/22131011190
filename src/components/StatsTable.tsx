import { useEffect, useState } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type ClickLog = {
  timestamp: number;
  referer: string;
  location: string;
};

type UrlStats = {
  shortcode: string;
  originalUrl: string;
  createdAt: number;
  expiresAt: number;
  clicks: ClickLog[];
};

export default function StatsTable() {
  const [stats, setStats] = useState<UrlStats[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('shorturl:'));
    const data = keys.map(key => {
      const shortcode = key.split(':')[1];
      const urlData = JSON.parse(localStorage.getItem(key) || '{}');
      const clickData = JSON.parse(localStorage.getItem(`clicks:${shortcode}`) || '[]');
      return { ...urlData, clicks: clickData };
    });
    data.sort((a, b) => b.createdAt - a.createdAt);
    setStats(data);
  }, []);

  return (
    <Box>
      {stats.map((entry) => (
        <Accordion key={entry.shortcode}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ flexGrow: 1 }}>
              {window.location.origin}/{entry.shortcode}
            </Typography>
            <Chip label={`Clicks: ${entry.clicks.length}`} color="primary" />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              Original URL: {entry.originalUrl}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Created At: {new Date(entry.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Expires At: {new Date(entry.expiresAt).toLocaleString()}
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Referer</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entry.clicks.map((log, i) => (
                  <TableRow key={i}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.referer}</TableCell>
                    <TableCell>{log.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
