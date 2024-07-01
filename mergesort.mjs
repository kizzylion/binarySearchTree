export function mergeSort(arr) {
  if (arr.length <= 1) return arr

  let mid = Math.floor(arr.length / 2)

  let left = arr.slice(0, mid)
  let right = arr.slice(mid)

  return merge(mergeSort(left), mergeSort(right))
}

// merge is a function that merges two sorted arrays  together and return a sorted arr
function merge(arr1, arr2) {
  let arr = []

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      arr.push(arr1.shift())
    } else {
      arr.push(arr2.shift())
    }
  }

  return arr.concat(arr1, arr2)
}
