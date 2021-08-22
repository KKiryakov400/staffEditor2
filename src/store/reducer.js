import {byField} from '../config/functions';

var reducer = function (state={}, action) {
  switch (action.type) {
    case "ADD_DATA":
    {
      state=action.state
      return state;
    }

    case 'ADD_EMPLOYEE':
    {
      state.staff.push(action.employee)
      return state;
    }
    case 'EDIT_EMPLOYEE':
    {
      let index=state.staff.findIndex(item => item.id == action.id);
      state.staff.splice(index, 1);
      state.staff.push(action.employee);
      state.staff.sort(byField("id"));
      return state;
    }
    case 'DELETE_EMPLOYEE':
    {

      let index=state.staff.findIndex(item => item.id == action.id);
      state.staff.splice(index, 1);
      return state;
    }

    default:
      return state
  }
}

export {reducer,byField};
