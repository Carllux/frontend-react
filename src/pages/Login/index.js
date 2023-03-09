import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Header from '../../components/Header';

const parseReadableStreamToJson = async (error) => {
    const data = (await error.getReader().read()).value
    console.log(data);
    const str = String.fromCharCode.apply(String, data);
    console.log(str); // Ao converter a ReadableStream do Error.body
    // a formatação UTF-8 fica bugada, a corrigir
    return JSON.parse(str);
}

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
                if (response.ok) {
                    return response.json()
                }
                // throw new Error(response.errors)
                return Promise.reject(response);
            })
            .then(response => response)
            .then(token => console.log(token))
            .catch(async (e) => {
                const errs = await parseReadableStreamToJson(e.body)
                const errorMessage = errs.errors[0]
                console.log(errs);
                this.setState({ message: errorMessage })
            }
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