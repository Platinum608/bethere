  // 格式化毫秒为 mm:ss
export function formatDuration(ms: number, formatType: string): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (formatType === 'ms') {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }else if (formatType === 'hm') {
        return `${hours} hr ${remainingMinutes.toString().padStart(2, '0')} min`;
    }else{
        return "";
    }
}