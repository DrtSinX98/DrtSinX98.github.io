import { useState } from 'react';
import { Col, Image , Container, Row } from "react-bootstrap";
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import img1 from '../images/gallery/img1.jpg';
import img2 from '../images/gallery/img2.jpg';
import img3 from '../images/gallery/img3.jpg';
import img4 from '../images/gallery/img4.jpg';
import img5 from '../images/gallery/img5.jpg';
import img6 from '../images/gallery/img6.jpg';
import img7 from '../images/gallery/img7.jpg';
import img8 from '../images/gallery/img8.jpg';
import img9 from '../images/gallery/img9.jpg';
import img10 from '../images/gallery/img10.jpg';
import img11 from '../images/gallery/img11.jpg';
import img12 from '../images/gallery/img12.jpg';
import img13 from '../images/gallery/img13.jpg';
import img14 from '../images/gallery/img14.jpg';
import img15 from '../images/gallery/img15.jpg';
import img16 from '../images/gallery/img16.jpg';
import img17 from '../images/gallery/img17.jpg';
import img18 from '../images/gallery/img18.jpg';
import img19 from '../images/gallery/img19.jpg';
import img20 from '../images/gallery/img20.jpg';
import img21 from '../images/gallery/img21.jpg';
import img22 from '../images/gallery/img22.jpg';
import img23 from '../images/gallery/img23.jpg';
import img24 from '../images/gallery/img24.jpg';
import img25 from '../images/gallery/img25.jpg';
import img26 from '../images/gallery/img26.jpg';
import img27 from '../images/gallery/img27.jpg';
import img28 from '../images/gallery/img28.jpg';
import img29 from '../images/gallery/img29.jpg';
import img30 from '../images/gallery/img30.jpg';
import img31 from '../images/gallery/img31.jpg';
import img32 from '../images/gallery/img32.jpg';
import img33 from '../images/gallery/img33.jpg';
import img34 from '../images/gallery/img34.jpg';
import img35 from '../images/gallery/img35.jpg';
import img36 from '../images/gallery/img36.jpg';
import img37 from '../images/gallery/img37.jpg';
import img38 from '../images/gallery/img38.jpg';
import img39 from '../images/gallery/img39.jpg';
import img40 from '../images/gallery/img40.jpg';
import img41 from '../images/gallery/img41.jpg';
import img42 from '../images/gallery/img42.jpg';
import img43 from '../images/gallery/img43.jpg';
import img44 from '../images/gallery/img44.jpg';
import img46 from '../images/gallery/img46.jpg';
import img47 from '../images/gallery/img47.jpg';
import img48 from '../images/gallery/img48.jpg';
import img49 from '../images/gallery/img49.jpg';
import img50 from '../images/gallery/img50.jpg';
import img51 from '../images/gallery/img51.jpg';
import img52 from '../images/gallery/img52.jpg';
import img53 from '../images/gallery/img53.jpg';
import img54 from '../images/gallery/img54.jpg';
import img55 from '../images/gallery/img55.jpg';
import img56 from '../images/gallery/img56.jpg';
import img57 from '../images/gallery/img57.jpg';
import img58 from '../images/gallery/img58.jpg';
import img59 from '../images/gallery/img59.jpg';
import img60 from '../images/gallery/img60.jpg';
import img61 from '../images/gallery/img61.jpg';
import img62 from '../images/gallery/img62.jpg';
import img63 from '../images/gallery/img63.jpg';
import img64 from '../images/gallery/img64.jpg';
import img65 from '../images/gallery/img65.jpg';
import img66 from '../images/gallery/img66.jpg';
import img67 from '../images/gallery/img67.jpg';
import img68 from '../images/gallery/img68.jpg';
import img69 from '../images/gallery/img69.jpg';
import img70 from '../images/gallery/img70.jpg';
import img71 from '../images/gallery/img71.jpg';
import img72 from '../images/gallery/img72.jpg';
import img73 from '../images/gallery/img73.jpg';
import img74 from '../images/gallery/img74.jpg';
import img75 from '../images/gallery/img75.jpg';
import img76 from '../images/gallery/img76.jpg';
import img77 from '../images/gallery/img77.jpg';
import img78 from '../images/gallery/img78.jpg';
import img79 from '../images/gallery/img79.jpg';
import img80 from '../images/gallery/img80.jpg';
import img81 from '../images/gallery/img81.jpg';
import img82 from '../images/gallery/img82.jpg';
import img83 from '../images/gallery/img83.jpg';
import img84 from '../images/gallery/img84.jpg';
import img85 from '../images/gallery/img85.jpg';
import img86 from '../images/gallery/img86.jpg';
import img87 from '../images/gallery/img87.jpg';
import img88 from '../images/gallery/img88.jpg';
import img89 from '../images/gallery/img89.jpg';
import img90 from '../images/gallery/img90.jpg';
import img91 from '../images/gallery/img91.jpg';
import img92 from '../images/gallery/img92.jpg';
import img93 from '../images/gallery/img93.jpg';
import img95 from '../images/gallery/img95.jpg';
import img96 from '../images/gallery/img96.jpg';
import img97 from '../images/gallery/img97.jpg';
import img98 from '../images/gallery/img98.jpg';
import img99 from '../images/gallery/img99.jpg';
import img100 from '../images/gallery/img100.jpg';
import img101 from '../images/gallery/img101.jpg';
import img102 from '../images/gallery/img102.jpg';
import img103 from '../images/gallery/img103.jpg';
import img104 from '../images/gallery/img104.jpg';
import img105 from '../images/gallery/img105.jpg';
import img106 from '../images/gallery/img106.jpg';
import img107 from '../images/gallery/img107.jpg';
import img108 from '../images/gallery/img108.jpg';
import img109 from '../images/gallery/img109.jpg';
import img110 from '../images/gallery/img110.jpg';
import img111 from '../images/gallery/img111.jpg';
import img112 from '../images/gallery/img112.jpg';
import img113 from '../images/gallery/img113.jpg';
import img114 from '../images/gallery/img114.jpg';
import img115 from '../images/gallery/img115.jpg';
import img116 from '../images/gallery/img116.jpg';
import img117 from '../images/gallery/img117.jpg';
import img118 from '../images/gallery/img118.jpg';
import img119 from '../images/gallery/img119.jpg';
import img120 from '../images/gallery/img120.jpg';
import img121 from '../images/gallery/img121.jpg';
import img122 from '../images/gallery/img122.jpg';
import img123 from '../images/gallery/img123.jpg';
import img124 from '../images/gallery/img124.jpg';
import img125 from '../images/gallery/img125.jpg';
import img126 from '../images/gallery/img126.jpg';
import img127 from '../images/gallery/img127.jpg';
import img128 from '../images/gallery/img128.jpg';
import img129 from '../images/gallery/img129.jpg';
import img130 from '../images/gallery/img130.jpg';
import img131 from '../images/gallery/img131.jpg';
import img132 from '../images/gallery/img132.jpg';
import img133 from '../images/gallery/img133.jpg';
import img134 from '../images/gallery/img134.jpg';
import img135 from '../images/gallery/img135.jpg';
import img136 from '../images/gallery/img136.jpg';
import img137 from '../images/gallery/img137.jpg';
import img138 from '../images/gallery/img138.jpg';
import img139 from '../images/gallery/img139.jpg';
import img140 from '../images/gallery/img140.jpg';
import img141 from '../images/gallery/img141.jpg';
import img142 from '../images/gallery/img142.jpg';
import img143 from '../images/gallery/img143.jpg';
import img144 from '../images/gallery/img144.jpg';
import img145 from '../images/gallery/img145.jpg';
import img146 from '../images/gallery/img146.jpg';
import img147 from '../images/gallery/img147.jpg';
import img148 from '../images/gallery/img148.jpg';
import img149 from '../images/gallery/img149.jpg';
import img150 from '../images/gallery/img150.jpg';
import img151 from '../images/gallery/img151.jpg';
import img152 from '../images/gallery/img152.jpg';
import img153 from '../images/gallery/img153.jpg';
import img154 from '../images/gallery/img154.jpg';
import img155 from '../images/gallery/img155.jpg';
import img156 from '../images/gallery/img156.jpg';
import img157 from '../images/gallery/img157.jpg';
import img158 from '../images/gallery/img158.jpg';
import img159 from '../images/gallery/img159.jpg';
import img160 from '../images/gallery/img160.jpg';
import img161 from '../images/gallery/img161.jpg';
import img162 from '../images/gallery/img162.jpg';
import img163 from '../images/gallery/img163.jpg';
import img164 from '../images/gallery/img164.jpg';
import img165 from '../images/gallery/img165.jpg';
import img166 from '../images/gallery/img166.jpg';
import img167 from '../images/gallery/img167.jpg';
import img168 from '../images/gallery/img168.jpg';
import img169 from '../images/gallery/img169.jpg';
import img170 from '../images/gallery/img170.jpg';
import img171 from '../images/gallery/img171.jpg';
import img172 from '../images/gallery/img172.jpg';
import img173 from '../images/gallery/img173.jpg';
import img174 from '../images/gallery/img174.jpg';
import img175 from '../images/gallery/img175.jpg';
import img176 from '../images/gallery/img176.jpg';
import img177 from '../images/gallery/img177.jpg';
import img178 from '../images/gallery/img178.jpg';
import img179 from '../images/gallery/img179.jpg';
import img180 from '../images/gallery/img180.jpg';
import img181 from '../images/gallery/img181.jpg';
import img182 from '../images/gallery/img182.jpg';
import img183 from '../images/gallery/img183.jpg';
import img184 from '../images/gallery/img184.jpg';
import img185 from '../images/gallery/img185.jpg';
import img186 from '../images/gallery/img186.jpg';
import img187 from '../images/gallery/img187.jpg';
import img188 from '../images/gallery/img188.jpg';
import img189 from '../images/gallery/img189.jpg';
import img190 from '../images/gallery/img190.jpg';

