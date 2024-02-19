import * as castleStores from '../store'

const utils = { castleStores }

export default (app) => {
  for (const i in utils) {
    app.provide(i, utils[i])
  }
}
