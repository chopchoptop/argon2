#[cfg(test)]
mod tests {

    #[test]
    fn test() {
        let hashed = crate::inner_hash("123456", "1111").unwrap();
        println!("hash: {}", hashed);
        crate::inner_verify("123456", &hashed, "1111").unwrap();
    }
}
