export const formatViews = (views) => {
  if (!views && views !== 0) return '';
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`;
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1).replace(/\.0$/, '')}K views`;
  }
  return `${views} views`;
};

export const formatDuration = (seconds) => {
  if (!seconds) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const pad = (n) => String(n).padStart(2, '0');
  
  if (hrs > 0) {
    return `${hrs}:${pad(mins)}:${pad(secs)}`;
  }
  return `${mins}:${pad(secs)}`;
};
