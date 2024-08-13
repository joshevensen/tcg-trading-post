function checkRefresh(lastLoaded: number | null) {
  if (!lastLoaded) return false;

  const refresh = Number(process.env.NEXT_PUBLIC_REFRESH_TIME);
  const now = new Date().getTime();

  return now - lastLoaded > refresh;
}

function formatDate(timestamp: Date, includeYear = true) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: includeYear ? "numeric" : undefined,
  });
}

function formatTime(timestamp: Date) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}

const dateService = {
  checkRefresh,
  formatDate,
  formatTime,
};

export default dateService;
