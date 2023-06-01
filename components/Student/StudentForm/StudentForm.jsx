import React,{useCallback, useState,  useContext, useEffect} from 'react'
import {useGetStudentByIdQuery, useAddStudentMutation, useUpdateStudentMutation} from '../../../store/api/studentApi'


export default function StudentForm(props) {
  console.log('studentForm, stuId', props.stuId)

  const {data:stuData, isSuccess} = useGetStudentByIdQuery(props.stuId, {
    skip: !props.stuId,
    refetchOnMountOrArgChange: 2 //false, 2--cache is valid for 2 second
  })
  
  console.log('stuData', stuData)
  const [addStudent, {isSuccess:isAddSuccess}] = useAddStudentMutation()
  const [updateStudent, {isSuccess:isUpdateSuccess}] = useUpdateStudentMutation()

  const [inputData, setInputData]=useState({
      name: '',
      age: '',
      gender:'male',
      address: '',
  })
 

  useEffect(()=>{
    console.log('2222'. stuData)
    if(isSuccess && stuData){
      setInputData(stuData.data.attributes)
      console.log('after setInputData'. stuData)
    }
  }, [isSuccess])


  const nameChangeHandler=(e)=>{
    
    setInputData(preState=>({...preState, name: e.target.value}))
    console.log('change name', inputData)
  }
  const ageChangeHandler=(e)=>{
    setInputData(preState=>({...preState, age: e.target.value}))
  }
  const genderChangeHandler=(e)=>{
    setInputData(preState=>({...preState, gender: e.target.value}))
  }
  const addrChangeHandler=(e)=>{
    setInputData(preState=>({...preState, address: e.target.value}))
  }

  const submitHandler=()=>{
    console.log(inputData)
    addStudent(inputData)
    setInputData({
      name: '',
      age: '',
      gender:'male',
      address: '',
    })
  }

  const updateHandler=()=>{
    console.log('updateHandler', {id: props.stuId, attributes: inputData})

    updateStudent({id: props.stuId, attributes: inputData})
    props.onCancel()
  }


  return (
    <>
    <tr className="StudentForm">
        <td><input type="text" onChange={nameChangeHandler} value={inputData.name?inputData.name:''}/></td>
        <td>
            <select onChange={genderChangeHandler} value={inputData.gender?inputData.gender:''}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </td>
        <td><input type="text" onChange={ageChangeHandler} value={inputData.age?inputData.age:''}/></td>
        <td><input type="text" onChange={addrChangeHandler} value={inputData.address?inputData.address:''}/></td>
        <td>
          {props.stuId && 
            <>
              <button onClick={()=>{props.onCancel()}} gender>Cancel</button>
              <button onClick={updateHandler}>Confirm</button>
            </>
            
          }
          {!props.stuId && 
            <button onClick={submitHandler}>Add</button>
          }
        </td>
    </tr>
    {/* {loading && <tr colSpan={5}><td>Student is adding...</td></tr>}
    {error && <tr colSpan={5}><td>{error.message}</td></tr>} */}

    </>
  )
}
