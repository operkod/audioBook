import { all } from '@redux-saga/core/effects'
import { sagaWatcherBook } from './books'
import { sagaWatcherComment } from './comments'

export function* rootWatcher() {
  yield all([sagaWatcherBook(), sagaWatcherComment()])
}