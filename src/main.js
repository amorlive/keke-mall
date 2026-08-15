import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Vant 组件按需引入
import {
  Button, Cell, CellGroup, Tabbar, TabbarItem, NavBar, Tab, Tabs,
  Search, Swipe, SwipeItem, Card, Tag, Icon, Image as VanImage,
  Empty, Loading, Toast, Dialog, Popup, ActionSheet, Skeleton,
  Form, Field, Checkbox, CheckboxGroup, Radio, RadioGroup, Step, Steps,
  SubmitBar, ActionBar, ActionBarIcon, ActionBarButton,
  Divider, Sticky, NoticeBar, Grid, GridItem, List, PullRefresh,
  SwipeCell, Switch, Badge, Sidebar, SidebarItem, Progress, Overlay
} from 'vant'

import 'vant/lib/index.css'
import './styles/global.scss'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// 注册 Vant 组件
const components = [
  Button, Cell, CellGroup, Tabbar, TabbarItem, NavBar, Tab, Tabs,
  Search, Swipe, SwipeItem, Card, Tag, Icon, VanImage,
  Empty, Loading, Toast, Dialog, Popup, ActionSheet, Skeleton,
  Form, Field, Checkbox, CheckboxGroup, Radio, RadioGroup, Step, Steps,
  SubmitBar, ActionBar, ActionBarButton, ActionBarIcon,
  Divider, Sticky, NoticeBar, Grid, GridItem, List, PullRefresh,
  SwipeCell, Switch, Badge, Sidebar, SidebarItem, Progress, Overlay
]
components.forEach(c => app.use(c))

app.mount('#app')
