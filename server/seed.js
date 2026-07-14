const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Property = require('./models/Property');
const Blog = require('./models/Blog');
const Career = require('./models/Career');
const Testimonial = require('./models/Testimonial');

dotenv.config({ override: true });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nissix_constructions');
    console.log('Connected to database for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();
    await Property.deleteMany();
    await Blog.deleteMany();
    await Career.deleteMany();
    await Testimonial.deleteMany();

    console.log('Cleared existing collections.');

    // 1. Seed Users
    const users = await User.create([
      {
        name: 'Nissi Constructions Admin',
        email: 'admin@nissiconstructions.com',
        password: 'NissiAdmin2026!',
        role: 'admin',
        phone: '+91 98765 43210',
      },
      {
        name: 'Suresh Kumar',
        email: 'suresh@gmail.com',
        password: 'sureshpassword2026',
        role: 'owner',
        phone: '+91 91234 56789',
      },
    ]);
    console.log('Seeded Users.');

    // 2. Seed Services (24 services)
    const services = await Service.create([
      {
        title: 'Contractor',
        category: 'Contracting & Building',
        description: 'Comprehensive general contracting services. We manage sub-contractors, schedules, materials, and municipal clearances for large residential and commercial developments.',
        icon: 'HardHat',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
        benefits: ['Complete scheduling & timeline accountability', 'RERA-certified sub-contractor network', 'All municipal building approvals managed', 'Detailed budget estimation sheets'],
        process: [
          { stepNumber: 1, title: 'Scope & Contract', description: 'Reviewing blueprints, cost calculations, and executing contracting agreements.' },
          { stepNumber: 2, title: 'Scheduling', description: 'Drafting micro-level Gantt charts for step-by-step material and labor milestones.' },
          { stepNumber: 3, title: 'Field Execution', description: 'Supervising daily works, quality audits, and contractor coordination.' },
          { stepNumber: 4, title: 'Site Inspection & Handover', description: 'Final municipal occupancy clearance, quality checklist compliance, and keys handoff.' }
        ]
      },
      {
        title: 'Accessory building construction',
        category: 'Contracting & Building',
        description: 'Construction of detached secondary structures, including custom garages, luxury pool houses, modern guest houses, and garden workshops.',
        icon: 'Home',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        benefits: ['Designed to complement primary home design', 'Independent electrical and plumbing circuits', 'Maximizes property utility and market value', 'Premium lumber or concrete structures'],
        process: [
          { stepNumber: 1, title: 'Site Selection & Plan', description: 'Mapping plot boundaries, setbacks, and secondary building alignments.' },
          { stepNumber: 2, title: 'Foundation Casting', description: 'Pouring load-bearing concrete slabs tailored for utility usage.' },
          { stepNumber: 3, title: 'Structural Framing', description: 'Erecting wall frames, roof beams, and brick exterior shells.' },
          { stepNumber: 4, title: 'Fit-outs & Delivery', description: 'Concealed wiring, painting, door fittings, and landscaping integration.' }
        ]
      },
      {
        title: 'Bathroom remodelling',
        category: 'Remodelling & Interior',
        description: 'Complete high-end bathroom redesigns featuring custom glass-enclosed shower stalls, floating vanity setups, and designer tile laying.',
        icon: 'Bath',
        image: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&w=800&q=80',
        benefits: ['100% leak-proof multi-coat waterproofing warranty', 'Anti-skid premium porcelain or marble tiles', 'Concealed diverters and hot/cold plumbing pipelines', 'Modern space-saving design layouts'],
        process: [
          { stepNumber: 1, title: 'Demolition & Inspection', description: 'Removing outdated fixtures, tiles, and checking old piping health.' },
          { stepNumber: 2, title: 'Plumbing & Waterproofing', description: 'Laying rust-free CPVC pipes and applying elastomeric waterproofing.' },
          { stepNumber: 3, title: 'Laser-Aligned Tiling', description: 'Fixing vitrified or ceramic tiles with perfect slope adjustments.' },
          { stepNumber: 4, title: 'Fixtures Installation', description: 'Mounting WCs, vanity mirrors, LED accents, and premium faucets.' }
        ]
      },
      {
        title: 'Drywall installation',
        category: 'Drywall & Painting',
        description: 'Professional drywall hanging, taping, and joint compound mudding for straight, crack-free wall surfaces ready for smooth paint coats.',
        icon: 'Grid',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        benefits: ['Fire-resistant gypsum board selection', 'Perfect corner bead alignment and leveling', 'No visible joint seams or screw bumps', 'Fast, dust-controlled execution'],
        process: [
          { stepNumber: 1, title: 'Metal Stud Framing', description: 'Building the structural skeleton using lightweight galvanized steel channels.' },
          { stepNumber: 2, title: 'Hanging Sheets', description: 'Cutting and fastening premium moisture-resistant drywall sheets.' },
          { stepNumber: 3, title: 'Taping & Mudding', description: 'Applying paper tapes and three coats of premium joint compounds.' },
          { stepNumber: 4, title: 'Sanding & Priming', description: 'Fine-grit sanding of walls to produce a clean, paint-ready surface.' }
        ]
      },
      {
        title: 'Drywall repair',
        category: 'Drywall & Painting',
        description: 'Seamless repair of wall holes, structural cracks, water-damaged ceilings, and peeling joint tape for a flawless finish.',
        icon: 'Wrench',
        image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
        benefits: ['Matches surrounding wall textures perfectly', 'Structural reinforcement prevents crack recurrence', 'Resolves minor water leakage damage', 'Clean debris-free repair workflow'],
        process: [
          { stepNumber: 1, title: 'Damaged Area Removal', description: 'Cutting away loose drywall, rotten boards, or water-logged panels.' },
          { stepNumber: 2, title: 'Backer Wood Placement', description: 'Installing support studs behind the patch for structural integrity.' },
          { stepNumber: 3, title: 'Patching & Mudding', description: 'Securing new drywall, taping seams, and feathering compound edges.' },
          { stepNumber: 4, title: 'Texturing & Paint Touchup', description: 'Sanding smooth and color-matching with surrounding paint layers.' }
        ]
      },
      {
        title: 'Exterior painting',
        category: 'Drywall & Painting',
        description: 'Premium exterior house painting using weather-defense silicon coatings that resist dust, humidity, salt spray, and algae growths.',
        icon: 'Paintbrush',
        image: 'https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=800&q=80',
        benefits: ['5-year anti-fading paint color guarantee', 'Fills minor plaster hairline cracks', 'Algae and fungus resistant formula', 'High dust pick-up resistance properties'],
        process: [
          { stepNumber: 1, title: 'Pressure Washing', description: 'Blasting walls with high-pressure water to clear old paint and moss.' },
          { stepNumber: 2, title: 'Crack Sealing', description: 'Applying weather-proof sealants over hairline cracks.' },
          { stepNumber: 3, title: 'Undercoat Primer', description: 'Applying high-adhesion exterior primer coats to bind the concrete surface.' },
          { stepNumber: 4, title: 'Double Topcoat', description: 'Applying two coats of premium protective exterior acrylic emulsion.' }
        ]
      },
      {
        title: 'Floor fitting',
        category: 'Flooring & Tiling',
        description: 'Precision fitting of wooden floor boards, click-lock engineered laminates, and luxury vinyl planks (LVP) for homes and executive offices.',
        icon: 'Layers',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        benefits: ['Perfect acoustic underlay dampens foot traffic noise', 'Laser-leveled floor bases prevent board buckling', 'Moisture-barrier layers protect wood from dampness', 'Scratch-resistant sealant coatings'],
        process: [
          { stepNumber: 1, title: 'Base Preparation', description: 'Grinding concrete base and testing humidity parameters.' },
          { stepNumber: 2, title: 'Underlayment Laying', description: 'Spreading foam underlays and moisture-proof vapor barrier sheets.' },
          { stepNumber: 3, title: 'Planks Installation', description: 'Fitting planks with spacing gaps for natural thermal expansions.' },
          { stepNumber: 4, title: 'Skirting & Trim', description: 'Mounting wood skirtings, transition strips, and cleaning dust.' }
        ]
      },
      {
        title: 'Flooring',
        category: 'Flooring & Tiling',
        description: 'Elite residential and commercial flooring installations, including Italian marble layout, granite slabs, and large vitrified tiles.',
        icon: 'Square',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        benefits: ['Ultra-premium diamond-gloss stone finishes', 'Seamless joint alignment using 2mm spacer tiles', 'Vast stone material catalogs (Italian, Indian, Granite)', 'High load bearing durability specifications'],
        process: [
          { stepNumber: 1, title: 'Stone Sourcing', description: 'Procuring color-consistent marble slabs or tiles from top quarries.' },
          { stepNumber: 2, title: 'Slope Grading', description: 'Creating cement screed beds with accurate drainage slope grids.' },
          { stepNumber: 3, title: 'Adhesive Fixation', description: 'Laying stones/tiles with premium polymer-modified adhesives.' },
          { stepNumber: 4, title: 'Diamond Mirror Polish', description: 'Applying multi-stage wet grinding and polishing for high sheen.' }
        ]
      },
      {
        title: 'Flooring repair',
        category: 'Flooring & Tiling',
        description: 'Replacing chipped vitrified tiles, fixing hollow marble slabs, and securing squeaky or water-logged wooden floorboards.',
        icon: 'Hammer',
        image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80',
        benefits: ['Matches existing floor grout colors perfectly', 'Re-adheres hollow tiles without breaking neighboring slabs', 'Eliminates creaks and squeaks from wooden floors', 'Re-polishes repaired spots for seamless look'],
        process: [
          { stepNumber: 1, title: 'Damaged Tile Extraction', description: 'Chiseling grout lines and carefully removing cracked sections.' },
          { stepNumber: 2, title: 'Sub-floor Cleaning', description: 'Clearing old dry mortar beds and leveling the base.' },
          { stepNumber: 3, title: 'New Plaque Adhesion', description: 'Applying high-performance adhesive and placing matching tiles/wood.' },
          { stepNumber: 4, title: 'Epoxy Grouting', description: 'Filling seams with color-matched epoxy grouts and finishing.' }
        ]
      },
      {
        title: 'Foundation pouring',
        category: 'Contracting & Building',
        description: 'Engineered heavy-duty concrete foundation excavation, pile construction, isolated footings, and solid plinth slab pouring.',
        icon: 'Database',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
        benefits: ['Anti-seismic structural design parameters', 'M25/M30 grade concrete and Fe550 steel bars', 'Anti-termite chemical soil treatment standard', 'Prevents future wall structural settling cracks'],
        process: [
          { stepNumber: 1, title: 'Excavation & Soil Compaction', description: 'Digging pits to designated structural depth and mechanical compacting.' },
          { stepNumber: 2, title: 'Steel Reinforcement', description: 'Tying high-strength steel rebar cages according to design maps.' },
          { stepNumber: 3, title: 'Concrete Pouring', description: 'Pouring ready-mix concrete and compacting with needle vibrators.' },
          { stepNumber: 4, title: 'Curing Period', description: 'Continuous water-curing for 14 days to achieve maximum load capacities.' }
        ]
      },
      {
        title: 'General construction',
        category: 'Contracting & Building',
        description: 'Full-scale civil construction works for individual houses, warehouses, commercial properties, and residential complexes.',
        icon: 'Building2',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        benefits: ['Turnkey project management from excavation to keys', 'Strict adherence to National Building Codes (NBC)', 'Live site camera feeds for remote client progress check', 'High-quality red clay brick or fly ash wall structures'],
        process: [
          { stepNumber: 1, title: 'Earthworks & Pillars', description: 'Digging column footings and casting concrete pillar frame structures.' },
          { stepNumber: 2, title: 'Brickwork Masonry', description: 'Laying exterior and partition walls with cement mortar ratios.' },
          { stepNumber: 3, title: 'Roof Slab Casting', description: 'Assembling wooden formworks, laying steel rebar mesh, and pouring concrete.' },
          { stepNumber: 4, title: 'Plastering & Trim', description: 'Cement plastering interior/exterior walls for a paint-ready base.' }
        ]
      },
      {
        title: 'Home addition construction',
        category: 'Contracting & Building',
        description: 'Expanding your living space with custom room additions, second-story expansions, modular study rooms, and balcony conversions.',
        icon: 'PlusCircle',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        benefits: ['Engineered structural load transfers keep base safe', 'Blends new roof and wall joints seamlessly', 'Increases active square-footage utility', 'Independent HVAC and light wiring layouts'],
        process: [
          { stepNumber: 1, title: 'Load Assessment Check', description: 'Verifying if existing pillars can support second floors.' },
          { stepNumber: 2, title: 'Joint Framing', description: 'Tying rebar anchors into old beams for structural continuity.' },
          { stepNumber: 3, title: 'Enclosure Setup', description: 'Brick wall layups, door framing, and roof slab integrations.' },
          { stepNumber: 4, title: 'Interior Finishing', description: 'Concealed wiring, flooring installation, painting, and cleanup.' }
        ]
      },
      {
        title: 'Home building',
        category: 'Contracting & Building',
        description: 'Bespoke individual custom home constructions built to fulfill Vastu parameters, architectural elegance, and structural strength.',
        icon: 'Castle',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        benefits: ['Custom 2D/3D elevations and interior maps', '10-year official structural guarantee certificate', 'Complete procurement spreadsheets shared daily', 'Premium class fittings and woodwork included'],
        process: [
          { stepNumber: 1, title: 'Vastu Floor Blueprinting', description: 'Drafting orientations matching optimal natural light and wind.' },
          { stepNumber: 2, title: 'Skeleton Construction', description: 'Excavation, pillars framing, brickwork layout, and concrete slab pours.' },
          { stepNumber: 3, title: 'Utility Conduiting', description: 'Concealing pipes, electrical switch boxes, and HVAC ducting.' },
          { stepNumber: 4, title: 'Luxury Finishes Handoff', description: 'Flooring, modular modular kitchen, lighting, and keys handover.' }
        ]
      },
      {
        title: 'Home renovations',
        category: 'Remodelling & Interior',
        description: 'Whole-house remodeling that modernizes old wiring, changes room shapes, reinforces old beams, and updates kitchen/bathroom finishes.',
        icon: 'RefreshCw',
        image: 'https://images.unsplash.com/photo-1503387762-592ded58c460?auto=format&fit=crop&w=800&q=80',
        benefits: ['Transforms outdated properties into modern villas', 'Restores beam cracks and damp-proofing systems', 'Improves open-floor circulation patterns', 'Replaces aged plumbing lines with rust-free pipes'],
        process: [
          { stepNumber: 1, title: 'Structural Diagnostics', description: 'Inspecting load walls, columns, dampness, and plumbing health.' },
          { stepNumber: 2, title: 'Demolition & Framing', description: 'Safe removal of old walls and reinforcing beams with carbon wraps.' },
          { stepNumber: 3, title: 'Systems Retrofitting', description: 'Laying fresh wire pipelines, water tanks, and wall plastering.' },
          { stepNumber: 4, title: 'Modern Finishes', description: 'Italian marble, false ceilings, LED profiles, and premium paint.' }
        ]
      },
      {
        title: 'Interior decorating',
        category: 'Remodelling & Interior',
        description: 'Custom luxury interior decoration, wood paneling, marine-plywood modular wardrobes, lighting designs, and custom color consulting.',
        icon: 'Palette',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        benefits: ['High-end marine ply (IS 710) furniture structures', 'Aesthetic color theme matching and wall moldings', 'Ambient false-ceiling lighting (Philips/Cove LEDs)', 'Ergonomic wardrobe designs with soft-close slides'],
        process: [
          { stepNumber: 1, title: '3D Render Designs', description: 'Developing photorealistic mockups showing textures and scales.' },
          { stepNumber: 2, title: 'False Ceiling Layout', description: 'Assembling gypsum ceiling panels and running wire lines.' },
          { stepNumber: 3, title: 'Woodwork Fabrication', description: 'Carpentry, laminates pressing, and installing modular units.' },
          { stepNumber: 4, title: 'Upholstery & Soft styling', description: 'Placing designer wallpapers, lighting fixtures, and deep cleaning.' }
        ]
      },
      {
        title: 'Interior structural repairs',
        category: 'Remodelling & Interior',
        description: 'Addressing structural interior issues including retrofitting sagging slabs, sealing column cracks with epoxy, and reinforcing walls.',
        icon: 'Shield',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
        benefits: ['Restores original building load calculations', 'Halts progress of structural wall cracks', 'Lowers risks of concrete spalling or rust expands', 'Certified engineering calculations provided'],
        process: [
          { stepNumber: 1, title: 'Non-Destructive Testing', description: 'Running rebound hammer tests to evaluate concrete strength.' },
          { stepNumber: 2, title: 'Concrete Grouting', description: 'Injecting high-performance polymer resins into cracks.' },
          { stepNumber: 3, title: 'Steel Jacket wrapping', description: 'Wrapping failing columns with structural steel plates or carbon fibers.' },
          { stepNumber: 4, title: 'Plaster Repair', description: 'Re-plastering surfaces with polymer mortar and sanding smooth.' }
        ]
      },
      {
        title: 'Kitchen remodelling',
        category: 'Remodelling & Interior',
        description: 'State-of-the-art modular kitchen setups with quartz countertops, soft-close drawers, pull-out tall pantries, and profile handle designs.',
        icon: 'ChefHat',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        benefits: ['Ergonomic kitchen work-triangle layouts', 'Waterproof boiling water resistant (BWP) ply boards', 'Scratch-resistant quartz or solid surfaces', 'Provision for integrated chimneys, ovens, and hobs'],
        process: [
          { stepNumber: 1, title: 'Layout Drafting', description: 'Designing L-shaped, U-shaped, or island kitchen modules.' },
          { stepNumber: 2, title: 'Plumbing & Gas Line setup', description: 'Concealing gas pipes, water pipelines, and water-softener valves.' },
          { stepNumber: 3, title: 'Cabinet Assembly', description: 'Fixing base cabinets, hydraulic overhead units, and accessories.' },
          { stepNumber: 4, title: 'Countertop & Chimney Fit', description: 'Laying quartz slabs with sink basins and mounting hoods.' }
        ]
      },
      {
        title: 'Plumbing services',
        category: 'Specialty Services',
        description: 'Rust-free water supply pipelines, sewer line cleanups, pressure pump installations, and luxury concealed sanitary fixture mounts.',
        icon: 'Droplets',
        image: 'https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=800&q=80',
        benefits: ['Lead-free CPVC/UPVC pipelines (Supreme/Astral)', 'Hydrostatic water pressure leak check certificate', 'Concealed body wall-hung WC mount specialists', 'Ensures high, clog-free drainage capacities'],
        process: [
          { stepNumber: 1, title: 'Piping Routing Map', description: 'Drafting pipe layouts to avoid concrete structural pillars.' },
          { stepNumber: 2, title: 'Concealed Plumbing', description: 'Chasing walls to lay dual line hot/cold supply pipelines.' },
          { stepNumber: 3, title: 'Pressure Testing', description: 'Plugging ends and testing lines with air/water at 10 Bar pressure.' },
          { stepNumber: 4, title: 'Fixture Fitting', description: 'Mounting water heaters, concealed diverters, and bathroom basins.' }
        ]
      },
      {
        title: 'Remodelling',
        category: 'Remodelling & Interior',
        description: 'Commercial and residential spatial redesigns including layout updates, partition additions, glass panels, and executive office fit-outs.',
        icon: 'Layout',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        benefits: ['Improves room layouts and spatial flows', 'Premium acoustic partition panels (sound insulation)', 'Quick, clean commercial fit-out execution timelines', 'Modernizes aged or boring interior styles'],
        process: [
          { stepNumber: 1, title: 'Layout Diagnostics', description: 'Assessing old layout walls and identifying partition demolition options.' },
          { stepNumber: 2, title: 'Partition Framing', description: 'Erecting metal studs or glass framing networks.' },
          { stepNumber: 3, title: 'Panel Fitting', description: 'Mounting laminates, acoustic boards, or glass partitions.' },
          { stepNumber: 4, title: 'Electrical & Painting', description: 'Adding switches, wall-paint touchups, and detailed deep clean.' }
        ]
      },
      {
        title: 'Roof installation',
        category: 'Specialty Services',
        description: 'Premium roof construction using modern asphalt shingles, heat-reflective metal panels, traditional clay tiles, and underlay sheets.',
        icon: 'Triangle',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        benefits: ['Weather-tight seal keeps storm rain outside', 'Heat-reflective underlay sheet reduces HVAC bills', 'Premium fire-resistant roofing products selection', 'Designed for maximum wind load safety standards'],
        process: [
          { stepNumber: 1, title: 'Roof Truss Framing', description: 'Assembling structural steel or high-strength lumber trusses.' },
          { stepNumber: 2, title: 'Sheathing & Underlay', description: 'Installing roof boards and moisture vapor barrier underlays.' },
          { stepNumber: 3, title: 'Shingles / Tile laying', description: 'Fastening slate, clay tiles, or metal sheeting with flashing lines.' },
          { stepNumber: 4, title: 'Waterproofing Seams', description: 'Sealing roof ridges, valleys, and gutter pipelines.' }
        ]
      },
      {
        title: 'Roof repair',
        category: 'Specialty Services',
        description: 'Resolving roof leakages, replacing broken clay tiles, applying liquid roof membranes, and cleaning rust-clogged gutters.',
        icon: 'CloudRain',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        benefits: ['Stops water seepage before it damages interior plaster', 'Replaces only damaged tiles to control cost', 'Reinforces flashing around chimneys and vents', 'Extends overall roof lifetime by years'],
        process: [
          { stepNumber: 1, title: 'Water Seepage Check', description: 'Tracing water damp spots back to roof surface cracks.' },
          { stepNumber: 2, title: 'Damaged Tile Removal', description: 'Clearing weathered wood boards or cracked roof shingle sheets.' },
          { stepNumber: 3, title: 'Flashing Reinforcement', description: 'Laying elastomeric seals and fresh aluminum flashing strips.' },
          { stepNumber: 4, title: 'Patch Testing', description: 'Simulating heavy rain with water hose to verify dry seals.' }
        ]
      },
      {
        title: 'Tile work installation',
        category: 'Flooring & Tiling',
        description: 'Laser-level tiling for bathroom walls, modular kitchen backsplashes, large living room floors, and decorative accent walls.',
        icon: 'Grid',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        benefits: ['100% flat surface alignment (no tile lip-page)', 'Epoxy joint grouting prevents dirt/mold build-up', 'Custom patterns (Herringbone, Brick, Diamond style)', 'High-adhesion cement polymer adhesives used'],
        process: [
          { stepNumber: 1, title: 'Surface Leveling', description: 'Plastering walls/floors to absolute straight grid values.' },
          { stepNumber: 2, title: 'Tiling Layout Map', description: 'Marking lines to ensure consistent borders and few tile cuts.' },
          { stepNumber: 3, title: 'Tile Laying', description: 'Applying adhesives using notched trowels and setting tiles.' },
          { stepNumber: 4, title: 'Joint Grouting', description: 'Filling spacer seams with waterproof epoxy grout materials.' }
        ]
      },
      {
        title: 'Tile work replacement',
        category: 'Flooring & Tiling',
        description: 'Replacing outdated or stained ceramic tiles with premium modern double-charged vitrified tiles or large porcelain sheets.',
        icon: 'Activity',
        image: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&w=800&q=80',
        benefits: ['Instantly elevates bathroom/kitchen aesthetics', 'Removes mold-damaged porous old tiles', 'Allows inspections of underlying piping health', 'Ensures high scratch and stain resistance'],
        process: [
          { stepNumber: 1, title: 'Tile Chiseling', description: 'Chipping away old ceramic tiles and grinding off old adhesives.' },
          { stepNumber: 2, title: 'Plaster Leveling', description: 'Re-coating surface walls with waterproof plaster bases.' },
          { stepNumber: 3, title: 'New Plaque Fixation', description: 'Affixing vitrified slabs with high-strength polymer bonds.' },
          { stepNumber: 4, title: 'Sealing seams', description: 'Grouting seams and applying anti-fungal silicon beads.' }
        ]
      },
      {
        title: 'Waterproofing',
        category: 'Specialty Services',
        description: 'Multi-layer crystalline and elastomeric waterproofing coatings for concrete roof terraces, basement walls, water tanks, and bathrooms.',
        icon: 'ShieldAlert',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        benefits: ['100% leak-proof warranty certificate (5-10 years)', 'Polyurethane and fiber-reinforced elastomeric compounds', 'Stops saltpetre peeling of interior wall paints', 'Excellent resistance to standing water ponding'],
        process: [
          { stepNumber: 1, title: 'Surface Grinding', description: 'Grinding concrete surface to clear dust and expose cracks.' },
          { stepNumber: 2, title: 'Crack Banding', description: 'Injecting polymer grout and sealing cracks with mesh tapes.' },
          { stepNumber: 3, title: 'Primer & Coat layers', description: 'Applying primary penetration seal and two coats of waterproofing compound.' },
          { stepNumber: 4, title: 'Ponding Test validation', description: 'Flooding terrace area for 48 hours to confirm zero leakage.' }
        ]
      }
    ]);
    console.log('Seeded 24 Services.');

    // 3. Seed Projects
    const projects = await Project.create([
      {
        title: 'Nissi Grandeur Villa',
        description: 'An architectural masterpiece featuring double-height marble entry halls, cantilevered structures, and automated glass facade panels.',
        categories: ['completed', 'villas', 'residential'],
        location: 'Rushikonda, Visakhapatnam',
        costRange: '₹3.5 Cr - ₹4.5 Cr',
        timeline: '18 Months',
        images: [
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        ],
        beforeAfter: {
          before: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', // Muddy plot
          after: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',  // Completed Villa
        },
        featured: true,
      },
      {
        title: 'TechHub Commercial Plaza',
        description: 'A 5-story commercial complex designed for high-density tech offices, complete with double basement parking and high-performance energy-saving glass envelopes.',
        categories: ['ongoing', 'commercial'],
        location: 'Madhurawada IT Park, Visakhapatnam',
        costRange: '₹12 Cr - ₹15 Cr',
        timeline: '24 Months (Ongoing)',
        images: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        ],
        beforeAfter: {
          before: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80', // Under excavation
          after: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',  // Structured frame
        },
        featured: true,
      },
      {
        title: 'Classic Duplex Renovation',
        description: 'Complete revitalization of a 25-year-old traditional residence, reinforcing its core columns, opening up the kitchen plan, and applying high-end marble finishes.',
        categories: ['completed', 'renovations', 'residential'],
        location: 'MVP Colony, Visakhapatnam',
        costRange: '₹45 Lakhs - ₹60 Lakhs',
        timeline: '5 Months',
        images: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        ],
        beforeAfter: {
          before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', // Old run down house
          after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',  // Newly renovated
        },
        featured: false,
      },
      {
        title: 'Nissi Heights Apartment',
        description: 'An elite residential project of 20 premium 3BHK smart flats. Equipped with premium amenities, structural solar grids, and a luxury rooftop swimming pool.',
        categories: ['ongoing', 'residential'],
        location: 'Yendada, Visakhapatnam',
        costRange: '₹8 Cr - ₹10 Cr',
        timeline: '20 Months',
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        ],
        beforeAfter: {
          before: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', // Under construction columns
          after: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',  // Apartment complex
        },
        featured: true,
      },
    ]);
    console.log('Seeded Projects.');

    // 4. Seed Property Marketplace Listings
    await Property.create([
      {
        title: 'Luxury 4 BHK Sea-Facing Villa',
        description: 'Superb ready-to-move villa overlooking Rushikonda beach, featuring automated security, Italian marble flooring, and private splash pool.',
        type: 'Villa',
        city: 'Visakhapatnam',
        area: '4800 sq ft',
        price: 45000000, // 4.5 Crore
        images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'],
        ownerName: 'Suresh Kumar',
        ownerPhone: '+91 91234 56789',
        ownerEmail: 'suresh@gmail.com',
        status: 'approved',
      },
      {
        title: 'Premium 3 BHK Apartment in Yendada',
        description: 'Brand new luxury flat with modern amenities, modular kitchen, chimney, wardrobes, false ceiling, and dedicated car parking.',
        type: 'Apartment',
        city: 'Visakhapatnam',
        area: '1950 sq ft',
        price: 11000000, // 1.1 Crore
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'],
        ownerName: 'Venkata Rao',
        ownerPhone: '+91 99999 88888',
        ownerEmail: 'venkat@gmail.com',
        status: 'approved',
      },
      {
        title: 'Commercial Office Space in Madhurawada',
        description: 'Prime ground-floor space suitable for banks, premium stores, or IT consultancies, with heavy pedestrian visibility and parking.',
        type: 'Commercial',
        city: 'Visakhapatnam',
        area: '3200 sq ft',
        price: 28000000, // 2.8 Crore
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'],
        ownerName: 'Ramesh Reddy',
        ownerPhone: '+91 98888 77777',
        ownerEmail: 'ramesh@gmail.com',
        status: 'pending', // Pending approval for testing admin toggle!
      },
    ]);
    console.log('Seeded Properties.');

    // 5. Seed Blogs
    await Blog.create([
      {
        title: '5 Crucial Things to Check Before Building Your Custom Home',
        summary: 'Avoid expensive mistakes. Here is a checklist of structural, soil-bearing, and regulatory factors to verify before starting excavation.',
        content: '<p>Building a custom home is one of the most significant emotional and financial investments you will ever make. However, jumping straight into brickwork without completing early diagnostics can lead to structural failures, foundation cracks, or regulatory penalties later.</p><h3>1. Complete a Soil Bearing Test</h3><p>Every structural engineer needs to calculate exactly how much load the soil can carry. Clayey soil swells when wet and shrinks when dry, requiring deep pile foundations, whereas hard gravelly soil can safely carry heavy structures with standard isolated footings. Skipping this test could lead to uneven house settling and cracked walls.</p><h3>2. Check Vastu Alignment Early</h3><p>Modifying a floor plan after columns are cast is extremely costly. Make sure your main entry, kitchen corner (southeast), and master bedroom (southwest) are plotted correctly on the initial blueprints.</p><h3>3. Double Check Local Approvals</h3><p>Ensure that municipal setbacks (front, rear, and side spacing rules) are strictly met to prevent local bodies from stalling construction. Partner with a licensed RERA certified firm like Nissi Constructions to secure water connections, electrical sub-meters, and occupancy certificates smoothly.</p>',
        category: 'Construction Tips',
        image: 'https://images.unsplash.com/photo-1503387762-592ded58c460?auto=format&fit=crop&w=800&q=80',
        readTime: '6 mins read',
      },
      {
        title: 'Modern Architecture Trends in Gated Villa Communities',
        summary: 'From glass facades to floating staircases and passive cooling design, discover how luxury home design is evolving in 2026.',
        content: '<p>The modern luxury buyer is no longer satisfied with standard brick boxes. Luxury homes in 2026 are increasingly shifting towards open, organic layouts that integrate interior spaces with the outdoor landscape.</p><h3>Glass Facades & Thermal Glazing</h3><p>Double-height double-glazed windows allow breathtaking views while filtering out heat. This maximizes light without increasing HVAC energy bills.</p><h3>Glassmorphism & Open Staircases</h3><p>Cantilevered floating wooden stairs supported by gold-tinted structural glass balustrades make interiors feel light, airy, and ultra-premium.</p><h3>Passive Cooling Techniques</h3><p>Using exposed concrete fins, terracotta screens, and courtyard ventilation helps hot air escape upwards, keeping luxury villas naturally cooler by 3-4°C.</p>',
        category: 'Architecture',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        readTime: '5 mins read',
      },
      {
        title: 'Why Visakhapatnam Real Estate is the Best Long-term Investment',
        summary: 'With upcoming infrastructure, IT corridors, and sea-view layouts, Vizag offers excellent capital appreciation yields.',
        content: '<p>Visakhapatnam, the executive capital of Andhra Pradesh, has witnessed robust growth in the real estate sector over the last five years. If you are looking for secure long-term investments, here is why Vizag lands stand out.</p><h3>Upcoming Beach Road Corridors</h3><p>The widening of the beach road corridor up to Bhogapuram international airport has driven land appreciation by 35% in key sub-sectors like Yendada, Rushikonda, and Madhurawada.</p><h3>High Commercial Lease Yields</h3><p>Gated apartments and premium commercial hubs yield high rentals, thanks to the influx of IT professionals and pharmaceutical executives moving to the coastal smart city.</p>',
        category: 'Investment Guides',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        readTime: '8 mins read',
      },
    ]);
    console.log('Seeded Blogs.');

    // 6. Seed Careers
    await Career.create([
      {
        jobTitle: 'Senior Site Engineer',
        department: 'Civil Engineering',
        location: 'Visakhapatnam, India',
        type: 'Full-time',
        description: 'We are seeking a detail-oriented Senior Site Engineer to oversee high-end residential and villa projects, ensuring concrete cube audits, structural alignment, and safety compliances.',
        requirements: [
          'B.Tech / M.Tech in Civil Engineering',
          '5+ years experience in premium villa construction',
          'Proficiency in AutoCAD and reading structural blueprints',
          'Excellent leadership and team coordination capabilities',
        ],
      },
      {
        jobTitle: 'Luxury Interior Designer',
        department: 'Design',
        location: 'Visakhapatnam, India',
        type: 'Full-time',
        description: 'Join our creative team to design premium interiors. You will produce detailed 3D photorealistic walkthroughs and oversee wood finishing, false ceilings, and decor placements.',
        requirements: [
          'Degree/Diploma in Interior Design',
          '3+ years experience with high-end residential portfolios',
          'Advanced knowledge of Google Sketchup, V-Ray, or 3ds Max',
          'Deep understanding of luxury veneer, marble, and material finishes',
        ],
      },
    ]);
    console.log('Seeded Careers.');

    // 7. Seed Testimonials
    await Testimonial.create([
      {
        clientName: 'Dr. Srinivas Rao',
        designation: 'Neurosurgeon, Apollo Hospitals',
        rating: 5,
        text: 'Nissi Constructions built my duplex villa at Rushikonda. The structural quality is outstanding, they were fully transparent with bills, and delivered exactly what was rendered in the 3D model on time.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        status: 'approved',
      },
      {
        clientName: 'Ananya Sharma',
        designation: 'VP, TechSolutions Ltd',
        rating: 5,
        text: 'I hired them for complete premium interior design and waterproofing. The team has exceptional taste, using hidden linear LEDs, copper metal profiles, and Italian marble laid with laser accuracy. Excellent team!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        status: 'approved',
      },
    ]);
    console.log('Seeded Testimonials.');

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
