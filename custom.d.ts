import {Context} from 'koa';

declare module 'koa' {
  export interface Context {
    session?: {
      user?: {
        id: number,
        username: string
      }
    };
  }
}
