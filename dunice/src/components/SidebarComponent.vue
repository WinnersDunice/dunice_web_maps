<template>
  <div>
    <header class="flex justify-between items-center p-4 mb-4 bg-blue-100">
      <button @click="toggleSidebar" class="text-white py-3 px-5 rounded flex items-center text-lg">
        Меню <i class="fas fa-bars ml-2"></i> <!-- Иконка гамбургера -->
      </button>
    </header>

    <nav :class="['sidebar', { 'is-active': sidebarOpen }]">
      <div class="sidebar-header">
        <h2 class="headermenu text-6xl">Меню</h2>
        <button @click="toggleSidebar" class="close-button">
          <i class="fas fa-times"></i> <!-- Иконка крестика -->
        </button>
      </div>
      <ul>
        <li class="litem h-full flex items-center">
          <select v-model="selectedElement" @change="addElement">
            <option disabled value="">Пожалуйста, выберите элемент</option>
            <option v-for="element in elements" :key="element.id" :value="element">{{ element.name }}</option>
          </select>
        </li>
      </ul>
    </nav>

    <div class="mask" v-if="sidebarOpen" @click="toggleSidebar"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: false, // Состояние боковой панели
      selectedElement: '',
      elements: [
        { id: 1, name: 'Стол' },
        { id: 2, name: 'Стул' },
        { id: 3, name: 'Вешалка' },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen; 
    },
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
  position: fixed;
  top: 0;
  left: -100%; /* Скрываем панель за пределами экрана */
  width: 30%; /* Ширина панели 30% от ширины экрана */
  height: 100%;
  background-color: #fff;
  transition: left 0.3s ease; /* Изменено на left для правильной анимации */
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.sidebar.is-active {
  left: 0; /* Показываем панель */
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Маска на всю ширину экрана */
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.close-button {
  background: none;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
}

.headermenu {
  color: #2597FF;
  font-family: 'Exo 2', sans-serif; /* Применяем шрифт Exo 2 */
}

.litem {
  font-size: 1.5em;
  font-family: 'Exo 2', sans-serif; /* Применяем шрифт Exo 2 */
}

select {
  width: 100%;
  padding: 10px;
  font-size: 1.2em;
}

/* Адаптивные стили для мобильных устройств */
@media (max-width: 768px) {
  .sidebar {
    width: 60%; 
  }
}
</style>
