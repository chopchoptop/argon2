import { hash as _hash, validate as _validate } from '@choptop/argon2-api';

export const hash: (password: string, salt: string) => Promise<string> = _hash;
export const validate: (password: string, hash: string, salt: string) => Promise<void> = _validate;
