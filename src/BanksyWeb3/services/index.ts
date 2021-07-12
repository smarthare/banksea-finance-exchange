import { NFTCreateForm } from '../../pages/Home/NFTCreate'
import { EventEmitter } from 'events'

export type VoidFunction = (..._args: any[]) => void

export type AsyncVoidFunction = () => Promise<void>

export class SimpleEventEmitter<EventType extends string> extends EventEmitter {

  _task?: AsyncVoidFunction

  _listeners = new Map<EventType | 'error', VoidFunction>()

  on(event: EventType, listener: VoidFunction): this {
    this._listeners.set(event, listener)

    return this
  }

  emit(event: EventType, ...args: any[]): boolean {
    const listener = this._listeners.get(event)

    if (!listener) {
      return false
    }

    listener(...args)

    return true
  }

  set task(task: AsyncVoidFunction) {
    this._task = task
  }

  exec() {
    const task = this._task
    if (!task) {
      throw new Error('Task is empty')
    }

    task().catch(e => {
      const errorListener = this._listeners.get('error')
      if (errorListener) {
        errorListener(e)
      } else {
        throw e
      }
    })
  }

}

export type CreateNftEvents =
  'pinning_json'
  | 'json_pinned'
  | 'json_pinned_failed'
  | 'loading'
  | 'complete'
  | 'submitted'
  | 'wallet_error'

class NoImplementError extends Error {

  constructor() {
    super('Not implement yet.')
  }
}

export interface BanksyWeb3Services {

  createNft: (_nftCreateForm: NFTCreateForm, _account: string) => SimpleEventEmitter<CreateNftEvents>
}

class BanksyWeb3ServicesEmptyImpl implements BanksyWeb3Services {
  createNft(_nftCreateForm: NFTCreateForm, _account: string): SimpleEventEmitter<CreateNftEvents> {
    throw new NoImplementError()
  }
}

export { BanksyWeb3ServicesEmptyImpl }
