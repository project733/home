import projects from "./project_tiles";

import "../../css/global.scss";
import styles from "./ProjectsList.module.scss";

function Projects() {
  const clickHandler = (e) => {
    e.currentTarget.classList.toggle("open");
  };

  return (
    <main className={styles.projects}>
      {projects.map((project) => (
        <section
          className={`projectTile${project.id}`}
          key={project.id}
          tabIndex={0}
          onClick={clickHandler}
        >
          <div className={styles.tile}>
            <button className="closedetails" onClick={clickHandler}>
              Close
              <span className={styles.visuallyhidden}>
                Close details on {project.projectName} project.
              </span>
            </button>
            <div className={styles.screenshots}>
              <img src={project.imgSrc} alt={project.projectName} />
            </div>
            <h3>{project.projectName}</h3>
            <div className="details">
              <p>Features:</p>
              <ul>
                {project.features.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

export default Projects;
