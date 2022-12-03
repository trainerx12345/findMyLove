import { ConversationActionTypes } from '../ActionTypes'
const initialState = {}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {

    case ConversationActionTypes.CREATE_CONVO:
      return { ...state, ...payload }
    case ConversationActionTypes.UPDATE_CONVO:
      return { ...state, ...payload }
    case ConversationActionTypes.DELETE_CONVO:
      return { ...state, ...payload }
    default:
      return state
  }
}
