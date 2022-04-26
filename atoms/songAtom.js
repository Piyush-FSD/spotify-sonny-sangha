import { atom } from 'recoil'

export const currentTrackIdState = atom({
    // unique ID (with respect to other atom/selectors)
    key: "currentTrackIdState",
    // inital value
    default: null
})

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false
})