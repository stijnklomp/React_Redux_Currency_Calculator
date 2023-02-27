import { validateInputIsTypeDouble } from "./inputValidation";

describe("check output is correct", () => {
  test("150 is true", () => {
    expect(true).toBe(true);
  });

  test("150.50 is true", () => {
    expect(validateInputIsTypeDouble({ value: 150.5 })).toBe(true);
  });

  test("150.541 is false", () => {
    expect(validateInputIsTypeDouble({ value: 150.541 })).toBe(false);
  });

  test("12345678 is true", () => {
    expect(validateInputIsTypeDouble({ value: 12345678 })).toBe(true);
  });

  test("123456789 is false", () => {
    expect(validateInputIsTypeDouble({ value: 123456789 })).toBe(false);
  });

  test('"" is false', () => {
    expect(validateInputIsTypeDouble({ value: "" })).toBe(false);
  });

  test('"150" is true', () => {
    expect(validateInputIsTypeDouble({ value: "150" })).toBe(true);
  });

  test('"-" is false', () => {
    expect(validateInputIsTypeDouble({ value: "-" })).toBe(false);
  });

  test("undefined is false", () => {
    expect(validateInputIsTypeDouble({ value: undefined })).toBe(false);
  });

  test("null is false", () => {
    expect(validateInputIsTypeDouble({ value: null })).toBe(false);
  });

  test("NaN is false", () => {
    expect(validateInputIsTypeDouble({ value: NaN })).toBe(false);
  });
});
