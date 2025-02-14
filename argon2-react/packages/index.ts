import { hash as _hash, verify as _verify } from '@choptop/argon2-api';

/**
 * hash password
 *
 * # Arguments
 *
 * * `password` - password
 * * `salt` - salt
 */
export const hash: (password: string, salt: string) => Promise<string> = _hash;

/**
 * verify password
 *
 * # Arguments
 *
 * * `hashed` - hashed password
 * * `password` - password
 * * `salt` - salt
 */
export const verify: (password: string, hash: string, salt: string) => Promise<void> = _verify;
