function maxSubArray(nums) {
    // Initialize the maxSum and currentSum to the first element of the array
  let maxSum = nums[0];
  let currentSum = nums[0];
  // Pointers to track the subarray's start and end indices
  let start = 0;
  let end = 0;
  let tempStart = 0;// Temporary start index, used to update start later

  // Loop through the array starting from index 1
  for (let i = 1; i < nums.length; i++) {
    // Check whether it's better to start a new subarray at current element
    // or continue adding to the existing currentSum
    if (currentSum + nums[i] < nums[i]) {
      currentSum = nums[i];  // Start a new subarray at index i
      tempStart = i;          // Update the temporary start index
    } else {
      currentSum += nums[i];    // Continue the existing subarray
    }
 // If the currentSum is greater than maxSum, update maxSum and indices
    if (currentSum > maxSum) {
      maxSum = currentSum;// Update the max found so far
      start = tempStart;   // Confirm start index of this new max subarray
      end = i;              // Confirm end index
    }
  }

  return {
    sum: maxSum,
    subarray: nums.slice(start, end + 1), // Extract the subarray using slice
  };
}

// 🧪 Test cases
console.log(maxSubArray([-2, -3, -1, 2]));   // { sum: 2, subarray: [2] }
console.log(maxSubArray([3, -1, 2]));        // { sum: 4, subarray: [3, -1, 2] }
console.log(maxSubArray([-2, -3, 4, -1, -2, 1, 5, -3])); // { sum: 7, subarray: [4, -1, -2, 1, 5] }
