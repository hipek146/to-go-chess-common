import TreeNode from './tree-node';

class GameTree {
    tail: TreeNode = undefined;
    leaves: TreeNode[] = [];

    addMove = (move: string, positionFEN: string) => {
        let node = new TreeNode(move, positionFEN);
        if (this.tail === undefined) {
            this.tail = node;
        } else {
            // remove tail from leaves array (isn't necessarily last element in array)
            let index = this.leaves.indexOf(this.tail);
            if (index !== -1) {
                this.leaves.splice(index, 1);
            }

            this.leaves.push(node);
            node.addPrevious(this.tail);
            this.tail = node;
        }
        return node;
     }

    moveTail = (newTail: TreeNode) => {
        this.tail = newTail;
    }

    print = () => {
        let ancestors = this.tail.getAncestors();
        ancestors.forEach(el => {
            console.log(el.toString());
        });
    }
}

export default GameTree;
