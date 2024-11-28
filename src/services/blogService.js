const Blog = require('../models/blogModel');

const createBlog =  (data) => {
  return new Promise(async (resolve, reject) => {
    const {title, content, img} = data
    try{

      const newBlog = await Blog.create({
        title,
        content,
        img
      })

      if(newBlog){
        resolve({
          status: "OK",
          message: "Thêm blog thành công",
          data: newBlog
        })
      }
    }
    catch (error){
      reject(error)
    }
  })
  
};


const getAllBlog = async (page = 1, pageSize = 8) => {  
  try {
    
    const skip = (page - 1) * pageSize;  
    const blogs = await Blog.find()
      .skip(skip)  
      .limit(pageSize); 

   
    const totalBlogs = await Blog.countDocuments();

    
    return {
      status: 'OK',
      message: 'Lấy danh sách bài viết thành công!',
      data: blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / pageSize),
      totalBlogs,
    };
  } catch (error) {
    throw new Error('Error fetching blogs: ' + error.message);
  }
};

const getBlogById = (blogId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
          resolve({
            status: "ERR",
            message: "Không tìm thấy bài viết!",
          });
        }
        resolve({
          status: "OK",
          message: "Lấy thông tin bài viết thành công!",
          data: blog,
        });
      } catch (error) {
        reject(error);
      }
    });
  };


module.exports = {
    createBlog,
    getAllBlog,
    getBlogById
};
