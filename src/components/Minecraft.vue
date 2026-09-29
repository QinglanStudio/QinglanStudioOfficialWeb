<script setup>
import { ref } from 'vue'
import { asset, links } from '../data'
import Icon from './Icon.vue'
const address = 'mc.u848464.nyat.app:36427'
const copyMessage = ref('')
async function copyAddress() {
  try {
    await navigator.clipboard.writeText(address)
    copyMessage.value = '服务器地址已复制。'
  } catch {
    copyMessage.value = '暂时无法自动复制，请选中上方地址手动复制。'
  }
}
</script>
<template>
  <section class="mc-hero container">
    <img
      :src="asset('optimized/tlvd1.webp')"
      alt="TLVD Minecraft 服务器的建筑景观"
      width="1600"
      height="900"
      fetchpriority="high"
    />
    <div>
      <p class="eyebrow">QINGLAN STUDIO / MINECRAFT</p>
      <h1>方块之间，<br />一起创造。</h1>
      <p>欢迎来到 TLVD 服务器。<br />从第一间小屋开始，搭建属于我们的世界。</p>
      <a href="#server-info" class="button light">了解加入方式 <Icon /></a>
    </div>
    <span class="mc-caption">TLVD · SURVIVAL / CREATE</span>
  </section>
  <section class="section container">
    <div class="section-heading">
      <div>
        <p class="eyebrow">TWO WAYS TO PLAY</p>
        <h2>选一种生活，慢慢探索<span class="heading-dot">.</span></h2>
      </div>
      <p>合作、探索、建设。<br />为每一份想象力留一块地方。</p>
    </div>
    <div class="server-grid">
      <article class="server-card">
        <img
          :src="asset('optimized/tlvd3.webp')"
          alt="TLSV 原版生存世界景观"
          width="1000"
          height="563"
          loading="lazy"
        />
        <div>
          <p class="eyebrow">TLSV / VANILLA SURVIVAL</p>
          <h3>回到最初的生存乐趣</h3>
          <span class="tag">Minecraft 1.20.1</span>
          <p>
            保留原版体验，配备 TPA
            传送插件。和朋友互相帮助，从采矿、建房到一起探索，把日常变成冒险。
          </p>
        </div>
      </article>
      <article class="server-card">
        <img
          :src="asset('optimized/tlvd4.webp')"
          alt="TLCV 机械动力世界景观"
          width="1000"
          height="563"
          loading="lazy"
        />
        <div>
          <p class="eyebrow">TLCV / CREATE & EXPLORE</p>
          <h3>让想象力开始转动</h3>
          <span class="tag">Minecraft 1.19.2</span>
          <p>
            以机械动力为核心的科技养老服。研发机器、外出探索，或在家种田。包含 Create、Ad
            Astra、TaCZ、YSM、Farmer’s Delight 等 Mod。
          </p>
        </div>
      </article>
    </div>
  </section>
  <section id="server-info" class="container server-info">
    <div>
      <p class="eyebrow">BEFORE YOUR NEXT ADVENTURE</p>
      <h2>下一次冒险，从这里开始。</h2>
      <p>以下为原站公布的地址与版本，开放时间和最新连接信息以群内通知为准。</p>
      <p>还没找到组织？可以先通过工作室 B 站了解最新动态。</p>
      <a :href="links.bilibili" target="_blank" rel="noopener noreferrer" class="inline-link"
        >前往工作室 B 站 <Icon name="external"
      /></a>
    </div>
    <div class="address-card">
      <span class="eyebrow">原站服务器地址</span><code>{{ address }}</code
      ><button class="button primary" @click="copyAddress">
        复制服务器地址 <Icon name="copy" />
      </button>
      <p role="status">{{ copyMessage || '实际开服状态请查看群内通知。' }}</p>
    </div>
  </section>
</template>
