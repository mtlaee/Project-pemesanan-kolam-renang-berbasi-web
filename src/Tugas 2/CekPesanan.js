import React, { Component } from 'react'
import Logo from './Gambar/logo1.png';
import { Link } from "react-router-dom";
import {FiSearch} from 'react-icons/fi';
import {FaInstagram, FaFacebook, FaTwitter} from "react-icons/fa";
import Install from './Gambar/HomePage/InstallApp.png'
import moment from 'moment';
import QRCode from 'react-qr-code';
import swal from 'sweetalert';

var waktu = moment().format('DD MMM YYYY')

export class CekPesanan extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.id,
            data : []
        }
    }

    getvalues_cari(ev){
        this.setState({
            id : ev.target.value
        })
    }

    get_a_data(){
        fetch('http://localhost:8000/cek_pesanan/'+this.state.id)
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
    
    cek_pencarian(){
        var a = document.querySelector('.search')
        if(a.value==""){
            a.focus();
        }
        else{
            this.props.history.push('/cek_pesanan/'+this.state.id);
            this.get_a_data(this)
        }
    }

    kirim_tiket(a){
        swal("Berhasil", "Bukti pembelian tiket telah dikirimkan ke "+a, "success")
    }

    render() {
        return (
            <div className='main'>
                <div className='container'>
                    <div style={{color:"#8B8B8B", display: "flex", flexDirection: "column", alignItems:"center", marginTop:'30px'}}>
                        <Link to='/'><img src={Logo} alt='Logo' style={{width: 250, marginBottom:15}}/></Link>
                        <div style={{width:350, fontSize:"18px", fontWeight: "bold", textAlign:"center", marginBottom: '50px'}}>Hai... Terima kasih telah melakukan pembelian tiket di IzipiziPool.</div>
                        <div className='search-box3'>
                            <FiSearch className='btn-search3' onClick={this.cek_pencarian.bind(this)}/>
                            <input type="text" name='id' className='form-control search' value={this.state.cari} onChange={this.getvalues_cari.bind(this)} placeholder="Masukkan Id pemesanan mu dikolom pencarian ini"/>
                        </div>
                    </div>
                    <div className='slot'>
                        {this.state.data.map((item, index) => (
                            <div key = {index} className='tiket'>
                                <img className='gambar-tiket' src={'http://localhost:8000/gambar/'+item.Gambar1}/>
                                <div className='ket-tiket'>
                                    <QRCode value={item.IdOrd} size='90' className='QRCode-tiket'/>
                                    <div className='tanggal-tiket'>
                                        <div>Id : {item.IdOrd} ({item.MasaBerlaku})</div>
                                        {item.MasaBerlaku >= waktu ? <div className='exp-tiket'>Tiket Tersedia</div>:<div className='exp-tiket'>Tiket Kadaluarsa</div>}
                                    </div>
                                    <div style={{textAlign: 'right', fontSize:'13px', padding: '5px 0px'}}>Tgl Pembelian : {item.TanggalPsn}</div>
                                    <div>
                                        <div style={{fontSize:'25px', fontWeight: 'bold', padding:'0'}}>{item.Nama}</div>
                                        <small>Lokasi : {item.Alamat}, {item.Kota}</small>
                                    </div>
                                    <div style={{marginTop: '10px'}}>a/n : {item.NamaCstmr}</div>
                                    <div>{"Rp "+item.Harga.toLocaleString("id-ID")} x {item.Qty} = <span style={{fontWeight: 'bold'}}>{"Rp "+item.Total.toLocaleString("id-ID")} ({item.Pembayaran})</span></div>
                                    <div className='kirim-tiket' onClick={this.kirim_tiket.bind(this,item.EmailCstmr)}>kirim bukti pembelian lagi?</div>
                                </div>
                            </div> 
                        ))}
                    </div>
                </div>
                <footer>
                    <small className='ikuti'>
                        <div style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '10px'}}>Ikuti Kami</div>
                        <ul>
                            <li><a href="https://www.instagram.com/jokowi/" target="_blank"><FaInstagram/> Instagram</a></li>
                            <li><a href="https://id-id.facebook.com/Jokowi" target="_blank"><FaFacebook/> Facebook</a></li>
                            <li><a href="https://twitter.com/jokowi" target="_blank"><FaTwitter/> Twitter</a></li>
                        </ul>
                    </small>
                    <small className='layanan'>
                        <div style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '10px'}}>Layanan Pelanggan</div>
                        <ul>
                            <li><a href="/bantuan" target='_blank'>Bantuan</a></li>
                            <li>Kontak Kami:</li>
                            <ol style={{marginLeft: '10px'}}>
                                <li>+62811648009</li>
                                <li><a href="mailto:192110975@students.mikroskil.ac.id">izipizipool@gmail.com</a></li>
                            </ol>
                        </ul>
                    </small>
                    <small className='ketentuan'>
                        <div style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '10px'}}>Ketentuan Kebijakan</div>
                        <ul>
                            <li><a href="/kebijakanlayanan" target='_blank'>Kebijakan Izipizipool</a></li>
                            <li><a href="/kebijakankomunitas" target='_blank'>Kebijakan Komunitas</a></li>
                            <li><a href="/kebijakanpengguna" target='_blank'>Kebijakan Pribadi</a></li>
                        </ul>
                    </small>
                    <small className='aplikasi'>
                        <p style={{marginBottom:'10PX', fontWeight: 'bold', fontSize: '30px'}}>Download Aplikasi</p>
                        <p style={{marginBottom:'10px'}}>Nikmati beragam kemudahan dalam bertransaksi via mobile-app. Unduh aplikasi <b>Izipizipool</b> sekarang juga dan rasakan keuntungan tak terhingga&#33;</p>
                        <a href=""><img src={Install} alt='Install' width="100%" height="50"/></a>
                    </small>
                    <small className='penutup'>
                        &copy; Copyright 2021 Izipizipool
                    </small>
                </footer>
            </div>
        )
    }
}

export default CekPesanan
