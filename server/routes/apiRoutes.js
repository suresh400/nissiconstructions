const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');

const {
  // Services
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  // Projects
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  // Properties
  getProperties,
  getAdminProperties,
  createProperty,
  togglePropertyApproval,
  deleteProperty,
  // Consultations
  getConsultations,
  createConsultation,
  updateConsultationStatus,
  deleteConsultation,
  // Blogs
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  // Careers
  getCareers,
  createCareer,
  applyForJob,
  getApplications,
  deleteCareer,
  // Testimonials
  getTestimonials,
  getAdminTestimonials,
  createTestimonial,
  toggleTestimonialApproval,
  deleteTestimonial,
  // Uploads
  uploadFile,
} = require('../controllers/apiController');

// SERVICES
router.route('/services')
  .get(getServices)
  .post(protect, authorize('admin'), createService);
router.route('/services/:idOrSlug')
  .get(getService);
router.route('/services/:id')
  .put(protect, authorize('admin'), updateService)
  .delete(protect, authorize('admin'), deleteService);

// PROJECTS
router.route('/projects')
  .get(getProjects)
  .post(protect, authorize('admin'), createProject);
router.route('/projects/:id')
  .get(getProject)
  .put(protect, authorize('admin'), updateProject)
  .delete(protect, authorize('admin'), deleteProject);

// PROPERTIES (MARKETPLACE)
router.route('/properties')
  .get(getProperties)
  .post(protect, createProperty);
router.route('/properties/admin')
  .get(protect, authorize('admin'), getAdminProperties);
router.route('/properties/:id/approve')
  .put(protect, authorize('admin'), togglePropertyApproval);
router.route('/properties/:id')
  .delete(protect, deleteProperty);

// CONSULTATIONS (LEADS)
router.route('/consultations')
  .get(protect, authorize('admin'), getConsultations)
  .post(createConsultation);
router.route('/consultations/:id')
  .put(protect, authorize('admin'), updateConsultationStatus)
  .delete(protect, authorize('admin'), deleteConsultation);

// BLOGS
router.route('/blogs')
  .get(getBlogs)
  .post(protect, authorize('admin'), createBlog);
router.route('/blogs/:idOrSlug')
  .get(getBlog);
router.route('/blogs/:id')
  .put(protect, authorize('admin'), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

// CAREERS
router.route('/careers')
  .get(getCareers)
  .post(protect, authorize('admin'), createCareer);
router.route('/careers/applications')
  .get(protect, authorize('admin'), getApplications);
router.route('/careers/:id')
  .delete(protect, authorize('admin'), deleteCareer);
router.route('/careers/:id/apply')
  .post(applyForJob);

// TESTIMONIALS
router.route('/testimonials')
  .get(getTestimonials)
  .post(createTestimonial);
router.route('/testimonials/admin')
  .get(protect, authorize('admin'), getAdminTestimonials);
router.route('/testimonials/:id/approve')
  .put(protect, authorize('admin'), toggleTestimonialApproval);
router.route('/testimonials/:id')
  .delete(protect, authorize('admin'), deleteTestimonial);

// FILE UPLOAD
router.post('/upload', protect, upload.single('file'), uploadFile);
// Allow public uploads too (e.g. for resume uploads in job applications)
router.post('/upload/public', upload.single('file'), uploadFile);

module.exports = router;
