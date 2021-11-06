import {combineReducers} from 'redux';

import {
  SET_LANGUAGE,
  SET_CATEGORY,
  UPDATE_SURVEY_RESULT,
  RESET_SURVEY_RESULT,
} from '../actions/types';

const language = (state = 'en', action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.lang;
    default:
      return state;
  }
};

const selectedCategory = (state = 1, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

const survey = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SURVEY_RESULT:
      return state + '\n' + action.text;
    case RESET_SURVEY_RESULT:
      return '';
    default:
      return state;
  }
};

export default combineReducers({language, selectedCategory, survey});
