import { Tree } from "./tree.mjs"

function getRandomNumber(count) {
  const numbers = []

  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * 100))
  }

  return numbers
}

function getRandomNumber2(count = 50) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100))
}

const numbers = getRandomNumber(50)
const numbers2 = getRandomNumber2(30)

const tree = new Tree(numbers)
const tree2 = new Tree(numbers2)

tree.prettyPrint(tree.root)
tree2.prettyPrint(tree2.root)

console.log(tree.inOrder())
console.log(tree2.inOrder())

// Unbalance the tree
console.log("\nUnbalancing the tree...")
tree.insert(120)
tree.insert(150)
tree.insert(110)

console.log("Is the tree balanced after unbalancing?", tree.isBalanced())

// Rebalance the tree
console.log("\nRebalancing the tree...")
tree.rebalance()
console.log("Is the tree balanced after rebalancing?", tree.isBalanced())
