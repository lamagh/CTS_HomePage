export const validatePassword = (password, isEditMode) => {
  if (!password && isEditMode) return true;

  const errors = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push(
      "Password must contain at least one non-alphanumeric character"
    );
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  return errors;
};
