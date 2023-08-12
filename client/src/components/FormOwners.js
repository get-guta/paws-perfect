import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useAuth0 } from "@auth0/auth0-react";

function Register() {

  const { user, isAuthenticated } = useAuth0();

 return (
   <div className="Form">
     <center>
       <h1>Register a new pet owner account</h1>
       <Formik
         initialValues={{ pet_name:"", pet_image:"", pet_type: "", description: ""}}
         validate={(values) => {
           const errors = {};

           if (!values.pet_name) {
            errors.pet_name = "Required";
          }
          if (!values.pet_type) {
             errors.pet_type = "Required";
           } 

           return errors;
         }}

         onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
            const newValues = { 
              first_name: user.given_name,
              last_name: user.family_name,
              email: user.email,
              sub_id: user.sub,
              photo_url: user.picture
               , ...values
            } 
          //  alert(JSON.stringify(newValues, null, 2));

            fetch("/owners/register",{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
           body: JSON.stringify(newValues),
            })
            .then((res)=>{
              return res.json()
            })
            .then((res)=>{
                console.log(res.status)
                alert(res.body)
            })

        }}
        
       >
         {({ isSubmitting }) => (
           <Form>
            
             
             {/* <Field
               type="text"
               name="accepted_pet_type[0]"
               placeholder="cat or dog"
             />
            <ErrorMessage name="accepted_pet_type" component="div" /><br/>
             <Field
               type="text"
               name="accepted_pet_type[1]"
               placeholder="cat or dog"
             />
             <ErrorMessage name="accepted_pet_type" component="div" /><br/> */}
            What's the name of your pet?<br/>
            <Field
               type="text"
               name="pet_name"
               placeholder=""
             />
            <ErrorMessage name="pet_name" component="div" /><br/>

             what type of pet?<br/>
             <Field
               type="text"
               name="pet_type"
               placeholder=""
             />
            <ErrorMessage name="pet_type" component="div" /><br/>

             {/* <FieldArray
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
                            {index > 0 && (<button type='button' onClick={()=>remove(index)}> - </button>)}
                            <button type='button' onClick={()=>push('')}> + </button>

                          </div>
                        ))}
                    </div>
                 )
              }
            }
             </FieldArray> */}



             tell us about your pet?<br/>
             <Field 
              type="text" 
              name="description" 
              placeholder="" 
            />
             <ErrorMessage name="description" component="div" /><br/>

             Image url of your pet<br/>
            <Field
               type="text"
               name="pet_image"
               placeholder=""
             />
            <ErrorMessage name="pet_image" component="div" /><br/>
            

         
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