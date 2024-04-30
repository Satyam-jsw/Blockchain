import React, { Component } from "react";
import { Button } from 'react-bootstrap';
// import img1 from './Images/doctors.jpg'
import "./css/DocLogin.css";

class DocLogin extends Component {
  state = { textvalue: "", formNum: false, age: 0, pat_reg_login: 0 };
  cont = this.props.state.contract;
  Acc = this.props.state.accounts;



  async checkDoc(event) {
    event.preventDefault(true);
    var result = null
    try {
      // console.log("hello")
      let adhaar_number = document.getElementById('doc_adhaar_number').value;
      result = await this.cont['OPT'].methods.checkDoctorInfo(adhaar_number).call({ from: this.Acc[0] });
      console.log(result);
      if (!result[0])
        alert('Invalid Credentials. Contact Respective Hospital');
      else
        this.props.onlogin(result[1], 0);
    }
    catch (err) {
      alert('Invalid Credentials. ');
    }

  }


  async registerPat(event) {
    event.preventDefault(true);
    let name = document.getElementById('patient_name').value;
    let gender = document.getElementById('patient_gender').value;
    let contact_info = document.getElementById('patient_cont').value;
    await this.cont['OPT'].methods.signupPatient(name, contact_info, gender).send({ from: this.Acc[0] });
    console.log(name);
    console.log(gender);
    console.log(contact_info);
  }


  async checkPat(event) {
    event.preventDefault(true);

    var result = null;
    try {
      let adhaar_number = document.getElementById('pat_adhaar_number').value;
      result = await this.cont['OPT'].methods.checkPatientInfo(adhaar_number).call({ from: this.Acc[0] });
      console.log(result);
      if (!result[0])
        alert('Invalid Credentials. Make sure Account Address and Adhaar Number is entered correctly');
      else
        this.props.onlogin(result[1], 1);
    }
    catch (err) {
      alert('Invalid Credentials. Make sure Account Address and Adhaar Number is entered correctly');
    }

  }

  async checkHospital(event) {
    event.preventDefault();
    var result = null;

    try {
      result = await this.cont['OPT'].methods.getHospitalInfo().call({ from: this.Acc[0] });
      console.log(result);
      this.props.onlogin(result[0], 2);

    }
    catch (err) {
      alert('Owner has not created your hospital account');
    }

    console.log("Hospital check");
  }

  async checkOwner(event) {
    event.preventDefault();
    var result = null;

    try {
      result = await this.cont['OPT'].methods.getOwnerInfo().send({ from: this.Acc[0], gas: 200000 });
      console.log(result);
      this.props.onlogin(result[0], 3);
    }
    catch (err) {
      alert('You are not the owner');
    }
    console.log("Owner check");
  }

  async checkInsuranceComp(event) {
    event.preventDefault();
    var result = null;
    try {
      result = await this.cont['OPT'].methods.getInsuranceCompInfo().call({ from: this.Acc[0] });
      console.log(result);
      this.props.onlogin(result[0], 4);
    }
    catch (e) {
      alert('You are not registered by the owner')
    }
  }

  patientLoginForm() {
    this.setState({ pat_reg_login: 1 });
  }

  patientRegisterForm() {
    this.setState({ pat_reg_login: 0 });
  }

