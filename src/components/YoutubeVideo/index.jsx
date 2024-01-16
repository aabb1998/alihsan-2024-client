const YoutubeVideo = ({ url }) => (
  <iframe 
    width="100%"
    height="100%"
    src={`https://www.youtube.com/embed/${extractYouTubeVideoId(url)}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
);

export default YoutubeVideo;

function extractYouTubeVideoId(url) {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})$/;
  if (youtubeRegex.test(url)) {
    const urlParams = new URLSearchParams(new URL(url)?.search);
    return urlParams?.get("v");
  }
  return null;
}
