
class EmployeeApi {

  static getPage(pageNum, callback) {
    var url = 'api/employee/getpage/';
    url += pageNum ? pageNum : '';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // replacing UTC date string with an actual date object
        data.employees = data.employees.map(emp => EmployeeApi.prepareEmployee(emp));
        callback(data);
      });
  }

  static getById(id, callback) {
    fetch('api/employee/getbyid/' + id)
      .then(responce => responce.json())
      .then(employee => {
        // replacing UTC date string with an actual date object
        EmployeeApi.prepareEmployee(employee);
        callback(employee);
      });
  }

  static addOrUpdate(employeeData, callback) {

    const id = employeeData.get("id");
    const name = employeeData.get("name");
    const email = employeeData.get("email");
    const salary = Number(employeeData.get("salary"));
    const birth = employeeData.get("birth");

    if (name && email.includes('@') && salary && birth) {
      
      if (id) {
        fetch('api/employee/update', {
          method: 'PUT',
          body: employeeData,
        })
          .then(data => {
            callback(data);
          });
      }
      else {
        fetch('api/employee/add', {
          method: 'POST',
          body: employeeData,
        })
          .then(data => {
            callback(data);
          });
      }
    }
  }

  static delete(id, callback) {
    fetch('api/employee/delete/' + id, {
      method: 'DELETE'
    })
      .then(responce => {
        callback(responce);
      });
  }

  static prepareEmployee(employee) {
    employee.birth = new Date(employee.birth);
    return employee;
  }
}

export default EmployeeApi;