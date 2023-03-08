import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Header from '../../components/Header';

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            message: '',
        };
    }

    signIn = () => {
        const data = { usuario: this.usuario, senha: this.senha }

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        fetch('http://localhost:3000/login', requestInfo)
            .then(response => {
                // console.log(response);
                if (response.ok) {
                    return response.json()
                }
                // throw new Error(response.errors)
                return Promise.reject(response);
            })
            // .then(token => console.log(token))
            .catch(e =>
                console.log(e)
                // this.setState({ message: e.message })
            )
    }

    render() {
        return (
            <div className='col-md-6'>
                <hr className='my-3'></hr>
                {
                    this.state.message !== '' ? (
                        <Alert className='text-center' color='danger'> {this.state.message} </Alert>
                    ) : ''
                }
                <Header title="Login" />
                <Form>
                    <FormGroup>
                        <Label for='usuario'>Usuário</Label>
                        <Input type='text' id='usuario' onChange={e => this.usuario = e.target.value} placeholder='Informe seu nome de usuário' minLength='3' maxLength='50' />
                    </FormGroup>
                    <FormGroup>
                        <Label for='senha'>Senha</Label>
                        <Input type='password' id='senha' onChange={e => this.senha = e.target.value} placeholder='Informe sua senha' minLength='3' maxLength='50' />
                    </FormGroup>
                    <Button color='primary' block onClick={this.signIn}>Entrar</Button>
                    <br></br>
                    <Button color='danger' block>Cancelar</Button>
                </Form>
            </div>
        )
    }
}