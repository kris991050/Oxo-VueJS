import { createRouter, createWebHistory } from 'vue-router';

//import OxoGrid from './pages/OxoGridOption.vue';
import OxoGrid from './pages/OxoGridComposition.vue';
import ScoresList from './pages/ScoresList.vue';
import RegisterScore from './pages/RegisterScore.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/oxo' },
    { path: '/oxo', component: OxoGrid },
    // {
    //   path: '/coaches/:id',
    //   component: CoachDetail,
    //   props: true,
    //   children: [
    //     { path: 'contact', component: ContactCoach } // /coaches/c1/contact
    //   ]
    // },
    { path: '/scores', component: ScoresList },
    { path: '/registerScore', component: RegisterScore },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
