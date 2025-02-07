import { API } from 'homebridge'
import path from 'node:path'

import fsExtra from 'fs-extra'

import { OnDisk } from './accessory'

class Storage {
  accessories: Record<string, OnDisk> = {}

  readonly #filePath: string

  constructor(api: API) {
    this.#filePath = path.join(api.user.cachedAccessoryPath(), 'vieramatic.json')
    const data = fsExtra.readJsonSync(this.#filePath, { throws: false })

    this.accessories = data ?? {}
  }

  get = (id: string): OnDisk => {
    this.accessories[id] ??= {}
    return this.accessories[id]
  }

  save = (): void => fsExtra.outputJsonSync(this.#filePath, this.accessories)
}

export default Storage
