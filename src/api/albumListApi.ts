import { Album } from "@/data/Album";
import axios from "axios";

export async function fetchAlbumInfo(aritstId: number) {
    const response = await axios.get(`http://localhost:3000/artist/album`, {
        params: {
            id: aritstId,
            limit: 100
        }
    });
    console.log(response.data);
    return response.data.hotAlbums;
};

export function mapAlbumListData(rawData: any): Album[] {
    
    return rawData
        // .filter((item: any) => 
        //     item.type === '专辑'
        //     && item.subType === '录音室版'
        //     && item.name !== 'BUMP OF CHICKEN GOLD GLIDER TOUR 2012'
        // )
        .map((album: any) => ({
            title: album.name || '',
            releaseDate: new Date(album.publishTime).toLocaleDateString().replace(/\//g, '.') || '',
            id: album.id || 0,
            picUrl: album.picUrl || '',
            type: album.type === "专辑" ? "Album" : "Single",
        }));

}