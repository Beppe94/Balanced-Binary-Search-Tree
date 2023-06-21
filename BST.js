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

    sortAndRemove(array) {
        //spread array elements in a new set
        //then compare each other to sort them
        const sorted = [...new Set(array)].sort((a,b) => a - b);

        return sorted;
    }

    buildTree() {}
}

//testing method
const arr = [3,4,2,5,7,2,1234,24,435,52,34,5,665,7]

let tree = new Tree(3,4,2,5,7,2,1234,24,435,52,34,5,665,7);

console.log(tree.sortAndRemove(arr))