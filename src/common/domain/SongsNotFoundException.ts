export class SongsNotFoundException extends Error {
  constructor() {
    super(`Could not get songs`);
  }
}
