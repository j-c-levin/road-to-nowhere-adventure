const desciption = 'You approach a damn, ';

module.exports = (thisNode) => {
    // do you open?
    getConnctedDataNode(0).data.waterLevel = 10;

    return {
        message: desciption + 'which has a clear crossing',
        avaiblePaths: [2.0]
    };
};
