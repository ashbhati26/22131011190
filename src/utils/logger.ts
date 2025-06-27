export function logEvent(event: string, data?: any) {
  const log = {
    event,
    timestamp: new Date().toISOString(),
    data: data || null,
  };

  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(log);
  localStorage.setItem('logs', JSON.stringify(logs));
}

// Optional: Retrieve logs for debugging or admin display
export function getLogs() {
  return JSON.parse(localStorage.getItem('logs') || '[]');
}
