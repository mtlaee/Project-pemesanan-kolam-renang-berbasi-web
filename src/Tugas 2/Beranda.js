import React, { Component } from 'react';
import './Styling.css';
import Logo from './Gambar/logo.png';
import { BiBookAlt, BiBuildings } from "react-icons/bi";
import {FaHandshake, FaInstagram, FaFacebook, FaTwitter} from "react-icons/fa";
import {FiSearch, FiRefreshCw, FiDollarSign} from 'react-icons/fi';
import {IoLocationOutline, IoTicketSharp} from "react-icons/io5"
import { withRouter, Link } from "react-router-dom";
import Medan from './Gambar/HomePage/Medan.jfif'
import Bali from './Gambar/HomePage/Bali.jfif'
import Lombok from './Gambar/HomePage/Lombok.jfif'
import Jakarta from './Gambar/HomePage/Jakarta.jfif'
import Peta from './Gambar/HomePage/Peta.png'
import Install from './Gambar/HomePage/InstallApp.png'

class beranda extends Component {
    constructor(){
        super();
        this.state = {
            cari : ''
        }
    }

    getvalues_cari(ev){
        this.setState({
            cari : ev.target.value
        })
    }

    cek_pencarian(){
        var a = document.querySelector('.search')
        if(a.value==""){
            a.focus();
        }
        else{
            this.props.history.push('/cari/'+this.state.cari);
        }
    }

    render() {
        return (
            <div className='main'>
                <div className='awal'>
                    <div className='nav'>
                        <Link to='/'><img src={Logo}/></Link>
                        <div className='menu'>
                            <Link to='/'>Beranda</Link>
                            <a href='/kolam'>Pemesanan</a>
                            <a href='/cek_pesanan/0'>Cek Pesanan</a>
                            <a href='#tentang'>Tentang Kami</a>
                        </div>
                        <a href='/mitra/login' className='login'>Login Mitra</a>
                    </div>
                    <div className='welcome'>
                        <h1>Selamat Datang</h1>
                        <p>"Kami adalah salah satu web yang menyajikan<br/>booking kolam berenang di seluruh Indonesia"</p>
                        <div className='search-box1'>
                            <FiSearch className='btn-search' onClick={this.cek_pencarian.bind(this)}/>
                            <input type="text" formAction={this.cek_pencarian.bind(this)} className='form-control search' onChange={this.getvalues_cari.bind(this)} placeholder="Cari Kolam Berenang Pilihan Anda"/>
                        </div>
                    </div>
                </div>
                <div className='fitur'>
                    <div className='text'>
                        <p style={{fontSize: '40px',fontWeight: 'bold', marginBottom: '10px'}}>Kamu Akan Mendapatkan<br/>Pengalaman Yang Berbeda</p>
                        <p style={{color: '#8B8B8B'}}><span style={{fontWeight: 'bold', letterSpacing: '1.2px', fontSize: '20px'}}>Pool Facilities</span><br/>Kami menawarkan fasilitas kolam terbaik hanya untuk anda</p>
                    </div>
                    <div className='gambar-fitur'>
                        <div style={{display: 'flex'}}>
                            <div className='kotak'></div>
                            <div className='kotak' style={{background: '#B0B0B0'}}><BiBookAlt className='icon'/>Booking</div>
                              <div className='kotak'><FaHandshake className='icon'/>Partner Join</div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div className='kotak' style={{background: '#B0B0B0'}}><IoLocationOutline className='icon'/>Check Location</div>
                            <div className='kotak'><FiRefreshCw className='icon'/>Update</div>
                            <div className='kotak' style={{background: '#B0B0B0'}}><FiDollarSign className='icon'/>Cheap</div>
                        </div>
                    </div>
                </div>
                <div className='pool'>
                    <p style={{fontSize: '40px',fontWeight: 'bold',}}>Our Pool</p>
                    <p style={{color: '#8B8B8B', fontWeight: 'bold', fontSize: '20px', marginBottom: '15px'}}>Pool Gallery</p>
                    <div className='row'>
                        <div className='kota satu'>
                            <img src={Medan} alt='Medan'/>
                            <div className='kota-text'>Medan</div>
                        </div>
                        <div className='kota dua'>
                            <img src={Bali} alt='Bali'/>
                            <div className='kota-text'>Bali</div>
                        </div>
                        <div className='kota tiga'>
                           <img src={Lombok} alt='Lombok'/>
                            <div className='kota-text'>Lombok</div>
                        </div>
                        <div className='kota empat'>
                            <img src={Jakarta} alt='Jakarta'/>
                            <div className='kota-text'>Jakarta</div>
                        </div>
                    </div>
                    <Link to='/kolam'><p className='viewall'>VIEW ALL &gt;&gt;</p></Link>
                </div>
                <div id='tentang'>
                    <div className='kiri'>
                        <p style={{fontSize: '40px',fontWeight: 'bold', marginBottom: '10px'}}>Tentang Kami</p>
                        <p style={{fontWeight: 'bold',}}>Kami berdiri sejak 2021, dengan tujuan untuk menghubungkan penyedia kolam berenang dengan para pelanggan secara online.</p>
                    </div>
                    <div className='kanan'>
                        <div className='bagian ganjil'>
                            <IoTicketSharp className='icon'/>
                            <div className='text'>Sale<br/><span className='jumlah'>1.000.000+</span></div>
                        </div>
                        <div className='bagian'>
                            <FaHandshake className='icon'/>
                            <div className='text'>Partner<br/><span className='jumlah'>100+</span></div>
                        </div>
                        <div className='bagian ganjil'>
                            <BiBuildings className='icon'/>
                            <div className='text'>Cities<br/><span className='jumlah'>50+</span></div>
                        </div>
                    </div>
                </div>
                <img className='peta' src={Peta} alt="Peta"/>
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

export default withRouter(beranda)