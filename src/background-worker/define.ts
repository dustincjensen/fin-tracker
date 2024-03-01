/* eslint-disable */
const modules = new Map<string, any>();
modules.set('require', function (nameOfDependency: string) {
    return modules.get(nameOfDependency);
});
modules.set('exports', null);

function define(nameOfDependency: string, dependencies: string[], factory: Function) {
    const dependencyLookups = dependencies.map(name => modules.get(name));
    const exports = {};
    const exportIndex = dependencies.indexOf('exports');
    dependencyLookups[exportIndex] = exports;
    factory.apply(null, dependencyLookups);
    modules.set(nameOfDependency, exports);
}
