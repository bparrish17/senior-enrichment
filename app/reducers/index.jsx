import { combineReducers } from 'redux'

//INITIAL STATE
const initialState = {}


//ACTION TYPES
export const CREATE_STUDENT = 'CREATE_STUDENT';
export const EDIT_STUDENT_INFO = 'EDIT_STUDENT_INFO';
export const DELETE_STUDENT = 'DELETE_STUDENT'

export const CREATE_CAMPUS = 'CREATE_CAMPUS';
export const EDIT_CAMPUS_INFO = 'EDIT_CAMPUS_INFO';
export const DELETE_CAMPUS = 'DELETE_CAMPUS';

//ACTION CREATORS
export const createStudent = (student) => {
  return {
      type: CREATE_STUDENT,
      student
  }
}

export const editStudent = (student) => {
  return {
      type: EDIT_STUDENT_INFO,
      student
  }
}

export const deleteStudent = (student) => {
  return {
      type: DELETE_STUDENT,
      student
  }
}

export const createCampus = (campus) => {
    return {
        type: CREATE_CAMPUS,
        campus
    }
}

export const editCampus = (campus) => {
  return {
      type: EDIT_CAMPUS_INFO,
      campus
  }
}

export const deleteCampus = (campus) => {
  return {
      type: DELETE_CAMPUS,
      campus
  }
}

export function fetchStudents () {
  return function thunk(dispatch) {
    return axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      //const action = getAllStudents???
    })
  }
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case CREATE_STUDENT:
    case EDIT_STUDENT_INFO:
    case DELETE_STUDENT:

    case CREATE_CAMPUS:
    case EDIT_CAMPUS_INFO:
    case DELETE_CAMPUS:
    default: return state
  }
};

export default rootReducer
