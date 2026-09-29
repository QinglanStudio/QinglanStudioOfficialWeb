<script setup>
import { computed, ref } from 'vue'
import Icon from './Icon.vue'
import { asset, links, projects, members, supporters } from '../data'
const categories = ['全部', '游戏', '软件', 'AI', '实验']
const category = ref('全部')
const expanded = ref(false)
const filtered = computed(() =>
  category.value === '全部'
    ? projects
    : projects.filter((project) => project.category === category.value),
)
const visible = computed(() => (expanded.value ? filtered.value : filtered.value.slice(0, 4)))
function selectCategory(value) {
  category.value = value
  expanded.value = false
}
</script>

<template>
  <section class="hero container" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow"><span class="status-dot"></span> 一群学生，一起创造一点不一样</p>
      <h1 id="hero-title">
        把热爱，<br />做成<span class="accent-word"
          >好玩的游戏<svg viewBox="0 0 450 20" aria-hidden="true">
            <path d="M5 14Q200 -2 445 9" /></svg></span
        >。
      </h1>
      <p class="hero-description">
        我们是青岚工作室。<br />不一定要做出 3A 大作，但一定要让灵感落地。<br />从游戏到代码，从脑洞到属于我们的世界。
      </p>
      <div class="hero-actions">
        <a class="button primary" href="#projects">探索我们的作品 <Icon /></a
        ><a class="button text-button" href="#about">认识青岚 <Icon name="external" /></a>
      </div>
      <div class="hero-signature">
        <div class="avatar-stack">
          <img
            v-for="member in members.slice(0, 3)"
            :key="member.name"
            :src="asset(`optimized/${member.image}`)"
            alt=""
            width="32"
            height="32"
          />
        </div>
        <span>因为喜欢，所以创造。<span class="signature-star">✦</span></span>
      </div>
    </div>
    <div class="hero-art">
      <div class="art-orbit" aria-hidden="true"></div>
      <span class="art-spark" aria-hidden="true">✳</span>
      <figure class="art-photo">
        <img
          :src="asset('bg/xy_pc.jpg')"
          alt="原站收藏的小鸟游星野插画，草地与微风中的悠闲一刻"
          width="736"
          height="520"
          fetchpriority="high"
        />
        <figcaption><span>一点灵感，一整个世界。</span><span>QINGLAN / MOOD 01</span></figcaption>
      </figure>
      <div class="floating-note">
        <span class="note-icon">&lt;/&gt;</span>
        <div>灵感加载中<span>Made with passion & a little chaos.</span></div>
        <span class="note-dot"></span>
      </div>
      <div class="art-sticker">KEEP<br /><b>CREATING.</b><span>保持热爱 ↗</span></div>
      <span class="art-caption">游戏 · 代码 · 想象力</span>
    </div>
  </section>
  <div class="manifesto-strip">
    <div class="container">
      <span>小小工作室，无限可能</span><b>GAME DEVELOPMENT</b><i>✳</i><b>CREATIVE CODING</b><i>✳</i
      ><b>JUST FOR FUN</b><span class="strip-end">一起把脑洞变成现实 ↗</span>
    </div>
  </div>
  <section id="projects" class="section container">
    <div class="section-heading">
      <div>
        <p class="eyebrow">01 / OUR CREATIONS</p>
        <h2>想法不止于想象<span class="heading-dot">.</span></h2>
      </div>
      <p>有些是游戏，有些是工具，有些纯粹出于好奇。<br />这里收集着我们探索过的方向。</p>
    </div>
    <div class="project-toolbar">
      <div class="filter-group" aria-label="作品分类">
        <button
          v-for="item in categories"
          :key="item"
          :class="{ selected: category === item }"
          :aria-pressed="category === item"
          @click="selectCategory(item)"
        >
          {{ item
          }}<span>{{
            item === '全部'
              ? projects.length
              : projects.filter((project) => project.category === item).length
          }}</span>
        </button>
      </div>
      <span class="toolbar-note">小步尝试，持续探索 <span>↗</span></span>
    </div>
    <p class="sr-only" role="status">
      {{ category }}分类，共 {{ filtered.length }} 个项目，显示 {{ visible.length }} 个。
    </p>
    <div class="project-grid">
      <article v-for="(project, index) in visible" :key="project.name" class="project-card">
        <div class="project-art" :class="project.tone" aria-hidden="true">
          <span class="art-category"
            >{{ project.category }} / {{ String(index + 1).padStart(2, '0') }}</span
          >
          <div class="project-symbol">{{ project.mark }}</div>
          <div class="art-grid"></div>
          <span class="art-bottom">QINGLAN EXPERIMENTS <span>✦</span></span>
        </div>
        <div class="project-copy">
          <p class="project-kind">{{ project.kind }}</p>
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </article>
    </div>
    <div class="projects-bottom">
      <p>项目介绍来自工作室记录，发布情况以官方动态为准。</p>
      <button v-if="filtered.length > 4" class="button outline" @click="expanded = !expanded">
        {{ expanded ? '收起作品' : `查看其余 ${filtered.length - 4} 个作品` }}
        <Icon :class="{ 'rotate-up': expanded }" />
      </button>
    </div>
  </section>
  <section id="about" class="about-section">
    <div class="container about-grid">
      <div class="about-visual">
        <span class="eyebrow">HELLO, WE ARE QINGLAN</span>
        <div class="about-type">好玩<span>是第一</span><em>生产力。</em></div>
        <span class="about-asterisk" aria-hidden="true">✳</span>
        <p>不设限的脑洞 / 不打烊的热爱</p>
      </div>
      <div class="about-copy">
        <p class="eyebrow">02 / A LITTLE ABOUT US</p>
        <h2>认真做点<br />有意思的事。</h2>
        <p>
          青岚工作室由一群对游戏充满热爱的学生组成。我们不致力于做出 3A 大作，只求做出好玩的游戏。
        </p>
        <p>
          游戏是起点，好奇心让我们走得更远。软件开发、网站开发、AI
          和网络安全，都是我们不断尝试的新地图。
        </p>
        <div class="values">
          <span>✦ 热爱驱动</span><span>✦ 自由探索</span><span>✦ 一起成长</span>
        </div>
      </div>
    </div>
  </section>
  <section id="team" class="section container">
    <div class="section-heading">
      <div>
        <p class="eyebrow">03 / THE PEOPLE BEHIND</p>
        <h2>屏幕背后的我们<span class="heading-dot">.</span></h2>
      </div>
      <p>分工不同，脑洞相通。<br />这是把「要不试试」变成现实的几个人。</p>
    </div>
    <div class="team-grid">
      <article v-for="member in members" :key="member.name" class="member-card">
        <img
          :src="asset(`optimized/${member.image}`)"
          :alt="`${member.name}的头像`"
          width="72"
          height="72"
          loading="lazy"
        />
        <p class="member-role">{{ member.role }}</p>
        <h3>{{ member.name }}</h3>
        <p>{{ member.text }}</p>
      </article>
    </div>
    <div class="supporters">
      <p><span class="eyebrow">SPECIAL THANKS</span><strong>也谢谢，一路同行的朋友</strong></p>
      <div v-for="supporter in supporters" :key="supporter.name" class="supporter">
        <img
          :src="asset(`optimized/${supporter.image}`)"
          alt=""
          width="42"
          height="42"
          loading="lazy"
        />
        <div>
          <h3>{{ supporter.name }}</h3>
          <p>{{ supporter.text }}</p>
        </div>
      </div>
    </div>
  </section>
  <section class="community container">
    <div class="community-image">
      <img
        :src="asset('optimized/tlvd1.webp')"
        alt="TLVD Minecraft 服务器中的建筑与风景"
        width="1600"
        height="900"
        loading="lazy"
      />
    </div>
    <div class="community-copy">
      <p class="eyebrow">ANOTHER WORLD, TOGETHER</p>
      <h2>创作之外，<br />一起搭个世界。</h2>
      <p>
        欢迎来到 TLVD，我们的 Minecraft 小天地。<br />原版生存，或是机械动力，总有一种慢下来的方式。
      </p>
      <a class="button dark" href="./mc.html">走进 TLVD 服务器 <Icon /></a>
    </div>
  </section>
  <section id="contact" class="contact-section container">
    <div>
      <p class="eyebrow">LET’S MAKE SOMETHING FUN</p>
      <h2>你的脑洞，也许正好<br />是我们缺的那一块<span class="heading-dot">。</span></h2>
      <p>
        喜欢游戏、写代码，或者擅长画画？先来认识一下吧。<br />关注我们的 B
        站账号，一起聊灵感，看看新的进展。
      </p>
      <a class="button primary" :href="links.bilibili" target="_blank" rel="noopener noreferrer"
        >去 B 站找我们 <Icon name="external"
      /></a>
    </div>
    <div class="contact-doodle" aria-hidden="true">
      <span>美术同学</span><b>看这里！</b
      ><svg viewBox="0 0 160 90"><path d="M140 10Q70 100 20 55m0 0 12 26M20 55l30-2" /></svg
      ><small>让我们给脑洞上点颜色 :)</small>
    </div>
  </section>
</template>
