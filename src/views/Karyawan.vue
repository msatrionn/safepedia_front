<template>
  <div class="row" style="height: 100vh">
    <div class="col-md-2 bg-primary">
      <h2 style="color:white" class="p-3">
        Safepedia
      </h2>
      <div class="row links">
          <router-link to="/" style="color:white">Karyawan</router-link>
      </div>
      <div class="row links">
          <router-link to="/kendaraan"  style="color:white">Kendaraan</router-link>
      </div>
    </div>
    <div class="col-md-10">
      <h1 class="mt-4 my-4">Data Karyawan</h1>
      <div class="container">
      <div class="" style="display:flex;margin:0 auto; width:50%; justify-content:space-between;padding-bottom:30px">
        <span style="display:flex; align-items:center">
          <span>
          page
        </span>
        <input class="form-control" type="text" @keyup="changePage($event)" style="width:40px">
        <span style="color:red">tekan enter</span>
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
              <tr v-for="(item, index) in karyawan" :key="index">
                <th scope="row">{{index +1 }}</th>
                <td>{{ item.Nama }}</td>
                <td>{{ item.TanggalLahir }}</td>
                <td>{{ item.Umur }}</td>
                <td>{{ item.JumlahAnak }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" v-for="(item,index) in totPage" :key="item.id">
                <a class="page-link" href="#" @click="paginateGetKaryawan(index+1)">{{index + 1}}</a></li>
            </ul>
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
  name: 'KaryawanView',
  components: {

  },
  setup () {
    const karyawan = ref([])
    const totPage = ref([])
    const Page = ref([])
    async function getKaryawan () {
      await axios.get('http://localhost:8080/karyawan?page=1&limit=1').then((result) => {
        result.data.records.map((item, index) => (
          result.data.records[index].TanggalLahir = moment(result.data.records[index].TanggalLahir).utc().format('DD MMMM YYYY')
        ))
        karyawan.value = result.data.records
        const datas = []
        karyawan.value.forEach(element => {
          const currentDate = new Date()
          const startDate = new Date(element.TanggalLahir)
          const difference = currentDate - startDate
          const experience = Math.floor(difference / 31557600000)
          const data = {
            Nama: element.Nama,
            TanggalLahir: element.TanggalLahir,
            Umur: experience,
            JumlahAnak: element.JumlahAnak
          }
          datas.push(data)
        })
        karyawan.value = datas
        totPage.value = result.data.total_page
        Page.value = result.data.page
        console.log(totPage.value, Page.value)
      })
    }
    onMounted(() => {
      getKaryawan()
    })
    return {
      karyawan,
      totPage,
      Page
    }
  },
  methods: {
    async paginateGetKaryawan (id) {
      this.getId = id
      if (this.changeTotPage >= 1) {
        this.limitLook = this.changeTotPage
      } else {
        this.limitLook = 4
      }
      await axios.get(`http://localhost:8080/karyawan?page=${this.getId}&limit=${this.limitLook}`).then((result) => {
        result.data.records.map((item, index) => (
          result.data.records[index].TanggalLahir = moment(result.data.records[index].TanggalLahir).utc().format('DD MMMM YYYY')
        ))
        this.karyawan = result.data.records
        const datas = []
        this.karyawan.forEach(element => {
          const currentDate = new Date()
          const startDate = new Date(element.TanggalLahir)
          const difference = currentDate - startDate
          const experience = Math.floor(difference / 31557600000)
          const data = {
            Nama: element.Nama,
            TanggalLahir: element.TanggalLahir,
            Umur: experience,
            JumlahAnak: element.JumlahAnak
          }
          datas.push(data)
        })
        this.karyawan = datas
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
      await axios.get(`http://localhost:8080/karyawan?page=1&limit=${lookC}`).then((result) => {
        result.data.records.map((item, index) => (
          result.data.records[index].TanggalLahir = moment(result.data.records[index].TanggalLahir).utc().format('DD MMMM YYYY')
        ))
        this.karyawan = result.data.records
        const datas = []
        this.karyawan.forEach(element => {
          const currentDate = new Date()
          const startDate = new Date(element.TanggalLahir)
          const difference = currentDate - startDate
          const experience = Math.floor(difference / 31557600000)
          const data = {
            Nama: element.Nama,
            TanggalLahir: element.TanggalLahir,
            Umur: experience,
            JumlahAnak: element.JumlahAnak
          }
          datas.push(data)
        })
        this.karyawan = datas
        this.totPage = result.data.total_page
        this.totRec = result.data.total_record
        this.Page = result.data.page
      })
      this.changeTotPage = event.target.value
    },
    async searchData (event) {
      const search = event.target.value
      axios.get(`http://localhost:8080/karyawan/search?nama=${search}&lahir=${search}&jml_anak=${search}`).then((result) => {
        console.log(result.data)
        result.data.map((item, index) => (
          result.data[index].TanggalLahir = moment(result.data[index].TanggalLahir).utc().format('DD MMMM YYYY')
        ))
        this.karyawan = result.data
        const datas = []
        this.karyawan.forEach(element => {
          const currentDate = new Date()
          const startDate = new Date(element.TanggalLahir)
          const difference = currentDate - startDate
          const experience = Math.floor(difference / 31557600000)
          const data = {
            Nama: element.Nama,
            TanggalLahir: element.TanggalLahir,
            Umur: experience,
            JumlahAnak: element.JumlahAnak
          }
          datas.push(data)
        })
        this.karyawan = datas
        this.karyawan.forEach((element, index) => {
          console.log(this.karyawan[index].Umur, 'umur', parseInt(search))
          if (this.karyawan[index].Umur === search) {
            console.log(element, 'ummur')
          }
        })
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
