import { createRouter, createWebHistory } from 'vue-router';
import PickupList from '../views/PickupList.vue';
import PickupDetail from '../views/PickupDetail.vue';
import PickupCreate from '../views/PickupCreate.vue';
import LegalTerms from '../views/LegalTerms.vue';
import Contact from '../views/Contact.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'pickup-list',
      component: PickupList
    },
    {
      path: '/pickup/:id',
      name: 'pickup-detail',
      component: PickupDetail
    },
    {
      path: '/pickup/create',
      name: 'pickup-create',
      component: PickupCreate
    },
    {
      path: '/legal',
      name: 'LegalTerms',
      component: LegalTerms,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
  ]
});

export default router;