const swedenImages = [
  { src: img1, width: 4032, height: 3024, alt: 'img1', title: 'img1' },
  { src: img2, width: 4032, height: 3024, alt: 'img2', title: 'img2' },
  { src: img3, width: 3024, height: 4032, alt: 'img3', title: 'img3' },
  { src: img184, width: 2778, height: 3705, alt: 'img184', title: 'img184' },
  { src: img185, width: 3024, height: 4032, alt: 'img185', title: 'img185' },
  { src: img186, width: 4032, height: 3024, alt: 'img186', title: 'img186' },
  { src: img187, width: 4032, height: 3024, alt: 'img187', title: 'img187' },
];
const thailandImages = [
  { src: img188, width: 3024, height: 4032, alt: 'img188', title: 'img188' },
  { src: img4, width: 3024, height: 4032, alt: 'img4', title: 'img4' },
  { src: img5, width: 4032, height: 3024, alt: 'img5', title: 'img5' },
  { src: img6, width: 3024, height: 4032, alt: 'img6', title: 'img6' },
  { src: img7, width: 3024, height: 4032, alt: 'img7', title: 'img7' },
  { src: img8, width: 3024, height: 4032, alt: 'img8', title: 'img8' },
  { src: img9, width: 3024, height: 4032, alt: 'img9', title: 'img9' },
  { src: img10, width: 4032, height: 3024, alt: 'img10', title: 'img10' },
  { src: img11, width: 3024, height: 4032, alt: 'img11', title: 'img11' },
  { src: img12, width: 3024, height: 4032, alt: 'img12', title: 'img12' },
  { src: img13, width: 1242, height: 2208, alt: 'img13', title: 'img13' },
  { src: img14, width: 3024, height: 4032, alt: 'img14', title: 'img14' },
  { src: img189, width: 3024, height: 4032, alt: 'img189', title: 'img189' },
  { src: img190, width: 2662, height: 3125, alt: 'img190', title: 'img190' },
];
const mumbaiImages = [
  { src: img15, width: 4032, height: 3024, alt: 'img15', title: 'img15' },
  { src: img16, width: 3024, height: 4032, alt: 'img16', title: 'img16' },
  { src: img17, width: 4032, height: 3024, alt: 'img17', title: 'img17' },
  { src: img18, width: 3024, height: 4032, alt: 'img18', title: 'img18' },
  { src: img19, width: 2896, height: 3705, alt: 'img19', title: 'img19' },
  { src: img20, width: 3024, height: 4032, alt: 'img20', title: 'img20' },
  { src: img21, width: 2989, height: 3627, alt: 'img21', title: 'img21' },
  { src: img22, width: 3024, height: 4032, alt: 'img22', title: 'img22' },
  { src: img23, width: 2381, height: 3250, alt: 'img23', title: 'img23' },
  { src: img24, width: 4032, height: 3024, alt: 'img24', title: 'img24' },
  { src: img25, width: 3024, height: 4032, alt: 'img25', title: 'img25' },
  { src: img26, width: 4032, height: 3024, alt: 'img26', title: 'img26' },
  { src: img27, width: 3024, height: 4032, alt: 'img27', title: 'img27' },
  { src: img28, width: 4032, height: 3024, alt: 'img28', title: 'img28' },
  { src: img29, width: 3024, height: 4032, alt: 'img29', title: 'img29' },
  { src: img30, width: 2852, height: 3024, alt: 'img30', title: 'img30' }
];
const puneImages = [
  { src: img31, width: 4032, height: 3024, alt: 'img31', title: 'img31' },
  { src: img32, width: 3024, height: 4032, alt: 'img32', title: 'img32' },
  { src: img33, width: 4032, height: 3024, alt: 'img33', title: 'img33' },
  { src: img34, width: 3024, height: 4032, alt: 'img34', title: 'img34' },
  { src: img35, width: 3024, height: 4032, alt: 'img35', title: 'img35' },
  { src: img36, width: 3024, height: 4032, alt: 'img36', title: 'img36' },
  { src: img37, width: 3752, height: 2814, alt: 'img37', title: 'img37' }
];
const darjeelingImages = [
  { src: img38, width: 1845, height: 3048, alt: 'img38', title: 'img38' },
  { src: img39, width: 3024, height: 4032, alt: 'img39', title: 'img39' },
  { src: img40, width: 3024, height: 4032, alt: 'img40', title: 'img40' },
  { src: img41, width: 3024, height: 4032, alt: 'img41', title: 'img41' },
  { src: img42, width: 3024, height: 4032, alt: 'img42', title: 'img42' },
  { src: img43, width: 3024, height: 4032, alt: 'img43', title: 'img43' },
  { src: img44, width: 2649, height: 4029, alt: 'img44', title: 'img44' },
  { src: img46, width: 3024, height: 4032, alt: 'img46', title: 'img46' },
  { src: img47, width: 2079, height: 2697, alt: 'img47', title: 'img47' },
  { src: img48, width: 1058, height: 1417, alt: 'img48', title: 'img48' },
  { src: img49, width: 3024, height: 4032, alt: 'img49', title: 'img49' },
  { src: img50, width: 3024, height: 4032, alt: 'img50', title: 'img50' },
  { src: img51, width: 1734, height: 2312, alt: 'img51', title: 'img51' },
  { src: img52, width: 4032, height: 3024, alt: 'img52', title: 'img52' }
];
const kolkataImages = [
  { src: img53, width: 3289, height: 2701, alt: 'img53', title: 'img53' },
  { src: img54, width: 3024, height: 4032, alt: 'img54', title: 'img54' },
  { src: img55, width: 1581, height: 3024, alt: 'img55', title: 'img55' },
  { src: img56, width: 3024, height: 4032, alt: 'img56', title: 'img56' },
  { src: img57, width: 3021, height: 3465, alt: 'img57', title: 'img57' },
  { src: img58, width: 3022, height: 3449, alt: 'img58', title: 'img58' },
  { src: img59, width: 3024, height: 4032, alt: 'img59', title: 'img59' },
  { src: img60, width: 4032, height: 3024, alt: 'img60', title: 'img60' },
  { src: img61, width: 3021, height: 3748, alt: 'img61', title: 'img61' },
  { src: img62, width: 2357, height: 3802, alt: 'img62', title: 'img62' },
  { src: img63, width: 3024, height: 4032, alt: 'img63', title: 'img63' },
  { src: img64, width: 4032, height: 3024, alt: 'img64', title: 'img64' },
  { src: img65, width: 3140, height: 2565, alt: 'img65', title: 'img65' },
  { src: img66, width: 3024, height: 4032, alt: 'img66', title: 'img66' },
  { src: img67, width: 3021, height: 2515, alt: 'img67', title: 'img67' },
  { src: img68, width: 3024, height: 4032, alt: 'img68', title: 'img68' },
  { src: img69, width: 2264, height: 4029, alt: 'img69', title: 'img69' },
  { src: img70, width: 3024, height: 4032, alt: 'img70', title: 'img70' },
  { src: img71, width: 3024, height: 4032, alt: 'img71', title: 'img71' },
  { src: img72, width: 3091, height: 2697, alt: 'img72', title: 'img72' },
  { src: img73, width: 2482, height: 3310, alt: 'img73', title: 'img73' },
  { src: img74, width: 3058, height: 2331, alt: 'img74', title: 'img74' },
  { src: img75, width: 4032, height: 3024, alt: 'img75', title: 'img75' },
  { src: img76, width: 1677, height: 3264, alt: 'img76', title: 'img76' },
  { src: img77, width: 4032, height: 3024, alt: 'img77', title: 'img77' },
  { src: img78, width: 2896, height: 4032, alt: 'img78', title: 'img78' },
  { src: img79, width: 3540, height: 2686, alt: 'img79', title: 'img79' },
  { src: img80, width: 1349, height: 1793, alt: 'img80', title: 'img80' },
  { src: img81, width: 3800, height: 2347, alt: 'img81', title: 'img81' },
  { src: img82, width: 2187, height: 2811, alt: 'img82', title: 'img82' },
  { src: img83, width: 2902, height: 4029, alt: 'img83', title: 'img83' },
  { src: img84, width: 2905, height: 4029, alt: 'img84', title: 'img84' },
  { src: img85, width: 4032, height: 3024, alt: 'img85', title: 'img85' },
  { src: img86, width: 4032, height: 3024, alt: 'img86', title: 'img86' },
  { src: img87, width: 3024, height: 4032, alt: 'img87', title: 'img87' },
  { src: img88, width: 4032, height: 3024, alt: 'img88', title: 'img88' },
  { src: img89, width: 3024, height: 4032, alt: 'img89', title: 'img89' },
  { src: img90, width: 4032, height: 3024, alt: 'img90', title: 'img90' },
  { src: img91, width: 4032, height: 3024, alt: 'img91', title: 'img91' },
  { src: img92, width: 4032, height: 3024, alt: 'img92', title: 'img92' },
  { src: img93, width: 3024, height: 4032, alt: 'img93', title: 'img93' },
  { src: img95, width: 4032, height: 3024, alt: 'img95', title: 'img95' },
  { src: img96, width: 3024, height: 4032, alt: 'img96', title: 'img96' },
  { src: img97, width: 3024, height: 4032, alt: 'img97', title: 'img97' },
  { src: img98, width: 3024, height: 4032, alt: 'img98', title: 'img98' },
  { src: img99, width: 2021, height: 3386, alt: 'img99', title: 'img99' },
  { src: img100, width: 3024, height: 4032, alt: 'img100', title: 'img100' },
  { src: img101, width: 4032, height: 3024, alt: 'img101', title: 'img101' },
  { src: img102, width: 3024, height: 4032, alt: 'img102', title: 'img102' },
  { src: img103, width: 3024, height: 4032, alt: 'img103', title: 'img103' },
  { src: img104, width: 3024, height: 4032, alt: 'img104', title: 'img104' },
  { src: img105, width: 3024, height: 4032, alt: 'img105', title: 'img105' },
  { src: img106, width: 3024, height: 4032, alt: 'img106', title: 'img106' },
  { src: img107, width: 4032, height: 3024, alt: 'img107', title: 'img107' },
  { src: img108, width: 3024, height: 4032, alt: 'img108', title: 'img108' },
  { src: img109, width: 3024, height: 4032, alt: 'img109', title: 'img109' },
  { src: img110, width: 2697, height: 3596, alt: 'img110', title: 'img110' },
  { src: img155, width: 3022, height: 3980, alt: 'img155', title: 'img155' },
  { src: img156, width: 3024, height: 4032, alt: 'img156', title: 'img156' },
  { src: img157, width: 4032, height: 3024, alt: 'img157', title: 'img157' },
  { src: img158, width: 3024, height: 4032, alt: 'img158', title: 'img158' }
];
const gayaImages = [
  { src: img111, width: 1909, height: 1719, alt: 'img111', title: 'img111' },
  { src: img112, width: 3917, height: 2939, alt: 'img112', title: 'img112' },
  { src: img113, width: 665, height: 2206, alt: 'img113', title: 'img113' },
  { src: img114, width: 1299, height: 1904, alt: 'img114', title: 'img114' },
  { src: img115, width: 1496, height: 666, alt: 'img115', title: 'img115' },
  { src: img116, width: 3024, height: 4032, alt: 'img116', title: 'img116' },
  { src: img117, width: 3821, height: 2866, alt: 'img117', title: 'img117' },
  { src: img118, width: 2931, height: 3971, alt: 'img118', title: 'img118' },
  { src: img119, width: 3021, height: 3220, alt: 'img119', title: 'img119' },
  { src: img120, width: 3214, height: 2443, alt: 'img120', title: 'img120' },
  { src: img121, width: 2133, height: 1466, alt: 'img121', title: 'img121' },
  { src: img122, width: 3264, height: 3264, alt: 'img122', title: 'img122' }
];
const shantiImages = [
  { src: img123, width: 4030, height: 2385, alt: 'img123', title: 'img123' },
  { src: img124, width: 3024, height: 4032, alt: 'img124', title: 'img124' },
  { src: img125, width: 3024, height: 4032, alt: 'img125', title: 'img125' },
  { src: img126, width: 3024, height: 4032, alt: 'img126', title: 'img126' }
];
const puduImages = [
  { src: img127, width: 3024, height: 4032, alt: 'img127', title: 'img127' },
  { src: img128, width: 2664, height: 4096, alt: 'img128', title: 'img128' },
  { src: img129, width: 4032, height: 3024, alt: 'img129', title: 'img129' },
  { src: img130, width: 3024, height: 4032, alt: 'img130', title: 'img130' },
  { src: img131, width: 3024, height: 4032, alt: 'img131', title: 'img131' },
  { src: img132, width: 2593, height: 3622, alt: 'img132', title: 'img132' },
  { src: img133, width: 2907, height: 3852, alt: 'img133', title: 'img133' },
  { src: img134, width: 3024, height: 4032, alt: 'img134', title: 'img134' },
  { src: img135, width: 4032, height: 3024, alt: 'img135', title: 'img135' },
  { src: img136, width: 3024, height: 4032, alt: 'img136', title: 'img136' },
  { src: img137, width: 4032, height: 3024, alt: 'img137', title: 'img137' }
];
const dhanbadImages = [
  { src: img138, width: 3024, height: 4032, alt: 'img138', title: 'img138' },
  { src: img139, width: 3024, height: 4032, alt: 'img139', title: 'img139' },
  { src: img140, width: 3024, height: 4032, alt: 'img140', title: 'img140' },
  { src: img141, width: 3024, height: 4032, alt: 'img141', title: 'img141' },
  { src: img142, width: 2025, height: 3226, alt: 'img142', title: 'img142' },
  { src: img143, width: 2771, height: 4029, alt: 'img143', title: 'img143' },
  { src: img144, width: 2705, height: 3607, alt: 'img144', title: 'img144' },
  { src: img145, width: 3024, height: 4032, alt: 'img145', title: 'img145' },
  { src: img146, width: 3024, height: 4032, alt: 'img146', title: 'img146' },
  { src: img147, width: 1978, height: 2640, alt: 'img147', title: 'img147' }
];
const sambalpurImages = [
  { src: img148, width: 3021, height: 3604, alt: 'img148', title: 'img148' },
  { src: img149, width: 3022, height: 3305, alt: 'img149', title: 'img149' },
  { src: img150, width: 4032, height: 3024, alt: 'img150', title: 'img150' },
  { src: img151, width: 3024, height: 4032, alt: 'img151', title: 'img151' },
  { src: img152, width: 3024, height: 4032, alt: 'img152', title: 'img152' },
  { src: img153, width: 2432, height: 4541, alt: 'img153', title: 'img153' },
  { src: img154, width: 2710, height: 4535, alt: 'img154', title: 'img154' },
  { src: img167, width: 3760, height: 5009, alt: 'img167', title: 'img167' },
  { src: img168, width: 4032, height: 3024, alt: 'img168', title: 'img168' },
  { src: img170, width: 3024, height: 4032, alt: 'img170', title: 'img170' },
  { src: img171, width: 3024, height: 4032, alt: 'img171', title: 'img171' },
  { src: img172, width: 3024, height: 4032, alt: 'img172', title: 'img172' },
  { src: img169, width: 4032, height: 3024, alt: 'img169', title: 'img169' },
  { src: img173, width: 3024, height: 4032, alt: 'img173', title: 'img173' },
];
const chennaiImages = [
  { src: img159, width: 3024, height: 4032, alt: 'img159', title: 'img159' },
  { src: img160, width: 3024, height: 4032, alt: 'img160', title: 'img160' },
  { src: img161, width: 3024, height: 4032, alt: 'img161', title: 'img161' },
  { src: img162, width: 3024, height: 4032, alt: 'img162', title: 'img162' },
  { src: img163, width: 3024, height: 4032, alt: 'img163', title: 'img163' },
  { src: img164, width: 4032, height: 3024, alt: 'img164', title: 'img164' },
  { src: img165, width: 3024, height: 4032, alt: 'img165', title: 'img165' },
  { src: img166, width: 4032, height: 3024, alt: 'img166', title: 'img166' },
];
const delhiImages = [
  { src: img174, width: 3024, height: 4032, alt: 'img174', title: 'img174' },
  { src: img175, width: 4032, height: 3024, alt: 'img175', title: 'img175' },
  { src: img176, width: 3024, height: 4032, alt: 'img176', title: 'img176' },
  { src: img177, width: 2219, height: 2959, alt: 'img177', title: 'img177' },
  { src: img178, width: 3946, height: 3022, alt: 'img178', title: 'img178' },
  { src: img179, width: 3024, height: 4032, alt: 'img179', title: 'img179' },
  { src: img180, width: 2230, height: 2973, alt: 'img180', title: 'img180' },
  { src: img181, width: 3024, height: 4032, alt: 'img181', title: 'img181' },
  { src: img182, width: 3705, height: 2679, alt: 'img182', title: 'img182' },
  { src: img183, width: 1158, height: 1873, alt: 'img183', title: 'img183' },
];


