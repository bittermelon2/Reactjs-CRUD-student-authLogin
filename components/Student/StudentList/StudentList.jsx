import React from 'react'
import Student from '../Student/Student'
import StudentForm from '../StudentForm/StudentForm'
import {useGetStudentsQuery} from '../../../store/api/studentApi'

export default function StudentList(props) {
    // console.log('props', props.stus)

  const {data:stus, isSuccess} = useGetStudentsQuery()

  //console.log(stus)
  return (
    <table border={1}>
        <caption>Student List</caption>
        <thead>
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Addr</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                isSuccess && stus.data && stus.data.map(stu=><Student key={stu.id} stu={stu}/>)
            }
        </tbody>
        <tfoot>
            <StudentForm/>
        </tfoot>
    </table>
  )
}
