import React, { Component } from 'react';
import Logo from './Gambar/logo1.png';
import { Link, withRouter } from "react-router-dom";
import swal from 'sweetalert';
import uuid from 'react-uuid';

const id = uuid().toString().replace("-","").substring(0,7);

export class Admin extends Component {
    constructor(props){
        super(props)
        this.state =  {
            IdKlm : id,
            IdOwn : this.props.match.params.id,
            Nama: "",
            Alamat: "",
            Kota:"",
            NoTelp:"",
            Harga:0,
            Gambar: null,
            urlgambar1: null,
            urlgambar2: null,
            urlgambar3: null,
            urlgambar4: null,
            Status:0
        }
    }

    setValue(ev){
        this.setState({
            [ev.target.name] : [ev.target.value]
        })
    }

    getfiles(ev){
        this.setState({
            Gambar : ev.target.files,
            urlgambar1 : URL.createObjectURL(ev.target.files[0]),
            urlgambar2 : URL.createObjectURL(ev.target.files[1]),
            urlgambar3 : URL.createObjectURL(ev.target.files[2]),
            urlgambar4 : URL.createObjectURL(ev.target.files[3])
        })
        console.log(ev.target.files)
    }

    simpan_galeri(){
        var data = new FormData();
        for(var item of this.state.Gambar)
            data.append('fileImage',item)//tambahkan fileImage sebanyak file yang dipilih
        data.append('IdKlm', this.state.IdKlm)
        data.append('IdOwn', this.state.IdOwn)
        data.append('Nama', this.state.Nama)
        data.append('Alamat', this.state.Alamat)
        data.append('Kota', this.state.Kota)
        data.append('NoTelp', this.state.NoTelp)
        data.append('Harga', this.state.Harga)
        data.append('Status', this.state.Status)
        fetch('http://localhost:8000/kolam/post',{
            method : 'POST',
            body : data
        }).then(response=>response.json())
        .then(res=>{
            console.log(res);
            this.props.history.push('/admin/'+this.state.IdOwn)
            swal("","Kolam dengan Id "+this.state.IdKlm+" berhasil ditambahkan","success")
        })
        .catch(error =>{
            swal("","Data gagal ditambahkan","error")
        })
    }

    Switch(){
        var CheckBox = document.getElementById("checkbox")
        if (CheckBox.checked == true){
            document.querySelector('.switch').style.background = "green"
            document.querySelector('.btn-switch').style.right = 0
            this.setState({Status:1})
        }
        else{
            document.querySelector('.switch').style.background = "#797979"
            document.querySelector('.btn-switch').style.right = null
            this.setState({Status:0})
        }
    }

  render() {
    return(
        <div>
            <div className='admin-nav'>
                <Link to={'/admin/'+(this.state.IdOwn)}><img src={Logo} width='200'/></Link>
                <h1>ADMIN</h1>
            </div>
            <div className='container'>
            <h2 style={{borderBottom: '2px solid black', display: 'inline-block', margin: '15px 0px'}}>Tambah Kolam</h2>
                <div style={{margin: '30px 25%', width: '50%'}}>
                    <div className='row-data-kolam'>
                         <div className='teks'>Nama Kolam</div>
                        <input className='input-data' type="text" value={this.state.Nama} name='Nama' onChange={this.setValue.bind(this)} required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Alamat</div>
                        <input className='input-data' type="text" value={this.state.Alamat} name='Alamat' onChange={this.setValue.bind(this)} required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Kota</div>
                        <input className='input-data' type="text" value={this.state.Kota} name='Kota' onChange={this.setValue.bind(this)} required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>No Telepon</div>
                        <input className='input-data' type="text" value={this.state.NoTelp} name='NoTelp' onChange={this.setValue.bind(this)} required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Harga</div>
                        <input className='input-data' type="number" value={this.state.Harga} name='Harga' onChange={this.setValue.bind(this)} required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Masukkan 4 Gambar</div>
                        <input multiple accept="image/*" type="file" onChange={this.getfiles.bind(this)}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <img src={this.state.urlgambar1} width='110' height='110'/>
                        <img src={this.state.urlgambar2} width='110' height='110'/>
                        <img src={this.state.urlgambar3} width='110' height='110'/>
                        <img src={this.state.urlgambar4} width='110' height='110'/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Status</div>
                        <span className='switch'>
                            <div className='btn-switch'></div>
                            <input id='checkbox' type='checkbox' onClick={this.Switch.bind(this)}/>
                        </span>
                    </div>
                    <button onClick={this.simpan_galeri.bind(this)} className="btn-tambah">Tambahkan Data</button>
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
