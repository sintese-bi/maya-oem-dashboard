// ASSETS
import AssessmentIcon from '@mui/icons-material/Assessment';

import ApSystems from '../assets/img/logo/apsystems.ico';
import Aurora from '../assets/img/logo/aurora.ico';
import Canadian from '../assets/img/logo/canadian.ico';
import Renovigi from '../assets/img/logo/renovigi.ico';
import Weg from '../assets/img/logo/weg.ico';
import Foxess from '../assets/img/logo/foxess.ico';
import Fronius from '../assets/img/logo/fronius.ico';
import Fusion from '../assets/img/logo/fusion.ico';
import GoodWe from '../assets/img/logo/goodwe.png';
import Growatt from '../assets/img/logo/growatt.ico';
import Hoymiles from '../assets/img/logo/hoymiles.ico';
import Isolar from '../assets/img/logo/isolar-cloud.ico';
import Solarman from '../assets/img/logo/solarman.ico';
import SolarView from '../assets/img/logo/solarview.ico';
import Solarz from '../assets/img/logo/solarz.ico';
import Solis from '../assets/img/logo/solis.ico';

const listBrand = [
  {
    href: 'generation/apsystems',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'ApSystems',
    media: ApSystems,
    params: 'apsystems',
    url: 'https://apsystemsema.com/ema/index.action',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/aurora',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Aurora',
    media: Aurora,
    params: 'aurora',
    url: 'https://www.auroravision.net/ums/v1/loginPage',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/canadian',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Canadian',
    media: Canadian,
    params: 'canadian',
    url: 'https://monitoring.csisolar.com/login',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/renovigi',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Renovigi',
    media: Renovigi,
    params: 'renovigi',
    url: 'https://www.renovigi.solar/cus/renovigi/index_po.html?1690209459489',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/weg',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Weg',
    media: Weg,
    params: 'weg',
    url: 'https://iot.weg.net/#/portal/main',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/foxess',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Foxess',
    media: Foxess,
    params: 'foxess',
    url: '',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/fronius',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Fronius',
    media: Fronius,
    params: 'fronius',
    url: 'https://www.solarweb.com/PvSystems/Widgets',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/fusion',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Fusion',
    media: Fusion,
    params: 'fusion',
    url: 'https://la5.fusionsolar.huawei.com/unisso/login.action',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/goodwe',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'GoodWe',
    media: GoodWe,
    params: 'goodwe',
    url: 'https://www.semsportal.com/PowerStation/powerstatus',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/growatt',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Growatt',
    media: Growatt,
    params: 'growatt',
    url: 'https://server.growatt.com/login',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/hoymiles',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Hoymiles',
    media: Hoymiles,
    params: 'hoymiles',
    url: 'https://global.hoymiles.com/platform/login',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/isolar-cloud',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Isolar Cloud',
    media: Isolar,
    params: 'isolar-cloud',
    url: 'https://www.isolarcloud.com.hk/userLoginAction_logout',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/solarman',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Solarman',
    media: Solarman,
    params: 'solarman',
    url: 'https://pro.solarmanpv.com/login',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/solar-view',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'SolarView',
    media: SolarView,
    params: 'solar-view',
    url: 'https://www.isolarcloud.com.hk/userLoginAction_logout',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/solarz',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'Solarz',
    media: Solarz,
    params: 'solarz',
    url: 'https://pro.solarmanpv.com/login',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
  {
    href: 'generation/solis',
    icon: (<AssessmentIcon fontSize="small" />),
    title: 'solis',
    media: Solis,
    params: 'solis',
    url: 'https://m.ginlong.com/login.html',
    description: 'Evidentemente, a expansão dos mercados mundiais exige a precisão e a definição das condições inegavelmente apropriadas.'
  },
];
export { listBrand };
