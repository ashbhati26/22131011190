import { useEffect, useState } from "react";
import { Typography, Card, CardContent, Link, Chip } from "@mui/material";

type ShortUrlData = {
  shortcode: string;
  originalUrl: string;
  createdAt: number;
  expiresAt: number;
};

export default function UrlList() {
  const [urls, setUrls] = useState<ShortUrlData[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("shorturl:")
    );
    const data = keys.map((key) =>
      JSON.parse(localStorage.getItem(key) || "{}")
    );
    data.sort((a, b) => b.createdAt - a.createdAt);
    setUrls(data);
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Recent Shortened URLs
      </Typography>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {urls.map((item) => (
          <div
            key={item.shortcode}
            style={{
              flex: "1 1 calc(50% - 1rem)",
              minWidth: "300px",
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="body1" gutterBottom noWrap>
                  Original:{" "}
                  <Link href={item.originalUrl} target="_blank" rel="noopener">
                    {item.originalUrl}
                  </Link>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Short:{" "}
                  <Link href={`/${item.shortcode}`} target="_blank">
                    {window.location.origin}/{item.shortcode}
                  </Link>
                </Typography>
                <Chip
                  label={`Expires in ${Math.round(
                    (item.expiresAt - Date.now()) / 60000
                  )} min`}
                  color={item.expiresAt < Date.now() ? "error" : "success"}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
