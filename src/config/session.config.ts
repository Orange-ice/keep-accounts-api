import session from 'koa-session';

export const sessionConfig: Partial<session.opts> = {
  key: 'keep-accounts',
  maxAge: 86400000, // 1天
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: true,
};
