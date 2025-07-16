import axios from "axios";
import { Song } from "@/data/Song";
import { SongDetail } from "@/data/Song";
import { formatDuration } from "@/utils/formatter";

export async function fetchLyrics(songId: number){
    try {
        const response = await axios.get(`http://localhost:3000/lyric`, {
            params: {
                id: songId
            }
        });
        return response.data?.lrc?.lyric || '';
    } catch (error) {
        console.error('fetchLyrics error:', error, 'songId:', songId);
        return '';
    }
}

export async function fetchSongData(songId: number){
    try {
        const response = await axios.get(`http://localhost:3000/song/detail`, {
            params: { ids: songId }
        });
        return response.data.songs[0];
    } catch (error) {
        console.error('fetchSongData error:', error, 'songId:', songId);
        return null;
    }
}

export function mapSongData(rawData: any): Song{
    return {
        name: rawData.name || '',
        id: rawData.id || 0,
        picUrl: rawData.al.picUrl || ''
    }
}

export async function fetchSongUrl(songId: number){
    const response = await axios.get(`http://localhost:3000/song/url`, {
        params: {
            id: songId
        }
    });
    const url = response.data?.data?.[0]?.url;
    return url;
}

export function mapSongDetail(rawData: any, songUrl: string): SongDetail{

    return {
        name: rawData.name || '',
        id: rawData.id || 0,
        duration: formatDuration(rawData.dt, 'ms'),
        url: songUrl
    }
}
