import React, { Component } from 'react'
import Table from '../StudentFormTable/Table'
import Swal from 'sweetalert2'


export default class Form extends Component {
    state = {
        studentForm: {
            studentID: '',
            fullName: '',
            phoneNumber: '',
            email: '',
        },
        error: {
            studentID: '',
            fullName: '',
            phoneNumber: '',
            email: '',
        },
        valid: false,
        arrStudent: [
            {
                studentID: '518H01', fullName: 'Minh Thu', phoneNumber: '0798990797', email: 'minhthu@gmail.com'
            },
            {
                studentID: '518H02', fullName: 'admin', phoneNumber: '0798990797', email: 'admin@gmail.com'

            }
        ],
        search: '',

    }


    handleUpdateStudent = () => {
        const { arrStudent, studentForm } = this.state;

        // Find student id and show it into form
        let studentUpdate = arrStudent.find(student => student.studentID === studentForm.studentID);

        if (studentUpdate) {
            
            // Check user update student ID or not
            for (let key in studentUpdate) {
                if (key !== 'studentID') {
                    studentUpdate[key] = studentForm[key];
                }
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Update successfully',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({
                arrStudent: arrStudent
            })
            this.setState({
                studentForm: {
                    studentID: '',
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                },
            })

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Cannot update student ID',
                showConfirmButton: false,
                timer: 1500
            })
        }


    }
    
   
    checkFormValid = () => {
        const { studentForm, error } = this.state
        for (let key in error) {
            // have only one error and only one value in student form is empty => return false
            if (error[key] || !studentForm[key]) {
                return false
            }
        }
        return true

    }

    handleEditStudent = (student) => {
        this.setState({
            studentForm: student
        }, () => {
            this.setState({
                valid: this.checkFormValid()
            })
        })

    }

    handleDelStudent = (studentId) => {
        const studentList = this.state.arrStudent.filter(student => student.studentID !== studentId);

        this.setState({
            arrStudent: studentList
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Delete successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target

        const dataType = e.target.getAttribute('data-type');
        const dataMaxLength = e.target.getAttribute('data-max-length')

        const newForm = this.state.studentForm

        const newError = this.state.error
        let msg = ''

        // Check validation 
        if (!value.trim()) {
            msg = name + ' cannot be empty!!'
        } else {
            if (dataMaxLength !== null && value.length > dataMaxLength) {
                msg = name + ` no more than  ${dataMaxLength} character !`;
            }
            if (dataType == 'phone') {
                // the phone number can start with 03, 05, 07, 08 or 09
                // and have 8 number after that
                // Example: 0901234129 => true, 003123123 => false
                const regExNumber = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
                if (!regExNumber.test(value)) {
                    msg = name + ' is invalid!';
                }
            }
            if (dataType == 'email') {
                const regexEmail = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
                if (!regexEmail.test(value)) {
                    msg = name + ' is invalid!';
                }
            }
            if (dataType == 'string') {
                const regExString = /^[a-z A-Z]*$/
                if (!regExString.test(value)) {
                    msg = name + ' is invalid!';
                }
            }
        }

        this.setState({
            studentForm: { ...newForm, [name]: value },
            error: { ...newError, [name]: msg }
        }, () => {
            this.setState({
                valid: this.checkFormValid()
            })
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()

        if (!this.checkFormValid()) {
            Swal.fire({
                position: 'top-end',
                icon: 'fail',
                title: 'Form is invalid',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }

        //Thêm sinh vien vao arrStudent
        let newArrStudent = this.state.arrStudent;
        let newStudent = { ...this.state.studentForm };
        const checkStudentId = newArrStudent.find(student => student.studentID == newStudent.studentID)

        if (checkStudentId) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Student ID already exist',
                showConfirmButton: false,
                timer: 1500
            })
            return
        } else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Create successfully',
                showConfirmButton: false,
                timer: 1500
            })

            newArrStudent.push(newStudent);

            this.setState({
                arrStudent: newArrStudent
            })
            this.setState({
                studentForm: {
                    studentID: '',
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                },
            })

        }
    }

    search = (data) => {

        return data?.filter((item) => item.fullName.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase()))
    }

    render() {
        const { studentForm, error } = this.state
        return (
            <>
                <div className="container-fluid px-1 py-5 mx-auto">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                            <h3>Student Form</h3>
                            <div className="card">
                                <form className="form-card" onSubmit={(e) => { this.handleSubmit(e) }}>
                                    <div className="row justify-content-between text-left mb-4">
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3">
                                                Student ID
                                                <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="studentID"
                                                name="studentID"
                                                value={studentForm.studentID}
                                                placeholder="Enter your student Id"
                                                data-max-length="6"
                                                onChange={(e) => { this.handleChange(e) }}
                                            />
                                            {error.studentID && <div className='text-danger warning mt-2'>{error.studentID}</div>}

                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3">Full Name
                                                <span className="text-danger"> *</span></label>
                                            <input type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={studentForm.fullName}
                                                onChange={(e) => { this.handleChange(e) }}
                                                placeholder="Enter your full name"
                                                data-type="string" />
                                            {error.fullName && <div className='text-danger warning mt-2'>{error.fullName}</div>}

                                        </div>
                                    </div>
                                    <div className="row justify-content-between text-left mb-4">
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3">Phone Number
                                                <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                data-type="phone"
                                                value={studentForm.phoneNumber}
                                                onChange={(e) => { this.handleChange(e) }}
                                            />
                                            {error.phoneNumber && <div className='text-danger warning mt-2'>{error.phoneNumber}</div>}

                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex">
                                            <label className="form-control-label px-3">Email
                                                <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                data-type="email"
                                                value={studentForm.email}
                                                onChange={(e) => { this.handleChange(e) }}
                                            />
                                            {error.email && <div className='text-danger warning mt-2'>{error.email}</div>}

                                        </div>
                                    </div>
                                    <div className="row justify-content-end">
                                        <div className="form-group col-sm-7">
                                            <button type="submit" disabled={!this.state.valid} className="btn btn-success me-4">
                                                Add student
                                            </button>
                                            <button type="button" onClick={() => { this.handleUpdateStudent() }} disabled={!this.state.valid} className="btn btn-warning">
                                                Update student
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mb-5'>
                    <div className="input-group " style={{ width: '50%', margin: 'auto' }}>
                        <input onChange={(e) => {
                            this.setState({
                                search: e.target.value
                            })
                        }} type="search" className="form-control rounded" placeholder="Search by name..." aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary">search</button>
                    </div>
                </div>


                <Table student={this.search(this.state.arrStudent)} handleDelStudent={this.handleDelStudent} handleEditStudent={this.handleEditStudent} />
            </>
        )
    }
}
