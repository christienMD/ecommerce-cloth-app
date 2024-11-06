export function getUserInitials(firstName?: string, lastName?: string): string {
  if (!firstName && !lastName) return "U";
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
}
