var addEmployee = function (employee) {
  return {
    type: "ADD_EMPLOYEE",
    employee: employee
  }
};
var editEmployee = function (employee,id) {
  return {
    type: "EDIT_EMPLOYEE",
    employee: employee,
    id: id
  }
};
var deleteEmployee = function(id) {
  return {
    type: "DELETE_EMPLOYEE",
    id: id
  }
};


export {addEmployee,deleteEmployee,editEmployee};
