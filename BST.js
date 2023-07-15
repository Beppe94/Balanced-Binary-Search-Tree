class Node{
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(array) {
        this.root = this.buildTree(array);
    }

    smallestNode(node) {
        //loop through the left subtree until the next left sub node is null
        //and update node to the left child in each iteration
        //and return updated node with smalles value
        while(node.left !== null) {
            node = node.left;
        }

        return node;
    }

    sortAndRemove(array) {
        //spread array elements in a new set
        //then spread the unique elements back into an array
        //and compare each other to sort them
        //a - b because if the result is negative
        //it means a should go before b
        const sorted = [...new Set(array)].sort((a,b) => a - b);

        return sorted;
    }

    buildTree(array) {
        let sorted = this.sortAndRemove(array);

        if(sorted.length === 0) return null;

        //find middle index of sorted array
        const midIndex = Math.floor(sorted.length / 2);

        //create root node 
        const root = new Node(sorted[midIndex]);
        
        //create the left sub array from 0 to the middle index
        //and right sub array from middle index +1 to the end
        const leftSub = sorted.slice(0, midIndex);
        const rightSub = sorted.slice(midIndex +1);

        //recursively convert the left 
        //and right sub arrays into a balanced binary tree
        root.left = this.buildTree(leftSub);
        root.right = this.buildTree(rightSub);
    
        
        return root;
    }

    insert(value, root = this.root) {
        
        //check if root node is empty
        //if it is create a new node with the new value
        if(root === null) {
            root = new Node(value);
            return root;
        }

        //compare the value to the root element
        //and recursively check sub nodes
        if(value < root.data) {
            root.left = this.insert(value, root.left);
        } else if(value > root.data){
            root.right = this.insert(value, root.right)
        }

        return root;
    }

    remove(value) {
        this.root = this.removeNode(this.root, value);
    }
    
    removeNode(root = this.root, value) {
        //check if the tree is empty
        if(root === null) return root;

        //check if value to remove is in the current node
        //which means you found the node to delete
        if(value === root.data) {
            //check if the current node has no child
            //or either only left child or right child
            if(root.left === null && root.right === null) {
                return null;
            } else if(root.left === null) {
                return root.right;
            } else if(root.right === null) {
                return root.left;
              //if the node has two children, find the successor node
              //smallest node in the right sub tree
              //and then remove the successor node
            } else {
                let tempNode = this.smallestNode(root.right);
                root.data = tempNode.data;

                root.right = this.removeNode(root.right, tempNode.data);
                return root;
            }
        //recursively traverse the left or right subtree 
        //if the value is smaller or bigger than the node checked
        //and then remove the node
        } else if(value < root.data) {
            root.left = this.removeNode(root.left, value);
            return root;
        } else {
            root.right = this.removeNode(root.right, value);
            return root;
        }
    }

    find(value, root = this.root) {
        //check if tree is empty or the current node
        //is equal to the value you're looking for
        //then return the node
        if(root === null || root.data === value) {
            return root;
        }

        //recursively check left or right subtree
        //if the value is smaller or bigger
        if(value < root.data) {
            return this.find(value, root.left);
        } else {
            return this.find(value, root.right);
        }
    }
    
    levelOrder(array = [], queue = [], root = this.root) {
        //check if the tree is empty
        //and push the first node reference in the queue
        if(root === null) return;
        queue.push(root);

        //loop over the queue and at each iteration
        //push the current node in the array
        //and check if that node has childrens
        while(queue.length !== 0) {
            let current = queue[0];
            array.push(current.data);
            
            if(current.left !== null) queue.push(current.left);
            if(current.right !== null) queue.push(current.right);
            queue.shift();
        }

        return array;
    }

    /*
    recursive version

    recursiveLevelOrder(arr = [], queue = [], root = this.root) {
        if(root === null) return;

        arr.push(root.data);

        queue.push(root.left);
        queue.push(root.right);

        while(queue.length != 0) {
            let curr = queue[0];
            queue.shift();
            this.recursiveLevelOrder(arr, queue, curr);
        }
        return arr;
    }
    */

    inorderTraversal(root = this.root, arr = []) {
        //check if tree is empty 
        if(root === null) return;

        //recursively traverse left sub tree
        if(root.left) this.inorderTraversal(root.left, arr);

        //visit root node
        arr.push(root.data);

        //traverse right subtree
        if(root.right) this.inorderTraversal(root.right, arr);

        return 'Inorder Order: ' + arr;
    }

    preorderTraversal(root = this.root, arr = []) {
        //check if tree is empty
        if(root === null) return;

        //visit root node
        arr.push(root.data);

        //recursively traverse left subtree
        if(root.left) this.preorderTraversal(root.left, arr);
        
        //recursively traverse right subtree
        if(root.right) this.preorderTraversal(root.right, arr);

        return 'Preorder Order: ' + arr;
    }
    
    postorderTraversal(root = this.root, arr = []) {
        //check if tree is empty
        if(root === null) return
        
        //recursively traverse left subtree
        if(root.left) this.postorderTraversal(root.left, arr);

        //recursively traverse right subtree
        if(root.right) this.postorderTraversal(root.right, arr);
        
        //visit root node
        arr.push(root.data);

        return 'Postorder Order: ' + arr;
    }
    
    findHeight(root = this.root) {
        //check if the tree is empty
        //if so the height of the tree is 0 
        if(root === null) return 0;
        
        //recursively check the height of the subtrees and store it
        const leftSubtree = this.findHeight(root.left);
        const rightSubtree = this.findHeight(root.right);
        
        //return the max height between the two subtrees
        //and add +1 to account for the current node
        return Math.max(leftSubtree, rightSubtree) +1;
    }

    findDepth(value, root = this.root, depth = 0) {
        //check if the tree is empty 
        //or the given value is null
        if(root === null || value === null) return;

        //check if the current node is equal to the given value
        //and return its depth
        if(root.data === value) return `Value is ${depth} depths away from the root.`;
        
        //else recursively check left and right subtree
        if(value < root.data) {
            return this.findDepth(value, root.left, depth +=1);
        } else {
            return this.findDepth(value, root.right, depth += 1);
        }     
    }

    isBalanced(root = this.root) {
        //check if the tree is empty
        if(root === null) return;

        //call the findHeight function to check 
        //left and right subtrees height
        const left = this.findHeight(root.left);
        const right = this.findHeight(root.right);

        let difference = Math.abs(left - right);
        
        return difference < 2 ? 'The tree is balanced' : 'The tree is not balanced';
    }

    rebalance(root = this.root) {
        //traverse the tree and create a new array with the same elements
        const arr = this.levelOrder([], [], root)

        //sort the new array
        const newArr = this.sortAndRemove(arr)
        
        //update root reference
        return this.root = this.buildTree(newArr)
    }
    
    prettyPrint(node = this.root, prefix = "", isLeft = true) {

        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}


//testing method
let tree = new Tree([10, 20, 30, 40, 50]);

tree.insert(45)
tree.insert(25)
tree.insert(5)
tree.insert(60)
tree.insert(55)
tree.insert(65)
tree.insert(58)
tree.insert(59)
tree.remove()
console.log(tree.find(20))
console.log(tree.levelOrder())
console.log(tree.inorderTraversal());
console.log(tree.preorderTraversal());
console.log(tree.postorderTraversal());
console.log(tree.findHeight())
console.log(tree.findDepth(40));
console.log(tree.isBalanced());
console.log(tree.rebalance())

tree.prettyPrint()