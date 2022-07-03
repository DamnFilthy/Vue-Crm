<template>
    <nav class="navbar lighten-1 my-navbar">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a
                    class="dropdown-trigger"
                    @click.prevent="$emit('openSideBar')"
                >
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text data-block">
                    <Data />
                </span>
            </div>
            <div class="right-wrapper">
                <ul class="right">
                    <li>
                        <a
                            ref="dropdown"
                            class="dropdown-trigger black-text no-padding"
                            href="#"
                            data-target="dropdown"
                        >
                            <div class="mobile-name" v-if="this.userName">
                                <div
                                    class="user-avatar"
                                    :style="{
                                        'background-image':
                                            'url(' + this.userAvatar + ')',
                                    }"
                                ></div>
                                <div class="mobile-hide">
                                    {{ this.userName }}
                                </div>
                                <div>
                                    <i class="material-icons right"
                                        >arrow_drop_down</i
                                    >
                                </div>
                            </div>
                            <div class="small-spinner" v-else>
                                <LoopingRhombusesSpinner
                                    :size="50"
                                    :color="'#000'"
                                />
                            </div>
                        </a>
                        <ul id="dropdown" class="dropdown-content">
                            <li>
                                <router-link
                                    :to="{name: 'Profile'}"
                                    class="black-text"
                                >
                                    <i class="material-icons">account_circle</i
                                    >Профиль
                                </router-link>
                            </li>
                            <li class="divider" tabindex="-1"></li>
                            <li>
                                <router-link
                                    :to="{
                                        name: 'Login',
                                        params: {
                                            logout: true,
                                            message:
                                                'Вы вышли из учетной записи',
                                        },
                                    }"
                                    class="black-text"
                                >
                                    <i class="material-icons"
                                        >assignment_return</i
                                    >Выйти
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import M from 'materialize-css'
import Data from './Data'
import {LoopingRhombusesSpinner} from 'epic-spinners'
export default {
    name: 'NavBar',
    components: {Data, LoopingRhombusesSpinner},
    emits: ['openSideBar'],
    data() {
        return {
            dropdown: null,
        }
    },
    mounted() {
        this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: true,
            inDuration: 350,
            alignment: 'right',
        })
    },
    beforeUnmount() {
        if (this.dropdown.destroy) {
            this.dropdown.destroy
        }
    },
    computed: {
        userName() {
            return this.$store.state.info.info.name
        },
        userAvatar() {
            return this.$store.state.info.info.avatar
        },
    },
}
</script>

<style scoped lang="scss">
.my-navbar{
    background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
}
.right-wrapper {
    display: flex;
    align-items: center;
    .switch {
        margin-right: 15px;
    }
}
.user-avatar {
    height: 55px;
    width: 60px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 100%;
    background-position: 50% 50%;
}
.mobile-name {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    div:not(:last-child) {
        margin-right: 15px;
    }
    img {
        width: 40px;
        border-radius: 30px;
    }
}
.small-spinner {
    position: absolute;
    top: 23px;
    right: 70px;
}
@media (max-width: 450px) {
    .mobile-hide {
        display: none;
    }
    .user-avatar{
        height: 38px;
        width: 40px;
    }
    .no-padding {
        padding: 0;
    }
}
    @media (max-width: 375px){
        .data-block{
            display: none;
        }
    }
</style>
