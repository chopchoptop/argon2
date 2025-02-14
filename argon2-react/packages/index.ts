import { hash as _hash, verify as _verify } from '@choptop/argon2-api';

export const hash: (password: string, salt: string) => Promise<string> = _hash;
export const verify: (password: string, hash: string, salt: string) => Promise<void> = _verify;
