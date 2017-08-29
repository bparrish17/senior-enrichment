import { combineReducers } from 'redux'
import axios from 'axios';

//INITIAL STATE
const initialState = {
  students: [],
  campuses: [],
  newStudent: '',
  newStudentCampus: ''
}


//ACTION TYPES
export const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS';
export const GOT_NEW_STUDENT = 'GOT_NEW_STUDENT';
export const WRITE_STUDENT = 'WRITE_STUDENT';
export const CREATE_STUDENT = 'CREATE_STUDENT';
export const EDIT_STUDENT_INFO = 'EDIT_STUDENT_INFO';
export const DELETE_STUDENT = 'DELETE_STUDENT'

export const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES';
export const GOT_NEW_CAMPUS = 'GOT_NEW_CAMPUS';
export const WRITE_CAMPUS = 'WRITE_CAMPUS';
export const CREATE_CAMPUS = 'CREATE_CAMPUS';
export const EDIT_CAMPUS_INFO = 'EDIT_CAMPUS_INFO';
export const DELETE_CAMPUS = 'DELETE_CAMPUS';

//ACTION CREATORS
//STUDENTS
export const getAllStudents = (students) => {
  return {
    type: GET_ALL_STUDENTS,
    students
  }
}
export const gotNewStudentFromServer = (student) => {
  return {
    type: GOT_NEW_STUDENT,
    student
  }
}
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
export const writeStudent = (newStudent) => {
  return {
    type: WRITE_STUDENT,
    newStudent
  }
}

//CAMPUSES
export const getAllCampuses = (campuses) => {
  return {
    type: GET_ALL_CAMPUSES,
    campuses
  }
}
export const gotNewCampusFromServer = (campus) => {
  return {
    type: GOT_NEW_CAMPUS,
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
export const writeCampus = (newStudentCampus) => {
  return {
    type: WRITE_CAMPUS,
    newStudentCampus
  }
}

//THUNKS

export function fetchStudents () {
  return function thunk(dispatch) {
    return axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      dispatch(getAllStudents(students));
    })
  }
}

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      dispatch(getAllCampuses(campuses))
    })
  }
}

export function addStudent(name, campusId) {
  return function thunk(dispatch) {
    return axios.post('/api/students', {name, campusId})
    .then(res => res.data)
    .then(student => {
      dispatch(gotNewStudentFromServer(student))
    })
  }
}

export function addCampus(name, imgUrl) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', {name, imgUrl})
    .then(res => res.data)
    .then(student => {
      dispatch(gotNewCampusFromServer(student))
    })
  }
}


const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_ALL_STUDENTS:
      return Object.assign({}, state, {students: action.students})
    case GOT_NEW_STUDENT:
      return Object.assign({}, state, {students: state.students.concat(action.student)})
    case CREATE_STUDENT:
    case WRITE_STUDENT:
      return Object.assign({}, state, {newStudent: action.newStudent});
    case EDIT_STUDENT_INFO:
    case DELETE_STUDENT:

    case GET_ALL_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses})
    case GOT_NEW_CAMPUS:
    case CREATE_CAMPUS:
    case WRITE_CAMPUS:
      return Object.assign({}, state, {newStudentCampus: action.newStudentCampus});
    case EDIT_CAMPUS_INFO:
  
    case DELETE_CAMPUS:
    default: return state
  }
};

export default rootReducer
