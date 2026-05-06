import { useEffect, useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/youtube/videos"
        );

        const result = await res.json();

        if (!result.success) {
          throw new Error("Failed to fetch videos");
        }

        setVideos(result.data.data);
      } catch (err) {
        setError("Something went wrong while fetching videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <h2>Loading videos...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="app">
      <h1>YouTube Video Listing</h1>

      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <img
              src={video.items.snippet.thumbnails.medium.url}
              alt={video.items.snippet.title}
            />

            <h3>{video.items.snippet.title}</h3>
            <p>{video.items.snippet.channelTitle}</p>

            <small>
              {video.items.statistics.viewCount} views
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;