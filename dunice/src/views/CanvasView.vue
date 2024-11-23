<template>
    <div class="canvas-view">
      <Sidebar @add-element="addElement" />
      <Canvas :elements="elements" @remove-element="removeElement" @update-element-position="updateElementPosition" />
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/SidebarComponent.vue';
  import Canvas from '../components/CanvasComponent.vue';
  
  export default {
    name: 'CanvasView',
    components: {
      Sidebar,
      Canvas,
    },
    data() {
      return {
        elements: [],
      };
    },
    methods: {
      addElement(element) {
        this.elements.push({ ...element, x: 0, y: 0 });
      },
      removeElement(elementToRemove) {
        this.elements = this.elements.filter(element => element !== elementToRemove);
      },
      updateElementPosition(element, newPosition) {
        const index = this.elements.findIndex(el => el === element);
        if (index !== -1) {
          this.elements[index] = { ...this.elements[index], ...newPosition };
        }
      },
    },
  };
  </script>
  
  <style>
  .canvas-view {
    display: flex;
    height: 100vh;
  }
  </style>
  