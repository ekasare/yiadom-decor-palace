/* ============================================================
   PRODUCT LIST — shared by the website (index.html) and the catalogue (catalogue.html)
   To add an item: put the photo in /images and add a line below.
   cat: plants | pots | vases | fragrance      xmas: true = also a "Christmas Pick"
   price: number in GH₵ (e.g. 450), or text for a range (e.g. "50–200"). Leave it out to show "Price on request".
   Item codes (YDP-001, YDP-002 ...) are given automatically in this order,
   so add new items at the END to keep existing codes the same.
   hidden: true = not shown on the website or catalogue (e.g. not in stock). Never delete a line:
   that would change the codes of every item after it. Remove "hidden: true" to show it again.
   ============================================================ */

const WHATSAPP = "233275957777";

const PRODUCTS = [
  { img: "img_1898", name: "Cypress Topiary Tree", price: 760, cat: "plants", xmas: true, desc: "A neat evergreen cypress in a white pedestal pot — a perfect, reusable Christmas tree for entrances and living rooms." },
  { img: "img_1810", name: "Stone Urn Planter, Gold Rim", price: 690, cat: "pots", desc: "Tall stone-textured urn with a brushed gold rim. Beautiful indoors or at your entrance." },
  { img: "img_2269", name: "Pink Caladium in Stone Vase", price: 300, cat: "plants", xmas: true, desc: "Bold pink-and-green leaves in a textured stone vase. Adds instant colour to any corner." },
  { img: "img_2068", name: "Turquoise Crackle Glass Vase", cat: "vases", xmas: true, desc: "Hand-finished art glass with a turquoise crackle pattern. A striking centrepiece and a lovely gift." },
  { img: "photo-2026-10-22-22-25-27-1", name: "AROMA Reed Diffuser", price: 90, cat: "fragrance", xmas: true, desc: "Fresh air & home fragrance in an amber glass bottle. Long-lasting scent for living rooms and offices." },
  { img: "img_1884", name: "Pink Cherry Blossom Tree", price: 1600, cat: "plants", desc: "A romantic blossom tree in a white bowl pot. Perfect for lounges, bedrooms and event décor." },
  { img: "img_1813", name: "Ribbed Bowl Planter — Black & Gold", price: 492, cat: "pots", xmas: true, desc: "Rounded ribbed pot in matte black with a gold rim. Elegant and modern." },
  { img: "img_2016", name: "Gold Bubble Vase", price: 2000, cat: "vases", xmas: true, desc: "Sculptural gold floor vase with decorative branches — a festive statement piece." },
  { img: "img_1896", name: "Autumn Maple Tree", price: 690, cat: "plants", desc: "Vibrant orange maple foliage in a glossy white pot. Warm, cheerful and eye-catching." },
  { img: "img_1820", name: "Gold Pedestal Planter", price: 394, cat: "pots", xmas: true, desc: "Hourglass pedestal planter with a shimmering gold finish. Pairs beautifully with topiary." },
  { img: "img_2076", name: "Sky-to-Violet Glass Vase", price: 700, cat: "vases", desc: "Soft blue fading into violet with gold flecks. Elegant on a console or dining table." },
  { img: "photo-2026-10-22-22-25-27-2", name: "Rose Pink Reed Diffuser", price: 55, cat: "fragrance", xmas: true, desc: "Floral rose scent in a gift-ready box. A sweet present for someone special." },
  { img: "img_1900", name: "Olive Tree", price: 1600, cat: "plants", desc: "Graceful olive tree in a white round pot. Brings a calm, Mediterranean feel indoors." },
  { img: "img_1807", name: "Ocean Blue Glazed Pot", price: 250, cat: "pots", desc: "Deep blue glossy glaze with a reactive finish. Lovely for verandas and patios." },
  { img: "img_2004", name: "White Fluted Floor Vase", price: 1500, cat: "vases", xmas: true, desc: "Tall fluted floor vase in white with decorative branches. Clean, bright and festive." },
  { img: "img_2084", name: "Banana Leaf Plant", price: 640, cat: "plants", desc: "Lush tropical banana leaves in a textured white pot. Fills a corner beautifully." },
  { img: "img_1811", name: "Charcoal Ribbed Urn, Gold Rim", price: 550, cat: "pots", desc: "Tall charcoal urn with fine ribbing and a gold rim. Modern luxury for homes and offices." },
  { img: "img_2069", name: "Cobalt & Gold Vein Vase", price: 700, cat: "vases", xmas: true, desc: "Rich cobalt glass laced with gold veins. A jewel-like accent piece." },
  { img: "img_2259", name: "Silver Leaf Plant", price: 300, cat: "plants", desc: "Green-and-white variegated leaves in a silver tapered pot." },
  { img: "photo-2026-10-22-22-25-27-4", name: "Blueberry Reed Diffuser", price: 60, cat: "fragrance", desc: "Fruity blueberry scent in a cobalt glass bottle with reeds." },
  { img: "img_1887", name: "Bird of Paradise", price: 600, cat: "plants", desc: "Broad tropical leaves for a bold, fresh look. Never needs watering." },
  { img: "img_1805", name: "Marble-Effect Planter, Gold Band", price: 300, cat: "pots", desc: "White marble-effect fluted planter with a wide gold band." },
  { img: "img_2078", name: "White Marble Vase, Gold Rim", price: 800, cat: "vases", xmas: true, desc: "Glossy white vase with golden marble veining. Timeless elegance." },
  { img: "img_1892", name: "Fiddle Leaf Fig", price: 550, cat: "plants", desc: "The designer favourite — tall fiddle leaf fig in a white pot." },
  { img: "img_1822", name: "Black Pedestal Planter", price: 394, cat: "pots", desc: "Textured matte black hourglass planter. Strong and sculptural." },
  { img: "img_2072", name: "Pink Art Glass Vase", price: 600, cat: "vases", desc: "Playful multicolour art glass in soft pink tones." },
  { img: "photo-2026-10-22-22-24-32-3", name: "Tall Cypress Tree", price: 700, cat: "plants", xmas: true, desc: "Full, tall cypress tree — an evergreen that brings Christmas cheer year after year." },
  { img: "photo-2026-10-22-22-03-24", name: "Diffuser Gift Collection", price: "50–200", cat: "fragrance", xmas: true, desc: "A range of boxed reed diffusers in many scents — ideal Christmas and corporate gifts." },
  { img: "img_1890", name: "Red Croton Tree", price: 680, cat: "plants", desc: "Rich red and burgundy foliage in a black pot. Warm and dramatic." },
  { img: "img_1814", name: "Ribbed Bowl Planter — White & Gold", price: 362, cat: "pots", xmas: true, desc: "Rounded white ribbed bowl with a gold rim. Fresh, bright and elegant." },
  { img: "img_2081", name: "Textured Bottle Vase", price: 600, cat: "vases", desc: "Organic bottle-shaped vase with a hand-textured pastel surface." },
  { img: "img_2264", name: "Monstera in Leaf-Print Pot", price: 300, cat: "plants", desc: "Large glossy leaves in a white cylinder pot with a leaf print." },
  { img: "img_1817", name: "White Textured Square Planter", price: 350, cat: "pots", desc: "Tall square planter with a rough white texture. Great in pairs at a door." },
  { img: "img_2047", name: "White Vase with Golden Pampas", price: 1500, cat: "vases", xmas: true, desc: "White fluted vase styled with soft golden pampas." },
  { img: "img_1893", name: "Snake Plant", price: 900, cat: "plants", desc: "Upright, architectural snake plant leaves. Clean and modern." },
  { img: "photo-2026-10-22-22-25-27", name: "Strawberry Reed Diffuser", price: 60, cat: "fragrance", desc: "Sweet strawberry fragrance in a pretty gift box." },
  { img: "img_1886", name: "White Blossom Tree", price: 1600, cat: "plants", xmas: true, desc: "Snow-white blossom tree in a black bowl pot — a wintery touch for Christmas." },
  { img: "img_1809", name: "Jade Green Glazed Pot", price: 400, cat: "pots", desc: "Classic flared pot in a jade green glaze with embossed detail." },
  { img: "img_2001", name: "Black Fluted Floor Vase", price: 1500, cat: "vases", desc: "Tall matte black fluted vase with natural branches." },
  { img: "img_2027", name: "Pink Caladium in Champagne Vase", price: 2500, cat: "plants", desc: "Pink-veined caladium in a champagne-toned floor vase." },
  { img: "img_1803", name: "White Globe Planter", price: 450, cat: "pots", desc: "Smooth, matte white globe pot. Simple and versatile." },
  { img: "img_2011", name: "Gold Floor Vase", price: 1500, cat: "vases", xmas: true, desc: "Gold floor vase with decorative branches — glamour for any corner." },
  { img: "photo-2026-10-22-22-25-27-3", name: "Double Ball Topiary", price: 600, cat: "plants", xmas: true, desc: "Two-tier ball topiary in a white pedestal pot. Lovely in pairs by a door." },
  { img: "photo-2026-10-22-22-25-27-5", name: "Electric Aroma Diffuser Set", price: 170, cat: "fragrance", desc: "Home fragrance oil with a rechargeable electric diffuser." },
  { img: "img_2328", name: "Tropical Leaf Plant", price: 300, cat: "plants", desc: "Fresh green tropical leaves in a white leaf-print pot." },
  { img: "img_1816", name: "Black Textured Square Planter", price: 250, cat: "pots", desc: "Tall square planter in textured black. Bold at entrances." },
  { img: "img_2042", name: "Black Vase with Pampas", price: 1500, cat: "vases", desc: "Matte black vase with fluffy cream pampas grass." },
  { img: "img_1889", name: "Ficus Tree", price: 730, cat: "plants", desc: "Slim, leafy ficus tree in a white pot — fits tight spaces." },
  { img: "img_2229", name: "Leaf-Print Cylinder Planter", price: 600, cat: "pots", desc: "White cylinder planter decorated with gold and grey leaves." },
  { img: "photo-2026-10-22-22-03-25", name: "Luxury Diffuser Range", price: 80, cat: "fragrance", xmas: true, desc: "Premium boxed diffusers — beautiful gifts for family, friends and staff." },

  // ---- Diffuser collection added 24 Oct 2026 ----
  { img: "dif-garden-after-rain", name: "Garden After the Rain Reed Diffuser", price: 70, cat: "fragrance", desc: "Good Vas You · 150 ml. Fresh green floral scent in a rose-print gift box, with white reeds and a flower diffuser." },
  { img: "dif-aroma-zuohe-100", name: "Aroma Zuohe Reed Diffuser (100 ml)", price: 70, cat: "fragrance", desc: "Soft aqua glass bottle with a wooden cap and natural rattan reeds. Calm, clean fragrance." },
  { img: "dif-bb-lavender", name: "Lavender Reed Diffuser", price: 70, cat: "fragrance", desc: "150 ml. Relaxing lavender in a deep-blue glass bottle — lovely for bedrooms." },
  { img: "dif-east-herben-refill-500", name: "East Herben Diffuser Refill (500 ml)", price: 140, cat: "fragrance", desc: "Large 500 ml refill bottle — keep your favourite diffuser going for months." },
  { img: "dif-cmay-spring-poppy", name: "Cmay Spring Poppy Reed Diffuser", price: 65, cat: "fragrance", desc: "120 ml. Light, floral and fresh — spring in a bottle." },
  { img: "dif-thinking-tea-farm", name: "Thinking Tea Farm Reed Diffuser", price: 100, cat: "fragrance", xmas: true, desc: "Longfine · 150 ml. Warm tea fragrance in an elegant red glass bottle and gift box." },
  { img: "dif-cmay-parfum-blossom", name: "Cmay Parfum Reed Diffuser — Pink Blossom", price: 65, cat: "fragrance", desc: "100 ml. Sweet floral scent in a clear display box." },
  { img: "dif-flower-sachet-set", name: "Flower Reed Diffuser Gift Set (40 ml)", price: 50, cat: "fragrance", xmas: true, desc: "Ceramic vase, sola flower and rattan reeds in a window gift box — a sweet little present." },
  { img: "dif-black-gold-home", name: "Black & Gold Home Fragrance Diffuser", price: 55, cat: "fragrance", desc: "100 ml. Elegant black-and-gold box with amber bottle and flower reeds." },
  { img: "dif-cmay-freesia", name: "Cmay Freesia Reed Diffuser", price: 65, cat: "fragrance", desc: "120 ml. Clean, delicate freesia — fresh and uplifting." },
  { img: "dif-cmay-parfum-golden", name: "Cmay Parfum Reed Diffuser — Golden", price: 65, cat: "fragrance", desc: "100 ml. Bright, fresh scent with white flower reeds." },
  { img: "dif-scent-diffuser-lilac", name: "Scent Diffuser — Lilac (150 ml)", price: 80, cat: "fragrance", desc: "Soft lilac fragrance in a cork-topped glass bottle with a mint gift box." },
  { img: "dif-cmay-parfum-rose", name: "Cmay Parfum Reed Diffuser — Rose Pink", price: 65, cat: "fragrance", desc: "100 ml. Romantic rose scent in a clear display box." },
  { img: "dif-bb-cedarwood-musk", name: "Cedarwood Musk Reed Diffuser", price: 70, cat: "fragrance", desc: "150 ml. Warm, woody and luxurious — perfect for living rooms and offices." },
  { img: "dif-east-herben-aroma-mint", name: "East Herben Aroma Diffuser — Mint Glass", price: 120, cat: "fragrance", xmas: true, desc: "100 ml. Designer mint-green glass bottle in a minimalist gift box." },
  { img: "dif-east-herben-lilac", name: "East Herben Lilac Bottle Diffuser", price: 65, cat: "fragrance", xmas: true, desc: "100 ml. Ribbed lilac bottle with a gold label — beautiful on any shelf." },
  { img: "dif-guosir-pineapple", name: "Guosir Pineapple Reed Diffuser", price: 60, cat: "fragrance", desc: "120 ml. Juicy tropical pineapple — bright and cheerful." },
  { img: "dif-cmay-rose", name: "Cmay Rose Reed Diffuser", price: 65, cat: "fragrance", desc: "120 ml. Classic rose fragrance in a square glass bottle." },
  { img: "dif-good-as-you-citrus", name: "Good As You Dried Citrus Diffuser", price: 55, cat: "fragrance", desc: "100 ml. Glass bottle with real dried orange slices — fresh and zesty." },
  { img: "dif-amber-reed-set", name: "Amber Bottle Reed Diffuser Set (50 ml)", price: 40, cat: "fragrance", desc: "Amber glass bottle with rattan reeds and a woven ball, in a window gift box." },
  { img: "dif-aqua-aromatherapy", name: "Home Aromatherapy Diffuser — Aqua (50 ml)", price: 40, cat: "fragrance", desc: "Ribbed aqua glass bottle with decorative flowers. Small, sweet and affordable." },
  { img: "dif-cmay-peach", name: "Cmay Peach Reed Diffuser", price: 65, cat: "fragrance", desc: "120 ml. Sweet, juicy peach — a customer favourite." },
  { img: "dif-guosir-angel", name: "Guosir Angel Reed Diffuser", price: 60, cat: "fragrance", desc: "120 ml. Fresh aqua fragrance in a gem-shaped blue bottle." },
  { img: "dif-hotel-scent-diffuser", name: "Hotel Series Scent Diffuser (100 ml)", price: 60, cat: "fragrance", desc: "Hotel-style fragrance with a wooden cap and natural reeds." },
  { img: "dif-cmay-melon", name: "Cmay Melon Reed Diffuser", price: 65, cat: "fragrance", desc: "130 ml. Fresh, sweet melon — light and summery." },
  { img: "dif-aroma-zuohe-200", name: "Aroma Zuohe Reed Diffuser (200 ml)", price: 120, cat: "fragrance", xmas: true, desc: "Large square glass bottle with a wooden cap — long-lasting and elegant." },
  { img: "dif-laughwind-mixed-fruit", name: "Laughwind Mixed Fruit Diffuser", price: 70, cat: "fragrance", desc: "120 ml. Fruity, fun fragrance — great for kitchens and family rooms." },
  { img: "dif-cmay-cedar", name: "Cmay Cedar Reed Diffuser", price: 65, cat: "fragrance", desc: "120 ml. Calm cedarwood scent in a teal glass bottle." },
  // New plant shipment, November 2026 (YDP-079 to YDP-105)
  { img: "plant-japanese-red-maple-180-v2", name: "Artificial Japanese Red Maple Tree (180 cm)", price: 750, cat: "plants", desc: "Deep red Japanese maple leaves on a natural-look trunk. 180 cm tall — a rich splash of colour for lounges, lobbies and entrances." },
  { img: "plant-pink-hydrangea-120-v2", name: "Artificial Pink Hydrangea Flowering Tree (120 cm)", price: 650, cat: "plants", desc: "Full pink hydrangea blooms with fresh green leaves. 120 cm tall — soft and romantic for bedrooms, salons and event décor." },
  { img: "plant-pink-bougainvillea-160-v2", name: "Artificial Pink Bougainvillea Tree (160 cm)", price: 990, cat: "plants", desc: "Bright pink bougainvillea flowers on a twisting trunk. 160 cm tall — tropical colour all year, with no watering." },
  { img: "plant-orange-japanese-maple-150-v2", name: "Artificial Orange Japanese Maple Tree (150 cm)", price: 630, cat: "plants", desc: "Warm orange maple foliage on a slim trunk. 150 cm tall — cheerful autumn colour for any corner." },
  { img: "plant-variegated-tropical-foliage-210-v2", name: "Artificial Variegated Tropical Foliage Plant (210 cm)", price: 980, cat: "plants", desc: "Large cream-and-green tropical leaves on tall stems. 210 cm — a bold statement for high ceilings and open spaces." },
  { img: "plant-orange-red-maple-140-v2", hidden: true, name: "Artificial Orange-Red Maple Tree (140 cm)", price: 658, cat: "plants", desc: "Coral orange-red maple leaves in a neat pot. 140 cm tall — a lively accent for offices and living rooms." },
  { img: "plant-golden-ginkgo-160-v2", name: "Artificial Golden Ginkgo Tree (160 cm)", price: 720, cat: "plants", desc: "Golden ginkgo leaves on a graceful trunk. 160 cm tall — brings a sunny glow to any room." },
  { img: "plant-green-maple-180-v2", name: "Artificial Green Maple Tree (180 cm)", price: 740, cat: "plants", desc: "Fresh green maple leaves on a tall, slender trunk. 180 cm — light and airy for modern interiors." },
  { img: "plant-green-bird-of-paradise-210-v2", name: "Artificial Green Bird of Paradise Plant (210 cm)", price: 850, cat: "plants", desc: "Tall upright bird of paradise leaves. 210 cm — instant tropical elegance for entrances and big rooms." },
  { img: "plant-green-ficus-130-v2", hidden: true, name: "Artificial Green Ficus Tree (130 cm)", price: 550, cat: "plants", desc: "Full, rounded green ficus leaves. 130 cm tall — a classic, easy fit for homes and offices." },
  { img: "plant-red-yucca-110-v2", name: "Artificial Red Yucca Tree (110 cm)", price: 660, cat: "plants", desc: "Red-edged yucca leaves on two natural-look stems. 110 cm tall — bold and architectural." },
  { img: "plant-fiddle-leaf-fig-150-v2", name: "Artificial Fiddle Leaf Fig Tree (150 cm)", price: 730, cat: "plants", desc: "Big glossy fiddle leaves on a slim trunk. 150 cm tall — the designer favourite for living rooms." },
  { img: "plant-burnt-banana-leaf-210-v2", name: "Artificial Burnt Banana Leaf Tree (210 cm)", price: 1250, cat: "plants", desc: "Large banana leaves in rich burnt red and green. 210 cm — a dramatic tropical centrepiece." },
  { img: "plant-red-cordyline-180-v2", name: "Artificial Red Cordyline Ti Plant Tree (180 cm)", price: 860, cat: "plants", desc: "Red and green cordyline (ti plant) leaves on several stems. 180 cm tall — colourful and full." },
  { img: "plant-multicolor-croton-125-v2", hidden: true, name: "Artificial Multicolor Croton Tree (125 cm)", price: 770, cat: "plants", desc: "Croton leaves in red, orange, yellow and green. 125 cm tall — a burst of colour that never fades." },
  { img: "plant-japanese-bonsai-pine-180-v2", name: "Artificial Japanese Bonsai Pine Tree (180 cm)", price: 1100, cat: "plants", desc: "Layered pine foliage on a sculpted bonsai-style trunk. 180 cm — calm, elegant and eye-catching." },
  { img: "plant-burgundy-green-ficus-topiary-120-v2", hidden: true, name: "Artificial Burgundy Green Ficus Topiary Tree (120 cm)", price: 550, cat: "plants", desc: "Two tiers of burgundy and green ficus leaves on a twisted trunk. 120 cm tall." },
  { img: "plant-green-ficus-topiary-150-v2", name: "Artificial Green Ficus Topiary Tree (150 cm)", price: 650, cat: "plants", desc: "Two neat tiers of green ficus on a twisted trunk. 150 cm tall — smart for doorways and reception areas." },
  { img: "plant-variegated-ficus-topiary-180-v2", name: "Artificial Variegated Ficus Topiary Tree (180 cm)", price: 920, cat: "plants", desc: "Three tiers of variegated ficus on a twisted trunk. 180 cm tall — a polished, formal look." },
  { img: "plant-green-ficus-180-v2", name: "Artificial Green Ficus Tree (180 cm)", price: 950, cat: "plants", desc: "Dense variegated ficus foliage on a natural trunk. 180 cm tall — full and lush for larger rooms." },
  { img: "plant-green-bird-of-paradise-180-v2", name: "Artificial Green Bird of Paradise Plant (180 cm)", price: 950, cat: "plants", desc: "Broad, full bird of paradise leaves. 180 cm — a lush tropical feature for any space." },
  { img: "plant-burgundy-bird-of-paradise-150-v2", name: "Artificial Burgundy Bird of Paradise Plant (150 cm)", price: 740, cat: "plants", desc: "Burgundy-toned bird of paradise leaves. 150 cm tall — rich colour with a tropical shape." },
  { img: "plant-double-stem-yucca-170-v2", hidden: true, name: "Artificial Double-Stem Yucca Tree (170 cm)", price: 800, cat: "plants", desc: "Spiky yucca leaves on two tall stems. 170 cm — clean, modern and low-maintenance." },
  { img: "plant-variegated-dracaena-210-v2", name: "Artificial Variegated Dracaena Tree (210 cm)", price: 900, cat: "plants", desc: "Striped dracaena leaves on several stems. 210 cm tall — fresh and full for corners and hallways." },
  { img: "plant-variegated-dracaena-220", hidden: true, name: "Artificial Variegated Dracaena Tree (220 cm)", price: 1300, cat: "plants", desc: "Tall dracaena with long, fine leaves on three stems. 220 cm — an impressive height for big spaces." },
  { img: "plant-sago-palm-110", name: "Artificial Sago Palm Tree (110 cm)", price: 900, cat: "plants", desc: "Feathery sago palm fronds on a short trunk in a cream pot. 110 cm tall. Priced per tree." },
  { img: "plant-sago-palm-85", name: "Artificial Sago Palm Tree (85 cm)", price: 550, cat: "plants", desc: "A wide, full sago palm in a cream pot. 85 cm tall — tropical style for tables, patios and entrances." },
];

const CAT_LABEL = { plants: "Plants & Trees", pots: "Pots & Planters", vases: "Vases", fragrance: "Home Fragrance" };
PRODUCTS.forEach((p, i) => { p.code = "YDP-" + String(i + 1).padStart(3, "0"); });
// Hidden items keep their place (and code) above, but are taken out of what the website shows.
for (let i = PRODUCTS.length - 1; i >= 0; i--) if (PRODUCTS[i].hidden) PRODUCTS.splice(i, 1);

const formatPrice = (p) =>
  p.price == null ? "Price on request"
  : typeof p.price === "number" ? "GH₵ " + p.price.toLocaleString("en-GH")
  : "GH₵ " + p.price.replace(/\s*[-–]\s*/, " – ");
