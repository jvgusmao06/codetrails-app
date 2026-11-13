import { getAllTracks } from "@/lib/tracks";
import { TracksExplorer } from "@/components/TracksExplorer";

export default function TracksPage() {
  const tracks = getAllTracks();
  return <TracksExplorer tracks={tracks} />;
}
