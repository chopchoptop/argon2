#[cfg(test)]
mod tests {

    #[test]
    fn test() {
        let hash = crate::inner_hash("123456", "1111").unwrap();
        println!("hash: {}", hash);
        crate::inner_validate("123456", &hash, "1111").unwrap();
    }
}
