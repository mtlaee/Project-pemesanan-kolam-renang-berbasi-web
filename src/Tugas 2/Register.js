import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Styling.css';
import b from './Gambar/Login/b.jpg';
import a from './Gambar/logo.png';
import swal from 'sweetalert';
import uuid from 'react-uuid';

const id = uuid().toString().replace("-","").substring(0,7);

class Login extends Component {
    constructor(){
        super();
        this.state={
            IdOwn : id,
            Nama : "",
            Email : "",
            Password : "",
            data:[]
        }
    }

    setValue(ev){
        this.setState({
            [ev.target.name] : [ev.target.value]
        })
    }

    componentDidMount(){
        fetch('http://localhost:8000/mitra/get')
        .then(response=>response.json())
        .then(res=>{
            this.setState({
                data:res
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    TambahData(){
        fetch(
            'http://localhost:8000/register/post',
            {
                method : 'POST',
                headers : {
                    accept : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    IdOwn : this.state.IdOwn,
                    Nama : this.state.Nama,
                    Email : this.state.Email,
                    Password : this.state.Password
                })
            }
        ).then((response=>response.json()))
        .then(res=>{
            this.props.history.push('/mitra/login')
            swal("Pengguna dengan email '"+this.state.Email+ "' berhasil ditambahkan", "Silahkan kembali ke menu login", "success")
        })
    }

    cekdata(){
        var a = document.querySelector('.nama')
        var b = document.querySelector('.email')
        var c = document.querySelector('.pass')
        if(a.value=="" || b.value=="" || c.value==""){
            swal("Semua data harus terisi")
        }
        else{
            var data_temp=""
            for(var i=0; i<this.state.data.length; i++){
                if(b.value==this.state.data[i].Email){
                    data_temp=this.state.data[i].Email
                }
            }
            if(data_temp==""){
                this.TambahData()
            }
            else{
                swal("", "Pengguna dengan email tersebut telah tersedia", 'error')
                a.value=""
                b.value=""
                c.value=""
            }
        }
    }

    render() {
        return (
            <div className="login-main">
                <Link to='/'><img src={a} className="logo" style={{width: 250}}/></Link>
                <div className='rowlogin'>
                    <div className='kiri'>
                        <p style={{fontWeight: "bold", fontSize: "30px"}}>Selamat <span style={{color: '#4356ff'}}>Datang</span></p>
                        <div className='register-mitra'>
                            <label>Nama</label>
                            <input type="email" className="form-control nama" name='Nama' onChange={this.setValue.bind(this)} placeholder="Nama Pengguna" required/>
                            <label>Email</label>
                            <input type="email" className="form-control email" name='Email' onChange={this.setValue.bind(this)} placeholder="Email"/>
                            <label>Password</label>
                            <input type="password" className="form-control pass" name='Password' onChange={this.setValue.bind(this)} placeholder="Password" maxLength='8'/>
                            <button className="btn-register" onClick={this.cekdata.bind(this)}style={{marginBottom: "30px"}}>Daftar</button>
                        </div>
                        <p className='keterangan' style={{marginTop:"10px"}}>Sudah punya akun? Masuk <a className='link' href='/mitra/login'>disini!</a></p>
                    </div>
                    <div className='kanan'>
                        <img src={b} style={{width: '100%', height: '100%', borderRadius: '0 20px 20px 0'}}/>
                    </div>
                </div>
            </div>
            )
        }

    }

export default Login