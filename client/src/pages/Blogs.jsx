import React, { useState } from 'react';
import { MdDateRange, MdPerson, MdArrowForward, MdSearch, MdCategory, MdAccessTime } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaLinkedin, FaRegHeart, FaRegComment } from 'react-icons/fa';

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Fine Dining: Elevating Your Restaurant Experience",
      excerpt: "Discover how small details can transform your dining experience from ordinary to extraordinary...",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Chef Marco Pierre",
      date: "2024-12-15",
      readTime: "5 min read",
      category: "dining",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Fine Dining", "Experience", "Service"]
    },
    {
      id: 2,
      title: "Sustainable Cooking: Farm to Table Movement in Modern Restaurants",
      excerpt: "How restaurants are embracing sustainability and local sourcing for better taste and environment...",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      author: "Sarah Johnson",
      date: "2024-12-10",
      readTime: "7 min read",
      category: "sustainability",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Sustainability", "Local", "Farm to Table"]
    },
    {
      id: 3,
      title: "Wine Pairing 101: Matching Your Meal with Perfect Wines",
      excerpt: "Learn the basics of wine pairing to enhance your dining experience with perfect combinations...",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Robert Winehouse",
      date: "2024-12-05",
      readTime: "6 min read",
      category: "wine",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Wine", "Pairing", "Beverages"]
    },
    {
      id: 4,
      title: "Behind the Scenes: A Day in Our Kitchen",
      excerpt: "Take an exclusive look behind the curtains of our professional kitchen and meet our talented team...",
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      author: "Head Chef Antonio",
      date: "2024-11-28",
      readTime: "8 min read",
      category: "behind-scenes",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Kitchen", "Team", "Behind Scenes"]
    },
    {
      id: 5,
      title: "Seasonal Menu Changes: Why We Update Our Offerings",
      excerpt: "Understanding the importance of seasonal ingredients and how they influence our menu creativity...",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      author: "Menu Director Lisa",
      date: "2024-11-20",
      readTime: "4 min read",
      category: "menu",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Seasonal", "Menu", "Ingredients"]
    },
    {
      id: 6,
      title: "The Science of Perfect Coffee: From Bean to Cup",
      excerpt: "Explore the journey of coffee and learn what makes the perfect brew for your after-meal delight...",
      content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
      author: "Barista Mike",
      date: "2024-11-15",
      readTime: "5 min read",
      category: "beverages",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Coffee", "Beverages", "Science"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'dining', name: 'Fine Dining' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'wine', name: 'Wine & Beverages' },
    { id: 'behind-scenes', name: 'Behind the Scenes' },
    { id: 'menu', name: 'Menu Insights' },
    { id: 'beverages', name: 'Coffee & Tea' }
  ];

  // Filter blogs based on category and search
  const filteredBlogs = blogPosts.filter(blog => {
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Gourmet Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover culinary insights, behind-the-scenes stories, and expert tips from our kitchen to yours.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search articles, topics, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Featured Image */}
              <div className="h-80 lg:h-96">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Featured Content */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <span className="text-gray-500 text-sm">{blogPosts[0].category}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {blogPosts[0].title}
                </h2>
                
                <p className="text-gray-600 mb-6 text-lg">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <MdPerson className="text-amber-500" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdDateRange className="text-amber-500" />
                    <span>{formatDate(blogPosts[0].date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdAccessTime className="text-amber-500" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                    Read Full Article
                    <MdArrowForward />
                  </button>
                  
                  <div className="flex gap-3">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <FaRegHeart className="text-xl" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-amber-500 transition-colors">
                      <FaRegComment className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <MdCategory className="text-amber-500" />
            Latest Articles
            <span className="text-amber-500 ml-2">({filteredBlogs.length})</span>
          </h2>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.slice(1).map(blog => (
                <article key={blog.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  {/* Blog Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Blog Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {blog.category}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <MdAccessTime className="text-amber-500" />
                        {blog.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MdPerson className="text-amber-500" />
                        {blog.author}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(blog.date)}
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <button className="text-amber-600 font-semibold hover:text-amber-700 transition-colors flex items-center gap-2">
                        Read More
                        <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <div className="flex gap-3">
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <FaRegHeart />
                        </button>
                        <button className="text-gray-400 hover:text-amber-500 transition-colors">
                          <FaRegComment />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="text-amber-100 mb-6">Get the latest articles and culinary insights delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-amber-600 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Share */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Share Our Blog</h3>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition-colors">
              <FaFacebook className="text-xl" />
            </button>
            <button className="bg-blue-400 text-white p-3 rounded-2xl hover:bg-blue-500 transition-colors">
              <FaTwitter className="text-xl" />
            </button>
            <button className="bg-blue-700 text-white p-3 rounded-2xl hover:bg-blue-800 transition-colors">
              <FaLinkedin className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;