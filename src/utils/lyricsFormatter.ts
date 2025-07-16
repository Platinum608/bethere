import { LyricLine } from "@/data/Lyric";

export function parseLyric(lyric: string): LyricLine[] {
  // 找到第一个时间标签的位置，歌词正文从这里开始
  // const startIdx = lyric.indexOf("[00:00.00]");
  // if (startIdx === -1) return [];
  const startIdx = 1;

  // 截取歌词正文部分
  const lyricBody = lyric.slice(startIdx);
  // 按行分割
  const lines = lyricBody.split("\n");

  const result: LyricLine[] = [];
  const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})]/;

  for (const line of lines) {
    const match = line.match(timeReg);
    if (match) {
      const min = parseInt(match[1], 10);
      const sec = parseInt(match[2], 10);
      const ms = parseInt(match[3], 10);
      const time = min * 60 + sec + ms / 100;
      const text = line.replace(timeReg, "").trim();
      if (text) { // 只保留非空歌词
        result.push({ time, text });
      }
    }
  }
  return result;
}