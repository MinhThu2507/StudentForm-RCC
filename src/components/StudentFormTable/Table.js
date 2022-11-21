import React, { PureComponent, Component } from 'react'

export default class Table extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log("this props", this.props.student);
        console.log("new props", newProps.student);
        if (this.props.student !== newProps.student) {
            return true;
        }
        return false;
    }
    render() {
        const { student, handleEditStudent, handleDelStudent } = this.props
        console.log('hello')
        const renderTable = () => {
            return (
                student.map((std, index) => {
                    return (
                        <tr key={index}>
                            <td data-label="student-id">{std.studentID}</td>
                            <td data-label="full-name">{std.fullName}</td>
                            <td data-label="phone-number">{std.phoneNumber}</td>
                            <td data-label="email">{std.email}</td>
                            <td>
                                <button className='btn btn-danger me-3' onClick={() => { handleDelStudent(std.studentID) }}>Delete</button>
                                <button className='btn btn-success' onClick={() => { handleEditStudent(std) }}>Update</button>

                            </td>
                        </tr>
                    )
                })
            )
        }

        return (
            <div className="container">
                <h2>Student Infomation</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}
