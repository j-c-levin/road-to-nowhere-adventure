const desciption = 'You approach a ford, ';

module.exports = (thisNode) => {
    if (thisNode.data.waterLevel > 0) {
        return {
            message: desciption + 'water is too high, you can go no further',
            avaiblePaths: [0.0]
        };
    }
    return {
        message: desciption + 'the water is low enough to cross',
        avaiblePaths: [1.0]
    };
};
