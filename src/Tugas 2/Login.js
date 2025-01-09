import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import './Styling.css';
import swal from 'sweetalert';
import b from './Gambar/Login/b.jpg';
import a from './Gambar/logo.png';

class Login extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
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

    cekdata(){
        var a = document.querySelector('.email')
        var b = document.querySelector('.pass')
        if(a.value=="" || b.value==""){
            swal("Semua data harus terisi")
        }
        else{
            var email_temp=""
            var pass_temp=""
            var id=""
            for(let i=0; i<this.state.data.length; i++){
                if(a.value==this.state.data[i].Email){
                    email_temp=this.state.data[i].Email
                    pass_temp=this.state.data[i].Password
                    id=this.state.data[i].IdOwn
                }
            }
            if(a.value == email_temp && b.value == pass_temp){
                this.props.history.push('/admin/'+id)
            }
            else{
                swal("", "Kombinasi Email dan Password salah!", 'error')
                a.value=""
                b.value=""
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
                        <div className='login-mitra'>
                            <label>Email</label>
                            <input type="email" className="form-control email" name='Email' placeholder="Email"/>
                            <label>Password</label>
                            <input type="password" className="form-control pass" name='Password' placeholder="Password" maxLength='8'/>
                            <button className="btn-login" onClick={this.cekdata.bind(this)}>Masuk</button>
                            <a href='' style={{color: 'blue', textDecoration: 'none',alignSelf: "center", fontSize:'12px'}}>Lupa Pasword?</a>
                            <div style={{borderTop: "1px solid rgba(0, 0, 0, 0.1)", alignSelf: 'center', margin: "10px", padding: "5px"}}>
                                <FcGoogle style={{marginRight: "15px"}}/><GrFacebook/>
                            </div>
                        </div>
                        <p className='keterangan' style={{marginTop:"10px"}}>Belum punya akun? Daftar <a className='link' href='/mitra/register'>disini!</a></p>
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