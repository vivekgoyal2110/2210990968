const fetchData = require('../utils/fetchData');

const getTopUsers = async (req, res) => {
  const users = await fetchData('users');
  const posts = await fetchData('posts');
  const comments = await fetchData('comments');

  const userCommentMap = {};

  posts.forEach(post => {
    const userId = post.userId;
    const commentCount = comments.filter(c => c.postId === post.id).length;
    if (!userCommentMap[userId]) userCommentMap[userId] = 0;
    userCommentMap[userId] += commentCount;
  });

  const topUsers = Object.entries(userCommentMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([userId]) => users.find(u => u.id == userId));

  res.json(topUsers);
};

const getTopOrLatestPosts = async (req, res) => {
  const type = req.query.type;
  const posts = await fetchData('posts');
  const comments = await fetchData('comments');

  if (type === 'popular') {
    const postCommentMap = {};

    posts.forEach(post => {
      postCommentMap[post.id] = comments.filter(c => c.postId === post.id).length;
    });

    const maxComments = Math.max(...Object.values(postCommentMap));

    const topPosts = posts.filter(post => postCommentMap[post.id] === maxComments);

    res.json(topPosts);
  } else {
    const latestPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    res.json(latestPosts);
  }
};

module.exports = { getTopUsers, getTopOrLatestPosts };
