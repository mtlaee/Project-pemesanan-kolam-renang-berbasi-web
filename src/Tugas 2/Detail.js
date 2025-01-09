import React, { Component } from 'react';
import uuid from 'react-uuid';
import moment from 'moment';
import { Link, withRouter } from "react-router-dom";
import Logo from './Gambar/logo1.png';
import { BsStarFill, BsChatLeftTextFill } from 'react-icons/bs'
import {IoTicketSharp, IoLocationOutline, IoDocumentTextSharp} from'react-icons/io5'
import { BiBuildings } from "react-icons/bi";
import {FaInstagram, FaFacebook, FaTwitter} from "react-icons/fa";
import Install from './Gambar/HomePage/InstallApp.png'
import swal from 'sweetalert';

const id = uuid().toString().replace("-","").substring(0,7);
const tgl_psn = moment().format('YYYY-MM-DD hh:mm:ss');
var harga = 0;

export class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            IdKlm : this.props.match.params.id,
            IdOrd : id,
            TanggalPsn : tgl_psn,
            MasaBerlaku : "",
            NamaCstmr : "",
            EmailCstmr : "",
            Qty : 1,
            Pembayaran : "Transfer Bank",
            Total : 0,
            data : []
        }
    }

    setValue(ev){
        this.setState({
            [ev.target.name] : [ev.target.value]
        })
        this.total()
    }

    componentDidMount(){
        fetch('http://localhost:8000/detail/'+this.state.IdKlm)
        .then(response=>response.json())
        .then(res=>{
            this.setState({
                data:res
            })
        }).then(res=>{console.log(this.state.data)})
        .catch(error => {
            console.log(error);
        })
    }

    ubahgambar(ev){
        document.querySelector('.gambar-detail').src = ev.target.src;
    }

    bookingnow(abc){
        var a =document.querySelector('.pemesanan');
        if(abc!==0){
            a.style.display="block";
            a.focus()
            document.querySelector('.nama').focus()
        }
        else{
            swal("Kolam berenang tidak tersedia!")
        }
    }

    total(){
        var a = document.querySelector('.qty').value
        var b = document.querySelector('.total')
        b.value = a * harga;
        this.state.Total = b.value
    }

    TambahData(){
        fetch(
            'http://localhost:8000/pemesanan/post',
            {
                method : 'POST',
                headers : {
                    accept : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    IdOrd : this.state.IdOrd,
                    IdKlm : this.state.IdKlm,
                    TanggalPsn : this.state.TanggalPsn,
                    MasaBerlaku : this.state.MasaBerlaku,
                    EmailCstmr : this.state.EmailCstmr,
                    Qty : this.state.Qty,
                    Pembayaran : this.state.Pembayaran,
                    Total : this.state.Total
                })
            }
        ).then((response=>response.json()))
        .then(res=>{
            this.props.history.push('/')
            swal("Pemesanan dengan id '"+this.state.IdOrd+ "' berhasil dilakukan", "Cek email "+this.state.EmailCstmr+" untuk melihat tiket", "success")
        })
    }

    render() {
        return (
            <div className='main'>
                <div className='container'>
                    <Link to='/'><img src={Logo} alt='Logo' style={{width: 250, marginTop: "30px"}}/></Link>
                    {this.state.data.map((item, index) => (
                        <div className='detail-kolam'>
                            <div className='gambar-detail-kolam'>
                                <img src={'http://localhost:8000/gambar/'+item.Gambar1} className='gambar-detail'/>
                                <img src={'http://localhost:8000/gambar/'+item.Gambar1} className='gambar-detail1 opsi' onClick={this.ubahgambar.bind(this)}/>
                                <img src={'http://localhost:8000/gambar/'+item.Gambar2} className='gambar-detail2 opsi' onClick={this.ubahgambar.bind(this)}/>
                                <img src={'http://localhost:8000/gambar/'+item.Gambar3} className='gambar-detail3 opsi' onClick={this.ubahgambar.bind(this)}/>
                                <img src={'http://localhost:8000/gambar/'+item.Gambar4} className='gambar-detail4 opsi' onClick={this.ubahgambar.bind(this)}/>
                            </div>
                            <div style={{padding: "15px 30px", width: "50%"}}>
                                <div style={{display: "flex"}}>
                                    <div style={{fontSize: "40px", fontWeight: "bold", letterSpacing: "3px"}}>{item.Nama}</div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        {item.Status == 0 ? <div className='status-detail-kolam' style={{backgroundColor: 'Red'}}>Tutup</div>:<div className='status-detail-kolam' style={{backgroundColor: 'Green'}}>buka</div>}
                                    </div>
                                </div>
                                <div style={{display: "flex", color:"#8b8b8bde"}}>
                                    <div style={{padding: "0px 15px 0px 0px",}}>Rating : 4.5 <BsStarFill/></div>
                                    <div style={{padding: "0px 15px 0px 15px", borderLeft: "1px solid #8b8b8bde", borderRight: "1px solid #8b8b8bde"}}><BsChatLeftTextFill/> 200 Komentar</div>
                                    {item.tiket == null ? <div style={{padding: "0px 0px 0px 15px"}}><IoTicketSharp/> 0 Tiket Terjual</div>:<div style={{padding: "0px 0px 0px 15px"}}><IoTicketSharp/> {item.tiket} Tiket Terjual</div>}
                                </div>
                                <div className='harga-detail-kolam' onChange={harga = item.Harga}>{"Harga : Rp "+item.Harga.toLocaleString("id-ID")}</div>
                                <div style={{margin: "30px 0px 30px 0px"}}>
                                    <div style={{display: "flex", margin: "10px 0px"}}><div style={{width: "120px", padding: "10px"}}>Kota</div><div style={{padding: "10px 15px", boxShadow: "0px 2px 5px #8b8b8bde", borderRadius: "10px"}}><BiBuildings style={{marginRight: "10px"}}/>{item.Kota}</div></div>
                                    <div style={{display: "flex", margin: "10px 0px"}}><div style={{width: "120px", padding: "10px"}}>Alamat</div><div style={{padding: "10px 15px", boxShadow: "0px 2px 5px #8b8b8bde", borderRadius: "10px"}}><IoLocationOutline style={{marginRight: "10px"}}/>{item.Alamat}</div></div>
                                    <div style={{display: "flex", margin: "10px 0px"}}><div style={{width: "120px", padding: "10px"}}>Telepon</div><div style={{padding: "10px 15px", boxShadow: "0px 2px 5px #8b8b8bde", borderRadius: "10px"}}>{item.NoTelp}</div></div>
                                </div>
                                <button className='btn-booking' onClick={this.bookingnow.bind(this, item.Status)}>Booking Now</button>
                            </div>
                        </div>
                    ))}
                    <div tabIndex='-1' className='pemesanan'>
                        <h1 style={{marginBottom: "20px"}}>Pemesanan</h1>
                        <div className='row-data'>
                            <div>Nama Pemesan</div>
                            <input className='input-data nama' type="text" name='NamaCstmr' onChange={this.setValue.bind(this)} required/>
                        </div>
                        <div className='row-data'>
                            <div>Email Pemesan</div>
                            <input className='input-data' type="email" name='EmailCstmr' onChange={this.setValue.bind(this)} required/>
                        </div>
                        <div className='row-data'>
                            <div>Tanggal Berenang</div>
                            <input className='input-data' type="date" name='MasaBerlaku' onChange={this.setValue.bind(this)} min={moment().format('YYYY-MM-DD')} required/>
                        </div>
                        <div className='row-data'>
                            <div>Jumlah Tiket</div>
                            <input className='input-data qty' type="number" onChange={this.setValue.bind(this)} name='Qty' min="1" max="50" required/>
                        </div>
                        <div className='row-data'>
                            <div>Pembayaran</div>
                            <select name='Pembayaran' value={this.state.Pembayaran} onChange={this.setValue.bind(this)}>
								<option>Transfer Bank</option>
								<option>OVO</option>
								<option>Gopay</option>
								<option>Dana</option>
							</select>
                        </div>
                        <div className='row-data'>
                            <div>Total</div>
                            <input className='input-data total' type="text" name='Total' onChange={this.setValue.bind(this)} disabled/>
                        </div>
                        <button type='submit' className='btn-pesan' onClick={this.TambahData.bind(this)}>Pesan</button>
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

export default Detail
