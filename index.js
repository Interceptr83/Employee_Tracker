////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//                                              Includes                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//                                           PROMPT MENU                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function createMenu() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Departments",
            value: "VIEW_ALL_DEPARTMENTS"
          },
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "View All Roles",
            value: "VIEW_ALL_ROLES"
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ]).then(res => {
      let choice = res.choice;
      switch (choice) {
        case "VIEW_ALL_DEPARTMENTS":
            viewDepartments();
            break;
        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;
          case "VIEW_ROLES":
          viewRoles();
          break;
          case "ADD_DEPARTMENT":
          addDepartment();
          break;
        case "ADD_EMPLOYEE":
          addEmployee();
          break;
          case "ADD_ROLE":
          addRole();
          break;
        case "UPDATE_EMPLOYEE_ROLE":
          updateEmployeeRole();
          break;
        default:
          quit();
      }
    }
    )
  }




function menu() {
console.log("Welcome to the Employee Manager App");
createMenu();
}

menu();

