const blogService = require('../services/blogService')

exports.createBlog = async (req, res) => {
    try {
        const response = await blogService.createBlog(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

exports.getAllBlog = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const pageSize = parseInt(req.query.pageSize) || 8;  
  
      const blog = await blogService.getAllBlog(page, pageSize);
  
      return res.status(200).json(blog);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };

exports.getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id
        const blog = await blogService.getBlogById(blogId);
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
