import init, * as argon2 from '@choptop/argon2';
import wasmURL from '@choptop/argon2/argon2_bg.wasm?url';

// https://juejin.cn/post/7187279730264473656

let initializing: Promise<any>;

try {
    // initializing = init(); // website and chrome extension and deny wasmURL

    initializing = init(wasmURL); // dev and website

    // initializing = init('../../../node_modules/@choptop/argon2/argon2_bg.wasm'); // dev
} catch (e) {
    // noop
    console.debug(`🚀 ~ initializing choptop-argon2:`, e);
}

type MessageResult<T, E> = { ok: T; err?: undefined } | { ok?: undefined; err: E };

// ================ hash ================

/**
 * hash password
 *
 * # Arguments
 *
 * * `password` - password
 * * `salt` - salt
 */
export const hash = async (password: string, salt: string): Promise<string> => {
    await initializing;
    const json: MessageResult<string, string> = JSON.parse(argon2.hash(password, salt));
    if (json.err !== undefined) throw new Error(json.err);
    return json.ok;
};

// ================ verify ================

/**
 * verify password
 *
 * # Arguments
 *
 * * `hashed` - hashed password
 * * `password` - password
 * * `salt` - salt
 */
export const verify = async (hashed: string, password: string, salt: string): Promise<void> => {
    await initializing;
    const json: MessageResult<string, string> = JSON.parse(argon2.verify(hashed, password, salt));
    if (json.err !== undefined) throw new Error(json.err);
};
