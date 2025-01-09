import React, { Component } from 'react';
import Logo from './Gambar/logo1.png';
import { Link, withRouter } from "react-router-dom";
import swal from 'sweetalert';


export class EditKolam extends Component {
    constructor(props){
        super(props)
        this.state =  {
            IdKlm : this.props.match.params.id,
            Nama: "",
            Alamat: "",
            Kota:"",
            NoTelp:"",
            Harga:0,
            Status:0,
            DataKlm :[],
        }
    }

    componentDidMount(){
        fetch('http://localhost:8000/detail/kolam/'+this.state.IdKlm)
        .then(response => response.json())
        .then(res =>{
            this.setState({
                Nama: res.Nama,
                Alamat : res.Alamat,
                Kota : res.Kota,
                NoTelp : res.NoTelp,
                Harga : res.Harga,
                Status : res.Status,
                DataKlm : res
            })

            if(this.state.DataKlm.Status==0){
                document.getElementById("checkbox").checked=false
            }
            else{document.getElementById("checkbox").checked=true}

            this.Switch()
        })
        .catch(error => {
            console.log(error);
        })
    }

    setValue(ev){
        this.setState({
            [ev.target.name] : [ev.target.value]
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

    simpan_Gambar1(ev){
        var data = new FormData();
        data.append('fileImage', ev.target.files[0])
        fetch('http://localhost:8000/detail/kolam/gambar1/'+this.state.IdKlm,{
            method : 'PUT',
            body : data
        }).then(response=>response.json())
        .then(res=>{
            console.log(res);
            this.componentDidMount();
            document.getElementById("gambar1").value=''
        })
        .catch(error =>{
            swal('Data galeri gagal disimpan')
        })
    }

    simpan_Gambar2(ev){
        var data = new FormData();
        data.append('fileImage', ev.target.files[0])
        fetch('http://localhost:8000/detail/kolam/gambar2/'+this.state.IdKlm,{
            method : 'PUT',
            body : data
        }).then(response=>response.json())
        .then(res=>{
            console.log(res);
            this.componentDidMount();
            document.getElementById("gambar2").value=''
        })
        .catch(error =>{
            swal('Data galeri gagal disimpan')
        })
    }

    simpan_Gambar3(ev){
        var data = new FormData();
        data.append('fileImage', ev.target.files[0])
        fetch('http://localhost:8000/detail/kolam/gambar3/'+this.state.IdKlm,{
            method : 'PUT',
            body : data
        }).then(response=>response.json())
        .then(res=>{
            console.log(res);
            this.componentDidMount();
            document.getElementById("gambar3").value=''
        })
        .catch(error =>{
            swal('Data galeri gagal disimpan')
        })
    }

    simpan_Gambar4(ev){
        var data = new FormData();
        data.append('fileImage', ev.target.files[0])
        fetch('http://localhost:8000/detail/kolam/gambar4/'+this.state.IdKlm,{
            method : 'PUT',
            body : data
        }).then(response=>response.json())
        .then(res=>{
            console.log(res);
            this.componentDidMount();
            document.getElementById("gambar4").value=''
        })
        .catch(error =>{
            swal('Data galeri gagal disimpan')
        })
    }

    btn_UbahData(){
        var a = document.querySelector('.nama')
        var b = document.querySelector('.alamat')
        var c = document.querySelector('.kota')
        var d = document.querySelector('.notelp')
        var e = document.querySelector('.harga')
        a.disabled=false
        b.disabled=false
        c.disabled=false
        d.disabled=false
        e.disabled=false
        a.focus()
        document.querySelector('.simpan-data-kolam').style.display='block'
        document.querySelector('.ubah-data-kolam').style.display='none'
    }

    UbahData(){
        fetch('http://localhost:8000/detail/kolam/data/'+this.state.IdKlm,
            {
                method : 'PUT',
                headers : {
                    accept : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    Nama : this.state.Nama,
                    Alamat : this.state.Alamat,
                    Kota : this.state.Kota,
                    NoTelp : this.state.NoTelp,
                    Harga : this.state.Harga,
                    Status : this.state.Status
                })
            }
        ).then((response=>response.json()))
        .then(res=>{
            this.componentDidMount()
            document.querySelector('.nama').disabled=true
            document.querySelector('.alamat').disabled=true
            document.querySelector('.kota').disabled=true
            document.querySelector('.notelp').disabled=true
            document.querySelector('.harga').disabled=true
            document.querySelector('.simpan-data-kolam').style.display='none'
            document.querySelector('.ubah-data-kolam').style.display='block'
            swal("Berhasil", "Data dengan ID "+this.state.IdKlm+" berhasil di ubah!", "success")
        })
    }

    HapusData(id){
        fetch(
            'http://localhost:8000/kolam/delete/'+this.state.IdKlm,
            {
                method : 'DELETE'
            }
        ).then((response=>response.json()))
        .then(res=>{
            swal("Berhasil", "Kolam dengan ID "+id+" berhasil di hapus!", "success")
            this.props.history.goBack()
        })
    }

    btn_HapusData(id){
        swal({
            title: "Yakin ingin menghapus kolam ini?",
            text: "Semua data didalamnya akan hilang dan tidak bisa di kembalikan",
            icon: "warning",
            buttons: ["Batal","Yakin"],
            successMode: true
        })
        .then((confirm) => {
            if (confirm) {
              this.HapusData(id)
            }
        });
    }

  render() {
    return(
        <div>
            <div className='admin-nav'>
                <Link to={'/admin/'+(this.state.IdOwn)}><img src={Logo} width='200'/></Link>
                <h1>ADMIN</h1>
            </div>
            <div className='container-kelola'>
                <div className='head-kelola'>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 20px', alignItems: 'center'}}>
                        <h3 style={{fontSize: '30px'}}>{this.state.DataKlm.Nama}</h3>
                        <div style={{fontSize: '20px', fontWeight: 'bold'}}>Id: {this.state.IdKlm}</div>
                    </div>
                    <div style={{display: 'flex', padding:'0px 10px'}}>
                        <div className='keterangan-kelola'>
                            <div className='keterangan-text-kelola'>Pengunjung Hari Ini</div>
                            {this.state.DataKlm.pengunjung == null ? <div className='keterangan-data-kelola'>0 orang</div>:<div className='keterangan-data-kelola'>{this.state.DataKlm.pengunjung} orang</div>}
                        </div>
                        <div className='keterangan-kelola'>
                            <div className='keterangan-text-kelola'>Total Pengunjung</div>
                            {this.state.DataKlm.totalpengunjung == null ? <div className='keterangan-data-kelola'>0 orang</div>:<div className='keterangan-data-kelola'>{this.state.DataKlm.totalpengunjung} orang</div>}
                        </div>
                        <div className='keterangan-kelola'>
                            <div className='keterangan-text-kelola'>Pendapatan Hari Ini</div>
                            {this.state.DataKlm.pemasukkan == null ? <div className='keterangan-data-kelola'>Rp 0</div>:<div className='keterangan-data-kelola'>{"Rp "+this.state.DataKlm.pemasukkan.toLocaleString("id-ID")}</div>}
                        </div>
                        <div className='keterangan-kelola'>
                            <div className='keterangan-text-kelola'>Total Pendapatan</div>
                            {this.state.DataKlm.totalpemasukkan == null ? <div className='keterangan-data-kelola'>Rp 0</div>:<div className='keterangan-data-kelola'>{"Rp "+this.state.DataKlm.totalpemasukkan.toLocaleString("id-ID")}</div>}
                        </div>
                    </div>
                </div>
                <div className='media-kelola'>
                    <div className='media-gambar-kelola'>
                        <div className='media-text-kelola'>Gambar 1</div>
                        <img src={'http://localhost:8000/gambar/'+this.state.DataKlm.Gambar1} />
                        <div className='media-ubahgambar-kelola'>Ubah Gambar <input accept="image/*" type="file" id='gambar1' onChange={this.simpan_Gambar1.bind(this)}/></div>
                    </div>
                    <div className='media-gambar-kelola'>
                        <div className='media-text-kelola'>Gambar 2</div>
                        <img src={'http://localhost:8000/gambar/'+this.state.DataKlm.Gambar2} />
                        <div className='media-ubahgambar-kelola'>Ubah Gambar <input accept="image/*" type="file" id='gambar2' onChange={this.simpan_Gambar2.bind(this)}/></div>
                    </div>
                    <div className='media-gambar-kelola'>
                        <div className='media-text-kelola'>Gambar 3</div>
                        <img src={'http://localhost:8000/gambar/'+this.state.DataKlm.Gambar3} />
                        <div className='media-ubahgambar-kelola'>Ubah Gambar <input accept="image/*" type="file" id='gambar3' onChange={this.simpan_Gambar3.bind(this)}/></div>
                    </div>
                    <div className='media-gambar-kelola'>
                        <div className='media-text-kelola'>Gambar 4</div>
                        <img src={'http://localhost:8000/gambar/'+this.state.DataKlm.Gambar4} />
                        <div className='media-ubahgambar-kelola'>Ubah Gambar <input accept="image/*" type="file" id='gambar4' onChange={this.simpan_Gambar4.bind(this)}/></div>
                    </div>
                </div>
            
            
            <h2 style={{borderBottom: '2px solid black', display: 'inline-block', margin: '15px 0px'}}>Pengaturan Kolam</h2>
                <div style={{margin: '30px 25%', width: '50%'}}>
                    <div className='row-data-kolam'>
                         <div className='teks'>Nama Kolam</div>
                        <input className='input-data nama' type="text" value={this.state.Nama} name='Nama' onChange={this.setValue.bind(this)} disabled required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Alamat</div>
                        <input className='input-data alamat' type="text" value={this.state.Alamat} name='Alamat' onChange={this.setValue.bind(this)} disabled required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Kota</div>
                        <input className='input-data kota' type="text" value={this.state.Kota} name='Kota' onChange={this.setValue.bind(this)} disabled required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>No Telepon</div>
                        <input className='input-data notelp' type="text" value={this.state.NoTelp} name='NoTelp' onChange={this.setValue.bind(this)} disabled required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Harga</div>
                        <input className='input-data harga' type="number" value={this.state.Harga} name='Harga' onChange={this.setValue.bind(this)} disabled required/>
                    </div>
                    <div className='row-data-kolam'>
                        <div className='teks'>Status</div>
                        <span className='switch'>
                            <div className='btn-switch'></div>
                            <input id='checkbox' type='checkbox' onClick={this.Switch.bind(this)}/>
                        </span>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: "space-around"}}>
                    <button className='tombol ubah-data-kolam' onClick={this.btn_UbahData.bind(this)}>Ubah Data</button>
                    <button style={{display: 'none'}} className='tombol simpan-data-kolam' onClick={this.UbahData.bind(this)}>Simpan Perubahan</button>
                    <button className='tombol hapus-data-kolam' onClick={this.btn_HapusData.bind(this, this.state.Id)}>Hapus Kolam</button>
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

export default EditKolam;
