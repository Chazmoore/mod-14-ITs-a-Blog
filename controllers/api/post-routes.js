const router = require('express').Router();
const Post = require('../../models/Post');
const withAuth = require('../../utils/auth');

router.post('/post/:id', async (req, res) => {
    const postId = req.params.id;
    const { comment, creator, date } = req.body;
  
    try {
      // Find the blog post by ID
      const post = await Post.findByPk(postId);
  
      if (!post) {
        // If the post is not found, respond with a 404 status and a message
        return res.status(404).json({ error: 'Blog post not found' });
      }
  
      // Create a new comment for the blog post
      const newComment = await Comment.create({
        comment_body: comment,
        creator,
        date_created: date,
        post_id: post.id,
      });
  
      // Respond with a success message
      res.json({ success: true, message: 'Comment saved successfully!' });
    } catch (error) {
      console.error('Error saving comment:', error);
      // Handle any errors that occur during the comment creation
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.put('/post/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, contents } = req.body;
  
    try {
      // Find the blog post by ID
      const post = await Post.findByPk(postId);
  
      if (!post) {
        // If the post is not found, respond with a 404 status and a message
        return res.status(404).json({ error: 'Blog post not found' });
      }
  
      // Update the blog post properties
      post.title = title;
      post.content = contents;
      await post.save();
  
      // Respond with a success message
      res.json({ success: true, message: 'Blog post updated successfully' });
    } catch (error) {
      console.error('Error updating blog post:', error);
      // Handle any errors that occur during the update of the blog post
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.delete('/post/:id', async (req, res) => {
    const postId = req.params.id;
  
    try {
      // Find the blog post by ID
      const post = await Post.findByPk(postId);
  
      if (!post) {
        // If the post is not found, respond with a 404 status and a message
        return res.status(404).json({ error: 'Blog post not found' });
      }
  
      // Delete the blog post
      await post.destroy();
  
      // Respond with a success message
      res.json({ success: true, message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      // Handle any errors that occur during the deletion of the blog post
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = Post;

// app.get('/', (req, res) => {
//     // Render the homepage template
//     res.render('homepage');
//   });
  
// //   app.get('/dashboard', async (req, res) => {
// //     try {
// //       // Fetch the user's blog posts from the database (replace with your actual database logic)
// //       const blogPosts = await Post.findAll({
// //         where: { user_id: req.session.user_id }, 
// //         attributes: ['id', 'title', 'date'], 
// //       });
  
// //       // Render the dashboard template with the user's blog posts data
// //       res.render('dashboard', { blogPosts });
// //     } catch (error) {
// //       console.error('Error fetching blog posts:', error);
// //       // Handle any errors that occur during the data retrieval
// //       res.status(500).json({ error: 'Internal server error' });
// //     }
// //   });
  
//   app.get('/create', (req, res) => {
//     // Render the create.hbs template for creating a new blog post
//     res.render('create');
//   });