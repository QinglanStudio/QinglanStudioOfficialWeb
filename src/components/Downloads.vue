<script setup>
import { computed, ref } from 'vue'
import { asset, links, wallpapers } from '../data'
import Icon from './Icon.vue'
const query = ref('')
const orientation = ref('pc')
const visible = computed(() =>
  wallpapers.filter((item) => item.name.toLowerCase().includes(query.value.trim().toLowerCase())),
)
</script>
<template>
  <section class="page-intro container">
    <a class="breadcrumb" href="./index.html">首页 /</a>
    <p class="eyebrow">TAKE A LITTLE INSPIRATION WITH YOU</p>
    <h1>带走一点<span class="green">灵感。</span></h1>
    <p>游戏与原站收藏的壁纸，在这里找到。<br />选一个喜欢的画面，给屏幕换个心情。</p>
  </section>
  <section class="container release-banner">
    <div class="release-mark" aria-hidden="true">M<span>↗</span></div>
    <div>
      <p class="eyebrow">GAME DOWNLOAD</p>
      <h2>MonsterRun <span>Alpha 1.9</span></h2>
      <p>原站记录版本为 Alpha 1.9，暂未发现公开发布包。可前往 GitHub Releases 查看后续更新。</p>
    </div>
    <a :href="links.releases" class="button dark" target="_blank" rel="noopener noreferrer"
      >前往发布页 <Icon name="external"
    /></a>
  </section>
  <section class="section container wallpaper-section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">WALLPAPER COLLECTION</p>
        <h2>给日常换个背景<span class="heading-dot">.</span></h2>
      </div>
      <p>保留原站壁纸收藏，提供横版与竖版原图。<br />插画版权归原作者所有。</p>
    </div>
    <div class="download-toolbar">
      <div class="filter-group" aria-label="壁纸方向">
        <button
          :aria-pressed="orientation === 'pc'"
          :class="{ selected: orientation === 'pc' }"
          @click="orientation = 'pc'"
        >
          横版 · 桌面</button
        ><button
          :aria-pressed="orientation === 'phone'"
          :class="{ selected: orientation === 'phone' }"
          @click="orientation = 'phone'"
        >
          竖版 · 手机
        </button>
      </div>
      <label class="search"
        ><Icon name="search" /><input
          v-model="query"
          type="search"
          aria-label="搜索壁纸名称"
          placeholder="搜索喜欢的角色…"
      /></label>
    </div>
    <p class="result-count" role="status">
      {{ visible.length }} 张{{ orientation === 'pc' ? '横版' : '竖版' }}壁纸
    </p>
    <div class="wallpaper-grid">
      <article v-for="item in visible" :key="item.id" class="wallpaper-card">
        <a
          :href="asset(`bg/${item.id}_${orientation}.jpg`)"
          :download="`${item.name}-${orientation}.jpg`"
          :aria-label="`下载${item.name}${orientation === 'pc' ? '横版' : '竖版'}原图`"
          ><img
            :src="asset(`optimized/${item.id}_${orientation}.webp`)"
            :alt="`${item.name}壁纸预览`"
            width="640"
            height="400"
            loading="lazy"
            :class="{ portrait: orientation === 'phone' }" />
          <div>
            <h3>{{ item.name }}</h3>
            <span>下载原图 <Icon name="download" /></span></div
        ></a>
      </article>
    </div>
    <div v-if="visible.length === 0" class="empty-state">
      <h3>还没有找到这张壁纸</h3>
      <p>换个角色名试试，或浏览全部收藏。</p>
      <button class="button outline" @click="query = ''">清空搜索</button>
    </div>
  </section>
</template>
