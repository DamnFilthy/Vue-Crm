<template>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <div class="row">
      <div class="col s12 m6">
        <CreateCategory/>
      </div>
      <div class="col s12 m6">
        <EditCategory/>
      </div>
    </div>
  </section>
</template>

<script>
import CreateCategory from "../components/app/categories-components/CreateCategory";
import EditCategory from "../components/app/categories-components/EditCategory";
export default {
  name: 'Categories',
  components: {EditCategory, CreateCategory},
}
</script>

<style scoped></style>
