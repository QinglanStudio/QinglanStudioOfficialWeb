<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Icon from './components/Icon.vue'
import Home from './components/Home.vue'
import Downloads from './components/Downloads.vue'
import Minecraft from './components/Minecraft.vue'
import { asset, links } from './data'
import homeMusic from '../music/index.mp3'
import downloadMusic from '../music/filesite.mp3'

const filename = window.location.pathname.split('/').pop()
const page =
  filename === 'mc.html'
    ? 'mc'
    : filename === 'file.html'
      ? 'downloads'
      : filename === 'sb.html'
        ? 'secret'
        : 'home'
const menuOpen = ref(false)
const audio = ref(null)
const playing = ref(false)
const audioMessage = ref('')
const homeLink = computed(() => (page === 'home' ? '#top' : './index.html'))
const sectionLink = (id) => (page === 'home' ? `#${id}` : `./index.html#${id}`)
async function toggleMusic() {
  audioMessage.value = ''
  if (playing.value) {
    audio.value.pause()
    return
  }
  try {
    await audio.value.play()
  } catch {
    audioMessage.value = '音乐暂时无法播放，请稍后重试。'
  }
}
function onAudioError() {
  playing.value = false
  audioMessage.value = '音乐暂时无法播放。'
}
function escapeMenu(event) {
  if (event.key === 'Escape') menuOpen.value = false
}
onMounted(() => window.addEventListener('keydown', escapeMenu))
onUnmounted(() => window.removeEventListener('keydown', escapeMenu))
</script>

<template>
  <a class="skip-link" href="#main">跳到主要内容</a>
  <header class="site-header" id="top">
    <div class="nav-shell">
      <a class="brand" :href="homeLink" aria-label="青岚工作室首页">
        <img :src="asset('optimized/logo.webp')" alt="" width="40" height="40" />
        <span>青岚工作室<small>QINGLAN STUDIO</small></span>
      </a>
      <button
        class="menu-toggle icon-button"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-controls="navigation"
        :aria-label="menuOpen ? '关闭导航' : '打开导航'"
      >
        <Icon :name="menuOpen ? 'close' : 'menu'" />
      </button>
      <nav
        id="navigation"
        aria-label="主导航"
        :class="{ open: menuOpen }"
        @click="menuOpen = false"
      >
        <a :href="homeLink" :aria-current="page === 'home' ? 'page' : undefined">首页</a>
        <a :href="sectionLink('projects')">作品</a>
        <a :href="sectionLink('team')">关于我们</a>
        <a href="./mc.html" :aria-current="page === 'mc' ? 'page' : undefined">Minecraft</a>
        <a href="./file.html" :aria-current="page === 'downloads' ? 'page' : undefined">下载站</a>
        <a class="nav-contact" :href="sectionLink('contact')"
          >和我们聊聊 <Icon name="external"
        /></a>
      </nav>
    </div>
  </header>
  <main id="main" tabindex="-1">
    <Home v-if="page === 'home'" />
    <Minecraft v-else-if="page === 'mc'" />
    <Downloads v-else-if="page === 'downloads'" />
    <section v-else class="section container secret">
      <p class="eyebrow">YOU FOUND A SECRET</p>
      <h1>还是被你找到了，喵！</h1>
      <p>原来真的有人会访问 sb.html。好奇心也是创作的开始。</p>
      <a class="button primary" href="./index.html">回到工作室 <Icon /></a>
    </section>
  </main>
  <footer class="site-footer container">
    <div class="footer-top">
      <a class="brand" :href="homeLink"
        ><img :src="asset('optimized/logo.webp')" alt="" width="36" height="36" /><span
          >青岚工作室<small>让灵感发生，让热爱继续。</small></span
        ></a
      >
      <div class="footer-links">
        <a :href="links.bilibili" target="_blank" rel="noopener noreferrer"
          >哔哩哔哩 <Icon name="external" /></a
        ><a :href="links.github" target="_blank" rel="noopener noreferrer"
          >GitHub <Icon name="external" /></a
        ><a href="./file.html">下载站 <Icon name="external" /></a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} 青岚工作室 · Qinglan Studio</span
      ><span>用热爱发电，也用代码造梦。 <span class="tiny-star">✳</span></span>
    </div>
  </footer>
  <div class="music-control">
    <span v-if="audioMessage" role="status" class="music-message">{{ audioMessage }}</span
    ><button
      @click="toggleMusic"
      :aria-pressed="playing"
      :aria-label="playing ? '暂停背景音乐' : '播放背景音乐'"
      :title="playing ? '暂停背景音乐' : '播放背景音乐'"
    >
      <Icon :name="playing ? 'pause' : 'music'" /><span>{{
        playing ? '音乐开启' : '听点音乐'
      }}</span
      ><span class="sound-bars" :class="{ playing }" aria-hidden="true"><i></i><i></i><i></i></span>
    </button>
  </div>
  <audio
    ref="audio"
    :src="page === 'downloads' ? downloadMusic : homeMusic"
    preload="none"
    loop
    @play="playing = true"
    @pause="playing = false"
    @error="onAudioError"
  />
</template>
