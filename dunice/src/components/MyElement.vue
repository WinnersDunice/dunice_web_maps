<template>
    <div
      class="element"
      :style="elementStyle"
      @contextmenu.prevent="openContextMenu"
      @mousedown="startDrag"
    >
      <img :src="getImageSrc(element.name)" alt="Element" />
      <div class="element-name">{{ element.name }}</div>
      <div v-if="contextMenu.visible" :style="contextMenuStyle" class="context-menu">
        <input v-model="contextMenu.category" placeholder="Введите категорию" />
        <button @click="removeElement">Удалить</button>
        <button @click="assignCategory">Назначить категорию</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      element: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        contextMenu: {
          visible: false,
          category: '',
        },
        isDragging: false,
        dragOffset: { x: 0, y: 0 },
      };
    },
    computed: {
      elementStyle() {
        return {
          position: 'absolute',
          left: `${this.element.x}px`,
          top: `${this.element.y}px`,
        };
      },
      contextMenuStyle() {
        return {
          position: 'absolute',
          left: '10px',
          top: '10px',
          backgroundColor: '#fff',
          border: '1px solid #000',
          padding: '10px',
          zIndex: 1000,
        };
      },
    },
    methods: {
      getImageSrc(name) {
        return `/public/${name}.png`; // Путь к изображению
      },
      openContextMenu() {
        this.contextMenu.visible = true;
      },
      removeElement() {
        this.$emit('remove-element', this.element);
        this.contextMenu.visible = false;
      },
      assignCategory() {
        this.$emit('update-category', this.element, this.contextMenu.category);
        this.contextMenu.visible = false;
      },
      startDrag(event) {
        this.isDragging = true;
        this.dragOffset.x = event.clientX - this.element.x;
        this.dragOffset.y = event.clientY - this.element.y;
        window.addEventListener('mousemove', this.onDrag);
        window.addEventListener('mouseup', this.stopDrag);
      },
      onDrag(event) {
        if (this.isDragging) {
          const newPosition = {
            x: event.clientX - this.dragOffset.x,
            y: event.clientY - this.dragOffset.y,
          };
          this.$emit('update-position', this.element, newPosition);
        }
      },
      stopDrag() {
      this.isDragging = false;
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
    },
  },
};
</script>

<style>
.element {
  border: 1px solid #000;
  padding: 10px;
  background-color: #fff;
  cursor: move; /* Указатель для перемещения */
  position: relative;
}
.element-name {
  text-align: center;
}
.context-menu {
  display: flex;
  flex-direction: column;
}
.context-menu input {
  margin-bottom: 5px;
}
</style>
