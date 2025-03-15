const ProjectOps = require('../data/projectOps');
const projectOps = new ProjectOps();

exports.Projects = async (req, res) => {
  console.log('loading projects from controller');
  console.log('querystring', req.query);
  let projects = await projectOps.getAllProjects();
  if (projects) {
    if (req.query.format === 'json') {
      res.json(projects);
      return;
    }
    res.render('projects', { title: 'Projects', projects });
  } else {
    res.render('projects', { title: 'Projects', projects: [] });
  }
};

exports.Project = async (req, res) => {
  const projectId = req.params.id;
  console.log(`loading a project by id ${projectId}`);
  let project = await projectOps.getProjectById(projectId);
  let projects = await projectOps.getAllProjects();
  if (project) {
    if (req.query.format === 'json') {
      res.json(project);
      return;
    }
    res.render('project-detail', {
      title: project.title,
      project: project,
      projects: projects,
      projectId: req.params.id,
    });
  } else {
    res.render('projects', { title: 'Projects', projects: [] });
  }
};

exports.SearchProjects = async (req, res) => {
  const { title, summary, description } = req.query; // Get search parameters
  console.log(
    `Searching projects by title: "${title}", summary: "${summary}", description: "${description}"`
  );

  let projects = await projectOps.searchProjects(title, summary, description);

  return res.json(projects); //return JSON
};
