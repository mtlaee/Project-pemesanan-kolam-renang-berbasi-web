import React, { Component } from 'react';
import Logo from './Gambar/logo1.png';
import { Link, withRouter } from "react-router-dom";
import { GrUserSettings} from 'react-icons/gr'
import { FaSwimmingPool } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go'
import { IoCallSharp } from 'react-icons/io5'
import {MdOutlineAddCircleOutline} from 'react-icons/md'
import swal from 'sweetalert';

export class Admin extends Component {
    constructor(props){
        super(props)
        this.state =  {
            Id : this.props.match.params.id,
            Nama: "",
            Email: "",
            Password:"",
            data_admin:[],
            data_kolam:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:8000/mitra/get/'+this.state.Id)
        .then(response => response.json())
        .then(res =>{
            this.setState({
                Nama: res.Nama,
                Email: res.Email,
                Password: res.Password,
                data_admin:res
            })
        }).then(res=>{console.log(res)})
        .catch(error => {
            console.log(error);
        })
    }

    DataKolam(){
        fetch('http://localhost:8000/kolam/'+this.state.Id)
        .then(response => response.json())
        .then(res =>{
            this.setState({
                data_kolam:res
            })
        }).then(res=>{console.log(this.state.data_kolam)})
        .catch(error => {
            console.log(error);
        })
    }

    setValue(ev){
        this.setState({
            [ev.target.name] : [ev.target.value]
        })
    }

    UbahData(){
        fetch('http://localhost:8000/mitra/put/'+this.state.Id,
            {
                method : 'PUT',
                headers : {
                    accept : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    Nama : this.state.Nama,
                    Email : this.state.Email,
                    Password : this.state.Password,
                })
            }
        ).then((response=>response.json()))
        .then(res=>{
            this.componentDidMount()
            document.querySelector('.nama').disabled=true
            document.querySelector('.email').disabled=true
            document.querySelector('.password').disabled=true
            document.querySelector('.simpan').style.display='none'
            document.querySelector('.ubah').style.display='block'
            swal("Berhasil", "Data dengan ID "+this.state.Id+" berhasil di ubah!", "success")
        })
    }

    HapusData(id){
        fetch(
            'http://localhost:8000/mitra/delete/'+this.state.Id,
            {
                method : 'DELETE'
            }
        ).then((response=>response.json()))
        .then(res=>{
            swal("Sampai Jumpa", "Data dengan ID "+this.state.Id+" berhasil di hapus!", "success")
            this.props.history.push('/mitra/login')
        })
    }

    btn_HapusData(id){
        swal({
            title: "Yakin ingin menghapus akun ini?",
            text: "Semua data didalamnya akan hilang dan tidak bisa di kembalikan",
            icon: "warning",
            buttons: ["Batak","Yakin"],
            successMode: true
        })
        .then((confirm) => {
            if (confirm) {
              this.HapusData(id)
            }
        });
    }
    
    Pengaturan(){
        var a = document.querySelector('.pengaturan');
        var b = document.querySelector('.kelola_kolam')
        a.style.display='block'
        b.style.display='none'
    }

    Kolam(){
        var a = document.querySelector('.pengaturan');
        var b = document.querySelector('.kelola_kolam')
        a.style.display='none'
        b.style.display='block'
        this.DataKolam()
    }

    Keluar(){
        swal({
            text: "Yakin ingin meninggalkan halaman ADMIN?",
            icon: "warning",
            buttons: ["Cancel","Yakin"],
            successMode: true
        })
        .then((confirm) => {
            if (confirm) {
              this.props.history.push('/mitra/login')
            }
        });
    }

    btn_UbahData(){
        var a = document.querySelector('.nama')
        var b = document.querySelector('.email')
        var c = document.querySelector('.password')
        a.disabled=false
        b.disabled=false
        c.disabled=false
        a.focus()
        document.querySelector('.simpan').style.display='block'
        document.querySelector('.ubah').style.display='none'
    }

