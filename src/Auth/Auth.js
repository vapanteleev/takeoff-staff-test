import React, { Component } from 'react';
import Input from '../Input';
import axios from 'axios';
import { connect } from 'react-redux';
import { auth } from '../store/actions/auth';




function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormValid:false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Input correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email:true
                }
                
            },
            password: {
               
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Input correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength:6
                }
                
            
            }
        }
    }

    loginHandler =  () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true

        )
        
        
         
        // try {
        //            const response=  await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJO3xZ0PHzhndClc2BNaH9BQ-i0VYlG50', authData)
        //             console.log(response.data)
        // }
        // catch (e) {
        //     console.log(e)
        // }
        
    }
    registerHandler =  () => {

         this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false

        )


        
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid=value.trim()!=='' && isValid
        
        }
        if (validation.email) {
     isValid = validateEmail(value) && isValid
            

        }

        if (validation.minLength) {
            
            isValid = value.length>=validation.minLength && isValid
        }
        
        return isValid
        
    }
    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}:`, event.target.value)
        const formControls = {
            ...this.state.formControls
        }
        const control = { ...formControls[controlName] }
        
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control


        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        



        this.setState({
            formControls,isFormValid

        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={index + controlName}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        })
      
    }




    render() {
        return (
            <div>
                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submitHandler} >
                        {this.renderInputs()}
                        
                 
                        <button
                            
                            onClick={this.loginHandler}
                           
                        >Log In
                        </button>
                        <button
                            
                            onClick={this.registerHandler}
                            
                        >Sign In
                            
                        
                        </button>


                    </form>
                </div>
                
        
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        auth:(email,password,isLogin)=>dispatch(auth(email,password,isLogin))
    }
}
export default connect(null, mapDispatchToProps)(Auth);