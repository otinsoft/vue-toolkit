export default (to = '/') => ({ store, route, redirect }) => {
  const user = store.getters['auth/user']
  const [role] = route.meta.map(meta => meta.role).filter(role => role)

  if (role && user.role !== role) {
    return redirect(to)
  }
}
