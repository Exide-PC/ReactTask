import React, { PureComponent } from 'react';

class EmployeeApi extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getEmployees(pageNum, callback) {
        var url = 'api/Employee/GetList/';
        url += pageNum ? pageNum : '';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                callback(data);
            });
    }
}

export default EmployeeApi;