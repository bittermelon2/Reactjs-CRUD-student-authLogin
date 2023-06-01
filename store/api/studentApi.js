import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//create an API object with parameter of configuration object
const studentApi = createApi({
    reducerPath: 'studentApi', //ID, unique
    baseQuery: fetchBaseQuery({ //base info for query
        baseUrl: 'http://localhost:1337/api/', //http://localhost:3000/
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            console.log('aaa token', token)
                //obtain user token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ['student'], //define label type of this api
    endpoints(build) {
        return {
            getStudents: build.query({
                query() {
                    // return 'studentlist'
                    return {
                        url: 'students',
                        // headers: {
                        //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg1MzMwOTI3LCJleHAiOjE2ODc5MjI5Mjd9.G0xWvFo_20CS_VjL8NEuVYhAR4QHoZ14miFinS8KrG8'
                        // }
                    }
                },
                transformResponse(baseQueryReturnValue) {
                    return baseQueryReturnValue
                },
                providesTags: ['student']
            }),
            getStudentById: build.query({
                query(id) {
                    return `students/${id}` ///api/students/:id
                },
                keepUnusedDataFor: 80, //set time for cache, 0--no cache, unit is seconds, 5--5seconds, default is 60 seconds
                providesTags: (result, error, id) => ([{ type: 'student', id }])
            }),
            //mine
            delStudent: build.mutation({
                query(id) {
                    return {
                        //if not get request, we need to return an object
                        url: `students/${id}`,
                        method: 'delete'
                    }
                }
            }),
            addStudent: build.mutation({
                query(stu) {
                    return {
                        url: 'students',
                        method: 'post',
                        body: { data: stu } //  { attributes: stu }
                    }
                },
                invalidatesTags: ['student']
            }),
            updateStudent: build.mutation({
                query(stu) {
                    return {
                        url: `students/${stu.id}`,
                        method: 'put',
                        body: { data: stu.attributes } //may have issue //{data:stu.attributes}
                    }
                },
                // invalidatesTags: ['student'],
                invalidatesTags: (result, error, stu) => ([{ type: 'student', id: stu.id }])
            })

        }
    }

})

export const { useGetStudentsQuery, useGetStudentByIdQuery, useDelStudentMutation, useAddStudentMutation, useUpdateStudentMutation } = studentApi

export default studentApi