<template>
  <div class="row" style="height: 100vh">
    <div class="col-md-2 bg-primary">
      <h2 style="color:white" class="p-3">
        Safepedia
      </h2>
      <div class="row links">
          <router-link to="/" style="color:white">kendaraan</router-link>
      </div>
      <div class="row links">
          <router-link to="/kendaraan"  style="color:white">Kendaraan</router-link>
      </div>
    </div>
    <div class="col-md-10">
      <h1 class="mt-4 my-4">Data kendaraan</h1>
      <div class="container">
      <div class="" style="display:flex;margin:0 auto; width:50%; justify-content:space-between;padding-bottom:30px">
        <span style="display:flex; align-items:center">
          <span>
          page
        </span>
        <input class="form-control" type="text" @keyup="changePage($event)" style="width:40px"> <span style="color:red">tekan enter</span>
        </span>
         <span style="display:flex; align-items:center">
          <span>
          search
        </span>
        <input class="form-control" type="text" @keyup="searchData($event)" style="width:100px">
        </span>
      </div>

        <div class="d-flex justify-content-center">
          <table class="table table-bordered" style="width: 50%">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Tanggal lahir</th>
                <th scope="col">Umur</th>
                <th scope="col">Jumlah anak</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in kendaraan" :key="index">
                <th scope="row">{{index +1 }}</th>
                <td>{{ item.Tipe }}</td>
                <td>{{ item.Warna }}</td>
                <td>{{ item.TanggalBeli }}</td>
                <td>{{ item.JumlahRoda }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" v-for="(item,index) in totPage" :key="item.id">
                <a class="page-link" @click="paginateGetkendaraan(index+1)">{{index + 1}}</a></li>
            </ul>
              <select name="" id="" class="form-control" style="width:100px; height:40px" @change="searchType($event)">
                <option value="" v-for="(item,index) in getKendaraanType" :key="index">{{item.Tipe}}</option>
              </select>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .links{
    padding: 20px 0;
  }
  .links:hover{
    background: rgb(10, 117, 205);
  }
  .row a{
    text-decoration: none;
  }
</style>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'KendaraanView',
  components: {

  },
  setup () {
    const kendaraan = ref([])
    const totPage = ref([])
    const Page = ref([])
    const getKendaraanType = ref([])
    async function getkendaraan () {
      await axios.get('http://localhost:8080/kendaraan?page=1&limit=1').then((result) => {
        result.data.records.map((item, index) => (
          result.data.records[index].TanggalBeli = moment(result.data.records[index].TanggalBeli).utc().format('DD MMMM YYYY')
        ))
        kendaraan.value = result.data.records
        totPage.value = result.data.total_page
        Page.value = result.data.page
        console.log(totPage.value, Page.value)
      })
    }
    async function getType () {
      await axios.get('http://localhost:8080/kendaraan/jenis?tipe=').then((result) => {
        getKendaraanType.value = result.data
      })
    }
    onMounted(() => {
      getkendaraan()
      getType()
    })
    return {
      kendaraan,
      totPage,
      Page,
      getKendaraanType
    }
  },
  methods: {
    async paginateGetkendaraan (id) {
      this.getId = id
      if (this.changeTotPage >= 1) {
        this.limitLook = this.changeTotPage
      } else {
        this.limitLook = 4
      }
      await axios.get(`http://localhost:8080/kendaraan?page=${this.getId}&limit=${this.limitLook}`).then((result) => {
        result.data.records.map((item, index) => (
          result.data.records[index].TanggalBeli = moment(result.data.records[index].TanggalBeli).utc().format('DD MMMM YYYY')
        ))
        this.kendaraan = result.data.records
        this.totPage = result.data.total_page
        this.totRec = result.data.total_record
        this.Page = result.data.page
      })
    },
    async changePage (event) {
      let lookC
      if (this.changeTotPage >= 1) {
        lookC = this.changeTotPage
      } else {
        lookC = 4
      }
      await axios.get(`http://localhost:8080/kendaraan?page=1&limit=${lookC}`).then((result) => {
        result.data.records.map((item, index) => (
          result.data.records[index].TanggalBeli = moment(result.data.records[index].TanggalBeli).utc().format('DD MMMM YYYY')
        ))
        this.kendaraan = result.data.records
        this.totPage = result.data.total_page
        this.totRec = result.data.total_record
        this.Page = result.data.page
      })
      this.changeTotPage = event.target.value

      console.log(event.target.value)
    },
    async searchData (event) {
      const search = event.target.value
      axios.get(`http://localhost:8080/kendaraan/search?tipe=${search}&warna=${search}&tgl=${search}&jml=${search}`).then((result) => {
        result.data.map((item, index) => (
          result.data[index].TanggalBeli = moment(result.data[index].TanggalBeli).utc().format('DD MMMM YYYY')
        ))
        this.kendaraan = result.data
        this.totPage = result.data.total_page
        this.totRec = result.data.total_record
        this.Page = result.data.page
      })
    },
    async searchType (event) {
      const search = event.target.options[event.target.options.selectedIndex].text
      axios.get(`http://localhost:8080/kendaraan/jenis?tipe=${search}`).then((result) => {
        result.data.map((item, index) => (
          result.data[index].TanggalBeli = moment(result.data[index].TanggalBeli).utc().format('DD MMMM YYYY')
        ))
        this.kendaraan = result.data
        this.totPage = result.data.total_page
        this.totRec = result.data.total_record
        this.Page = result.data.page
      })
    }
  },
  return: {
    getId: 1,
    limitLook: 4,
    changeTotPage: 1
  }

}
</script>
