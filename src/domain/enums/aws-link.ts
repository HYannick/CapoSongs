export enum S3Dir {
  PICTURES = 'pictures',
  SONGS = 'songs',
  LYRICS = 'lyrics',
}
export const S3_SOURCE_LINK = (dir: S3Dir, source: string) =>
  `https://capoeira-songs.s3.eu-west-3.amazonaws.com/${dir}/${source}`;