<template>
    <div class="app-main-layout">

        <NavBar @openSideBar="openSideBar"/>
        <Sidebar
                :isSidebarOpen="isSidebarOpen"
                @openSideBar="openSideBar"
        />

        <main class="app-content"
        :class="{'full': isSidebarOpen || this.innerWidth < 768}"
        >
            <div class="app-page">
                <router-view/>
            </div>
        </main>

        <RecordLink/>

    </div>
</template>


<script>
    import NavBar from "../components/app/NavBar";
    import Sidebar from "../components/app/Sidebar";
    import RecordLink from "../components/app/RecordLink";

    export default {
        name: 'MainLayout',
        components:{
            NavBar,
            Sidebar,
            RecordLink
        },
        data(){
            return{
                innerWidth: window.innerWidth,
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
