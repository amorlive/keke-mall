<template>
  <div class="admin-page">
    <div class="filter-bar">
      <input v-model="kw" placeholder="搜索商品名" class="search-input" />
      <select v-model="cat" class="select">
        <option value="">全部分类</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
      <select v-model="status" class="select">
        <option value="">全部状态</option>
        <option value="on">在售</option>
        <option value="off">下架</option>
      </select>
      <button class="add-btn" @click="showAdd = true">+ 新增商品</button>
    </div>

    <div class="data-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>商品</th>
            <th>分类</th>
            <th>价格</th>
            <th>库存</th>
            <th>销量</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="g in filtered" :key="g.id">
            <td>
              <div class="goods-cell">
                <img :src="g.cover" />
                <div>
                  <div class="gc-name">{{ g.name }}</div>
                  <div class="gc-id">ID: {{ g.id }}</div>
                </div>
              </div>
            </td>
            <td>{{ catName(g.category) }}</td>
            <td><span class="price">¥{{ g.price }}</span> <span class="old">¥{{ g.originalPrice }}</span></td>
            <td>
              <span :class="g.stock < 20 ? 'low' : ''">{{ g.stock }}</span>
            </td>
            <td>{{ g.sales }}</td>
            <td>
              <span class="status on">在售</span>
            </td>
            <td>
              <a class="op">编辑</a>
              <a class="op">下架</a>
              <a class="op danger">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { goodsList, categories } from '@/data/mock'

const kw = ref('')
const cat = ref('')
const status = ref('')
const showAdd = ref(false)

const filtered = computed(() => {
  let arr = [...goodsList]
  if (kw.value) arr = arr.filter(g => g.name.includes(kw.value))
  if (cat.value) arr = arr.filter(g => g.category === Number(cat.value))
  return arr
})

function catName(id) { return categories.find(c => c.id === id)?.name || '-' }
</script>

<style lang="scss" scoped>
.admin-page { display: flex; flex-direction: column; gap: 12px; }
.filter-bar { display: flex; gap: 8px; align-items: center; }
.search-input, .select { padding: 8px 12px; border: 1px solid #E5DFD3; border-radius: 4px; background: #fff; font-size: 13px; outline: none; }
.search-input { flex: 1; max-width: 240px; }
.add-btn { padding: 8px 16px; background: var(--color-primary); color: #fff; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; margin-left: auto; &:hover { background: var(--color-primary-light); } }

.data-card { background: #fff; border-radius: 8px; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: var(--color-bg); padding: 12px; text-align: left; font-weight: 500; color: var(--color-ink-2); border-bottom: 1px solid #E5DFD3; }
.data-table td { padding: 12px; border-bottom: 1px solid #F0EDE6; }
.data-table tr:hover { background: var(--color-bg); }

.goods-cell { display: flex; align-items: center; gap: 10px; img { width: 44px; height: 44px; border-radius: 4px; object-fit: cover; } }
.gc-name { font-weight: 500; }
.gc-id { font-size: 11px; color: var(--color-ink-3); margin-top: 2px; }
.price { color: var(--color-primary); font-weight: 600; }
.old { color: var(--color-ink-3); text-decoration: line-through; font-size: 11px; margin-left: 4px; }
.low { color: var(--color-danger); font-weight: 600; }
.status { padding: 2px 8px; border-radius: 3px; font-size: 11px; &.on { background: #E8F0E8; color: #4A6B4A; } &.off { background: var(--color-bg-3); color: var(--color-ink-3); } }
.op { color: var(--color-primary); margin-right: 10px; cursor: pointer; &.danger { color: var(--color-danger); } &:hover { text-decoration: underline; } }
</style>
