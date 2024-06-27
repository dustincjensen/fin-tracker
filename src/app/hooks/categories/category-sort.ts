export const categorySort = (c1: { name: string }, c2: { name: string }) => {
    const c1Name = c1.name.toLowerCase();
    const c2Name = c2.name.toLowerCase();
    return c1Name < c2Name ? -1 : c1Name > c2Name ? 1 : 0;
};
