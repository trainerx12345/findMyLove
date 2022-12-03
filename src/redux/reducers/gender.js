import { GenderActionTypes } from '../ActionTypes'
import {
createGender,
updateGender,
fetchGender,
deleteGender
} from '../utils/gender';

const initialState = {
  gender:[]
}


export default function reducer(state = initialState, { type, payload }) {
  switch (type) {

    case GenderActionTypes.CREATE_GENDER:
      return { ...state, 
            gender: createGender(state.gender, payload)
          }
    case GenderActionTypes.UPDATE_GENDER:
      return { ...state, 
        gender: updateGender(state.gender, payload)
      }
    case GenderActionTypes.DELETE_GENDER:
      return { ...state, 
        gender: deleteGender(state.gender, payload)
      }
      default:
      return state
  }
}
