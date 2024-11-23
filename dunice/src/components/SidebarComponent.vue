<template>
  <div class="sidebar">
    <h2>Выберите элемент</h2>
    <select v-model="selectedElement" @change="addElement">
      <option disabled value="">Пожалуйста, выберите элемент</option>
      <option v-for="element in elements" :key="element.id" :value="element">{{ element.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedElement: '',
      elements: [
        { id: 1, name: 'Стол' },
        { id: 2, name: 'Стул' },
        { id: 3, name: 'Вешалка' },
      ],
    };
  },
  methods: {
    addElement() {
      if (this.selectedElement) {
        this.$emit('add-element', this.selectedElement);
        this.selectedElement = ''; // Сброс выбора после добавления
      }
    },
  },
};
</script>

<style>
.sidebar {
  width: 200px;
  float: left;
}
</style>
