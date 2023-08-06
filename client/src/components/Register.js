import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
function Register() {
 return (
   <div className="Form">
     <center>
       <h1>Register a new account</h1>
       <Formik
         initialValues={{ usertype: "", accepted_pet_type: "", vailability_dates: "" }}
         validate={(values) => {
           const errors = {};
           if (!values.usertype) {
             errors.usertype = "Required";
           }

           if (values.usertype !== 'pet owner' && values.usertype !== 'pet sitter') {
            errors.usertype = "Please write pet owner or pet sitter";
          }

           if (!values.accepted_pet_type) {
             errors.accepted_pet_type = "Required";
           } 

           if (values.accepted_pet_type !== 'cat' && values.usertype !== 'dog') {
            errors.accepted_pet_type = "Please write cat or dog";
          }

           if (!values.vailability_dates) {
             errors.vailability_dates = "Required";
           }
           return errors;
         }}

         onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        
       >
         {({ isSubmitting }) => (
           <Form>
            are you a pet owner or pet sitter?<br/>
             <Field
               type="text"
               name="usertype"
               placeholder="pet owner or pet sitter"
             />
             <ErrorMessage name="usertype" component="div" /><br/>
             what type of pet?<br/>
             <Field
               type="text"
               name="accepted_pet_type"
               placeholder="cat or dog"
             />
             <ErrorMessage name="accepted_pet_type" component="div" /><br/>
             what's your schedule?<br/>
             <Field 
              type="text" 
              name="vailability_dates" 
              placeholder="vailability_dates" 
            />
             <ErrorMessage name="vailability_dates" component="div" /><br/>

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