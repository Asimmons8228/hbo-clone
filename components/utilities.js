// Function to shuffle an array using the Fisher-Yates (Knuth) algorithm
export function shuffleArray(array) {
  // Iterate over the array in reverse order
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index within the remaining unshuffled portion of the array
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }

  // Return the shuffled array
  return array;
}
