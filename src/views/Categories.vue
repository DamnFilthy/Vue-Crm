<template>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <div class="row">
      <div class="mobile-block col s12 m6">
        <CreateCategory />
      </div>
      <div class="col s12 m6">
        <div v-if="loading">
          <LoopingRhombusesSpinner :size="50" :color="'#000'" />
        </div>
        <div v-else>
          <EditCategory
          :categoriesObj="categoriesObj"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CreateCategory from '../components/app/categories-components/CreateCategory'
import EditCategory from '../components/app/categories-components/EditCategory'
import {LoopingRhombusesSpinner} from 'epic-spinners'

export default {
  name: 'Categories',
  components: {EditCategory, CreateCategory, LoopingRhombusesSpinner},
  data() {
    return {
      categories: [],
      loading: this.categoriesObj === null,
    }
  },
  computed: {
    categoriesObj(){
      return this.$store.state.category.categories
    }
  }
}
</script>

<style scoped>
  @media (max-width: 600px){
    .mobile-block{
      margin-bottom: 30px;
    }
  }
</style>
