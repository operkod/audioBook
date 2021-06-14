import { all } from '@redux-saga/core/effects'
import { sagaWatcherBook } from './books'
import { sagaWatcherComment } from './comments'
import { watcherUser } from './user'

export function* rootWatcher() {
  yield all([sagaWatcherBook(), sagaWatcherComment(), watcherUser()])
}