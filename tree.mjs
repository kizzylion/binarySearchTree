import Node from "./node.mjs"
import { mergeSort } from "./mergesort.mjs"

export class Tree {
  constructor(arr) {
    arr = mergeSort(arr)
    arr = this.removeDuplicates(arr)

    this.root = this.buildTree(arr, 0, arr.length - 1)
  }
  buildTree(arr, start, end) {
    if (start > end) {
      return null
    }

    // find the mid element
    const mid = Math.floor((start + end) / 2)

    // create a new node
    const node = new Node(arr[mid])

    // build the left subtree
    node.left = this.buildTree(arr, start, mid - 1)
    // build the right subtree
    node.right = this.buildTree(arr, mid + 1, end)

    return node
  }

  insert(value) {
    if (!this.root) {
      this.root = new Node(value)
      return
    }

    let current = this.root
    while (current) {
      if (value < current.data) {
        if (current.left) {
          current = current.left
        } else {
          current.left = new Node(value)
          break
        }
      } else if (value > current.data) {
        if (current.right) {
          current = current.right
        } else {
          current.right = new Node(value)
          break
        }
      } else {
        console.error("Duplicate value ignored: ", value)
        return
        // throw Error("Duplicate value", value)
      }
    }
  }

  insertByRecursion(nodes, value) {
    // if the tree is empty, return a new node
    if (!nodes) {
      nodes = new Node(value)
      return nodes
    }

    // Otherwise, recur down the tree
    if (value < nodes.data) {
      nodes.left = this.insertByRecursion(nodes.left, value)
    } else if (value > nodes.data) {
      nodes.right = this.insertByRecursion(nodes.right, value)
    } else {
      console.error("Duplicate value ignored: ", value)
      //   throw new Error(`Duplicate value ignored: ${value}`)
    }

    return nodes
  }

  deleteNodeByRecursion(node, value = node.data) {
    if (!node) return null

    // if the key to be deleted is smaller than the root data, then it lies in the left subtree
    if (value < node.data) {
      node.left = this.deleteNodeByRecursion(node.left, value)
    }

    // if the key to be deleted is greater than the root data, then it lies in the right subtree
    if (value > node.data) {
      node.right = this.deleteNodeByRecursion(node.right, value)
    }

    //if the value to be deleted is same as the root's data, then this is the node to be deleted
    if (value === node.data) {
      // node has no children
      if (!node.left && !node.right) return (node = null)

      // node has no left child
      if (!node.left) return node.right

      // node has no right child
      if (!node.right) return node.left

      // if both children exist, get the inorder successor (smallest in the right subtree)
      node.data = this.minValue(node.right)
      // Delete the inorder success
      node.right = this.deleteNodeByRecursion(node.right, node.data)
    }

    return node
  }

  // Return the minimum value in the tree
  minValue(node = this.root) {
    let current = node
    while (current.left) {
      current = current.left
    }
    return current.data
  }

  // Returns the node with the given value
  find(value) {
    let current = this.root
    while (current) {
      if (value === current.data) {
        return current
      }
      if (value < current.data) {
        current = current.left
      }
      if (value > current.data) {
        current = current.right
      }
    }
    console.error("Not found")
    return null
  }

  // Level-Order traversal using iteration (BFS)
  levelOrderIterative(callback) {
    if (!this.root) {
      return []
    }

    let result = []
    let queue = [this.root]
    while (queue.length) {
      let current = queue.shift()
      if (callback) {
        callback(current.data)
      } else result.push(current.data)

      if (current.left) queue.push(current.left)
      if (current.right) queue.push(current.right)
    }
    return result
  }

  // In-order traversal (recursive)
  inOrder(callback) {
    if (!this.root) {
      return []
    }

    let result = []
    this._inOrder(this.root, callback, result)
    return result
  }

  _inOrder(node, callback, result) {
    if (!node) return

    this._inOrder(node.left, callback, result)
    if (callback) {
      callback(node.data)
    } else {
      result.push(node.data)
    }

    this._inOrder(node.right, callback, result)
  }

  // Pre-order traversal (recursive)

  preOrder(callback) {
    if (!this.root) return []

    let result = []
    this._preOrder(this.root, callback, result)
    return result
  }

  _preOrder(node, callback, result) {
    if (!node) return

    if (callback) {
      callback(node.data)
    } else {
      result.push(node.data)
    }

    this._preOrder(node.left, callback, result)
    this._preOrder(node.right, callback, result)
  }

  // Post-order traversal (recursive)

  postOrder(callback) {
    if (!this.root) return []

    let result = []
    this._postOrder(this.root, callback, result)
    return result
  }

  _postOrder(node, callback, result) {
    if (!node) return

    this._postOrder(node.left, callback, result)
    this._postOrder(node.right, callback, result)
    if (callback) {
      callback(node.data)
    } else {
      result.push(node.data)
    }
  }
  // Calculate the height of a specific node or the entire tree (if no node is provided)
  height(node = this.root) {
    if (!node) {
      return -1 // Height of an empty tree is -1 (convention)
    }

    const leftHeight = this.height(node.left)
    const rightHeight = this.height(node.right)

    return 1 + Math.max(leftHeight, rightHeight)
  }

  // Calculate the dept of a specific node in the tree
  depth(node = this.root) {
    if (!node) return -1 // Depth of an empty tree or absent node is -1

    let currentNode = this.root
    let depth = 0

    while (currentNode !== node) {
      if (node.data < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }

      if (!currentNode) return -1 // Node not found in the tree
      depth++
    }
    return depth
  }

  // Check if the tree is balanced (efficient approach)
  isBalanced() {
    if (!this.root) return true // Empty tree is considered balanced

    return this._isBalanced(this.root)
  }

  _isBalanced(node) {
    if (this.height() < 0) return false // Negative height indicates imbalance
    const leftHeight = this.height(node.left)
    const rightHeight = this.height(node.right)
    return Math.abs(leftHeight - rightHeight) <= 1
  }

  //function to remove duplicates from an array ()
  removeDuplicates(arr) {
    const uniqueArr = new Set(arr) // Use set to store unique values
    return Array.from(uniqueArr) // Convert set back to array
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      )
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
  }

  // Rebalance the tree (using in-order traversal)
  rebalance() {
    if (!this.root) {
      return // Empty tree
    }

    const inOrderValues = this.inOrder() // Collect nodes in-order
    this.root = this.buildTree(inOrderValues, 0, inOrderValues.length - 1) // Rebuild balanced tree
  }
}
