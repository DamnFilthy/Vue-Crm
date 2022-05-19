<template>
    <div class="app-main-layout">

        <NavBar @openSideBar="openSideBar"/>
        <Sidebar :isSidebarOpen="isSidebarOpen"/>

        <main class="app-content"
        :class="{'full': isSidebarOpen}"
        >
            <div class="app-page">
                <router-view/>
            </div>
        </main>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large blue" href="#">
                <i class="large material-icons">add</i>
            </a>
        </div>

    </div>
</template>


<script>
    import NavBar from "../components/app/NavBar";
    import Sidebar from "../components/app/Sidebar";
    export default {
        name: 'MainLayout',
        components:{
            NavBar,
            Sidebar
        },
        data(){
            return{
                isSidebarOpen: false
            }
        },
        methods: {
            openSideBar(){
                this.isSidebarOpen = !this.isSidebarOpen
            }
        }
    }
</script>
