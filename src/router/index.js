import Vue from 'vue'
import Router from 'vue-router'
import HeadpageView from '@/pages/HeadpageView'
import MenusView from '@/pages/MenusView'
import ContactView from '@/pages/ContactView'
import FAQView from '@/pages/FAQView'
import CategoryView from '@/pages/CategoryView'
import CategoriesView from '@/pages/CategoriesView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/headpage',
      component: HeadpageView,
      children: [
        {
          path: 'menus',
          component: MenusView,
          children: [
            {
              name: 'Categories',
              path: '',
              component: CategoriesView
            },
            {
              name: 'Category',
              path: ':slug',
              component: CategoryView
            }
          ]
        },
        {
          name: 'Contact',
          path: 'contact',
          component: ContactView
        },
        {
          name: 'FAQ',
          path: 'faq',
          component: FAQView
        }
      ]
    }
  ]
})
