import Auth from "./Auth";

class EmployeeApi {

  static getHeader() {
    return {
      Authorization: "Bearer " + Auth.getToken()
    };
  }

  static getPage(pageNum, callback) {
    var url = 'api/employee/getpage/';
    url += pageNum ? pageNum : '';
    
    fetch(url, {
      method: "GET",
      headers: EmployeeApi.getHeader()
    })
      .then(response => {
        return response.status == 200 ? response.json() : undefined;
      })
      .then(data => {

        // replacing UTC date string with an actual date object if we've got valid json
        if (data)
          data.employees = data.employees.map(emp => EmployeeApi.prepareEmployee(emp));
        callback(data);
      });
  }

  static getById(id, callback) {
    fetch('api/employee/getbyid/' + id, {
      method: "GET",
      headers: EmployeeApi.getHeader()
    })
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
          headers: EmployeeApi.getHeader()
        })
          .then(data => {
            callback(data);
          });
      }
      else {
        fetch('api/employee/add', {
          method: 'POST',
          body: employeeData,
          headers: EmployeeApi.getHeader()
        })
          .then(data => {
            callback(data);
          });
      }
    }
  }

  static delete(id, callback) {
    fetch('api/employee/delete/' + id, {
      method: 'DELETE',
      headers: EmployeeApi.getHeader()
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