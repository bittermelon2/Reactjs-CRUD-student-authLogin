import React, { useCallback, useState, useContext } from 'react'
import StudentForm from '../StudentForm/StudentForm'
import {useDelStudentMutation} from '../../../store/api/studentApi'


export default function Student(props) {
   // {stu: {name, age, gender, address}} = props
   // props {stu:{id:xxx, attributes:{name:xxx, age:xxx}}}
   const {stu: {id, attributes: {name, age, gender, address}}}=props
  //  console.log('id', id, 'name',name, 'age', age, 'address', address)

   const [isEdit, setIsEdit]=useState(false)

   //hook useDelStudentMutation return an array with 2 elements
   //1st element: trigger action, 2nd element: result
   const [delStudent, result] = useDelStudentMutation()
   const {isSuccess, isError}=result  


  const deleteHandler=()=>{    
    delStudent(props.stu.id)
  }

  const cancelEdit=()=>{
    console.log('cancel edit')
    setIsEdit(false)
  }
  return (
    <>
    {!isEdit && !isSuccess && 
      <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{address}</td>
        <td>
          <button onClick={deleteHandler}>Del</button>
          <button onClick={()=>setIsEdit(true)}>Modify</button>
      </td>
      </tr>
    }

    { isSuccess && <tr><td colSpan={5}>Deletion is success</td></tr>}
    {isEdit}
    { isEdit && <StudentForm stuId={id} onCancel={cancelEdit}/> }
        {/* {loading&& <tr><td colSpan={5}>Deleting data</td></tr>}
        {error && <tr><td colSpan={5}>{error.message}</td></tr>} */}
    </>
  )
}
