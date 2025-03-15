const Project = require('../models/Project');

class ProjectOps {
  async getAllProjects() {
    console.log('getting all projects');
    return await Project.find({});
  }

  async getProjectById(id) {
    console.log(`getting project by id ${id}`);
    let project = await Project.findById(id);
    return project;
  }

  async searchProjects(title, summary, description) {
    console.log(`getting project by ${title}, ${summary}, ${description}`);
    // check if there's a query
    if (!title && !summary && !description) {
      console.log('⚠️ No search parameter provided!');
      return [];
    }

    let searchConditions = [];

    if (title) {
      searchConditions.push({ title: { $regex: title, $options: 'i' } });
    }
    if (summary) {
      searchConditions.push({ summary: { $regex: summary, $options: 'i' } });
    }
    if (description) {
      searchConditions.push({
        description: { $regex: description, $options: 'i' },
      });
    }

    let query = searchConditions.length > 0 ? { $or: searchConditions } : {};
    let results = await Project.find(query);
    console.log('Search Results:', results);
    return results;
  }
}

module.exports = ProjectOps;
