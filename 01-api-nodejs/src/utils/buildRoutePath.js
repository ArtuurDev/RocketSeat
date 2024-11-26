export function buildRoutePath(path) {

    const routeaParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeaParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
  

    return pathRegex


}