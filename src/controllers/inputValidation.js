export const validateInputIsTypeDouble = ({ value }) => {
  return value !== null &&
    value !== "" &&
    value !== undefined &&
    !isNaN(value) && // Check if number
    `${value}`.match(/^\d{0,8}(?:\.\d{0,2}){0,1}$/) // Match for between 0 and 8 digits with a maximum of 2 decimals
    ? true
    : false;
};
