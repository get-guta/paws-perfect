import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useAuth0 } from "@auth0/auth0-react";

function Register() {

  const { user, isAuthenticated } = useAuth0();

 return (
   <div className="Form">
    {/* {console.log(user.sub)} */}
     <center>
       <h1>Register a new petsitter account</h1>
       <Formik
         initialValues={{ accepted_pet_type: [""], availability_dates: [""]}}
         validate={(values) => {
           const errors = {};

           if (!values.accepted_pet_type) {
             errors.accepted_pet_type = "Required";
           } 

          //  if (values.accepted_pet_type !== 'cat' && values.usertype !== 'dog') {
          //   errors.accepted_pet_type = "Please write cat or dog";
          // }

           if (!values.availability_dates) {
             errors.availability_dates = "Required";
           }
           return errors;
         }}
         onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
            const newValues = { 
              first_name: user.given_name,
              last_name: user.family_name,
              photo_url: user.picture,
              email: user.email,
              sub_id: user.sub, ...values
            } 
            console.log(values)
            // alert(JSON.stringify(newValues, null, 2));
            fetch("/sitters/register",{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
           body: JSON.stringify(newValues),
            })
            .then((res)=>{
              return res.json()
              // setSubmitting(false);
            })
            .then((res)=>{
                console.log(res)
                alert("You already logged in")
            })
            // .catch((error)=> {
            //   console.log(error)
            // })
          // }, 400);
        }}
        
       >
         {({ isSubmitting }) => (
           <Form>
            
             what type of pet?<br/>

             <FieldArray
               type="text"
               name="accepted_pet_type"
               placeholder="cat or dog"
             >
              {
                fieldArrayProps => {
                  const {push, remove, form} = fieldArrayProps
                  const { values } = form
                  const {accepted_pet_type} = values
                  return (
                    <div>
                      {accepted_pet_type.map((pet, index) => (
                          <div key={index}>
                            <Field name={`accepted_pet_type[${index}]`}/>
                            {index > 0 && (<button type='button' onClick={()=>remove(index)}> - </button> ) }
                            <button type='button' onClick={()=>push('')}> + </button>

                          </div>
                        ))}
                    </div>
                 )
              }
            }
             </FieldArray>

             what's your available dates?<br/>
              Date format example: 2023-08-31
             {/* <Field 
              type="date" 
              name="availability_dates[0]" 
              placeholder="availability_dates" 
            />
             <ErrorMessage name="availability_dates" component="div" /><br/>
             <Field 
              type="date" 
              name="availability_dates[1]" 
              placeholder="availability_dates" 
            />
             <ErrorMessage name="availability_dates" component="div" /><br/> */}

            <FieldArray
               type="date"
               name="availability_dates"
               placeholder=""
             >
              {
                fieldArrayProps => {
                  const {push, remove, form} = fieldArrayProps
                  const { values } = form
                  const {availability_dates} = values
                  return (
                    <div>
                      {availability_dates.map((date, index) => (
                          <div key={index}>
                            <Field name={`availability_dates[${index}]`}/>
                            {index > 0 && (<button type='button' onClick={()=>remove(index)}> - </button> )}
                            <button type='button' onClick={()=>push('')}> + </button>

                          </div>
                        ))}
                    </div>
                 )
              }
            }
             </FieldArray>
             <button type="submit" disabled={isSubmitting}>
               Submit
             </button>
           </Form>
         )}
       </Formik>
     </center>
   </div>
 );
}
export default Register;