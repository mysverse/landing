export function processBio(bio?: string) {
  if (bio) {
    // Turn any string like "John Doe of Company ABC" into "John Doe, Company ABC"
    const parts = bio.split(" of ");
    if (parts.length === 2) {
      const name = parts[0].trim();
      const company = parts[1].trim();
      return `${name}, ${company}`;
    }
  }
  return undefined;
}
