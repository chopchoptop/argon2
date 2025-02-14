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

export const hash = async (password: string, salt: string): Promise<string> => {
    await initializing;
    const json: MessageResult<string, string> = JSON.parse(argon2.hash(password, salt));
    if (json.err !== undefined) throw new Error(json.err);
    return json.ok;
};

// ================ verify ================

export const verify = async (password: string, hash: string, salt: string): Promise<void> => {
    await initializing;
    const json: MessageResult<string, string> = JSON.parse(argon2.verify(password, hash, salt));
    if (json.err !== undefined) throw new Error(json.err);
};
