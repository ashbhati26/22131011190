import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { isValidURL, isValidShortcode } from '../utils/validators';
import { logEvent } from '../utils/logger';

type UrlInput = {
  originalUrl: string;
  shortcode?: string;
  validity?: number;
};

export default function UrlForm() {
  const [inputs, setInputs] = useState<UrlInput[]>([{ originalUrl: '' }]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (index: number, field: keyof UrlInput, value: string) => {
    const updated = [...inputs];
    if (field === 'validity') {
      updated[index][field] = value === '' ? undefined : Number(value);
    } else {
      updated[index][field] = value;
    }
    setInputs(updated);
  };

  const addInput = () => {
    if (inputs.length >= 5) return;
    setInputs([...inputs, { originalUrl: '' }]);
  };

  const handleSubmit = () => {
    setError(null);
    setSuccess(null);

    for (let i = 0; i < inputs.length; i++) {
      const { originalUrl, shortcode, validity } = inputs[i];
      if (!isValidURL(originalUrl)) {
        setError(`Input ${i + 1}: Invalid URL`);
        return;
      }

      if (shortcode && !isValidShortcode(shortcode)) {
        setError(`Input ${i + 1}: Shortcode must be alphanumeric`);
        return;
      }

      const finalShortcode = shortcode || uuidv4().slice(0, 6);
      const existing = localStorage.getItem(`shorturl:${finalShortcode}`);
      if (existing) {
        setError(`Input ${i + 1}: Shortcode "${finalShortcode}" already exists`);
        return;
      }

      const now = Date.now();
      const expiresAt = now + (validity ? validity * 60000 : 1800000);

      const urlData = {
        shortcode: finalShortcode,
        originalUrl,
        createdAt: now,
        expiresAt,
      };

      localStorage.setItem(`shorturl:${finalShortcode}`, JSON.stringify(urlData));
      localStorage.setItem(`clicks:${finalShortcode}`, JSON.stringify([]));
      logEvent('url_created', urlData);
    }

    setInputs([{ originalUrl: '' }]);
    setSuccess('URLs successfully shortened!');
  };

  return (
    <>
      {inputs.map((input, idx) => (
        <div key={idx} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <TextField
            label="Original URL"
            value={input.originalUrl}
            onChange={(e) => handleChange(idx, 'originalUrl', e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Custom Shortcode"
            value={input.shortcode || ''}
            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
            fullWidth
          />
          <TextField
            label="Validity (mins)"
            type="number"
            value={input.validity || ''}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
            fullWidth
          />
        </div>
      ))}

      <div style={{ marginTop: '1rem' }}>
        <Button variant="outlined" onClick={addInput} disabled={inputs.length >= 5}>
          + Add URL
        </Button>
        <Button variant="contained" style={{ marginLeft: '1rem' }} onClick={handleSubmit}>
          Shorten
        </Button>
      </div>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
    </>
  );
}
