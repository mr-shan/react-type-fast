/**
 * Calculates the sum of two numbers
 * @param startTime - The time when typing chars was begun (milliseconds)
 * @param endTime - The time when typing chars was ended (milliseconds)
 * @param chars - The total number of characters typed (number)
 * @param wrongChars - (Optional) The number of wrong characters typed
 * @returns The speed of typing in WPM (word per minute)
 */
export const getTypingSpeed = (
  startTime: number,
  endTime: number,
  chars: number,
  wrongChars: number = 0
): number => {
  let netTypedEntries = (chars / 5) - wrongChars;
  if (netTypedEntries < 0) netTypedEntries = 0;
  const timeInMinutes = (endTime - startTime) / (1000 * 60);
  return netTypedEntries / timeInMinutes;
};
