# decision-trees
Create decision trees and use them to predict new cases.

Currently implemented [ID3 algorithm](https://en.wikipedia.org/wiki/ID3_algorithm) only.
Based on [lectures](https://www.youtube.com/watch?v=eKD5gxPPeY0&list=PLBv09BD7ez_4temBw7vLA19p3tdQH6FYO) of Victor Lavrenko

## Usage
```javascript
const ID3 = require('decision-trees');

const examples = [
    {outlook: 'sunny', humidity: 'high', wind: 'weak', play: false},
    {outlook: 'sunny', humidity: 'high', wind: 'strong', play: false},
    {outlook: 'overcast', humidity: 'high', wind: 'weak', play: true},
    {outlook: 'rain', humidity: 'high', wind: 'weak', play: true},
    {outlook: 'rain', humidity: 'normal', wind: 'weak', play: true},
    {outlook: 'rain', humidity: 'normal', wind: 'strong', play: false},
    {outlook: 'overcast', humidity: 'normal', wind: 'strong', play: true},
    {outlook: 'sunny', humidity: 'high', wind: 'weak', play: false},
    {outlook: 'sunny', humidity: 'normal', wind: 'weak', play: true},
    {outlook: 'rain', humidity: 'normal', wind: 'weak', play: true},
    {outlook: 'sunny', humidity: 'normal', wind: 'strong', play: true},
    {outlook: 'overcast', humidity: 'high', wind: 'strong', play: true},
    {outlook: 'overcast', humidity: 'normal', wind: 'weak', play: true},
    {outlook: 'rain', humidity: 'high', wind: 'strong', play: false},
];

let tree = ID3.createTree(examples, 'play', example => example.play);
let label = tree.classify({outlook: 'sunny', humidity: 'high', wind: 'weak'});
```

## API
### `ID3.createTree(dataset, targetAttribute, predicate) => Tree`     
Returns a Tree object created from the training dataset.
 -  `dataset` - object array. The training dataset for creating the tree.
 -  `targetAttribute` - string. The attribute of each item in the dataset which defines the class this test case belongs to.
 -  `predicate` - function (optional). Must be of the form `example => boolean`. If supplied, will be used to determine the class each case belongs to. This is helpful if the target attribute is continuous. If ommited, the default predicate will be used `example => example[targetAttribute]`.
 
 ### `Tree.classify(case) => boolean`     
Returns a boolean indicating the label of the case according to the target attribute used when creating the tree.
 -  `case` - object. Must be similar to the objects used when creating the tree.
