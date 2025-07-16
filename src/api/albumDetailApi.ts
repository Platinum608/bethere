import { AlbumDetail } from "@/data/Album";
import axios from "axios";
import { formatDuration } from "@/utils/formatter";

export async function fetchAlbumDetalInfo(albumId: number) {
    const response = await axios.get(`http://localhost:3000/album`, {
        params: {
            id: albumId
        }
    });
    return response.data;
    
}

export function mapAlbumDetailData(rawData: any): AlbumDetail {
    const songs = (rawData.songs || []).map((song: any) => ({
        songTitle: song.name,
        songAlbum: rawData.album.name || '',
        id: song.id,
        songDuration: formatDuration(song.dt, 'ms'),
    }));    

    const totalDurationMs = (rawData.songs || []).reduce(
        (sum: number, song: any) => sum + (song.dt || 0),
        0
    );

    return {
        title: rawData.album.name || '',
        releaseDate: new Date(rawData.album.publishTime).toLocaleDateString().replace(/\//g, '.') || '',
        id: rawData.album.id || 0,
        type: rawData.album.type === "专辑" ? "Album" : "Single",
        picUrl: rawData.album.picUrl || '',
        duration: formatDuration(totalDurationMs, 'hm'),
        size: rawData.album.size || songs.length,
        songs
    };
}