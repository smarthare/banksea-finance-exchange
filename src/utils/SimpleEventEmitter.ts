type VoidFunction = (..._args: any[]) => void

type AsyncVoidFunction = () => Promise<void>

class SimpleEventEmitter<EventType extends string> {
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
      throw new Error('Task is undefined!')
    }

    const errorHandler = (e: any) => {
      const errorListener = this._listeners.get('error')
      if (errorListener) {
        errorListener(e)
      } else {
        throw e
      }
    }

    try {
      task().catch(errorHandler)
    } catch (e) {
      errorHandler(e)
    }
  }

}

export default SimpleEventEmitter
