export enum S3Dir {
  PICTURES = 'pictures',
  SONGS = 'songs',
  LYRICS = 'lyrics',
}
export const S3_SOURCE_LINK = (dir: S3Dir, source: string) =>
  `${import.meta.env.VITE_MEDIA_URL}/${source}`;