  render() {
    this.checkDoc = this.checkDoc.bind(this);
    this.registerPat = this.registerPat.bind(this);
    this.checkPat = this.checkPat.bind(this);
    this.checkHospital = this.checkHospital.bind(this);
    this.checkOwner = this.checkOwner.bind(this);
    this.checkInsuranceComp = this.checkInsuranceComp.bind(this);
    this.patientLoginForm = this.patientLoginForm.bind(this);
    this.patientRegisterForm = this.patientRegisterForm.bind(this);

    const ownerForm =
      <center className="container form-size">
        <h5>Owner</h5>
        <form>
          <br></br>
          <div className=" mt-2"><b>Login By Address</b></div>
          <Button variant="dark" className="button" onClick={this.checkOwner}>Enter Address</Button>
        </form>
      </center>

    const hospitalForm =
      <center className="container form-size">
        <h5>Hospital</h5>
        <form>
          <br></br>
          <div className="mt-2"><b>Login By Address</b></div>
          <Button variant="dark" className="button" onClick={this.checkHospital}>Enter Address</Button>
        </form>
      </center>
    const insuranceCompForm =
      <center className="container form-size">
        <h5>Insurance Comp.</h5>
        <form>
          <br></br>
          <div className=" mt-2"><b>Login By Address</b></div>
          <Button variant="dark" className="button" onClick={this.checkInsuranceComp}>Enter Address</Button>
        </form>
      </center>

    const docForm =
      <center className="container form-size">
        <h5>Doctor</h5>
        <form >
          <div className="input-box-heading mt-2"><b>Adhaar Number</b></div>
          <input type="text" name="adhaar_number" id="doc_adhaar_number" placeholder="Enter Adhaar Number" className="form-control"></input>
          <br></br>
          <Button variant="dark" className="button" onClick={this.checkDoc}>Login As Doctor</Button>
        </form>
      </center>

    const patForm =
      <center className="container form-size">
        <h5>Patient</h5>
        <Button className="button" variant="dark" onClick={this.patientRegisterForm}>Register Patient</Button>
        <Button className="button" variant="dark" onClick={this.patientLoginForm}>Login</Button>

        {this.state.pat_reg_login === 0 ?
          <div>
            <form onSubmit={this.registerPat}>
              <div className="input-box-heading"><b>Name</b></div>

              <input type="text" name="name" id="patient_name" placeholder="Enter Name" className="form-control" />

              <br></br>

              <div className="input-box-heading "><b>Address</b></div>

              <input type="text" name="address" id="patient_address" placeholder="Enter Address" className="form-control" />
              <br></br>

              <div className="input-box-heading"><b>Select Gender</b></div>

              <select id="patient_gender" name="gender" className="form-control" >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Others">Others</option>
              </select>
              <br></br>
              <div className="input-box-heading "><b>Contact Info</b></div>
              <input type="text" name="contact info" id="patient_cont" placeholder="Enter Contact Info" className="form-control" />
              <br></br>
              <Button className="button" variant="dark" type="submit">Register Patient</Button>

            </form>
          </div>

          :

          <div>
            <div className="input-box-heading  mt-2"><b>Adhaar Number</b></div>

            <input type="text" name="adhaar_number" id="pat_adhaar_number" placeholder="Enter Adhaar Number" className="form-control" />
            <br></br>

            <Button className="button" variant="dark" onClick={this.checkPat.bind(this)}>Login As Patient</Button>

          </div>
        }

      </center>

    const fNum = this.state.formNum;

    let loadForm;


    if (fNum === 0)
      loadForm = docForm;
    else if (fNum === 1)
      loadForm = patForm;
    else if (fNum === 2)
      loadForm = hospitalForm;
    else if (fNum === 3)
      loadForm = ownerForm;
    else if (fNum === 4)
      loadForm = insuranceCompForm;

    return (

      <div className="dlbody" >

        <div className="alterBut">
          <Button className="pbutton" variant="primary" value="1" onClick={(event) => this.setState({ formNum: 0 })}>Doctor</Button>

          <Button className="pbutton" variant="primary" value="0" onClick={(event) => this.setState({ formNum: 1 })}>Patient</Button>

          <Button className="pbutton" variant="primary" value="2" onClick={(event) => this.setState({ formNum: 2 })}>Hospital</Button>

          <Button className="pbutton" variant="primary" value="3" onClick={(event) => this.setState({ formNum: 3 })}>Owner</Button>

          <Button className="pbutton" variant="primary" value="4" onClick={(event) => this.setState({ formNum: 4 })}>Insurance Comp.</Button>

        </div>


        <fieldset>
          {loadForm}
        </fieldset>

      </div>
    );
  }
}
export default DocLogin;