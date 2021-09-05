import { StateType } from 'reducers';

const getAudioId = (state: StateType) => state.audio.id;
const getPlay = (state: StateType) => state.audio.isPlay;
const getAudioSrc = (state: StateType) => state.audio.item;

export { getAudioId, getPlay, getAudioSrc };
