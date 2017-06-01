class ID3 {

    static createTree(dataset, targetAttribute, predicate) {
        let predictingAttributes = Object.keys(dataset[0]).filter(a => a !== targetAttribute);

        let tree = new Tree(dataset);

        tree.root = this.grow(tree.root, predictingAttributes, predicate);

        return tree;
    }

    static grow(node, predictingAttributes, predicate) {
        let dataset = node.dataset;
        
        if (this.isPure(dataset, predicate)) {
            node.label = predicate(dataset[0]);
            return node;
        }

        if (predictingAttributes.length === 0) {
            node.label = this.getCommonValue(dataset, predicate);
            return node;
        }
        predictingAttributes = predictingAttributes.filter(attribute => attribute !== node.splitAttribute);
        node = this.getBestSplit(dataset, predictingAttributes, predicate);
        for (let nodeKey in node.nodes) {
            node.nodes[nodeKey] = this.grow(node.nodes[nodeKey], predictingAttributes, predicate);
        }

        return node;
    }

    static getBestSplit(dataset, attributes, predicate) {
        let splits = attributes.map(attribute => {
            return {
                splitAttribute: attribute,
                nodes: this.split(dataset, attribute)
            }
        });

        let setEntropy = this.entropy(dataset, predicate);
        let setSize = dataset.length;

        let bestSplit = null;
        splits.forEach(split => {
            split.informationGain = this.informationGain(split.nodes, setEntropy, setSize, predicate);

            if (split.informationGain > (bestSplit ? bestSplit.informationGain : 0)) {
                bestSplit = split;
            }
        });

        return bestSplit;
    }

    static informationGain(nodes, setEntropy, setSize, predicate) {
        let subsetsEntropySum = 0;
        for (let key in nodes) {
            let subset = nodes[key].dataset;
            let subsetEntropy = this.entropy(subset, predicate);
            subsetsEntropySum += ((subset.length / setSize) * subsetEntropy);
        }

        return setEntropy - subsetsEntropySum;
    }

    static entropy(subset, predicate) {
        let p = subset.filter(predicate).length / subset.length;

        if (p === 1 || p === 0) {
            return 0;
        }

        return -p * Math.log2(p) - (1 - p) * Math.log2(1 - p);
    }

    static split(dataset, splitAttribute) {
        let map = {};

        dataset.forEach(example => {
            let exampleAttributeValue = example[splitAttribute];

            if (!map[exampleAttributeValue]) {
                map[exampleAttributeValue] = { dataset: [] };
            }

            map[exampleAttributeValue].dataset.push(example);
        });

        return map;
    }

    static isPure(subset, predicate) {
        let prevValue = null;

        for (let example of subset) {
            let exampleValue = predicate(example);

            if (prevValue !== null && prevValue !== exampleValue) {
                return false;
            }

            prevValue = exampleValue;
        }

        return true;
    }

    static getCommonValue(dataset, predicate) {
        let positiveCount = dataset.filter(predicate).length;
        let negativeCount = dataset.length - positiveCount;

        return positiveCount >= negativeCount;
    }

}

class Tree {

    constructor(dataset) {
        this.root = {
            dataset: dataset
        };
    }

    classify(kase, node) {
        node = node || this.root;
        if (!node.nodes) {
            return node.label;
        }

        let splitAttributeValue = kase[node.splitAttribute];
        return this.classify(kase, node.nodes[splitAttributeValue]);
    }

    toString(node) {
        node = node || this.root;
    }

}

module.exports = ID3;