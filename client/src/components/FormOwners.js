import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Forms.css"

function Register() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();


  return (
    <div className="Form">
      <div className="Form-header"> 
      <h1>Register a new pet owner account</h1> 
      </div>
      <center>
        <Formik
          initialValues={{
            pet_name: "",
            pet_image: "",
            pet_type: "",
            description: "",
          }}
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
            const newValues = {
              first_name: user.given_name,
              last_name: user.family_name,
              email: user.email,
              sub_id: user.sub,
              photo_url: user.picture,
              ...values,
            };

            fetch("/owners/register", {
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
                console.log(res.status);
                alert(res.body);
                navigate("/");

              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Container>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Row>
                      <Col xs={4}>
                        <h5>What's the name of your pet?</h5>
                      </Col>
                      <Col xs={8}>
                        <Field
                          type="text"
                          name="pet_name"
                          placeholder=""
                          className="form-control custom-input"
                        />
                        <ErrorMessage name="pet_name" component="div" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Row>
                      <Col xs={4}>
                        <h5>What type of pet?</h5>
                      </Col>
                      <Col xs={8}>
                        <Field
                          type="text"
                          name="pet_type"
                          placeholder=""
                          className="form-control custom-input"
                        />
                        <ErrorMessage name="pet_type" component="div" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Row>
                      <Col xs={4}>
                        <h5>Tell us about your pet?</h5>
                      </Col>
                      <Col xs={8}>
                        <Field
                          type="text"
                          name="description"
                          placeholder=""
                          className="form-control custom-input"
                        />
                        <ErrorMessage name="description" component="div" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Row>
                      <Col xs={4}>
                        <h5>Image URL of your pet</h5>
                      </Col>
                      <Col xs={8}>
                        <Field
                          type="text"
                          name="pet_image"
                          placeholder=""
                          className="form-control custom-input"
                        />
                        <ErrorMessage name="pet_image" component="div" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <div className="text-center" >
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="custom-submit-button" 
                      >
                        Submit
                      </Button>
                    </div>
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
