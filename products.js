/* ============================================================
   PRODUCT LIST — shared by the website (index.html) and the catalogue (catalogue.html)
   To add an item: put the photo in /images and add a line below.
   cat: plants | vases | floral | potted | globes | nananom      xmas: true = also a "Christmas Pick"
   price: number in GH₵ (e.g. 450), or text for a range (e.g. "50–200"). Leave it out to show "Price on request".
   code: every item has its own code written on its line (e.g. "YDP-001", "YFS-001"). Lines can be deleted
   safely. A new item without a code gets the next free YDP number, but it is better to give it one.
   hidden: true = not shown on the website or catalogue (e.g. not in stock). Remove it to show the item again.
   unit: "stem" = price is shown as "GH₵ 25 / stem".
   ============================================================ */

const WHATSAPP = "233275957777";

const PRODUCTS = [
  // Artificial plants & trees, new codes YDP-001 to YDP-019 (November 2026), 24 of each at the warehouse.
  { code: "YDP-001", img: "plant-ydp-001", name: "Variegated Ficus Tree (180 cm)", price: 750, cat: "plants", desc: "Cream-and-green variegated ficus leaves on natural-look trunks. 180 cm tall." },
  { code: "YDP-002", img: "plant-ydp-002", name: "Croton Plant (150 cm)", price: 650, cat: "plants", desc: "Glossy croton leaves in green, yellow and red. 150 cm tall." },
  { code: "YDP-003", img: "plant-ydp-003", name: "Autumn Maple Tree (120 cm)", price: 600, cat: "plants", desc: "Bright orange maple foliage that stays vivid all year. 120 cm tall." },
  { code: "YDP-004", img: "plant-ydp-004", name: "Maple Tree (150 cm)", price: 650, cat: "plants", desc: "Full maple tree with rich deep-toned leaves. 150 cm tall." },
  { code: "YDP-005", img: "plant-ydp-005", name: "Fiddle Leaf Fig Tree (190 cm)", price: 940, cat: "plants", desc: "Tall fiddle leaf fig with large glossy leaves. A statement for living rooms and offices. 190 cm tall." },
  { code: "YDP-006", img: "plant-ydp-006", name: "Multicolored Croton (180 cm)", price: 800, cat: "plants", desc: "Tall croton in red, pink and green. 180 cm tall." },
  { code: "YDP-007", img: "plant-ydp-007", name: "Snake Plant (90 cm)", price: 550, cat: "plants", desc: "Upright snake plant with yellow-edged leaves. 90 cm tall." },
  { code: "YDP-008", img: "plant-ydp-008", name: "Olive Tree (200 cm)", price: 1600, cat: "plants", desc: "Graceful olive tree with slender silvery-green leaves. 200 cm tall." },
  { code: "YDP-009", img: "plant-ydp-009", name: "Evergreen Cypress (150 cm)", price: 750, cat: "plants", desc: "Neat evergreen cypress for entrances, offices and Christmas. 150 cm tall." },
  { code: "YDP-010", img: "plant-ydp-010", name: "Bird of Paradise (150 cm)", price: 750, cat: "plants", desc: "Tropical bird of paradise with broad banana-style leaves. 150 cm tall." },
  { code: "YDP-011", img: "plant-ydp-011", name: "Bird of Paradise (145 cm)", price: 650, cat: "plants", desc: "Tropical bird of paradise with broad upright leaves. 145 cm tall." },
  { code: "YDP-012", img: "plant-ydp-012", name: "Fiddle Leaf Fig Tree (150 cm)", price: 600, cat: "plants", desc: "Fiddle leaf fig with large glossy leaves. 150 cm tall." },
  { code: "YDP-013", img: "plant-ydp-013", name: "Cherry Blossom Tree (200 cm)", price: 1600, cat: "plants", desc: "Romantic pink cherry blossom tree. Perfect for lounges and events. 200 cm tall." },
  { code: "YDP-014", img: "plant-ydp-014", name: "Bamboo Tree (180 cm)", price: 800, cat: "plants", desc: "Fresh green bamboo with slender canes. 180 cm tall." },
  { code: "YDP-015", img: "plant-ydp-015", name: "Boxwood Topiary Tree (95 cm)", price: 550, cat: "plants", desc: "Double-ball boxwood topiary. Smart for doorways and reception areas. 95 cm tall." },
  { code: "YDP-016", img: "plant-ydp-016", name: "Snake Plant (150 cm)", price: 940, cat: "plants", desc: "Tall snake plant with yellow-edged leaves. 150 cm tall." },
  { code: "YDP-017", img: "plant-ydp-017", name: "Ficus Branch (60 cm)", price: 60, cat: "plants", desc: "Leafy ficus branch for vases and arrangements. 60 cm long." },
  { code: "YDP-018", img: "plant-ydp-018", name: "Pink Yucca (120 cm)", price: 500, cat: "plants", desc: "Pink flowering yucca with long green leaves. 120 cm tall." },
  { code: "YDP-019", img: "plant-ydp-019", name: "Red Calathea Plant (170 cm)", price: 740, cat: "plants", desc: "Striking red-and-green calathea leaves. 170 cm tall." },
  // Small artificial plants YDPSP-001 to 007 (90 cm), November 2026, 50 of each at the warehouse.
  { code: "YDPSP-001", img: "plant-ydpsp-001", name: "Bird of Paradise Plant (90 cm)", price: 300, cat: "plants", desc: "Compact artificial bird of paradise with broad tropical leaves. 90 cm tall." },
  { code: "YDPSP-002", img: "plant-ydpsp-002", name: "Areca Palm Plant (90 cm)", price: 300, cat: "plants", desc: "Feathery artificial areca palm in a black pot. 90 cm tall." },
  { code: "YDPSP-003", img: "plant-ydpsp-003", name: "Peacock Calathea Plant (90 cm)", price: 300, cat: "plants", desc: "Patterned calathea leaves in deep and pale green. 90 cm tall." },
  { code: "YDPSP-004", img: "plant-ydpsp-004", name: "Pink Caladium Plant (90 cm)", price: 300, cat: "plants", desc: "Bold pink-and-green caladium leaves in a white pot. 90 cm tall." },
  { code: "YDPSP-005", img: "plant-ydpsp-005", name: "Green Alocasia Plant (90 cm)", price: 300, cat: "plants", desc: "Large heart-shaped alocasia leaves with pale veins. 90 cm tall." },
  { code: "YDPSP-006", img: "plant-ydpsp-006", name: "Variegated Dieffenbachia Plant (90 cm)", price: 300, cat: "plants", desc: "Cream-and-green variegated dieffenbachia in a white pot. 90 cm tall." },
  { code: "YDPSP-007", img: "plant-ydpsp-007", name: "White-Veined Caladium Plant (90 cm)", price: 300, cat: "plants", desc: "Green caladium leaves with crisp white veins. 90 cm tall." },
  // Yiadom Floral: floral stems (YFS) and potted flowers (YSPF), November 2026. These have their own codes.
  { code: "YFS-001", img: "floral-yfs-001", name: "Artificial Fern Stem", price: 25, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-002", img: "floral-yfs-002", name: "Greenery Spray", price: 34, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-003", img: "floral-yfs-003", name: "Leaf Spray", price: 40, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-004", img: "floral-yfs-004", name: "Hair Fern", price: 42, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-005", img: "floral-yfs-005", name: "Japanese Andromeda Stem", price: 24, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-006", img: "floral-yfs-006", name: "Olive Stem", price: 20, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-007", img: "floral-yfs-007", name: "Hanging Rice Pearl", price: 18, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-008", img: "floral-yfs-008", name: "Trailing Amaranthus", price: 30, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-009", img: "floral-yfs-009", name: "Spiky Tropical Stem", price: 40, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-010", img: "floral-yfs-010", name: "Trailing Asparagus", price: 35, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-011", img: "floral-yfs-011", name: "Variegated Tropical Stem", price: 30, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-012", img: "floral-yfs-012", name: "Eucalyptus Stem", price: 23, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-013", img: "floral-yfs-013", name: "Flower Spike", price: 30, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-014", img: "floral-yfs-014", name: "Trailing Eucalyptus", price: 30, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-015", img: "floral-yfs-015", name: "Money Leaf Stem", price: 24, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-016", img: "floral-yfs-016", name: "Mixed Berry Stem", price: 36, unit: "stem", cat: "floral", desc: "Decorative stem to add texture and colour to arrangements, wreaths and centrepieces." },
  { code: "YFS-017", img: "floral-yfs-017", name: "Foam Berry Cluster", price: 24, unit: "stem", cat: "floral", desc: "Decorative stem to add texture and colour to arrangements, wreaths and centrepieces." },
  { code: "YFS-018", img: "floral-yfs-018", name: "Hanging Tropical Stem", price: 24, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-019", img: "floral-yfs-019", name: "Mini Rose Stem", price: 40, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-020", img: "floral-yfs-020", name: "Autumn Apple Blossom Stem", price: 24, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-021", img: "floral-yfs-021", name: "One Bud Flower Stem", price: 22, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-022", img: "floral-yfs-022", name: "Grain Ear Stem", price: 27, unit: "stem", cat: "floral", desc: "Decorative stem to add texture and colour to arrangements, wreaths and centrepieces." },
  { code: "YFS-023", img: "floral-yfs-023", name: "Mixed Rose Stem", price: 32, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-024", img: "floral-yfs-024", name: "Cherry Blossom Stem", price: 30, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-025", img: "floral-yfs-025", name: "Lily Stem", price: 60, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-026", img: "floral-yfs-026", name: "Mini Pompom Stem", price: 32, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-027", img: "floral-yfs-027", name: "Mini Rose Bud Stem", price: 24, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-028", img: "floral-yfs-028", name: "Cluster Rose Stem", price: 35, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-029", img: "floral-yfs-029", name: "Camellia Flower Stem", price: 26, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-030", img: "floral-yfs-030", name: "Maple Leaf Stem", price: 30, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-031", img: "floral-yfs-031", name: "Cascading Greenery", price: 100, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-032", img: "floral-yfs-032", name: "3D Maple Leaf Stem", price: 42, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-033", img: "floral-yfs-033", name: "Hanging Amaranthus", price: 20, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-034", img: "floral-yfs-034", name: "Hanging Spring Greenery", price: 20, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-035", img: "floral-yfs-035", name: "Cascading Eucalyptus", price: 60, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-036", img: "floral-yfs-036", name: "Veronica Flower Stem", price: 35, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-037", img: "floral-yfs-037", name: "Hanging Spanish Moss", price: 30, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-038", img: "floral-yfs-038", name: "Cascading Amaranthus", price: 30, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-039", img: "floral-yfs-039", name: "Trailing Fern", price: 15, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-040", img: "floral-yfs-040", name: "Olive Branch", price: 15, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-041", img: "floral-yfs-041", name: "Orange Leaves Stem", price: 18, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-042", img: "floral-yfs-042", name: "Calla Lily Stem", price: 15, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-043", img: "floral-yfs-043", name: "Greenery Bush", price: 20, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-044", img: "floral-yfs-044", name: "Trailing Green Leaf", price: 18, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-045", img: "floral-yfs-045", name: "Hanging Vine", price: 15, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-046", img: "floral-yfs-046", name: "Fern-Style Hanging Greenery", price: 20, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YFS-047", img: "floral-yfs-047", name: "Mixed Greenery Bush", price: 22, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-048", img: "floral-yfs-048", name: "Lime Green Foliage", price: 20, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-049", img: "floral-yfs-049", name: "4-Head Flocked Daisy Stem", price: 24, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-050", img: "floral-yfs-050", name: "9-Head Daisy Stem", price: 40, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-051", img: "floral-yfs-051", name: "Magnolia Flower Stem", price: 50, unit: "stem", cat: "floral", desc: "Artificial flower stem for vases, bouquets, tables and event décor. Assorted colours." },
  { code: "YFS-052", img: "floral-yfs-052", name: "Decorative Fern Foliage", price: 18, unit: "stem", cat: "floral", desc: "Lifelike artificial greenery for vases, arrangements and centrepieces. Mix a few stems for a fuller look." },
  { code: "YFS-053", img: "floral-yfs-053", name: "Cascading Yellow-Green Foliage", price: 18, unit: "stem", cat: "floral", desc: "Trailing artificial greenery to drape from shelves, walls, arches, planters and event backdrops." },
  { code: "YSPF-001", img: "floral-yspf-001", name: "Potted Moth Orchid, 2 Stems", price: 90, cat: "potted", desc: "Elegant two-stem moth orchids (phalaenopsis) in a neat pot. Assorted colours." },
  { code: "YSPF-002", img: "floral-yspf-002", name: "Calla Lily Style Potted Flower", price: 80, cat: "potted", desc: "Glossy blooms in a small white pot. Assorted colours." },
  { code: "YSPF-003", img: "floral-yspf-003", name: "Autumn Mini Potted Flower", price: 90, cat: "potted", desc: "Warm autumn-toned flowers in a mini pot." },
  { code: "YSPF-004", img: "floral-yspf-004", name: "Mini Potted Mixed Floral", price: 70, cat: "potted", desc: "Soft mixed flowers and grasses in a white mini pot." },
  { code: "YSPF-005", img: "floral-yspf-005", name: "Potted Pineapple Grass", price: 50, cat: "potted", desc: "Spiky green grass in a white pot. Fresh and modern." },
  { code: "YSPF-006", img: "floral-yspf-006", name: "Mini Potted Lily", price: 65, cat: "potted", desc: "Pretty lily blooms in a mini pot. Assorted colours." },
  { code: "YSPF-007", img: "floral-yspf-007", name: "Mini Autumn Mixed Floral Pot", price: 70, cat: "potted", desc: "Dried-look autumn flowers in a patterned mini pot." },
  { code: "YSPF-008", img: "floral-yspf-008", name: "Decorative Foam Berry Pot", price: 65, cat: "potted", desc: "Textured berry picks and greenery in a mini pot." },
  { code: "YSPF-009", img: "floral-yspf-009", name: "Baby's Breath Mini Pot", price: 70, cat: "potted", desc: "Fluffy baby's breath in a mini pot. Assorted colours." },
  { code: "YSPF-010", img: "floral-yspf-010", name: "Mixed Succulent Mini Pot", price: 120, cat: "potted", desc: "A cluster of lifelike succulents in a white pot." },
  { code: "YSPF-011", img: "floral-yspf-011", name: "Potted Wildflower & Lavender", price: 100, cat: "potted", desc: "Lavender and wildflowers in a woven-look pot." },
  { code: "YSPF-012", img: "floral-yspf-012", name: "Hanging Spider Plant", price: 100, cat: "potted", desc: "Trailing spider plant in a hanging pot, ready to hang." },
  // Yiadom globes, November 2026 (12 of each received at the warehouse). These have their own codes.
  { code: "YDP-G001", img: "globe-ydp-g001", name: "Classic Globe, Plated Finish (20 cm)", price: 350, cat: "globes", desc: "20 cm desk globe with English map text on a plated metal stand. Assorted in 4 colours." },
  { code: "YDP-G002", img: "globe-ydp-g002", name: "Desk Globe, Plastic Base (20 cm)", price: 250, cat: "globes", desc: "20 cm globe on a sturdy plastic base. Assorted in 4 colours, a great gift for students." },
  { code: "YDP-G003", img: "globe-ydp-g003", name: "Pink & Blue Globe, Plastic Base (20 cm)", price: 200, cat: "globes", desc: "20 cm globe in soft pink or blue on a plastic base. Lovely for children's rooms." },
  { code: "YDP-G004", img: "globe-ydp-g004", name: "Mini Globe, Plated Finish (14 cm)", price: 180, cat: "globes", desc: "Compact 14 cm globe on a plated stand. Assorted beige and blue." },
  { code: "YDP-G005", img: "globe-ydp-g005", name: "Swivel Globe, Black & Silver / Gold (20 cm)", price: 450, cat: "globes", desc: "20 cm universal swivel globe that turns in every direction. Black with silver or black with gold." },
  { code: "YDP-G006", img: "globe-ydp-g006", name: "Mini Globe, Black & Silver / Gold (14 cm)", price: 255, cat: "globes", desc: "Compact 14 cm globe on a plated stand. Black with silver or black with gold." },
  { code: "YDP-G007", img: "globe-ydp-g007", name: "Light-Up Globe, White (20 cm)", price: 260, cat: "globes", desc: "20 cm globe with a built-in light and white painted base. Blue and pink mix, a soft night light for bedrooms." },
  { code: "YDP-G008", img: "globe-ydp-g008", name: "Antique Swivel Globe (20 cm)", price: 450, cat: "globes", desc: "20 cm universal swivel globe with an antique plated finish. Assorted." },
  { code: "YDP-G009", img: "globe-ydp-g009", name: "Globe on Wooden Base (20 cm)", price: 430, cat: "globes", desc: "20 cm globe on a classic wooden base. Assorted in 4 colours, perfect for offices and studies." },
  { code: "YDP-G010", img: "globe-ydp-g010", name: "Light-Up Globe, Ruler Frame (30 cm)", price: 500, cat: "globes", desc: "Large 30 cm globe with a built-in light on a metal ruler-style frame." },
  { code: "YDP-G011", img: "globe-ydp-g011", name: "Large Swivel Globe (30 cm)", price: 580, cat: "globes", desc: "Large 30 cm universal swivel globe. A statement piece for offices, libraries and lounges." },
  { code: "YDP-G012", img: "globe-ydp-g012", name: "Green Light-Up Globe (20 cm)", price: 664, cat: "globes", desc: "Elegant 20 cm deep-green globe with gold detail and a built-in light, on a gold stand." },
  { code: "YDP-G013", img: "globe-ydp-g013", name: "Ship Globe (20 cm)", price: 664, cat: "globes", desc: "20 cm globe with a ship design on a polished stand. Assorted. A stylish décor piece." },
  { code: "YDP-G014", img: "globe-ydp-g014", name: "Picture-Frame Stand Globe (20 cm)", price: 658, cat: "globes", desc: "20 cm globe set in a picture-frame-style stand. A modern décor and gift idea." },
  { code: "YDP-G015", img: "globe-ydp-g015", name: "Globe, Bread-Rack Stand (20 cm)", price: 360, cat: "globes", desc: "20 cm globe on a curved bread-rack-style stand. Assorted in 4 colours." },
  // Nananom Agudie: decorative glass bowls on stands, November 2026 (12 of each at the warehouse). These have their own codes.
  { code: "YDPR-001", img: "nananom-ydpr-001", name: "Nananom Agudie – Bird & Leaf Ring Bowl", price: 220, cat: "nananom", desc: "Lotus-cut glass bowl inside a gold ring frame with a bird and leaf detail. A graceful centrepiece for fruit or sweets." },
  { code: "YDPR-002", img: "nananom-ydpr-002", name: "Nananom Agudie – Sunburst Stand Bowl", price: 200, cat: "nananom", desc: "Amber lotus glass bowl on a gold sunburst stand. Lovely for fruit, sweets or as a table centrepiece." },
  { code: "YDPR-003", img: "nananom-ydpr-003", name: "Nananom Agudie – Crescent Arch Bowl, Clear", price: 220, cat: "nananom", desc: "Clear lotus glass bowl under a gold crescent arch, on a gold lattice base." },
  { code: "YDPR-004", img: "nananom-ydpr-004", name: "Nananom Agudie – Double Bowl Stand", price: 250, cat: "nananom", desc: "Two amber lotus glass bowls on a gold wire stand. Serve fruit and sweets side by side." },
  { code: "YDPR-005", img: "nananom-ydpr-005", name: "Nananom Agudie – Golden Rose Bowl", price: 180, cat: "nananom", desc: "Amber lotus glass bowl on a gold stand with rose detail." },
  { code: "YDPR-006", img: "nananom-ydpr-006", name: "Nananom Agudie – Smoky Grey Rose Bowl", price: 180, cat: "nananom", desc: "Smoky grey glass bowl on a gold stand with rose detail. Elegant and modern." },
  { code: "YDPR-007", img: "nananom-ydpr-007", name: "Nananom Agudie – Silver Bowl Cart", price: 250, cat: "nananom", desc: "Two smoky grey lotus bowls on a silver tricycle cart. A playful statement piece." },
  { code: "YDPR-008", img: "nananom-ydpr-008", name: "Nananom Agudie – Triple Bowl Cart", price: 280, cat: "nananom", desc: "Three amber lotus bowls on a long gold cart with wheels. Perfect for parties and events." },
  { code: "YDPR-009", img: "nananom-ydpr-009", name: "Nananom Agudie – Swirl Pedestal Dish", price: 200, cat: "nananom", desc: "Amber swirl glass dish on a shiny gold pedestal." },
  { code: "YDPR-010", img: "nananom-ydpr-010", name: "Nananom Agudie – Grey Double Bowl Cart", price: 220, cat: "nananom", desc: "Two smoky grey glass bowls on a gold cart stand." },
  { code: "YDPR-011", img: "nananom-ydpr-011", name: "Nananom Agudie – Leaf Handle Basket Bowl", price: 220, cat: "nananom", desc: "Smoky grey glass bowl in a tall gold basket frame with leaf detail." },
  { code: "YDPR-012", img: "nananom-ydpr-012", name: "Nananom Agudie – Bicycle Bowl", price: 160, cat: "nananom", desc: "Amber lotus glass bowl on a gold bicycle stand. A charming gift." },
  { code: "YDPR-013", img: "nananom-ydpr-013", name: "Nananom Agudie – Three-Bowl Tier Stand", price: 230, cat: "nananom", desc: "One large and two small lotus glass bowls on a gold tiered stand." },
  { code: "YDPR-014", img: "nananom-ydpr-014", name: "Nananom Agudie – Crescent Arch Bowl, Amber", price: 220, cat: "nananom", desc: "Amber lotus glass bowl under a gold crescent arch, on a gold lattice base." },
  { code: "YDPR-015", img: "nananom-ydpr-015", name: "Nananom Agudie – Scroll Triple Bowl Stand", price: 280, cat: "nananom", desc: "Three amber lotus glass bowls on a gold scroll stand." },
  // Yiadom Big Potted Flowers (YBPF), November 2026, at the warehouse.
  { code: "YBPF-001", img: "ybpf-001", name: "Big Potted Magnolia", price: 280, cat: "potted", desc: "Large artificial magnolia blooms in a stone-look pot. Assorted yellow and blue-grey." },
  { code: "YBPF-002", img: "ybpf-002", name: "Pampas Grass in White Pot", price: 200, cat: "potted", desc: "Fluffy artificial pampas plumes in a white ceramic pot. Assorted colours." },
  { code: "YBPF-003", img: "ybpf-003", name: "Wildflower Arrangement in Stone Pot", price: 220, cat: "potted", desc: "Orange or white wildflowers with silver foliage in a textured pot." },
  { code: "YBPF-004", img: "ybpf-004", name: "White Orchid in Ceramic Pot", price: 260, cat: "potted", desc: "Lifelike white phalaenopsis orchids in a patterned ceramic pot." },
  { code: "YBPF-005", img: "ybpf-005", name: "Daisy Bouquet in Glazed Pot", price: 250, cat: "potted", desc: "A full bouquet of artificial daisies in a glazed teal pot. Assorted colours." },
  { code: "YBPF-006", img: "ybpf-006", name: "Magnolia Spray in White Vase", price: 280, cat: "potted", desc: "Soft blue or cream magnolia branches in a modern white vase." },
  { code: "YBPF-007", img: "ybpf-007", name: "Protea & Palm Arrangement", price: 250, cat: "potted", desc: "Protea flowers and dried-look palm leaves in a stone pot. Pink or gold." },
  { code: "YBPF-008", img: "ybpf-008", name: "Pampas Grass in Patterned Pot", price: 240, cat: "potted", desc: "Tall cream pampas plumes in a white patterned pot." },
  { code: "YBPF-009", img: "ybpf-009", name: "Lily Arrangement in Painted Vase", price: 300, cat: "potted", desc: "Gold or red lilies in a hand-painted vase. A rich centrepiece." },
  { code: "YBPF-010", img: "ybpf-010", name: "Orange Gerbera & Berry Arrangement", price: 280, cat: "potted", desc: "Orange gerberas and berry stems in a tall speckled vase." },
  { code: "YBPF-011", img: "ybpf-011", name: "Green Allium Pot", price: 230, cat: "potted", desc: "Lime-green allium balls with grass leaves in a white pot." },
  // Yiadom Luxury Vases (YLV), November 2026, at the warehouse. S = small, B = big.
  { code: "YLV-001", img: "ylv-001", name: "White & Gold Marble Vase, Gold Rim", price: 600, cat: "vases", desc: "White ceramic with gold marbling and a gold rim. 27 × 40 cm." },
  { code: "YLV-002", img: "ylv-002", name: "Speckled Pebble Vase", price: 500, cat: "vases", desc: "Organic pebble shape with a pastel speckled glaze. 23 × 37 cm." },
  { code: "YLV-003", img: "ylv-003", name: "Antique Grey Stone Jar", price: 160, cat: "vases", desc: "Small antique-finish grey jar. 11 × 15 cm." },
  { code: "YLV-004", img: "ylv-004", name: "Antique Grey Teardrop Vase", price: 250, cat: "vases", desc: "Tall antique-finish grey vase with a soft teardrop shape. 14 × 31 cm." },
  { code: "YLV-005S", img: "ylv-005", name: "Pastel Speckle Flask Vase – Small", price: 550, cat: "vases", desc: "Round flask vase with a slim neck and pastel speckled glaze. 28 × 17 × 33 cm." },
  { code: "YLV-005B", img: "ylv-005", name: "Pastel Speckle Flask Vase – Large", price: 850, cat: "vases", desc: "Round flask vase with a slim neck and pastel speckled glaze. 40 × 24 × 50 cm." },
  { code: "YLV-006", img: "ylv-006", name: "Gold Stacked-Bubble Floor Vase", price: 1600, cat: "vases", desc: "Statement floor vase in shimmering gold. 40 × 70 cm." },
  { code: "YLV-007", img: "ylv-007", name: "Black Fluted Bottle Vase", price: 1600, cat: "vases", desc: "Tall matte-black fluted bottle vase. 36 × 71 cm." },
  { code: "YLV-008", img: "ylv-008", name: "Champagne Tulip Floor Vase", price: 1650, cat: "vases", desc: "Champagne-glazed vase in a blush textured tulip sleeve. 30 × 70 cm." },
  { code: "YLV-009", img: "ylv-009", name: "White Stacked-Bubble Floor Vase", price: 1700, cat: "vases", desc: "Sculptural matte-white floor vase. 38 × 80 cm." },
  { code: "YLV-010S", img: "ylv-010", name: "Stone Amphora Jar – Small", price: 220, cat: "vases", desc: "Rustic stone-look jar with two handles. 18 × 24 cm." },
  { code: "YLV-010B", img: "ylv-010", name: "Stone Amphora Jar – Large", price: 355, cat: "vases", desc: "Rustic stone-look jar with two handles. 23 × 30 cm." },
  { code: "YLV-011", img: "ylv-011", name: "Wave Sculpted Vase, Black or White", price: 345, cat: "vases", desc: "Twisting wave-shaped vase with a ruffled rim. 15 × 28 cm." },
  { code: "YLV-012", img: "ylv-012", name: "White Ripple Textured Vase", price: 355, cat: "vases", desc: "Matte-white vase with a carved ripple pattern. 14 × 28 cm." },
  { code: "YLV-013", img: "ylv-013", name: "White Petal Planter Set of 2", price: 1350, cat: "vases", desc: "Two white planters with a raised petal pattern. 36 × 29 and 25 × 20 cm. Price is for the set." },
  { code: "YLV-014", img: "ylv-014", name: "White Lattice Planter Set of 2", price: 1250, cat: "vases", desc: "Two white planters with a raised lattice pattern. 46 × 34 and 35 × 26 cm. Price is for the set." },
  { code: "YLV-015", img: "ylv-015", name: "Marble Bottle Vase, Gold Rim", price: 120, cat: "vases", desc: "Slim marble-effect bottle vase with a gold rim. 8 × 24 cm." },
  { code: "YLV-016", img: "ylv-016", name: "White Marble Faceted Vase", price: 120, cat: "vases", desc: "Small faceted vase with grey marble veining. 12 × 17 cm." },
  { code: "YLV-017", img: "ylv-017", name: "White Stacked Sculpted Vase", price: 288, cat: "vases", desc: "Matte-white vase of stacked, hand-shaped layers. 19 × 14 × 29 cm." },
  { code: "YLV-018", img: "ylv-018", name: "White Twisted Hexagon Vase", price: 322, cat: "vases", desc: "Matte-white hexagon vase with twisted stacked layers. 17.5 × 34 cm." },
  { code: "YLV-019S", img: "ylv-019", name: "Horse Head Sculpture – 34 cm", price: 380, cat: "vases", desc: "Modern horse-head sculpture on a white block. Black or white. 34 cm." },
  { code: "YLV-019B", img: "ylv-019", name: "Horse Head Sculpture – 50 cm", price: 440, cat: "vases", desc: "Modern horse-head sculpture on a white block. Black or white. 50 cm." },
  { code: "YLV-020S", img: "ylv-020", name: "Black & Gold Bottle Vase – 61 cm", price: 1200, cat: "vases", desc: "Matte-black vase with a flared gold neck. 20 × 20 × 61 cm." },
  { code: "YLV-020B", img: "ylv-020", name: "Black & Gold Bottle Vase – 81 cm", price: 1440, cat: "vases", desc: "Matte-black vase with a flared gold neck. 25 × 25 × 81 cm." },
  { code: "YLV-021S", img: "ylv-021", name: "Black & Gold Tall Floor Vase – 81 cm", price: 1440, cat: "vases", desc: "Tapered matte-black floor vase with a gold neck. 25 × 25 × 81 cm." },
  { code: "YLV-021B", img: "ylv-021", name: "Black & Gold Tall Floor Vase – 101 cm", price: 1600, cat: "vases", desc: "Tapered matte-black floor vase with a gold neck. 30 × 30 × 101 cm." },
  { code: "YLV-022", img: "ylv-022", name: "Fluted Bottle Floor Vase, Black or Gold", price: 1600, cat: "vases", desc: "Tall fluted bottle vase in matte black or gold. 30 × 80 cm." },
  { code: "YLV-023", img: "ylv-023", name: "Terracotta Ring Sculpture Vase", price: 350, cat: "vases", desc: "Modern terracotta vase with a ring handle. 24 × 7 × 31 cm." },
  { code: "YLV-024", img: "ylv-024", name: "Black Spiral Vase", price: 299, cat: "vases", desc: "Matte-black vase with a spiral twist. 13 × 19 × 35 cm." },
];

const CAT_LABEL = { plants: "Plants & Trees", pots: "Pots & Planters", vases: "Vases", fragrance: "Home Fragrance", floral: "Floral Stems", potted: "Potted Flowers", globes: "Globes", nananom: "Nananom Agudie" };
// Any item still without a code gets the next free YDP number.
{ let n = Math.max(0, ...PRODUCTS.map(p => /^YDP-(d+)$/.exec(p.code || "")).filter(Boolean).map(m => +m[1])); PRODUCTS.forEach(p => { if (!p.code) p.code = "YDP-" + String(++n).padStart(3, "0"); }); }
// Hidden items keep their place (and code) above, but are taken out of what the website shows.
for (let i = PRODUCTS.length - 1; i >= 0; i--) if (PRODUCTS[i].hidden) PRODUCTS.splice(i, 1);

const cedis = (v) => typeof v === "number" ? "GH₵ " + v.toLocaleString("en-GH") : "GH₵ " + String(v).replace(/\s*[-–]\s*/, " – ");
// Plain text, e.g. for WhatsApp messages: "GH₵ 550 (was GH₵ 690)".
const formatPrice = (p) =>
  p.price == null ? "Price on request"
  : p.salePrice ? cedis(p.salePrice) + (p.unit ? " / " + p.unit : "") + " (was " + cedis(p.price) + ")"
  : cedis(p.price) + (p.unit ? " / " + p.unit : "");
// For the page: the old price crossed out when the item is on sale.
const priceHTML = (p) =>
  p.price == null || !p.salePrice ? formatPrice(p)
  : `<s class="was">${cedis(p.price)}</s> ${cedis(p.salePrice)}${p.unit ? " / " + p.unit : ""}`;

/* ------------------------------------------------------------
   LIVE PRICES FROM THE TILL (till.yiadomdecorpalace.com)
   The till decides prices, sale prices and which products are shown, so a price changed at the
   till shows here within a few minutes. This file still holds the photos, names and descriptions.
   If the till can't be reached, the prices above are used.
   ------------------------------------------------------------ */
const TILL_FEED = "https://till.yiadomdecorpalace.com/api/public/products";
let ORDERING = { on: false };   // online ordering settings from the till (order.js uses them)
let LIVE_PRICES = null;
function loadLivePrices(timeoutMs = 3500) {
  if (LIVE_PRICES) return LIVE_PRICES;   // fetched once per page, shared by the shop and the basket
  const feed = fetch(TILL_FEED, { mode: "cors" }).then(r => (r.ok ? r.json() : null)).catch(() => null);
  return (LIVE_PRICES = Promise.race([feed, new Promise(r => setTimeout(() => r(null), timeoutMs))]).then(f => {
    if (!f || !Array.isArray(f.products)) return false;
    ORDERING = f.ordering || { on: false };
    const live = new Map(f.products.map(t => [t.code, t]));
    for (let i = PRODUCTS.length - 1; i >= 0; i--) {
      const p = PRODUCTS[i], t = live.get(p.code);
      if (!t) continue;
      if (t.active === false) { PRODUCTS.splice(i, 1); continue; }      // hidden at the till
      if (typeof t.price === "number") p.price = t.price;               // items priced at the counter keep their range text
      if (typeof t.salePrice === "number") p.salePrice = t.salePrice; else delete p.salePrice;
      p.soldOut = f.showStock && t.inStock === false;
      if (t.avail) p.avail = t.avail;   // how many can be ordered at each location (capped)
    }
    return true;
  }));
}
