import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../css/Forms.css"

function Register() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();


  return (
    <div className="Form">
            <Navbar />
    <div className="Form-header">        
      <h1>Register a new petsitter account</h1>
    </div>
      <center>
        <Formik
          initialValues={{
            accepted_pet_type: [""],
            availability_dates: [""],
          }}
          validate={(values) => {
            const errors = {};

            if (!values.accepted_pet_type) {
              errors.accepted_pet_type = "Required";
            }

            if (!values.availability_dates) {
              errors.availability_dates = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const newValues = {
              first_name: user.given_name,
              last_name: user.family_name,
              photo_url: user.picture,
              email: user.email,
              sub_id: user.sub,
              ...values,
            };
            console.log(values);
            // alert(JSON.stringify(newValues, null, 2));
            fetch("/sitters/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newValues),
            })
              .then((res) => {
                return res.json();
              })
              .then((res) => {
                console.log(res);
                if (res.status === "ERROR") {
                  alert("You are already registered");
                } else {
                  alert("Successfully Registered");
                }
                navigate("/");
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Container>
                <Row>
                  <Col>
                    <div>
                      <h5>What type of pet?</h5>
                      <p>Accepted pet type: Cat and Dog</p>

                      <FieldArray
                        type="text"
                        name="accepted_pet_type"
                        placeholder="cat or dog"
                      >
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          const { values } = form;
                          const { accepted_pet_type } = values;
                          return (
                            <div>
                              {accepted_pet_type.map((pet, index) => (
                                <div key={index}>
                                  <Field
                                    name={`accepted_pet_type[${index}]`}
                                  />
                                  {index > 0 && (
                                    <Button
                                      variant="danger"
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      -
                                    </Button>
                                  )}
                                  <Button
                                    variant="success"
                                    type="button"
                                    onClick={() => push("")}
                                  >
                                    +
                                  </Button>
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      </FieldArray>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <h5>What's your available dates?</h5>
                      <p>Date format example: 2023-08-31</p>
                      <FieldArray
                        type="date"
                        name="availability_dates"
                        placeholder=""
                      >
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          const { values } = form;
                          const { availability_dates } = values;
                          return (
                            <div>
                              {availability_dates.map((date, index) => (
                                <div key={index}>
                                  <Field
                                    name={`availability_dates[${index}]`}
                                  />
                                  {index > 0 && (
                                    <Button
                                      variant="danger"
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      -
                                    </Button>
                                  )}
                                  <Button
                                    variant="success"
                                    type="button"
                                    onClick={() => push("")}
                                  >
                                    +
                                  </Button>
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      </FieldArray>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="custom-submit-button" 
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </center>
    </div>
  );
}

export default Register;
