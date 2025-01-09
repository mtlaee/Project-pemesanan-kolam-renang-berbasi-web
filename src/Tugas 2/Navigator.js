import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Beranda from'./Beranda'
import Bantuan from './Bantuan'
import KebijakanLayanan from './KebijakanLayanan'
import KebijakanKomunitas from './KebijakanKomunitas'
import KebijakanPengguna from './KebijakanPengguna'
import Login from './Login'
import Kolam from './Kolam'
import Cari from './CariKolam'
import Detail from './Detail'
import Cek_Pesanan from './CekPesanan'
import Register from './Register'
import Admin from './Admin'
import TambahKolam from './TambahKolam'
import EditKolam from './EditKolam'

class Navigator extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path='/' exact component={Beranda}/>
                    <Route path='/bantuan' component={Bantuan}/>
                    <Route path='/kebijakanlayanan' component={KebijakanLayanan}/>
                    <Route path='/kebijakankomunitas' component={KebijakanKomunitas}/>
                    <Route path='/kebijakanpengguna' component={KebijakanPengguna}/>
                    <Route path='/mitra/login' component={Login}/>
                    <Route path='/mitra/register' component={Register}/>
                    <Route path='/kolam' component={Kolam}/>
                    <Route path='/cari/:text' component={Cari}/>
                    <Route path='/detail/:id' component={Detail}/>
                    <Route path='/cek_pesanan/:id' component={Cek_Pesanan}/>
                    <Route path='/admin/:id' component={Admin}/>
                    <Route path='/tambah/:id' component={TambahKolam}/>
                    <Route path='/edit/:id' component={EditKolam}/>
                </div>
            </Router>
        )
    }
}

export default Navigator;
