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
//                                           VIEW FUNCTIONS                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function viewDepartments() {
    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
}

function viewEmployees() {
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompts());
}

function viewRoles() {
    db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => loadMainPrompts());
  }
  

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//                                            ADD FUNCTIONS                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function addDepartment() {
    prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ])
      .then(res => {
        let name = res;
        db.createDepartment(name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => loadMainPrompts())
      })
  }

  function addEmployee() {
    prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
  
        db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
  
            prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleChoices
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.findAllEmployees()
                  .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
  
                    managerChoices.unshift({ name: "None", value: null });
  
                    prompt({
                      type: "list",
                      name: "managerId",
                      message: "Who is the employee's manager?",
                      choices: managerChoices
                    })
                      .then(res => {
                        let employee = {
                          manager_id: res.managerId,
                          role_id: roleId,
                          first_name: firstName,
                          last_name: lastName
                        }
  
                        db.createEmployee(employee);
                      })
                      .then(() => console.log(
                        `Added ${firstName} ${lastName} to the database`
                      ))
                      .then(() => loadMainPrompts())
                  })
              })
          })
      })
  }

  function addRole() {
    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
  
        prompt([
          {
            name: "title",
            message: "What is the name of the role?"
          },
          {
            name: "salary",
            message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
          }
        ])
          .then(role => {
            db.createRole(role)
              .then(() => console.log(`Added ${role.title} to the database`))
              .then(() => loadMainPrompts())
          })
      })
  }


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

