export const randDirection = () => (
    Math.random() < .5 ? -1 : 1
);

export const randEdge = () => {
    const x = Math.random() < .5 ? 0 : 1;
    const y = Math.random() < .5 ? 0 : 1;
    return {x: x, y: y};
};

export const randVector = () => {
    const x = randDirection() * Math.floor((Math.random() * 8));
    const y = randDirection() * Math.floor((Math.random() * 8));
    return {x: x, y: y};
};