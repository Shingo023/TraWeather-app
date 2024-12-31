export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/); // Split the name by spaces
  return parts[0][0];
  // if (parts.length === 1) {
  //   return parts[0][0]; // Single name, return the first letter
  // }
  // return (parts[0][0] + parts[1][0]).toUpperCase(); // First two initials
}
