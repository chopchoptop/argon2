#![doc = include_str!("../README.md")]

use wasm_bindgen::prelude::*;

/// test
#[cfg(test)]
mod test;

// ===================== Transport object =====================

#[derive(Debug, serde::Serialize, serde::Deserialize)]
enum JellyResult {
    #[serde(rename = "ok")]
    Ok(String),
    #[serde(rename = "err")]
    Err(String),
}

impl From<Result<String, String>> for JellyResult {
    fn from(value: Result<String, String>) -> Self {
        match value {
            Ok(value) => JellyResult::Ok(value),
            Err(err) => JellyResult::Err(err),
        }
    }
}

impl From<JellyResult> for String {
    fn from(value: JellyResult) -> Self {
        serde_json::to_string(&value).unwrap_or_default()
    }
}

// ===================== hash password =====================

/// hash password
///
/// # Arguments
///
/// * `password` - password
/// * `salt` - salt
#[wasm_bindgen]
pub fn hash(password: &str, salt: &str) -> String {
    let result = inner_hash(password, salt);
    let result: JellyResult = result.into();
    result.into()
}

fn inner_hash(password: &str, salt: &str) -> Result<String, String> {
    use argon2::{
        password_hash::{PasswordHasher, SaltString},
        Argon2,
    };
    use rand_core::OsRng;

    let _argon2 = Argon2::new_with_secret(
        salt.as_bytes(),
        argon2::Algorithm::default(),
        argon2::Version::default(),
        argon2::Params::default(),
    )
    .map_err(|e| format!("{e:?}"))?;

    let salt = SaltString::generate(&mut OsRng);

    let hash = _argon2
        .hash_password(password.as_bytes(), &salt)
        .map_err(|e| format!("{e:?}"))?
        .to_string();
    Ok(hash)
}

// ===================== verify password =====================

/// verify password
///
/// # Arguments
///
/// * `hashed` - hashed password
/// * `password` - password
/// * `salt` - salt
#[wasm_bindgen]
pub fn verify(hashed: &str, password: &str, salt: &str) -> String {
    let result = inner_verify(hashed, password, salt);
    let result: JellyResult = result.into();
    result.into()
}

fn inner_verify(hashed: &str, password: &str, salt: &str) -> Result<String, String> {
    use argon2::{Argon2, PasswordHash, PasswordVerifier};

    let hashed = PasswordHash::new(hashed).map_err(|e| format!("{e:?}"))?;

    let _argon2 = Argon2::new_with_secret(
        salt.as_bytes(),
        argon2::Algorithm::default(),
        argon2::Version::default(),
        argon2::Params::default(),
    )
    .map_err(|e| format!("{e:?}"))?;

    _argon2
        .verify_password(password.as_bytes(), &hashed)
        .map_err(|e| format!("{e:?}"))?;
    Ok("true".to_string())
}
