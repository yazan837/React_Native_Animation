import {
  SET_LANGUAGE,
  SET_CATEGORY,
  UPDATE_SURVEY_RESULT,
  RESET_SURVEY_RESULT,
} from './types';

export const setLanguage = value => ({
  type: SET_LANGUAGE,
  lang: value,
});

export const setCategory = value => ({
  type: SET_CATEGORY,
  category: value,
});

export const updateSurveyResult = value => ({
  type: UPDATE_SURVEY_RESULT,
  text: value,
});

export const resetSurveyResult = () => ({
  type: RESET_SURVEY_RESULT,
});
