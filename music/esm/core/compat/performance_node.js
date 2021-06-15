const NS_PER_SEC = 1e9;
const time = global.process.hrtime();
export const now = () => {
    const diff = global.process.hrtime(time);
    return diff[0] + diff[1] / NS_PER_SEC;
};
export const timing = {
    navigationStart: Date.now(),
};
//# sourceMappingURL=performance_node.js.map