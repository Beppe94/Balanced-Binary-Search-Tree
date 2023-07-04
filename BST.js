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
    
    removeNode(root, value) {
        //if the tree is empty 
        if(root === null) return root;

        if(value === root.data) {
            if(root.left === null && root.right === null) {
                return null;
            } else if(root.left === null) {
                return root.right;
            } else if(root.right === null) {
                return root.left;
            } else {
                let tempNode = this.smallestNode(root.right);
                root.data = tempNode.data;

                root.right = this.removeNode(root.right, tempNode.data);
                return root;
            }
        } else if(value < root.data) {
            root.left = this.removeNode(root.left, value);
            return root;
        } else {
            root.rigt = this.removeNode(root.right, value);
            return root;
        }
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
tree.remove(50)
tree.prettyPrint()