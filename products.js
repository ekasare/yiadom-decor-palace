/* ============================================================
   PRODUCT LIST — shared by the website (index.html) and the catalogue (catalogue.html)
   To add an item: put the photo in /images and add a line below.
   cat: plants | pots | vases | fragrance      xmas: true = also a "Christmas Pick"
   Item codes (YDP-001, YDP-002 ...) are given automatically in this order,
   so add new items at the END to keep existing codes the same.
   ============================================================ */

const WHATSAPP = "233275957777";

const PRODUCTS = [
  { img: "img_1898", name: "Cypress Topiary Tree", cat: "plants", xmas: true, desc: "A neat evergreen cypress in a white pedestal pot — a perfect, reusable Christmas tree for entrances and living rooms." },
  { img: "img_1810", name: "Stone Urn Planter, Gold Rim", cat: "pots", desc: "Tall stone-textured urn with a brushed gold rim. Beautiful indoors or at your entrance." },
  { img: "img_2269", name: "Pink Caladium in Stone Vase", cat: "plants", xmas: true, desc: "Bold pink-and-green leaves in a textured stone vase. Adds instant colour to any corner." },
  { img: "img_2068", name: "Turquoise Crackle Glass Vase", cat: "vases", xmas: true, desc: "Hand-finished art glass with a turquoise crackle pattern. A striking centrepiece and a lovely gift." },
  { img: "photo-2026-10-22-22-25-27-1", name: "AROMA Reed Diffuser", cat: "fragrance", xmas: true, desc: "Fresh air & home fragrance in an amber glass bottle. Long-lasting scent for living rooms and offices." },
  { img: "img_1884", name: "Pink Cherry Blossom Tree", cat: "plants", desc: "A romantic blossom tree in a white bowl pot. Perfect for lounges, bedrooms and event décor." },
  { img: "img_1813", name: "Ribbed Bowl Planter — Black & Gold", cat: "pots", xmas: true, desc: "Rounded ribbed pot in matte black with a gold rim. Elegant and modern." },
  { img: "img_2016", name: "Gold Bubble Vase", cat: "vases", xmas: true, desc: "Sculptural gold floor vase with decorative branches — a festive statement piece." },
  { img: "img_1896", name: "Autumn Maple Tree", cat: "plants", desc: "Vibrant orange maple foliage in a glossy white pot. Warm, cheerful and eye-catching." },
  { img: "img_1820", name: "Gold Pedestal Planter", cat: "pots", xmas: true, desc: "Hourglass pedestal planter with a shimmering gold finish. Pairs beautifully with topiary." },
  { img: "img_2076", name: "Sky-to-Violet Glass Vase", cat: "vases", desc: "Soft blue fading into violet with gold flecks. Elegant on a console or dining table." },
  { img: "photo-2026-10-22-22-25-27-2", name: "Rose Pink Reed Diffuser", cat: "fragrance", xmas: true, desc: "Floral rose scent in a gift-ready box. A sweet present for someone special." },
  { img: "img_1900", name: "Olive Tree", cat: "plants", desc: "Graceful olive tree in a white round pot. Brings a calm, Mediterranean feel indoors." },
  { img: "img_1807", name: "Ocean Blue Glazed Pot", cat: "pots", desc: "Deep blue glossy glaze with a reactive finish. Lovely for verandas and patios." },
  { img: "img_2004", name: "White Fluted Floor Vase", cat: "vases", xmas: true, desc: "Tall fluted floor vase in white with decorative branches. Clean, bright and festive." },
  { img: "img_2084", name: "Banana Leaf Plant", cat: "plants", desc: "Lush tropical banana leaves in a textured white pot. Fills a corner beautifully." },
  { img: "img_1811", name: "Charcoal Ribbed Urn, Gold Rim", cat: "pots", desc: "Tall charcoal urn with fine ribbing and a gold rim. Modern luxury for homes and offices." },
  { img: "img_2069", name: "Cobalt & Gold Vein Vase", cat: "vases", xmas: true, desc: "Rich cobalt glass laced with gold veins. A jewel-like accent piece." },
  { img: "img_2259", name: "Silver Leaf Plant", cat: "plants", desc: "Green-and-white variegated leaves in a silver tapered pot." },
  { img: "photo-2026-10-22-22-25-27-4", name: "Blueberry Reed Diffuser", cat: "fragrance", desc: "Fruity blueberry scent in a cobalt glass bottle with reeds." },
  { img: "img_1887", name: "Bird of Paradise", cat: "plants", desc: "Broad tropical leaves for a bold, fresh look. Never needs watering." },
  { img: "img_1805", name: "Marble-Effect Planter, Gold Band", cat: "pots", desc: "White marble-effect fluted planter with a wide gold band." },
  { img: "img_2078", name: "White Marble Vase, Gold Rim", cat: "vases", xmas: true, desc: "Glossy white vase with golden marble veining. Timeless elegance." },
  { img: "img_1892", name: "Fiddle Leaf Fig", cat: "plants", desc: "The designer favourite — tall fiddle leaf fig in a white pot." },
  { img: "img_1822", name: "Black Pedestal Planter", cat: "pots", desc: "Textured matte black hourglass planter. Strong and sculptural." },
  { img: "img_2072", name: "Pink Art Glass Vase", cat: "vases", desc: "Playful multicolour art glass in soft pink tones." },
  { img: "photo-2026-10-22-22-24-32-3", name: "Tall Cypress Tree", cat: "plants", xmas: true, desc: "Full, tall cypress tree — an evergreen that brings Christmas cheer year after year." },
  { img: "photo-2026-10-22-22-03-24", name: "Diffuser Gift Collection", cat: "fragrance", xmas: true, desc: "A range of boxed reed diffusers in many scents — ideal Christmas and corporate gifts." },
  { img: "img_1890", name: "Red Croton Tree", cat: "plants", desc: "Rich red and burgundy foliage in a black pot. Warm and dramatic." },
  { img: "img_1814", name: "Ribbed Bowl Planter — White & Gold", cat: "pots", xmas: true, desc: "Rounded white ribbed bowl with a gold rim. Fresh, bright and elegant." },
  { img: "img_2081", name: "Textured Bottle Vase", cat: "vases", desc: "Organic bottle-shaped vase with a hand-textured pastel surface." },
  { img: "img_2264", name: "Monstera in Leaf-Print Pot", cat: "plants", desc: "Large glossy leaves in a white cylinder pot with a leaf print." },
  { img: "img_1817", name: "White Textured Square Planter", cat: "pots", desc: "Tall square planter with a rough white texture. Great in pairs at a door." },
  { img: "img_2047", name: "White Vase with Golden Pampas", cat: "vases", xmas: true, desc: "White fluted vase styled with soft golden pampas." },
  { img: "img_1893", name: "Snake Plant", cat: "plants", desc: "Upright, architectural snake plant leaves. Clean and modern." },
  { img: "photo-2026-10-22-22-25-27", name: "Strawberry Reed Diffuser", cat: "fragrance", desc: "Sweet strawberry fragrance in a pretty gift box." },
  { img: "img_1886", name: "White Blossom Tree", cat: "plants", xmas: true, desc: "Snow-white blossom tree in a black bowl pot — a wintery touch for Christmas." },
  { img: "img_1809", name: "Jade Green Glazed Pot", cat: "pots", desc: "Classic flared pot in a jade green glaze with embossed detail." },
  { img: "img_2001", name: "Black Fluted Floor Vase", cat: "vases", desc: "Tall matte black fluted vase with natural branches." },
  { img: "img_2027", name: "Pink Caladium in Champagne Vase", cat: "plants", desc: "Pink-veined caladium in a champagne-toned floor vase." },
  { img: "img_1803", name: "White Globe Planter", cat: "pots", desc: "Smooth, matte white globe pot. Simple and versatile." },
  { img: "img_2011", name: "Gold Floor Vase", cat: "vases", xmas: true, desc: "Gold floor vase with decorative branches — glamour for any corner." },
  { img: "photo-2026-10-22-22-25-27-3", name: "Double Ball Topiary", cat: "plants", xmas: true, desc: "Two-tier ball topiary in a white pedestal pot. Lovely in pairs by a door." },
  { img: "photo-2026-10-22-22-25-27-5", name: "Electric Aroma Diffuser Set", cat: "fragrance", desc: "Home fragrance oil with a rechargeable electric diffuser." },
  { img: "img_2328", name: "Tropical Leaf Plant", cat: "plants", desc: "Fresh green tropical leaves in a white leaf-print pot." },
  { img: "img_1816", name: "Black Textured Square Planter", cat: "pots", desc: "Tall square planter in textured black. Bold at entrances." },
  { img: "img_2042", name: "Black Vase with Pampas", cat: "vases", desc: "Matte black vase with fluffy cream pampas grass." },
  { img: "img_1889", name: "Ruscus Tree", cat: "plants", desc: "Slim, leafy tree in a white pot — fits tight spaces." },
  { img: "img_2229", name: "Leaf-Print Cylinder Planter", cat: "pots", desc: "White cylinder planter decorated with gold and grey leaves." },
  { img: "photo-2026-10-22-22-03-25", name: "Luxury Diffuser Range", cat: "fragrance", xmas: true, desc: "Premium boxed diffusers — beautiful gifts for family, friends and staff." },
];

const CAT_LABEL = { plants: "Plants & Trees", pots: "Pots & Planters", vases: "Vases", fragrance: "Home Fragrance" };
PRODUCTS.forEach((p, i) => { p.code = "YDP-" + String(i + 1).padStart(3, "0"); });
