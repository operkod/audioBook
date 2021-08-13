/*eslint-disable */
import { InferActionsTypes } from "redux/reducer";
import { CommentsType } from "types";

export type ActionsTypes = InferActionsTypes<typeof Actions>;

export const Actions = {
  isShowComments: (payload: boolean) => ({
    type: 'COMMENTS@IS_SHOW',
    payload
  } as const),
  setComments: (payload: Array<CommentsType>) => ({
    type: 'COMMENTS@SET_ITEM',
    payload
  } as const),
  setCommentId: (payload: string) => ({
    type: 'COMMENTS@SET_ID',
    payload
  } as const),
  addComment: (payload: CommentsType) => ({
    type: 'COMMENTS@ADD_ITEM',
    payload
  } as const),
  isLoader: (payload: boolean) => ({
    type: 'COMMENTS@IS_LOADER',
    payload
  } as const),
  fetchComments: (payload: string) => ({
    type: "COMMENT@REQUEST_ITEM",
    payload
  } as const),
  fetchAddComment: (payload: string) => ({
    type: "COMMENT@REQUEST_ADD_ITEM",
    payload
  } as const)
}
