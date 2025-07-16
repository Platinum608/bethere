export interface Album{
    title: string;  //专辑名称
    releaseDate: string;  //发布日期
    id: number;  //专辑id
    picUrl: string;  //封面url
    type: string;  //专辑类型：单曲，专辑，精选集，现场
}

export interface AlbumDetail {
    title: string;  //专辑名称
    releaseDate: string;  //发布日期
    id: number;  //专辑id
    type: string;  //专辑类型：单曲，专辑，精选集，现场
    picUrl: string;  //封面url
    duration: string;  //时长
    size: number;  //歌曲数量
    songs: {
        songTitle: string;
        songAlbum: string;  //专辑名称
        id: number;
        songDuration: string; // 格式化为 mm:ss
    }[];  //包含歌曲
}