function Gallery() {
  const [index1, setIndex1] = useState(-1);
  const [index2, setIndex2] = useState(-1);
  const [index3, setIndex3] = useState(-1);
  const [index4, setIndex4] = useState(-1);
  const [index5, setIndex5] = useState(-1);
  const [index6, setIndex6] = useState(-1);
  const [index7, setIndex7] = useState(-1);
  const [index8, setIndex8] = useState(-1);
  const [index9, setIndex9] = useState(-1);
  const [index10, setIndex10] = useState(-1);
  const [index11, setIndex11] = useState(-1);
  const [index12, setIndex12] = useState(-1);
  const [index13, setIndex13] = useState(-1);

  return (
    <Container>
      <Row>
        <Col lg={4} className="image-p">
          <div id="gl-img">
            <Image src="https://raw.githubusercontent.com/DrtSinX98/DrtSinX98.github.io/main/src/images/gl.svg" alt="project-pic" className="mb-4" fluid/>
          </div>
        </Col>
        <Col>
          <h1>Welcome to my <span className="pink">Gallery!</span></h1>
          <p className="lead">I love to travel a lot and have travelled to many places in <span className='pink'>India</span> and <span className='pink'>abroad</span>. <br/>As I have some interest in <span className="pink">photography</span>, I try to click pictures of monuments, architecture, and nature. <br/> Below you can find a beautifully curated gallery of the pictures taken from my <span className="pink">phone</span>.</p>
        </Col>
      </Row>
      <hr className="my-4" />
      <>
        <h2 className='place'>Sweden</h2>
        <RowsPhotoAlbum
          photos={swedenImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex1(index)}
        />
        <Lightbox
          slides={swedenImages}
          open={index1 >= 0}
          index={index1}
          close={() => setIndex1(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Thailand</h2>
        <RowsPhotoAlbum
          photos={thailandImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex2(index)}
        />
        <Lightbox
          slides={thailandImages}
          open={index2 >= 0}
          index={index2}
          close={() => setIndex2(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Delhi</h2>
        <RowsPhotoAlbum
          photos={delhiImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex13(index)}
        />
        <Lightbox
          slides={delhiImages}
          open={index13 >= 0}
          index={index13}
          close={() => setIndex13(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Mumbai</h2>
        <RowsPhotoAlbum
          photos={mumbaiImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex3(index)}
        />
        <Lightbox
          slides={mumbaiImages}
          open={index3 >= 0}
          index={index3}
          close={() => setIndex3(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Pune</h2>
        <RowsPhotoAlbum
          photos={puneImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex4(index)}
        />
        <Lightbox
          slides={puneImages}
          open={index4 >= 0}
          index={index4}
          close={() => setIndex4(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Darjeeling</h2>
        <RowsPhotoAlbum
          photos={darjeelingImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex5(index)}
        />
        <Lightbox
          slides={darjeelingImages}
          open={index5 >= 0}
          index={index5}
          close={() => setIndex5(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Kolkata</h2>
        <RowsPhotoAlbum
          photos={kolkataImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex6(index)}
        />
        <Lightbox
          slides={kolkataImages}
          open={index6 >= 0}
          index={index6}
          close={() => setIndex6(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Gaya</h2>
        <RowsPhotoAlbum
          photos={gayaImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex7(index)}
        />
        <Lightbox
          slides={gayaImages}
          open={index7 >= 0}
          index={index7}
          close={() => setIndex7(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Shantiniketan</h2>
        <RowsPhotoAlbum
          photos={shantiImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex8(index)}
        />
        <Lightbox
          slides={shantiImages}
          open={index8 >= 0}
          index={index8}
          close={() => setIndex8(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Chennai</h2>
        <RowsPhotoAlbum
          photos={chennaiImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex9(index)}
        />
        <Lightbox
          slides={chennaiImages}
          open={index9 >= 0}
          index={index9}
          close={() => setIndex9(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Puducherry</h2>
        <RowsPhotoAlbum
          photos={puduImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex10(index)}
        />
        <Lightbox
          slides={puduImages}
          open={index10 >= 0}
          index={index10}
          close={() => setIndex10(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Dhanbad</h2>
        <RowsPhotoAlbum
          photos={dhanbadImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex11(index)}
        />
        <Lightbox
          slides={dhanbadImages}
          open={index11 >= 0}
          index={index11}
          close={() => setIndex11(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <h2 className='place'>Sambalpur</h2>
        <RowsPhotoAlbum
          photos={sambalpurImages}
          targetRowHeight={300}
          onClick={({ index }) => setIndex12(index)}
        />
        <Lightbox
          slides={sambalpurImages}
          open={index12 >= 0}
          index={index12}
          close={() => setIndex12(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
        <style>{`
         #gl-img {
            width: 350px;
            height: 250px;
          }

          h1 {
            font-size: 50px;
            font-weight: bold;
          }

          .lead {
            font-size: 24px;
            line-height: 1.5;
          }

          .pink {
            color: var(--secondary-color);
          }

          .place {
            color: var(--tertiary-color);
            text-align: center;
            background-color: var(--secondary-color);
            border-radius: var(--bs-border-radius);
            padding: 5px;
            margin-top: 10px;
          }
          .react-photo-album--photo img {
            border-radius: var(--bs-border-radius);
          }
        `}</style>
      </>
    </Container>
  );
}

export default Gallery;