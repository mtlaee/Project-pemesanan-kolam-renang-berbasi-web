import React, { Component } from 'react'
import Logo from './Gambar/logo1.png';
import { Link, withRouter } from "react-router-dom";
import {FiSearch, FiMapPin} from 'react-icons/fi';
import {FaInstagram, FaFacebook, FaTwitter} from "react-icons/fa";
import Install from './Gambar/HomePage/InstallApp.png'

export class Cari_Kolam extends Component {
    constructor(props){
        super(props);
        this.state={
            cari : this.props.match.params.text,
            data : []
        }
    }

    getvalues_cari(ev){
        this.setState({
            cari : ev.target.value
        })
    }

    componentDidMount(){
        fetch('http://localhost:8000/cari/'+this.state.cari)
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
            this.props.history.push('/cari/'+this.state.cari);
            this.componentDidMount(this)
        }
    }

    render() {
        return (
            <div className='main'>
                <div className='container'>
                    <div style={{color:"#8B8B8B", display: "flex", flexDirection: "column", alignItems:"center", marginTop:'30px'}}>
                        <Link to='/'><img src={Logo} alt='Logo' style={{width: 250, marginBottom:15}}/></Link>
                        <div className="a" style={{width:350, fontSize:"18px", fontWeight: "bold", textAlign:"center"}}>Kami menawarkan lebih dari 100+ kolam berenang pilihan anda yang pastinya dengan kualitas terbaik.</div>
                    </div>
                    <div className='varian'>
                        <div className='text'>
                            <div style={{fontSize: "20px", fontWeight: "bold"}}>Pilih Kolam Anda</div>
                            <div className='search-box2'>
                                <FiSearch className='btn-search' onClick={this.cek_pencarian.bind(this)}/>
                                <input type="text" className='form-control search' value={this.state.cari} onChange={this.getvalues_cari.bind(this)} placeholder="Cari Kolam Berenang Pilihan Anda"/>
                            </div>
                        </div>
                        <div className='produk'>
                           {this.state.data.map((item, index) => (
                                <div key = {index} className='card'>
                                    <img className='gambar-kolam' src={'http://localhost:8000/gambar/'+item.Gambar1}/>
                                    <div>
                                        {item.Status == 0 ? <div className='status-kolam' style={{backgroundColor: 'Red'}}>Tutup</div>:<div className='status-kolam' style={{backgroundColor: 'Green'}}>buka</div>}
                                    </div>
                                    <div className='kota-kolam'><FiMapPin/> {item.Kota}</div>
                                    <div className='nama-kolam'>{item.Nama}</div>
                                    <div className='harga-kolam'>
                                        <div style={{fontSize: '20px', fontWeight: 'bold'}}>{"Rp "+item.Harga.toLocaleString("id-ID")}</div>
                                        <Link to={'/detail/'+(item.IdKlm)} style={{textDecoration: "none"}}><div className='btn-detail'>Detail</div></Link>
                                    </div>
                                </div> 
                            ))}
                        </div>
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

export default withRouter(Cari_Kolam)
