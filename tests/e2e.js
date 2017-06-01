const ID3 = require('../decision-trees');

const expect = require('chai').expect;

describe('should create tree', function() {

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

    it('should create tree', function() {

        let tree = ID3.createTree(examples, 'play', example => example.play);

        examples.forEach(example => {
            let label = tree.classify(example);
            expect(label).to.be.equal(example.play);
        });
    });

});