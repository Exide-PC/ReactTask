import React, { PureComponent } from 'react';

class EmployeeApi extends PureComponent {
  constructor(props) {
      super(props);
  }

  static get(pageNum, callback) {
    var url = 'api/employee/getlist/';
    url += pageNum ? pageNum : '';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        callback(data);
      });
  }

  static add(employeeData, callback) {

    const name = employeeData.get("name");
    const email = employeeData.get("email");
    const salary = Number(employeeData.get("salary"));
    const birth = employeeData.get("birth");

    if (name && email.includes('@') && salary && birth) {
      fetch('api/employee/add', {
        method: 'POST',
        body: employeeData,
      })
        .then(data => {
          callback(data);
        });
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
}

export default EmployeeApi;