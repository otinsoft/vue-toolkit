export default (to = '/') => ({ store, redirect }) => {
  if (!store.getters['auth/check']) {
    return redirect(to)
  }
}
