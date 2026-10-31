const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/products.ts');
let file = fs.readFileSync(filePath, 'utf8');

const galleries = {
  'ban-tho-treo-chung-cu-48x81-go-soi': [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
  ],
  'ban-tho-treo-tuong-48x89-go-go-do': [
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  ],
  'ban-tho-dung-gia-tien-61x107-go-gu-lao': [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  ],
  'tranh-truc-chi-hoa-sen-led-hao-quang': [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'
  ],
  'vach-ngan-cnc-chu-tho-van-go-soi': [
    'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  ],
  'tam-chong-am-khoi-tran-nha-chu-tho': [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  ],
  'ban-tho-treo-48x81-go-mit-ta-son-dong': [
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
  ],
  'ban-tho-treo-mini-41x61-go-soi-chung-cu': [
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
  ],
  'ban-tho-dung-67x127-go-go-do-nam-phi': [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  ],
  'tu-com-ke-gam-ban-tho-61x81-go-go-do': [
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  ],
  'be-tam-cap-tho-gia-tien-3-tang-go-mit-ta': [
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  ],
  'an-gian-tho-ngu-phuc-81x153-go-huong-da': [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  ]
};

for (const [slug, imgs] of Object.entries(galleries)) {
  const targetRegex = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?imageUrl:\\s*['"][^'"]+['"],)`);
  const formattedImgs = JSON.stringify(imgs, null, 2)
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : '    ' + line))
    .join('\n');
  file = file.replace(targetRegex, `$1\n    images: ${formattedImgs},`);
}

fs.writeFileSync(filePath, file, 'utf8');
console.log('Successfully added multi-image galleries to products.ts!');