  render() {
    return(
        <div>
            <div className='admin-nav'>
                <Link to={'/admin/'+(this.state.Id)}><img src={Logo} width='200'/></Link>
                <h1>ADMIN</h1>
            </div>
            <div className='container'>
                <div className='profil'>
                    <h2 style={{fontSize: '30px'}}>Hai {this.state.data_admin.Nama}</h2>
                    <small style={{borderBottom: '2px solid #1F3543', width: '50%', textAlign: 'center'}}>Id : {this.state.Id}</small>
                    <div className='nav-btn'>
                        <button className='btn-pengaturan' onClick={this.Pengaturan.bind(this)} style={{backgroundColor: 'rgb(185, 226, 194)'}}><GrUserSettings/>  Pengaturan</button>
                        <button className='btn-kolam' onClick={this.Kolam.bind(this)} style={{backgroundColor: 'rgb(181, 199, 225)'}}><FaSwimmingPool/>  Kelola Kolam</button>
                        <button className='btn-keluar' onClick={this.Keluar.bind(this)} style={{backgroundColor: 'rgb(225, 181, 181)'}}><GoSignOut/>  Keluar</button>
                    </div>
                </div>
                <div style={{minHeight: '42.9vmin', border: '1px solid WHITE'}}>
                    <div className='pengaturan'>
                        <h2 style={{borderBottom: '2px solid black', display: 'inline-block'}}>Pengaturan Akun</h2>
                        <div style={{margin: '30px 0px'}}>
                            <div className='row-data'>
                                <div>Nama</div>
                                <input className='input-data nama' type="text" value={this.state.Nama} name='Nama' onChange={this.setValue.bind(this)} disabled required/>
                            </div>
                            <div className='row-data'>
                                <div>E-Mail</div>
                                <input className='input-data email' type="text" value={this.state.Email} name='Email' onChange={this.setValue.bind(this)} disabled required/>
                            </div>
                            <div className='row-data'>
                                <div>Password</div>
                                <input className='input-data password' type="text" value={this.state.Password} name='Password' onChange={this.setValue.bind(this)} maxLength='8' disabled required/>
                            </div>
                        </div>
                        <button style={{float: 'left'}} className='ubah' onClick={this.btn_UbahData.bind(this)}>Ubah Data</button>
                        <button style={{float: 'left', display: 'none'}} className='simpan' onClick={this.UbahData.bind(this)}>Simpan</button>
                        <button style={{float: 'right'}} className='hapus' onClick={this.btn_HapusData.bind(this, this.state.Id)}>Hapus Akun</button>
                    </div>

                    <div className='kelola_kolam'>
                        <h2 style={{borderBottom: '2px solid black', display: 'inline-block'}}>Daftar Kolam</h2>
                        <div style={{margin: '30px 0px', display:"flex", justifyContent: 'center', maxWidth: '100%'}}>
                            {this.state.data_kolam.map((item, index) => (
                                <div key = {index} className='card-kolam'>
                                    <img className='gambar' src={'http://localhost:8000/gambar/'+item.Gambar1}/>
                                    <div>
                                        {item.Status == 0 ? <div className='status' style={{backgroundColor: 'Red'}}>Tutup</div>:<div className='status' style={{backgroundColor: 'Green'}}>buka</div>}
                                    </div>
                                    <div className='kota'><FiMapPin/> {item.Alamat}, {item.Kota}</div>
                                    <div className='nama'>{item.Nama}</div>
                                    <div className='telp'><IoCallSharp style={{fontSize: "16px"}}/>  {item.NoTelp}</div>
                                    <div className='harga'>{"Rp "+item.Harga.toLocaleString("id-ID")}</div>
                                    <div className='IdKlm'>ID: {item.IdKlm}</div>
                                    <Link to={'/edit/'+(item.IdKlm)} style={{textDecoration: "none"}}><div className='btn-edit' onClick='{}'>Edit</div></Link>
                                </div> 
                            ))}
                        </div>
                        <Link to={'/tambah/'+(this.state.Id)} style={{textDecoration: "none"}}><button className='tambah' ><MdOutlineAddCircleOutline/>  Tambah Kolam</button></Link>
                    </div>
                </div>
            </div>
            <div className='admin-footer'>
                <small>
                    &copy; Copyright 2021 Izipizipool
                </small>
            </div>
        </div>
    )
  }
}

export default Admin;
