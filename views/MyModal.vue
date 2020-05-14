<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <header class="modal-header">
          <h2 class="modal-title"><slot name="title"></slot></h2>
          <v-icon @click.self="$emit('close')">mdi-close</v-icon>
        </header>
        <div class="modal-content">
          <slot />
        </div>
        <footer class="modal-footer">
          <button class="cancel" @click="$emit('close')">
            <v-icon>mdi-chevron-left</v-icon>戻る
          </button>
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.modal-window {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  max-width: 80%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 0 10px;
  background: #eee;
  display: flex;
  flex: 0 0 60px;
  justify-content: center;
  position: relative;
  height: 60px;
  line-height: 60px;
}

.modal-header .v-icon {
  position: absolute;
  top: 15px;
  right: 10px;
}

.modal-title {
  font-size: 2rem;
}

.modal-content {
  padding: 40px;
  flex: 1 1 auto;
  overflow: auto;
}

.modal-footer {
  position: relative;
  flex: 0 0 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #eee;
}

.cancel {
  position: absolute;
  left: 20px;
}

.cancel:hover {
  opacity: 0.8;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}
.modal-leave-active.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-enter.modal-window,
.modal-leave-to.modal-window {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
