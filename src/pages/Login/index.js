import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import Header from '../../components/Header';
import { Readable } from 'stream';

const parseReadableStreamToJson = async (error) => {
    const data = (await error.getReader().read()).value
    console.log(data);
    const str = String.fromCharCode.apply(String, data);

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
            .then((key) => {
                const { token } = key;
                localStorage.setItem('token', token)
            })
            .catch(async (e) => {
                // Ao converter a ReadableStream do Error.body
                console.log(e.body);
                // a formatação UTF-8 fica bugada, a corrigir utilizando a função parseReadableStreamToJson
                const errs = await parseReadableStreamToJson(e.body)
                // A CORRIGIR
                console.log(errs);
                try {
                    const errorMessage = errs.errors[0]
                    console.log(errorMessage);
                    return this.setState({ message: errorMessage })
                } catch (error) {
                    return this.setState({ message: 'Credenciais inválidas' })
                }

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
                        <Input type='text' id='usuario' onChange={e => this.usuario = e.target.value} placeholder='Informe seu nome de usuário' minLength='3' maxLength='50' autoComplete="username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for='senha'>Senha</Label>
                        <Input type='password' id='senha' onChange={e => this.senha = e.target.value} placeholder='Informe sua senha' minLength='3' maxLength='50' autoComplete="current-password" />
                    </FormGroup>
                    <Button color='primary' block onClick={this.signIn}>Entrar</Button>
                    <br></br>
                    <Button color='danger' block>Cancelar</Button>
                </Form>
            </div>
        )
    }
}