export function goRoute(route) {
  window.location.hash = route;
}

export function getRoute() {
  try {
    const urlProducts = decodeURIComponent(window.location.hash.substring(1));
    return urlProducts;
  } catch (e) {
    return undefined;
  }
}
