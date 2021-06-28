import { InferActionsTypes } from "redux/reducer"


export type ActionsTypes = InferActionsTypes<typeof Actions>

export const Actions = {
  setAudio: (payload: string) => ({
    type: 'AUDIO@SET_ITEM',
    payload
  } as const),
  setAudioBookId: (payload: string) => ({
    type: 'AUDIO@SET_ID',
    payload
  } as const),
  isPlay: (payload: boolean) => ({
    type: 'AUDIO@IS_PLAY',
    payload
  } as const),
}
// export const fetchAudio = (audioId: string) => (dispatch: Dispatch<ActionsTypes>) => {
  // audioApi.getAudio(audioId).then(({ data }) => {
  //   dispatch(Actions.setAudio(data.audio))
  //   dispatch(Actions.setAudioLoader(false))
  // })
// }
