import { all } from "redux-saga/effects"
import { sagaWatcherBook } from "./action/books"
import { sagaWatcherComment } from "./action/comments"

export function* rootWatcher() {
  yield all([sagaWatcherBook(), sagaWatcherComment()])
}