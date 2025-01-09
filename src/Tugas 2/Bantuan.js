import React, { Component } from 'react';
import { BsTelephone, BsEnvelope } from 'react-icons/bs'

export class Bantuan extends Component {
  render() {
    return(
        <div className='main-help'>
            <h1>Pertanyaan yang sering ditanyakan</h1>
            <div className='faq'>
                <div className='card-help'>
                    <div className='card-header-help'>Apakah pemesanan harus 1 hari sebelum berenang?</div>
                    <div className='card-body-help'>Pelanggan bisa memesan tiker pada hari itu juga, ketike mau berenang.</div>
                </div>
                <div className='card-help'>
                    <div className='card-header-help'>bagaimana cara pemesanan tiket di IzipiziPool?</div>
                    <div className='card-body-help'>
                        <ul>
                            <li>Cari kolam renang yang anda inginkan, kemudian klik</li>
                            <li>Pilih berapa tiket yang ingin kamu pesan</li>
                            <li>Input Tanggal/waktu kamu berenang</li>
                            <li>Klik lanjutkan Isi semua data yang di ada form</li>
                            <li>Kemudian Bayar</li>
                            <li>Lalu kami akan mengirimkan tiket yang berisi ID ke email yang kamu input tadi</li>
                        </ul>
                    </div>
                </div>
                <div className='card-help'>
                    <div className='card-header-help'>Apakah tiket yang sudah dibeli, bisa dibatalkan?</div>
                    <div className='card-body-help'>Untuk saat ini, pembatalan tiket tidak dapat dilakukan secara online. Namun jangan khawatir, tiket yang sudah dibeli dapat dibatalkan langsung di lokasi kolam berenang yang dipesan. <b>(maks. 70%)</b></div>
                </div>
            </div>
            <div className='faq-lain'>
                <h3>Anda memiliki pertanyaan lain?</h3>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className='metode-faq'><a style={{textDecoration: 'none', color: 'black', display: 'flex', width: '100%'}} href='mailto:192110975@students.mikroskil.ac.id'>
                        <BsEnvelope style={{padding: '10px', fontSize: '50px'}}/>
                        <div><b>Email</b><br/><small style={{fontSize: '12px', color: '#565656'}}>Tulis pertanyaan mu sekarang!</small></div>
                    </a></div>
                    <div className='metode-faq'>
                        <BsTelephone style={{padding: '10px', fontSize: '50px'}}/>
                        <div>+62811648009</div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Bantuan;
