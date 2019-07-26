const sortedList = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];

const binarySearch = (arr, value, start=0, end=arr.length-1, steps=[]) => {
  if (start > end) {
    console.log('steps', steps)
    return -1
  }

  let index = Math.floor((start + end) / 2)
  let midpoint = arr[index]

  if (value === midpoint) {
    return index
  } else if (value < midpoint) {
    steps.push(index)
    return binarySearch(arr, value, start, index-1, steps)
  } else if (value > midpoint) {
    steps.push(index)
    return binarySearch(arr, value, index+1, end, steps)
  }
}

// console.log(binarySearch(sortedList, 16))

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  
  insert(key, value) {
    if (this.key == null) {
      this.key = key
      this.value = value
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this)
      } else {
        this.left.insert(key, value)
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this)
      } else {
        this.right.insert(key, value)
      }
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.left._findMax()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      } else if (this.left) {
        this._replaceWith(this.left)
      } else if (this.right) {
        this._replaceWith(this.right)
      } else {
        this._replaceWith(null)
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key)
    } else if (key > this.key && this.right) {
      this.right.remove(key)
    } else {
      throw new Error('Key Error')
    }
  }

  find(key) {
    if (this.key == key) {
      return this
    } else if (key < this.key && this.left) {
      return this.left.find(key)
    } else if (key > this.key && this.right) {
      return this.right.find(key)
    } else {
      throw new Error('Key Error')
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node
      } else if (this == this.parent.right) {
        this.parent.right = node
      } if (node) {
        node.parent = this.parent
      }
    } else {
      if (node) {
        this.key = node.key
        this.value = node.value
        this.left = node.left
        this.right = node.right
      } else {
        this.key = null
        this.value = null
        this.left = null
        this.right = null
      }
    }
  }

  _findMax() {
    if (!this.right) {
        return this;
    }
    return this.right._findMax();
  }
}

function main() {
  let arr = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22]

  let bst = new BinarySearchTree();

  arr.forEach(num => bst.insert(num, num))

  return bst
}

console.log(main())