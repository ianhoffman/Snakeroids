export const randDirection = () => (
    Math.random() < .5 ? -1 : 1
);

export const randEdge = () => {
    const x = Math.random() < .5 ? 0 : 1;
    const y = Math.random() < .5 ? 0 : 1;
    return {x: x, y: y};
};

export const randAngle = () => {
    return (Math.random() * Math.PI);
};
