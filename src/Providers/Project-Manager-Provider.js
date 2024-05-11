import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ProjectManagerContext = createContext(null);

export function ProjectManagerProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState();
  const [sortBy, setSortBy] = useState("");
  const [toProject, setToProject] = useState(5);
  const [fromProject, setFromProject] = useState([0]);
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProject = async () => {
    try {
      const response = await fetch(
        `/projects?text=${query}&from=0&to=${toProject}`
      );
      setProjects(await response.json());
    } catch {
      toast.success(
        "There was an error while fetching projects from the server"
      );
    }
  };

  useEffect(() => {
    fetchProject();
  }, [toProject, query]);

  const fetchProjectById = async (id) => {
    try {
      const response = await fetch(`/projects/${id}`);
      setProject(await response.json());
    } catch {
      toast.success(
        "There was an error while fetching project by id from the server"
      );
    }
  };

  const addProject = (newProject) => {
    fetch("/projects", {
      method: "POST",
      body: JSON.stringify(newProject),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      toast.success("Projects created successfully");
      fetchProject();
    });
  };

  const removeProject = (id) => {
    fetch(`/projects/${id}`, { method: "DELETE" }).then(() => {
      toast.success("Project successfully deleted");
      fetchProject();
    });
  };

  const editProject = (project) => {
    setSelectedProject(project);
  };

  const updateProject = (editingProject, id) => {
    fetch(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(editingProject),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      toast.success("Project successfully edited");
      fetchProject();
    });
  };

  const value = {
    projects,
    addProject,
    removeProject,
    updateProject,
    toProject,
    setToProject,
    fromProject,
    setFromProject,
    setQuery,
    editProject,
    selectedProject,
    setSelectedProject,
    sortBy,
    setSortBy,
    project,
    fetchProjectById,
  };

  return (
    <ProjectManagerContext.Provider value={value}>
      {children}
    </ProjectManagerContext.Provider>
  );
}
