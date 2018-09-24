import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = { listKaryawan: [], listCabang: [] }

  componentWillMount() {
    axios.get('http://localhost:1997/karyawandancab')
    .then((res) => {
        console.log(res);
        this.setState({ listKaryawan: res.data.listKaryawan, listCabang: res.data.listCabang });
    })
  }

  onBtnAddClick = () => {
    axios.post('http://localhost:1997/karyawan', {
        nama: this.refs.NamaKar.value,
        umur: this.refs.Umur.value,
        jabatan: this.refs.Jabatan.value,
        gaji: this.refs.Gaji.value,
        status: this.refs.Status.value,
        notelp: this.refs.NoTel.value,
        cabangid: this.refs.Cabang.value
    }).then((res) => {
        alert('Add Data Success!');
        this.setState({ listKaryawan: res.data });
    }).catch((err) => {
      alert('Error!');
      console.log(err);
    })
  }

  onBtnDeleteClick = (idKar) => {
    if(window.confirm('Are you sure?')) {
      axios.delete('http://localhost:1997/karyawan/' + idKar)
      .then((res) => {
          alert('Delete Data Success!');
          this.setState({ listKaryawan: res.data });
      }).catch((err) => {
        alert('Error!');
        console.log(err);
      })
    }
  }

  onBtnSearchClick = () => {
    axios.get('http://localhost:1997/searchkaryawan', {
      params: {
        namakaryawan: this.refs.NamaSearch.value,
        namacabang: this.refs.CabangSearch.value
      }
    }).then((res) => {
      this.setState({ listKaryawan: res.data });
    }).catch((err) => {
      alert('Error!');
      console.log(err);
    })
  }

  renderBodyTable = () => {
      const arrJSX = this.state.listKaryawan.map((item, index) => {
          return (<tr key={index}>
              <td>{item.idKaryawan}</td>
              <td>{item.NamaKaryawan}</td>
              <td>{item.Umur}</td>
              <td>{item.Jabatan}</td>
              <td>Rp. {item.Gaji}</td>
              <td>{item.Status}</td>
              <td>{item.NoTelephone}</td>
              <td>{item.NamaCabang}</td>
              <td>
                <input type="button" value="Delete" onClick={() => this.onBtnDeleteClick(item.idKaryawan)}/>
              </td>
          </tr>);
      })

      return arrJSX;
  }

  renderOptionCabang = () => {
    const arrJSX = this.state.listCabang.map((item, index) => {
        return (<option key={index} value={item.id}>{item.Nama}</option>);
    })

    return arrJSX;
  }

  renderOptionCabangSearch = () => {
    const arrJSX = this.state.listCabang.map((item, index) => {
        return (<option key={index} value={item.Nama}>{item.Nama}</option>);
    })

    return arrJSX;
  }

  render() {
    console.log(this.state.listKaryawan)
    return (
      <div className="App">
        <div style={{ padding: '50px'}}>
           <label>Nama :</label> 
           <input type="text" ref="NamaSearch" style={{ marginRight: '20px'}}/>
           <label>Cabang :</label> 
           <select ref="CabangSearch" style={{ marginRight: '20px'}}>
              <option value=""> -- Pilih Cabang -- </option>
              {this.renderOptionCabangSearch()}
           </select>
           <input type="button" value="Search" onClick={this.onBtnSearchClick}/>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id Karyawan</th>
              <th>Nama Karyawan</th>
              <th>Umur</th>
              <th>Jabatan</th>
              <th>Gaji</th>
              <th>Status</th>
              <th>No. Telephone</th>
              <th>Cabang</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderBodyTable()}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td><input type="text" ref="NamaKar" /></td>
              <td><input type="number" style={{ width: '50px'}} ref="Umur" /></td>
              <td><input type="text" ref="Jabatan" /></td>
              <td><input type="number" ref="Gaji" /></td>
              <td><input type="text" ref="Status" /></td>
              <td><input type="text" ref="NoTel" /></td>
              <td>
                  <select ref="Cabang">
                    <option value=""> -- Pilih Cabang -- </option>
                    {this.renderOptionCabang()}
                  </select>
              </td> 
              <td><input type="button" value="Add" onClick={this.onBtnAddClick}/></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;