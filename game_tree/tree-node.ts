class TreeNode {
    move: string;
    positionFEN: string;
    private previous: TreeNode;

    constructor(move: string, positionFEN: string) {
        this.move = move;
        this.positionFEN = positionFEN;
        this.previous = undefined;
    }

    addPrevious = (previous: TreeNode) => {
        this.previous = previous;
    }

    toString = () => {
        return this.move;
    }

    getAncestors = () => {
        let ancestors: TreeNode[] = [this];
        for (let prev = this.previous; prev != undefined; prev = prev.previous) {
            ancestors.push(prev);
        }
        return ancestors;
    }
}

export default TreeNode;