import { createConstants } from '../utils';

//action
export const actionTypesApp = createConstants(
  'GET_NAVIGATOR',
  'SET_VISIBILITY_FILTER',
  'GET_CONTACT',
  'GET_CURRENT_CITY_INDEX'
);


//常量
export const VisibilityFilters = {
  "CONTACT_US" :  "CONTACT_US",
  "MEDIA_REPORT" : "MEDIA_REPORT",
  "NOTICE" : "NOTICE"
}

//action创建函数

export function get_navigator(navigator){
  return {
    type:actionTypesApp.GET_NAVIGATOR,
    value:navigator
  }
}

export function get_contact(contact){
  return {
    type:actionTypesApp.GET_CONTACT,
    value:contact
  }
}

export function set_visibility_filter(filter){
  return {
    type:actionTypesApp.SET_VISIBILITY_FILTER,
    filter:filter
  }
}

export function get_current_city(id){
  return {
    type:actionTypesApp.GET_CURRENT_CITY_INDEX,
    value:id
  }
}
