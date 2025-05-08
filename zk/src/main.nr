fn main(birth_year: Field, current_year: pub Field) {
    // Cast to signed integers (i32)
    let birth_year_i32 = birth_year as i32;
    let current_year_i32 = current_year as i32;

    let age = current_year_i32 - birth_year_i32;

    // Check if age >= 18
    assert(age >= 18);
}

#[test]
fn test_main() {
    // Should pass (age = 26)
    main(1998, 2025);

    // Should fail if uncommented (age = 17)
    // main(2007, 2024);
}
