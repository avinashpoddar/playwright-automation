/** Format YYYY-MM-DD for native date inputs */
export function toIsoDate(date: Date): string {
    return date.toISOString().slice(0, 10);
}
