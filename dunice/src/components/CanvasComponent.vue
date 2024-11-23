<template>
  <div class="canvas" @click="addElementToCanvas">
    <Element
      v-for="(element, index) in elements"
      :key="index"
      :element="element"
      @remove-element="removeElement"
      @update-position="updateElementPosition"
    />
  </div>
</template>

<script>
import Element from './MyElement.vue';

export default {
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  components: {
    Element,
  },
  methods: {
    addElementToCanvas(event) {
      const newElement = {
        name: 'Новый элемент',
        x: event.offsetX,
        y: event.offsetY,
      };
      this.$emit('add-element', newElement);
    },
    removeElement(element) {
      this.$emit('remove-element', element);
    },
    updateElementPosition(element, newPosition) {
      this.$emit('update-element-position', element, newPosition);
    },
  },
};
</script>
